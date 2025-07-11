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
    <div className="flex flex-col h-full bg-zinc-800 rounded-lg p-4">
      {/* Chat Window */}
      <div className="flex-grow overflow-y-auto space-y-4 mb-4 custom-scrollbar">
        {messages.length === 0 ? (
          <div className="text-neutral-400 text-center mt-10">
            <p className="text-xl font-medium">Need help choosing the right product?</p>
            <p className="text-sm">Ask me anything!</p>
          </div>
        ) : (
          messages.map((msg, index) => (
            <div key={index} className={msg.sender === "user" ? "text-right" : ""}>
              <div className={`inline-block p-2 rounded-xl ${msg.sender === "user" ? "bg-blue-500 text-white" : "bg-gray-700 text-white"}`}>
                {msg.sender === "ai" ? (
                  <div dangerouslySetInnerHTML={{ __html: marked.parse(msg.text) }} />
                ) : (
                  <div><strong>You:</strong> {msg.text}</div>
                )}
              </div>
            </div>
          ))
        )}
        {loading && <p className="text-sm text-gray-400">AI is thinking...</p>}
      </div>

{showRecommendationsButton && (
  <div className="text-center mt-4">
    <p className="text-white mb-2">Great! I’ve found some products that might be perfect for you.</p>
    <button
      className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
      onClick={() => {
        onRecommendations(tempRecommendations);
        onClose();
      }}
    >
      Show Recommended Products
    </button>
  </div>
)}


      {/* Input */}
      <div className="flex items-center gap-2">
        <TextareaAutosize
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask me anything..."
          className="flex-grow resize-none p-2 rounded-lg border bg-zinc-900 text-white"
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
          className={`px-4 py-2 rounded-lg ${input.trim() ? "bg-blue-600 text-white" : "bg-gray-500 text-gray-300"}`}
        >
          Send
        </button>
      </div>

      <button onClick={onClose} className="text-sm text-gray-300 mt-2 underline self-center">Close Chat</button>
    </div>
  );
};

export default ProductAdvisorChat;
