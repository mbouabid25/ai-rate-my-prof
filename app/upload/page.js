"use client"; // This is a client component

import { useRouter } from "next/navigation";
import { AppBar, Toolbar, IconButton, Button, TextField, Box, Stack, Typography, Link, Rating } from "@mui/material";
import HomeIcon from '@mui/icons-material/Home'; // Import a simple home icon
import { useState } from "react";
import "./upload.css"; // Import custom CSS

// Import Google Fonts
const robotoFontUrl = "https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap";

export default function Upload() {
  const router = useRouter();
  const [professor, setProfessor] = useState("");
  const [subject, setSubject] = useState("");
  const [stars, setStars] = useState(0); // Initial state set to 0 stars
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
      router.push("/allreviews");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const goToWelcome = () => {
    router.push("/");
  };

  return (
    <>
      {/* Load the Roboto font */}
      <link href={robotoFontUrl} rel="stylesheet" />
      <Box>
        {/* Navigation Bar */}
        <AppBar position="static" sx={{ backgroundColor: "#ffffff", boxShadow: 'none', borderBottom: '1ƒpx solid #e0e0e0', fontFamily: 'Roboto, sans-serif' }}>
          <Toolbar sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}> {/* Centering the content */}
            <IconButton edge="start" color="inherit" onClick={goToWelcome} aria-label="back to welcome page" sx={{ position: 'absolute', left: '20px' }}>
              <HomeIcon sx={{ color: '#333', fontSize: '2rem' }} />
            </IconButton>
            <Box sx={{ display: 'flex', gap: 4 }}> {/* Horizontal alignment with gap */}
              <Link
                href="/allreviews"
                underline="none"
                sx={{
                  color: '#333',
                  fontSize: '1.2rem',
                  transition: 'color 0.3s ease, transform 0.3s ease',
                  '&:hover': {
                    color: '#1976d2',
                    transform: 'scale(1.1)', // Subtle scaling on hover
                  },
                }}
              >
                See all reviews
              </Link>
              <Link
                href="/howitworks"
                underline="none"
                sx={{
                  color: '#333',
                  fontSize: '1.2rem',
                  transition: 'color 0.3s ease, transform 0.3s ease',
                  '&:hover': {
                    color: '#1976d2',
                    transform: 'scale(1.1)', // Subtle scaling on hover
                  },
                }}
              >
                How it works
              </Link>
            </Box>
          </Toolbar>
        </AppBar>

        {/* Main Content */}
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          minHeight="calc(100vh - 64px)" // Adjusted to account for the navbar height
          sx={{
            backgroundColor: "#fef5e7", // Cream background for a modern look
            padding: 4,
            fontFamily: 'Roboto, sans-serif', // Use Roboto font for consistency
          }}
        >
          {/* Upload Review Heading */}
          <Typography
            variant="h4"
            component="h1"
            sx={{
              fontWeight: "bold",
              marginBottom: 3,
              color: "#333",
              textAlign: "center",
              fontFamily: 'Roboto, sans-serif',
            }}
          >
            Got a review?
          </Typography>
          <Stack spacing={3} width="300px">
            <TextField
              label="Professor"
              value={professor}
              onChange={(e) => setProfessor(e.target.value)}
              variant="outlined"
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 4,
                  '& fieldset': {
                    borderColor: '#ccc',
                  },
                  '&:hover fieldset': {
                    borderColor: '#888',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#1976d2', // Blue color on focus
                  },
                },
              }}
            />
            <TextField
              label="Subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              variant="outlined"
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 4,
                  '& fieldset': {
                    borderColor: '#ccc',
                  },
                  '&:hover fieldset': {
                    borderColor: '#888',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#1976d2',
                  },
                },
              }}
            />
            <TextField
              label="Review"
              value={review}
              onChange={(e) => setReview(e.target.value)}
              multiline
              rows={4}
              variant="outlined"
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 4,
                  '& fieldset': {
                    borderColor: '#ccc',
                  },
                  '&:hover fieldset': {
                    borderColor: '#888',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#1976d2',
                  },
                },
              }}
            />
            {/* Move Rating Component Below Review Textbox */}
            <Box display="flex" flexDirection="column" alignItems="center">
              <Typography variant="subtitle1" sx={{ color: '#333', mb: 1 }}>
                Rate the Professor
              </Typography>
              <Rating
                value={stars}
                onChange={(event, newValue) => {
                  setStars(newValue);
                }}
                size="large"
                sx={{
                  color: "#ffc107", // Yellow star color
                }}
              />
            </Box>
            <Button
              variant="contained"
              onClick={handleSubmit}
              sx={{
                padding: "15px 30px",
                fontSize: "1.2rem",
                margin: "20px 0",
                backgroundColor: "#1976d2",
                color: "#fff",
                transition: "background-color 0.3s ease, transform 0.3s ease",
                '&:hover': {
                  backgroundColor: "#9c27b0", // Bright purple on hover
                  transform: "translateY(-3px)", // Subtle lift effect
                },
                borderRadius: 4,
              }}
            >
              Submit Review
            </Button>
          </Stack>
        </Box>
      </Box>
    </>
  );
}