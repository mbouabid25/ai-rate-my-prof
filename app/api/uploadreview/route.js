// app/api/uploadreview/route.js
import { NextResponse } from "next/server";
import { db } from "./firebase";
import { collection, addDoc } from "firebase/firestore";

export async function POST(req) {
  try {
    // Log the incoming request
    console.log("Received a POST request to /api/uploadreview");

    // Parse the request body
    const data = await req.json();
    console.log("Parsed request data:", data);

    // Destructure the data
    const { professor, subject, stars, review } = data.reviews[0];
    console.log("Review details:", { professor, subject, stars, review });

    // Check if all necessary fields are present
    if (!professor || !subject || !stars || !review) {
      throw new Error("Missing required fields");
    }

    // Adding the review to Firestore
    const docRef = await addDoc(collection(db, "reviews"), {
      professor,
      subject,
      stars,
      review,
    });

    // Log the successful write to Firestore
    console.log("Review successfully written to Firestore with ID:", docRef.id);

    // Respond with success message
    return NextResponse.json({ message: "Review submitted successfully.", id: docRef.id });
  } catch (error) {
    // Log the error with stack trace for more detail
    console.error("Error processing review submission:", error.message, error.stack);
    return NextResponse.json({ error: "Failed to process request." }, { status: 500 });
  }
}