import { NextResponse } from "next/server";
import { Pinecone } from "@pinecone-database/pinecone";
import fetch from "node-fetch";
import { GoogleGenerativeAI } from "@google/generative-ai";
import fs from 'fs';
import path from 'path';

// Set up API keys and model parameters
const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI({ apiKey });
const MODEL = "intfloat/multilingual-e5-large";
const HUGGINGFACE_API_TOKEN = process.env.HUGGINGFACE_API_TOKEN;

if (!apiKey || !HUGGINGFACE_API_TOKEN || !process.env.PINECONE_API_KEY) {
  console.error("Missing necessary environment variables for API keys.");
  process.exit(1);
}

const pineconeClient = new Pinecone({
  apiKey: process.env.PINECONE_API_KEY,
});

const index = pineconeClient.index("rag-index").namespace("ns1");

const systemPrompt = `You are an intelligent assistant for the RateMyProfessor system...`; // The full prompt as you defined

// Function to fetch embeddings with retry logic
async function fetchEmbeddingsWithRetry(text, retries = 5) {
    for (let attempt = 1; attempt <= retries; attempt++) {
        try {
            const response = await fetch(`https://api-inference.huggingface.co/models/${MODEL}`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${HUGGINGFACE_API_TOKEN}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ inputs: text })
            });

            const responseBody = await response.text();

            if (!response.ok) {
                console.error(`Attempt ${attempt}/${retries} failed: ${response.status} - ${responseBody}`);
                if (response.status === 503) {
                    console.warn(`Model is loading, retrying (${attempt}/${retries})...`);
                    await new Promise((resolve) => setTimeout(resolve, 2000));
                } else {
                    throw new Error(`Failed to fetch embeddings: ${response.status} - ${responseBody}`);
                }
            } else {
                const data = JSON.parse(responseBody);
                return data;
            }
        } catch (error) {
            if (attempt === retries) {
                console.error("Failed to fetch embeddings after multiple attempts.", error);
                throw error;
            }
            console.warn(`Retrying (${attempt}/${retries})...`);
        }
    }
}

export async function POST(req) {
  try {
    const messages = await req.json();
    const userMessage = messages[messages.length - 1];
    const userQuery = userMessage.content;

    // Use the fetchEmbeddingsWithRetry function to get embeddings
    const queryEmbedding = await fetchEmbeddingsWithRetry(userQuery);
    if (!queryEmbedding || !Array.isArray(queryEmbedding)) {
      throw new Error("Expected an array for embeddings.");
    }

    const response = await genAI.generateContent({
      prompt: `User query: ${userQuery}`,
      model: "text-davinci-003",
      maxTokens: 500,
    });

    if (!response || !response.choices || !Array.isArray(response.choices)) {
      throw new Error("Invalid response from AI model.");
    }

    return NextResponse.json({ content: response.choices[0].text });
  } catch (error) {
    console.error("Error processing request:", error);
    return NextResponse.json({ error: "Failed to process request." }, { status: 500 });
  }
}