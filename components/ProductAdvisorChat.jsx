// components/ProductAdvisorChat.jsx
import React, { useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
import { marked } from "marked";
import service from "@/components/gemini/service"; // adjust path as needed

import { useEffect } from "react";


 


const ProductAdvisorChat = ({ products, onClose,subcategoryName, onRecommendations }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [showRecommendationsButton, setShowRecommendationsButton] = useState(false);
  const [tempRecommendations, setTempRecommendations] = useState([]);



  useEffect(() => {
  if (messages.length === 0) {
    const initialMessage = {
      sender: "ai",
      text: `Hi there! I’m your shopping assistant 🤖\nTell me what you’re looking for in a ${subcategoryName}. I’ll guide you and recommend the best ones!`
    };
    setMessages([initialMessage]);
  }
}, []);

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
  setShowRecommendationsButton(true); // Show button
  // Store the recommended products in a temp state for later trigger
  setTempRecommendations(recommended);
}

  };

  return (
    <div className="flex flex-col h-full bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-2xl p-6 shadow-strong">
      {/* Chat Header */}
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-700">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 gradient-primary rounded-full flex items-center justify-center">
            <span className="text-white font-bold">🤖</span>
          </div>
          <div>
            <h3 className="text-white font-bold text-lg">AI Shopping Assistant</h3>
            <p className="text-gray-400 text-sm">Here to help you find the perfect product</p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-white transition-all-smooth hover:scale-110 p-2 rounded-full hover:bg-gray-700"
        >
          ✕
        </button>
      </div>

      {/* Chat Window */}
      <div className="flex-grow overflow-y-auto space-y-6 mb-6 custom-scrollbar pr-2">
        {messages.length === 0 ? (
          <div className="text-center mt-12 animate-fade-in">
            <div className="text-6xl mb-4">🛍️</div>
            <p className="text-xl font-bold text-white mb-2">Need help choosing the right product?</p>
            <p className="text-gray-400 text-lg">Ask me anything about {subcategoryName}!</p>
          </div>
        ) : (
          messages.map((msg, index) => (
            <div key={index} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"} animate-slide-up`}>
              <div className={`max-w-[80%] p-4 rounded-2xl shadow-medium ${
                msg.sender === "user" 
                  ? "gradient-primary text-white" 
                  : "bg-gray-700 text-white border border-gray-600"
              }`}>
                {msg.sender === "ai" ? (
                  <div className="prose prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: marked.parse(msg.text) }} />
                ) : (
                  <div className="font-medium">{msg.text}</div>
                )}
              </div>
            </div>
          ))
        )}
        {loading && (
          <div className="flex justify-start animate-pulse">
            <div className="bg-gray-700 p-4 rounded-2xl shadow-medium">
              <div className="flex items-center space-x-2">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                </div>
                <span className="text-gray-400 text-sm">AI is thinking...</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {showRecommendationsButton && (
        <div className="text-center mb-6 p-4 bg-gradient-to-r from-green-600 to-blue-600 rounded-2xl animate-scale-in">
          <div className="text-2xl mb-2">🎉</div>
          <p className="text-white mb-4 font-semibold">Great! I've found some products that might be perfect for you.</p>
          <button
            className="gradient-secondary text-black px-6 py-3 rounded-xl font-bold hover:shadow-glow transition-all-smooth hover:scale-105"
            onClick={() => {
              onRecommendations(tempRecommendations);
              onClose();
            }}
          >
            ✨ Show Recommended Products
          </button>
        </div>
      )}

      {/* Input */}
      <div className="flex items-end gap-3 bg-gray-800 p-4 rounded-2xl border border-gray-700">
        <TextareaAutosize
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="💬 Ask me anything about products..."
          className="flex-grow resize-none p-3 rounded-xl border-2 border-gray-600 bg-gray-900 text-white focus:border-[#0071ce] transition-colors text-base"
          minRows={1}
          maxRows={4}
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
          className={`px-6 py-3 rounded-xl font-bold transition-all-smooth ${
            input.trim() 
              ? "gradient-primary text-white hover:shadow-glow hover:scale-105" 
              : "bg-gray-600 text-gray-400 cursor-not-allowed"
          }`}
        >
          🚀 Send
        </button>
      </div>
    </div>
  );
};

export default ProductAdvisorChat;
