"use client"; // This is a client component

import { useRouter } from "next/navigation";
import { Button, Box, Typography, IconButton } from "@mui/material";
import GitHubIcon from '@mui/icons-material/GitHub';
import "./welcome.css"; // Import custom CSS for additional styles

export default function GetStarted() {
  const router = useRouter();

  const goToUpload = () => {
    router.push("/upload");
  };

  const goToChat = () => {
    router.push("/chat");
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      sx={{
        backgroundColor: "#f5f5f5", // Light background color for modern look
        padding: 3,
      }}
    >
      <Typography
        variant="h2"
        component="h1"
        className="large-header"
        sx={{ fontWeight: "bold", marginBottom: 4, color: "#333" }}
      >
        Welcome to AI Rate My Professor :)
      </Typography>
      <div className="typewriter">
        <Typography variant="h5" component="h2" sx={{ color: "#555" }}>
          The assistant that knows all the tea about your profs.
        </Typography>
      </div>
      <Box mt={5} display="flex" flexDirection="row" gap={4}>
        <Button
          variant="contained"
          onClick={goToUpload}
          className="animated-button"
          sx={{
            padding: "15px 30px",
            fontSize: "1.2rem",
            backgroundColor: "#1976d2",
            color: "#fff",
            boxShadow: "0px 4px 8px rgba(0,0,0,0.2)",
            transition: "transform 0.3s ease, box-shadow 0.3s ease, background-color 0.3s ease",
            '&:hover': {
              backgroundColor: "#9c27b0", // Bright purple on hover
              transform: "translateY(-5px)",
              boxShadow: "0px 8px 16px rgba(0,0,0,0.3)",
            },
          }}
        >
          Upload Review
        </Button>
        <Button
          variant="contained"
          onClick={goToChat}
          className="animated-button"
          sx={{
            padding: "15px 30px",
            fontSize: "1.2rem",
            backgroundColor: "#1976d2",
            color: "#fff",
            boxShadow: "0px 4px 8px rgba(0,0,0,0.2)",
            transition: "transform 0.3s ease, box-shadow 0.3s ease, background-color 0.3s ease",
            '&:hover': {
              backgroundColor: "#9c27b0", // Bright purple on hover
              transform: "translateY(-5px)",
              boxShadow: "0px 8px 16px rgba(0,0,0,0.3)",
            },
          }}
        >
          Chat with Assistant
        </Button>
      </Box>
      {/* GitHub Icon */}
      <Box mt={6} position="absolute" bottom={20} display="flex" justifyContent="center" alignItems="center">
        <IconButton
          component="a"
          href="https://github.com/mbouabid25/ai-rate-my-prof.git" 
          target="_blank"
          rel="noopener noreferrer"
          sx={{
            color: "#333",
            '&:hover': {
              color: "#9c27b0", // Bright purple on hover
            },
          }}
        >
          <GitHubIcon fontSize="large" />
        </IconButton>
      </Box>
    </Box>
  );
}