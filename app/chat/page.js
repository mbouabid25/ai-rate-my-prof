"use client";
import { TextField, Box, Stack, Button, IconButton, Typography, AppBar, Toolbar, Link } from "@mui/material";
import HomeIcon from '@mui/icons-material/Home'; // Importing home icon
import DeleteIcon from '@mui/icons-material/Delete'; // Importing delete icon
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Chat() {
  const router = useRouter();
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "Hi! I am the Rate My Professor support assistant. How can I help you today?",
    },
  ]);

  const [message, setMessage] = useState("");

  const sendMessage = async () => {
    if (message.trim() === "") return; // Avoid sending empty messages

    setMessages((messages) => [
      ...messages,
      { role: "user", content: message },
      { role: "assistant", content: "" },
    ]);

    setMessage("");
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify([...messages, { role: "user", content: message }]),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to send message");
      }

      const data = await response.json();

      setMessages((prevMessages) => {
        const updatedMessages = [...prevMessages];
        updatedMessages[updatedMessages.length - 1] = {
          role: "assistant",
          content: data.content,
        };
        return updatedMessages;
      });
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      sendMessage();
    }
  };

  const goToWelcome = () => {
    router.push("/");
  };

  return (
    <Box>
      {/* Navigation Bar */}
      <AppBar position="static" sx={{ backgroundColor: "#ffffff", boxShadow: 'none', borderBottom: '1px solid #e0e0e0' }}>
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={goToWelcome} aria-label="back to welcome page">
            <HomeIcon sx={{ color: '#333' }} /> {/* Simple home icon */}
          </IconButton>
          <Box sx={{ flexGrow: 1 }} /> {/* Spacer */}
          <Box sx={{ display: 'flex', justifyContent: 'center', flexGrow: 1, gap: 4 }}> {/* Centering Box with spacing */}
            <Link
              href="/allreviews"
              underline="none"
              sx={{
                color: '#333',
                fontSize: '1.1rem',
                transition: 'color 0.3s, transform 0.3s',
                '&:hover': {
                  color: '#1976d2',
                  transform: 'translateY(-3px)', // Animation on hover
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
                fontSize: '1.1rem',
                transition: 'color 0.3s, transform 0.3s',
                '&:hover': {
                  color: '#1976d2',
                  transform: 'translateY(-3px)', // Animation on hover
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
      <Box width="100vw" height="93vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center" sx={{ backgroundColor: "#fef5e7" }}>
        <Stack direction="column" width="500px" height="700px" borderRadius={2} boxShadow={3} p={3} spacing={3} bgcolor="white">
          <Typography variant="h6" color="textSecondary" align="center" mb={2}>
            AI Rate My Professor Chat
          </Typography>
          <Stack direction="column" spacing={2} flexGrow={1} overflow="auto" maxHeight="100%" sx={{ padding: '10px', borderRadius: 2, bgcolor: "#f9f9f9" }}>
            {messages.map((message, index) => (
              <Box key={index} display="flex" justifyContent={message.role === "assistant" ? "flex-start" : "flex-end"}>
                <Box bgcolor={message.role === "assistant" ? "primary.light" : "secondary.light"} color="black" borderRadius={1} p={2} maxWidth="70%">
                  {message.content}
                </Box>
              </Box>
            ))}
          </Stack>
          <Stack direction="row" spacing={1} alignItems="center">
            <TextField
              label="Type a message..."
              fullWidth
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              variant="outlined"
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
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
          </Stack>
          <Stack direction="row" justifyContent="space-between">
            <Button
              variant="outlined"
              onClick={() => setMessages([])}
              startIcon={<DeleteIcon />}
              sx={{
                color: 'black',
                borderColor: 'black',
                '&:hover': {
                  backgroundColor: 'rgba(0, 0, 0, 0.04)',
                  borderColor: 'black',
                },
              }}
            >
              Clear Chat
            </Button>
            <Button
              variant="outlined"
              onClick={() => setMessage("")}
              startIcon={<DeleteIcon />}
              sx={{
                color: 'black',
                borderColor: 'black',
                '&:hover': {
                  backgroundColor: 'rgba(0, 0, 0, 0.04)',
                  borderColor: 'black',
                },
              }}
            >
              Clear Input
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Box>
  );
}