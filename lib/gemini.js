import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function generateAIContent(topic, channelName) {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const prompt = `
Create viral YouTube title and description.

Topic: ${topic}
Channel: ${channelName}

Return ONLY JSON:
{
  "title": "",
  "description": ""
}
`;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();

  return JSON.parse(text);
}
