"use client";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  AppBar,
  Toolbar,
  IconButton,
  Link,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Chip,
  Stack,
  Button
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import StarIcon from "@mui/icons-material/Star";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import reviewsData from "../../data/reviews.json"; // Adjust path based on your structure

export default function ReviewsPage() {
  const router = useRouter();
  const [reviews, setReviews] = useState([]);
  const [sortOption, setSortOption] = useState("rating"); // Default sorting by rating
  const [selectedChips, setSelectedChips] = useState([]); // Chips for dynamic filtering

  useEffect(() => {
    // Simulate fetching data from the JSON file
    setReviews(reviewsData.reviews);
  }, []);

  // Sorting function based on selected option
  const handleSortChange = (event) => {
    const option = event.target.value;
    setSortOption(option);

    const sortedReviews = [...reviews];
    if (option === "rating") {
      sortedReviews.sort((a, b) => b.stars - a.stars); // Descending order by rating
    } else if (option === "subject") {
      sortedReviews.sort((a, b) => a.subject.localeCompare(b.subject)); // Alphabetical order by subject
    } else if (option === "name") {
      sortedReviews.sort((a, b) => a.professor.localeCompare(b.professor)); // Alphabetical order by professor's name
    }
    setReviews(sortedReviews);
  };

  // Handling Chip click to filter reviews
  const handleChipClick = (chip) => {
    if (selectedChips.includes(chip)) {
      setSelectedChips(selectedChips.filter((c) => c !== chip));
    } else {
      setSelectedChips([...selectedChips, chip]);
    }
  };

  // Filtering logic based on selected chips
  const filteredReviews = reviews.filter((review) => {
    if (selectedChips.length === 0) return true; // If no chip is selected, show all

    // Check if the review matches any of the selected chips
    return selectedChips.some((chip) => {
      if (chip.includes("Stars")) {
        return review.stars === parseInt(chip[0]); // Match star rating
      }
      return (
        review.subject.toLowerCase().includes(chip.toLowerCase()) ||
        review.professor.toLowerCase().includes(chip.toLowerCase())
      ); // Match subject or professor name
    });
  });

  const goToWelcome = () => {
    router.push("/");
  };

  const goToUpload = () => {
    router.push("/upload");
  };

  return (
    <Box>
      {/* Navigation Bar */}
      <AppBar
        position="static"
        sx={{
          backgroundColor: "#ffffff",
          boxShadow: "none",
          borderBottom: "1px solid #e0e0e0",
        }}
      >
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={goToWelcome}
            aria-label="back to welcome page"
          >
            <HomeIcon sx={{ color: "#333" }} />
          </IconButton>
          <Box sx={{ flexGrow: 1 }} /> {/* Spacer */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              flexGrow: 1,
              gap: 4,
            }}
          >
            <Link
              href="/allreviews"
              underline="none"
              sx={{
                color: "#333",
                fontSize: "1.2rem",
                transition: "color 0.3s, transform 0.3s",
                "&:hover": {
                  color: "#1976d2",
                  transform: "translateY(-3px)",
                },
              }}
            >
              See all reviews
            </Link>
            <Link
              href="/howitworks"
              underline="none"
              sx={{
                color: "#333",
                fontSize: "1.2rem",
                transition: "color 0.3s, transform 0.3s",
                "&:hover": {
                  color: "#1976d2",
                  transform: "translateY(-3px)",
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
          backgroundColor: "#fef5e7", // Light cream background for modern look
          padding: 4,
        }}
      >
        <Typography
          variant="h4"
          gutterBottom
          sx={{ fontWeight: "bold", color: "#333", mb: 4 }}
        >
          All Reviews
        </Typography>

        {/* Dynamic Filtering Chips */}
        <Stack direction="row" spacing={1} mb={4} justifyContent="center">
          {["5 Stars", "4 Stars", "3 Stars", "Physics", "Math", "English"].map(
            (label) => (
              <Chip
                key={label}
                label={label}
                onClick={() => handleChipClick(label)}
                color={selectedChips.includes(label) ? "primary" : "default"}
                sx={{
                  cursor: "pointer",
                  transition: "transform 0.2s",
                  "&:hover": {
                    transform: "scale(1.1)",
                  },
                }}
              />
            )
          )}
        </Stack>

        {/* Sorting Dropdown */}
        <FormControl sx={{ mb: 4, minWidth: 200 }}>
          <InputLabel id="sort-label">Sort By</InputLabel>
          <Select
            labelId="sort-label"
            value={sortOption}
            label="Sort By"
            onChange={handleSortChange}
          >
            <MenuItem value="rating">Rating</MenuItem>
            <MenuItem value="subject">Subject</MenuItem>
            <MenuItem value="name">Professor's Name</MenuItem>
          </Select>
        </FormControl>

        {/* Reviews Grid */}
        <Grid container spacing={4} justifyContent="center">
          {filteredReviews.map((review, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card
                sx={{
                  minWidth: 275,
                  boxShadow: 4,
                  borderRadius: 3,
                  transition: "transform 0.2s, box-shadow 0.3s",
                  "&:hover": { transform: "translateY(-5px)", boxShadow: 6 },
                }}
              >
                <CardContent>
                  <Typography
                    variant="h6"
                    component="div"
                    sx={{ fontWeight: "bold", color: "#1976d2" }}
                  >
                    {review.professor}
                  </Typography>
                  <Typography
                    sx={{ mb: 1.5, color: "#666" }}
                    color="text.secondary"
                  >
                    {review.subject}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ color: "#333", mb: 1 }}
                  >
                    {review.review}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {[...Array(review.stars)].map((_, i) => (
                      <StarIcon key={i} sx={{ color: "#ffc107" }} />
                    ))}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Add Review Button */}
        <Button
          variant="contained"
          onClick={goToUpload}
          sx={{
            marginTop: 4,
            padding: "10px 20px",
            backgroundColor: "#1976d2",
            color: "#fff",
            fontSize: "1rem",
            borderRadius: 3,
            transition: "background-color 0.3s, transform 0.3s",
            "&:hover": {
              backgroundColor: "#9c27b0",
              transform: "translateY(-3px)", // Slight lift effect on hover
            },
          }}
        >
          Add a Review
        </Button>
      </Box>
    </Box>
  );
}