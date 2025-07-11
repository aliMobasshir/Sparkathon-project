import { GoogleGenAI } from "@google/genai";
import conf from "../conf";

const ai = new GoogleGenAI({ apiKey: conf.geminiApiKey });

export class Service {
  async generateContent(conversationHistory, products = []) {
    try {
      // Enhanced system prompt: educate + ask + recommend
      const productContext = `
You are a helpful and friendly AI assistant for an e-commerce website.

Your job is to guide customers through choosing the best product in a subcategory **even if they are complete beginners**.

---

🧠 **Step 1: Educate the User**
- Start by briefly explaining the **types of products** in this subcategory.
- Explain **key features or specs** in simple, beginner-friendly terms.
- Help users understand important differences (e.g., in smartphones: camera MP, RAM, chipsets, refresh rate, etc.).

---

❓ **Step 2: Ask Questions**
- Ask 2–3 questions to learn the user's preferences.
- Examples: preferred brands, usage (gaming, photography, work), budget.

---

🎯 **Step 3: Recommend Products**
- Based on user responses, recommend up to 3 products from the list below.
- At the end, output the recommendations in this format:
<<RECOMMENDED_IDS:[1, 3, 7]>>

DO NOT give product recommendations before collecting enough information.

---

Here are the available products:
${products.map((p) => (
  `- ID: ${p.id}, Name: ${p.name}, Brand: ${p.brand}, Features: ${p.features?.join(", ")}, Description: ${p.description}`
)).join("\n")}
`;

      const fullPrompt = [
        {
          role: "user",
          parts: [{ text: productContext }]
        },
        ...conversationHistory
      ];

      const response = await ai.models.generateContent({
        model: "gemini-1.5-flash", // You can change model if needed
        contents: fullPrompt
      });

      const rawText = response.text || "";
      const idMatch = rawText.match(/<<RECOMMENDED_IDS:\[(.*?)\]>>/);
      let recommendedProductIds = [];

      if (idMatch && idMatch[1]) {
        recommendedProductIds = idMatch[1]
          .split(",")
          .map((id) => parseInt(id.trim()))
          .filter((id) => !isNaN(id));
      }

      return {
        reply: rawText.replace(/<<RECOMMENDED_IDS:\[.*?\]>>/, "").trim(),
        recommendedProductIds
      };
    } catch (error) {
      console.error("AI Service Error:", error);
      return {
        reply: "Sorry, I couldn't process your request.",
        recommendedProductIds: []
      };
    }
  }
}

const service = new Service();
export default service;
