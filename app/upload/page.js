"use client"; // Mark this as a Client Component

import { useRouter } from "next/navigation"; // Import from next/navigation
import { Button, TextField, Box, Stack } from "@mui/material";
import { useState } from "react";
import "./upload.css"; // Import your custom CSS

export default function Upload() {
  const router = useRouter();
  const [professor, setProfessor] = useState("");
  const [subject, setSubject] = useState("");
  const [stars, setStars] = useState("");
  const [review, setReview] = useState("");

  const handleSubmit = async () => {
    try {
      const response = await fetch("/api/uploadreview", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          reviews: [
            {
              professor,
              subject,
              stars,
              review,
            },
          ],
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Error uploading review: ${response.status} ${errorText}`);
      }

      // Redirect to the chat page after successful upload
      router.push("/chat");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
    >
      <h1 className="large-header">Upload a Review</h1>
      <Stack spacing={3} width="300px">
        <TextField
          label="Professor"
          value={professor}
          onChange={(e) => setProfessor(e.target.value)}
        />
        <TextField
          label="Subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        />
        <TextField
          label="Stars"
          value={stars}
          onChange={(e) => setStars(e.target.value)}
        />
        <TextField
          label="Review"
          value={review}
          onChange={(e) => setReview(e.target.value)}
        />
        <Button
          variant="contained"
          onClick={handleSubmit}
          className="relative rounded-full border-2 border-blue-600 text-2xl text-blue-600 transition-colors hover:bg-blue-100 mt-6 mb-6"
          style={{ padding: "20px 40px", fontSize: "1.5rem", margin: "20px 0" }}
        >
          Submit Review
        </Button>
      </Stack>
    </Box>
  );
}