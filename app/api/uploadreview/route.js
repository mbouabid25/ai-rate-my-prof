import { NextResponse } from "next/server";
import fs from 'fs';
import path from 'path';

export async function POST(req) {
  try {
    const reviewsFilePath = path.join(process.cwd(), 'data', 'reviews.json');

    // Read the existing reviews from the file
    const existingReviewsData = fs.existsSync(reviewsFilePath)
      ? fs.readFileSync(reviewsFilePath, 'utf8')
      : JSON.stringify({ reviews: [] });
    const existingReviews = JSON.parse(existingReviewsData).reviews;

    // Read new reviews from the request
    const rawData = await req.text();
    const newReviews = JSON.parse(rawData).reviews;

    // Append the new reviews to the existing reviews
    const updatedReviews = [...existingReviews, ...newReviews];

    // Write the combined reviews back to the file
    fs.writeFileSync(reviewsFilePath, JSON.stringify({ reviews: updatedReviews }, null, 2));

    return NextResponse.json({ message: "Reviews uploaded successfully." });
  } catch (error) {
    console.error("Error processing request:", error);
    return NextResponse.json({ error: "Failed to process request." }, { status: 500 });
  }
}