// app/reviews/page.js
"use client";
import { Box, Card, CardContent, Typography, Grid, AppBar, Toolbar, IconButton, Link } from "@mui/material";
import HomeIcon from '@mui/icons-material/Home';
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import reviewsData from "../../data/reviews.json"; // Adjust path based on your structure

export default function ReviewsPage() {
  const router = useRouter();
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    // Simulate fetching data from the JSON file
    setReviews(reviewsData.reviews);
  }, []);

  const goToWelcome = () => {
    router.push("/");
  };

  return (
    <Box>
      {/* Navigation Bar */}
      <AppBar position="static" sx={{ backgroundColor: "#ffffff", boxShadow: 'none', borderBottom: '1px solid #e0e0e0' }}>
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={goToWelcome} aria-label="back to welcome page">
            <HomeIcon sx={{ color: '#333' }} />
          </IconButton>
          <Box sx={{ flexGrow: 1 }} /> {/* Spacer */}
          <Box sx={{ display: 'flex', justifyContent: 'center', flexGrow: 1, gap: 4 }}>
            <Link
              href="/reviews"
              underline="none"
              sx={{
                color: '#333',
                fontSize: '1.2rem',
                transition: 'color 0.3s, transform 0.3s',
                '&:hover': {
                  color: '#1976d2',
                  transform: 'translateY(-3px)',
                },
              }}
            >
              See all reviews
            </Link>
            <Link
              href="/how-it-works"
              underline="none"
              sx={{
                color: '#333',
                fontSize: '1.2rem',
                transition: 'color 0.3s, transform 0.3s',
                '&:hover': {
                  color: '#1976d2',
                  transform: 'translateY(-3px)',
                },
              }}
            >
              How it works
            </Link>
          </Box>
          <Box sx={{ flexGrow: 1 }} /> {/* Spacer */}
        </Toolbar>
      </AppBar>

      {/* Main Content */}
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
        sx={{
          backgroundColor: "#f0f2f5",
          padding: 4,
        }}
      >
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: '#333', mb: 4 }}>
          All Reviews
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          {reviews.map((review, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card sx={{ minWidth: 275, boxShadow: 4, borderRadius: 3 }}>
                <CardContent>
                  <Typography variant="h6" component="div" sx={{ fontWeight: 'bold', color: '#1976d2' }}>
                    {review.professor}
                  </Typography>
                  <Typography sx={{ mb: 1.5, color: '#666' }} color="text.secondary">
                    {review.subject}
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#333' }}>
                    {review.review}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                    Rating: {review.stars}/5
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}