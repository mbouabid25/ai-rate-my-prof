// app/how-it-works/page.js
"use client";
import { Box, Typography, Grid, Paper, Container, IconButton, AppBar, Toolbar, Link } from "@mui/material";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import HomeIcon from "@mui/icons-material/Home";
import GitHubIcon from '@mui/icons-material/GitHub'; // Import GitHub Icon
import { useRouter } from "next/navigation";

export default function HowItWorks() {
  const router = useRouter();

  const goToWelcome = () => {
    router.push("/");
  };

  return (
    <Box
      sx={{
        fontFamily: "'Roboto', sans-serif", // Set the Roboto font family
        backgroundColor: "#fef5e7", // Use the light cream background color for consistency
        minHeight: "100vh",
        paddingTop: 0, // Ensure no extra space above the navbar
        paddingBottom: 8,
      }}
    >
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
          <Box sx={{ flexGrow: 1 }} />
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
          <Box sx={{ flexGrow: 1 }} />
        </Toolbar>
      </AppBar>

      {/* Main Content */}
      <Container sx={{ paddingY: 8 }}>
        <Typography
          variant="h3"
          align="center"
          gutterBottom
          sx={{ fontWeight: "bold", color: "#333", mb: 4 }}
        >
          How It Works
        </Typography>

        <Grid
          container
          direction="column"
          alignItems="center"
          spacing={2} // Control spacing between steps
        >
          {/* Step 1 */}
          <Grid item xs={12} md={8}>
            <Paper
              elevation={4}
              sx={{
                padding: 4,
                textAlign: "center",
                borderRadius: 2,
                backgroundColor: "#ffffff",
                transition: "transform 0.3s, box-shadow 0.3s",
                "&:hover": {
                  transform: "translateY(-5px)",
                  boxShadow: 8,
                },
                height: "200px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                fontFamily: "'Roboto', sans-serif", // Ensure consistency
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
                Step 1: User Query
              </Typography>
              <Typography color="textSecondary">
                Users submit a query about professors or subjects they are
                interested in.
              </Typography>
            </Paper>
          </Grid>

          {/* Arrow Down */}
          <Grid item>
            <ArrowDownwardIcon
              sx={{ fontSize: 40, color: "#1976d2" }} // Adjust size and color for aesthetic
            />
          </Grid>

          {/* Step 2 */}
          <Grid item xs={12} md={8}>
            <Paper
              elevation={4}
              sx={{
                padding: 4,
                textAlign: "center",
                borderRadius: 2,
                backgroundColor: "#ffffff",
                transition: "transform 0.3s, box-shadow 0.3s",
                "&:hover": {
                  transform: "translateY(-5px)",
                  boxShadow: 8,
                },
                height: "200px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                fontFamily: "'Roboto', sans-serif", // Ensure consistency
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
                Step 2: Vector Embeddings
              </Typography>
              <Typography color="textSecondary">
                The query is transformed into a vector embedding using models
                from Hugging Face for semantic search.
              </Typography>
            </Paper>
          </Grid>

          {/* Arrow Down */}
          <Grid item>
            <ArrowDownwardIcon
              sx={{ fontSize: 40, color: "#1976d2" }} // Adjust size and color for aesthetic
            />
          </Grid>

          {/* Step 3 */}
          <Grid item xs={12} md={8}>
            <Paper
              elevation={4}
              sx={{
                padding: 4,
                textAlign: "center",
                borderRadius: 2,
                backgroundColor: "#ffffff",
                transition: "transform 0.3s, box-shadow 0.3s",
                "&:hover": {
                  transform: "translateY(-5px)",
                  boxShadow: 8,
                },
                height: "200px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                fontFamily: "'Roboto', sans-serif", // Ensure consistency
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
                Step 3: Gemini AI Processing
              </Typography>
              <Typography color="textSecondary">
                Gemini processes the vector, generating intelligent responses
                based on the query.
              </Typography>
            </Paper>
          </Grid>

          {/* Arrow Down */}
          <Grid item>
            <ArrowDownwardIcon
              sx={{ fontSize: 40, color: "#1976d2" }} // Adjust size and color for aesthetic
            />
          </Grid>

          {/* Step 4 */}
          <Grid item xs={12} md={8}>
            <Paper
              elevation={4}
              sx={{
                padding: 4,
                textAlign: "center",
                borderRadius: 2,
                backgroundColor: "#ffffff",
                transition: "transform 0.3s, box-shadow 0.3s",
                "&:hover": {
                  transform: "translateY(-5px)",
                  boxShadow: 8,
                },
                height: "200px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                fontFamily: "'Roboto', sans-serif", // Ensure consistency
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
                Step 4: Generate Results
              </Typography>
              <Typography color="textSecondary">
                Results are returned to the user, providing insights based on
                the reviews database.
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Container>

      {/* GitHub Icon */}
      <Box mt={0} position="relative" bottom={20} width="100%" display="flex" justifyContent="center" alignItems="center">
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