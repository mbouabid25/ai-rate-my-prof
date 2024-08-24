import { NextResponse } from "next/server";
import { Pinecone } from "@pinecone-database/pinecone";
import fetch from "node-fetch";
import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);
const MODEL = "intfloat/multilingual-e5-large";
const HUGGINGFACE_API_TOKEN = process.env.HUGGINGFACE_API_TOKEN;

const index = new Pinecone({
  apiKey: process.env.PINECONE_API_KEY,
})
  .index("rag-index")
  .namespace("ns1");

  const systemPrompt = `You are an intelligent assistant for the RateMyProfessor system. Your primary role is to help students find the best professors based on their specific queries. Using the Retrieval-Augmented Generation (RAG) approach, you will retrieve relevant information about professors and generate responses to student questions.

  ### Instructions:
  
  1. **Retrieve Relevant Information:**
  - Given a student's query, use the RAG model to search and retrieve relevant information from the database of professors and their reviews.
  - Ensure that the information retrieved is pertinent to the student's query.
  
  2. **Generate Response:**
  - For each query, select the top 3 professors who best match the student's criteria.
  - Provide a review for each of these professors, including key details such as their name, department, rating, and notable feedback from students.
  - Format the response clearly, listing the top 3 professors in order of relevance.
  - Make sure to include a line break between each professor for readability
  
  3. **Response Format:**
  - **Top 3 Professors:**
      1. **Professor Name:** [Name]
          - **Department:** [Department]
          - **Rating:** [Rating]
          - **Review:** [Brief Review of notable feedback]
      2. **Professor Name:** [Name]
          - **Department:** [Department]
          - **Rating:** [Rating]
          - **Review:** [Brief Review of notable feedback]
      3. **Professor Name:** [Name]
          - **Department:** [Department]
          - **Rating:** [Rating]
          - **Review:** [Brief Review of notable feedback]
  
  4. **Quality Assurance:**
  - Ensure that the information provided is accurate and relevant to the student's query.
  - If multiple professors have similar ratings, choose those with the most positive or detailed feedback.
  
  ### Example:
  
  **Query:** "I am looking for a professor in Computer Science who is known for their engaging lectures and clear explanations."
  
  **Top 3 Professors:**
  1. **Professor Alice Johnson**
  - **Department:** Computer Science
  - **Rating:** 4.8/5
  - **Review:** Known for interactive lectures and practical examples. Highly recommended for her clarity in teaching complex topics.
  
  2. **Professor Bob Smith**
  - **Department:** Computer Science
  - **Rating:** 4.7/5
  - **Review:** Praised for his engaging teaching style and thorough explanations. Students appreciate his support outside of class.
  
  3. **Professor Carol Davis**
  - **Department:** Computer Science
  - **Rating:** 4.6/5
  - **Review:** Valued for her clear and concise lectures. Students find her approachable and helpful.
  `;

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
        return data; // Return the data directly
      }
    } catch (error) {
      if (attempt === retries) {
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

    const embeddingsData = await fetchEmbeddingsWithRetry(userQuery);
    
    if (!Array.isArray(embeddingsData) || embeddingsData.length === 0) {
      throw new Error("Embeddings data is not in the expected format");
    }
    
    const queryEmbedding = embeddingsData[0]; // Make sure this indexing is safe
    const results = await index.query({
      vector: queryEmbedding,
      topK: 3,
    });

        // Constructing the context from results
    const context = results.matches.map((match, index) => {
        return `${index + 1}. **Professor Name:** ${match.metadata.professor}\n` +
               `    - **Department:** ${match.metadata.department}\n` +
               `    - **Rating:** ${match.metadata.rating}\n` +
               `    - **Review:** ${match.metadata.review}`;
    }).join("\n\n");

    const prompt = `${systemPrompt}\n\n**Query:** ${userQuery}\n\n**Top 3 Professors:**\n\n${context}`;

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const response = await model.generateContent([prompt]);
    
    return NextResponse.json({ content: response.response.text() });
  } catch (error) {
    console.error("Error processing request:", error);
    return NextResponse.json({ error: "Failed to process request." }, { status: 500 });
  }
}