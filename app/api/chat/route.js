import { NextResponse } from "next/server";
import fetch from "node-fetch";
import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI({ apiKey });

const MODEL = genAI.getGenerativeModel({ model: "intfloat/multilingual-e5-large" });
const HUGGINGFACE_API_TOKEN = process.env.HUGGINGFACE_API_TOKEN;

async function fetchEmbeddingsWithRetry(text, retries = 5) {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const response = await fetch(`https://api-inference.huggingface.co/models/${MODEL}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${HUGGINGFACE_API_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ inputs: text }),
      });

      if (!response.ok) {
        if (response.status === 503) {
          console.warn(`Model is loading, retrying (${attempt}/${retries})...`);
          await new Promise((resolve) => setTimeout(resolve, 2000));
        } else {
          const errorBody = await response.text();
          console.error("Error response body:", errorBody);
          throw new Error(`Failed to fetch embeddings: ${response.statusText}`);
        }
      } else {
        const data = await response.json();
        return data;
      }
    } catch (error) {
      if (attempt === retries) {
        console.error("Failed to fetch embeddings after multiple attempts.", error);
        throw error;
      }
    }
  }
}

export async function POST(req) {
  try {
    const messages = await req.json();
    const userMessage = messages[messages.length - 1];
    const userQuery = userMessage.content;

    const queryEmbedding = await fetchEmbeddingsWithRetry(userQuery);
    if (!queryEmbedding || !Array.isArray(queryEmbedding)) {
      throw new Error("Expected an array for embeddings.");
    }

    const response = await MODEL.generateContent({
      prompt: `User query: ${userQuery}`,
      model: "text-davinci-003",
      maxTokens: 500,
    });

    return NextResponse.json({ content: response.choices[0].text });
  } catch (error) {
    console.error("Error processing request:", error);
    return NextResponse.json({ error: "Failed to process request." }, { status: 500 });
  }
}