// components/ProductAdvisorChat.jsx
import React, { useState, useEffect, useRef } from "react";
import TextareaAutosize from "react-textarea-autosize";
import { marked } from "marked";
import service from "@/components/gemini/service"; // adjust path as needed

const ProductAdvisorChat = ({ products, onClose, subcategoryName, onRecommendations }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [showRecommendationsButton, setShowRecommendationsButton] = useState(false);
  const [tempRecommendations, setTempRecommendations] = useState([]);

  const bottomRef = useRef(null);

  useEffect(() => {
    if (messages.length === 0) {
      const initialMessage = {
        sender: "ai",
        text: `Hi there! I'm your shopping assistant.\nTell me what you're looking for in a ${subcategoryName}. I'll guide you and recommend the best ones!`
      };
      setMessages([initialMessage]);
    }
  }, []);

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, loading]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: "user", text: input };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput("");
    setLoading(true);

    const geminiHistory = updatedMessages.map((msg) => ({
      role: msg.sender === "user" ? "user" : "model",
      parts: [{ text: msg.text }],
    }));

    const response = await service.generateContent(geminiHistory, products.slice(0, 10));

    const aiMessage = { sender: "ai", text: response.reply };
    setMessages([...updatedMessages, aiMessage]);
    setLoading(false);

    if (response.recommendedProductIds.length > 0) {
      const recommended = products.filter((p) =>
        response.recommendedProductIds.includes(p.id)
      );
      setShowRecommendationsButton(true);
      setTempRecommendations(recommended);
    }
  };

  return (
    <div className="flex flex-col h-full bg-white rounded-lg shadow-xl border border-blue-200 overflow-hidden">
      {/* Compact Header */}
      <div className="flex items-center justify-between bg-gradient-to-r from-blue-600 to-blue-700 px-4 py-3 shadow-sm">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center">
            <span className="text-sm">🤖</span>
          </div>
          <div>
            <h3 className="text-white font-semibold text-sm">AI Shopping Assistant</h3>
            <p className="text-blue-100 text-xs">{subcategoryName} Expert</p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="text-blue-100 hover:text-white p-1 rounded-full hover:bg-white/10 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Maximized Chat Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-50">
        {messages.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center bg-white p-6 rounded-lg shadow-sm border border-blue-100">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                <div className="w-6 h-6 bg-white rounded-full"></div>
              </div>
              <p className="text-lg font-semibold text-blue-900 mb-2">Ready to help you shop!</p>
              <p className="text-blue-600">Ask me about {subcategoryName}</p>
            </div>
          </div>
        ) : (
          <>
            {messages.map((msg, index) => (
              <div key={index} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[75%] p-3 rounded-lg shadow-sm ${
                  msg.sender === "user" 
                    ? "bg-blue-600 text-white" 
                    : "bg-white text-gray-800 border border-gray-200"
                }`}>
                  {msg.sender === "ai" ? (
                    <div className="prose prose-sm max-w-none text-gray-800" dangerouslySetInnerHTML={{ __html: marked.parse(msg.text) }} />
                  ) : (
                    <div className="text-sm font-medium">{msg.text}</div>
                  )}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-white p-3 rounded-lg shadow-sm border border-gray-200">
                  <div className="flex items-center space-x-2">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                    <span className="text-gray-600 text-sm">Thinking...</span>
                  </div>
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </>
        )}
      </div>

      {/* Compact Recommendations Banner */}
      {showRecommendationsButton && (
        <div className="bg-gradient-to-r from-yellow-400 to-amber-400 p-3 border-t border-yellow-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-900 font-semibold text-sm">Perfect matches found!</p>
              <p className="text-blue-800 text-xs">Ready to show you the best products</p>
            </div>
            <button
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-medium text-sm transition-colors shadow-sm"
              onClick={() => {
                onRecommendations(tempRecommendations);
                onClose();
              }}
            >
              View Products
            </button>
          </div>
        </div>
      )}

      {/* Minimal Input Section */}
      <div className="border-t border-gray-200 p-3 bg-white">
        <div className="flex items-end gap-2">
          <TextareaAutosize
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask me anything about products..."
            className="flex-1 resize-none p-3 rounded-lg border border-gray-300 bg-gray-50 text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all text-sm placeholder-gray-500"
            minRows={1}
            maxRows={3}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
          />
          <button
            onClick={handleSend}
            disabled={!input.trim()}
            className={`px-4 py-3 rounded-lg font-medium text-sm transition-all ${
              input.trim() 
                ? "bg-blue-600 hover:bg-blue-700 text-white shadow-sm" 
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductAdvisorChat;
