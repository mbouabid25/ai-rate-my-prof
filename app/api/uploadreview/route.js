import { NextResponse } from "next/server";
import fs from 'fs';
import path from 'path';

export async function POST(req) {
  try {
    const reviewsFilePath = path.join(process.cwd(), 'data', 'reviews.json');
    const rawData = await req.text();  // Read the raw text from the request
    const data = JSON.parse(rawData);  // Parse JSON data
    fs.writeFileSync(reviewsFilePath, JSON.stringify(data, null, 2));
    return NextResponse.json({ message: "Reviews uploaded successfully." });
  } catch (error) {
    console.error("Error processing request:", error);
    return NextResponse.json({ error: "Failed to process request." }, { status: 500 });
  }
}