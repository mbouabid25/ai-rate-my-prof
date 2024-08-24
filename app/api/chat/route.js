import { NextResponse } from "next/server";
import { Pinecone } from "@pinecone-database/pinecone";
import { GoogleGenerativeAI } from "@google/generative-ai";
import fetch from "node-fetch";
import reviewsData from '../../../data/reviews.json'; // Load review data

const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);
const MODEL = "intfloat/multilingual-e5-large";
const HUGGINGFACE_API_TOKEN = process.env.HUGGINGFACE_API_TOKEN;

const index = new Pinecone({
  apiKey: process.env.PINECONE_API_KEY,
})
  .index("professors-index")
  .namespace("ns1");

async function fetchEmbeddingsWithRetry(text, retries = 5) {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const response = await fetch(
        `https://api-inference.huggingface.co/models/${MODEL}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${HUGGINGFACE_API_TOKEN}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ inputs: text }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        console.error("Error response body:", data);
        if (response.status === 503) {
          console.warn(`Model is loading, retrying (${attempt}/${retries})...`);
          await new Promise((resolve) => setTimeout(resolve, 5000)); // Increased delay
        } else {
          throw new Error(`Failed to fetch embeddings: ${response.statusText}`);
        }
      } else {
        return data[0].embedding; // Assuming this returns the correct embedding
      }
    } catch (error) {
      if (attempt === retries) {
        throw error;
      }
    }
  }
}

function findRelevantReviews(query) {
  const queryLower = query.toLowerCase();
  const keywords = queryLower.split(" ");

  const matchedReviews = reviewsData.reviews.filter(review => {
    const reviewText = `${review.professor} ${review.subject} ${review.review}`.toLowerCase();
    return keywords.some(keyword => reviewText.includes(keyword));
  });

  console.log("Query:", query);
  console.log("Matched Reviews:", matchedReviews);

  return matchedReviews.slice(0, 3); // Limit to top 3 matches for simplicity
}

export async function POST(req) {
  try {
    const messages = await req.json();
    const userMessage = messages[messages.length - 1];
    const userQuery = userMessage.content;

    // Get relevant reviews from reviews.json
    const relevantReviews = findRelevantReviews(userQuery);

    if (relevantReviews.length === 0) {
      return NextResponse.json({ content: "Sorry, I couldn't find any relevant reviews." });
    }

    const context = relevantReviews.map((review, index) => {
      return `${index + 1}. **Professor Name:** ${review.professor}\n` +
             `    - **Department:** ${review.subject}\n` +
             `    - **Rating:** ${review.stars}\n` +
             `    - **Review:** ${review.review}`;
    }).join("\n\n");

    const prompt = `You are an intelligent assistant for the RateMyProfessor system. Your primary role is to help students find the best professors based on their specific queries.\n\n**Query:** ${userQuery}\n\n**Top 3 Professors:**\n\n${context}`;

    const response = await genAI.getGenerativeModel({ model: "gemini-1.5-flash" }).generateContent([prompt]);

    return NextResponse.json({ content: response.response.text() });
  } catch (error) {
    console.error("Error processing request:", error);
    return NextResponse.json({ error: "Failed to process request." }, { status: 500 });
  }
}