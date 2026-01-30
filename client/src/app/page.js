"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "../lib/api";

import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
  Alert,
} from "@mui/material";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      // ✅ backend sets httpOnly cookie here
      await api.post("/auth/login", { username, password });

      // ✅ cookie is already saved by browser
      router.push("/canvas");
    } catch (err) {
      setError("Invalid username or password");
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background:
          "linear-gradient(135deg, #0f172a 0%, #020617 50%, #000000 100%)",
        px: 2,
      }}
    >
      <Card
        sx={{
          maxWidth: 420,
          width: "100%",
          backdropFilter: "blur(12px)",
          background: "rgba(255,255,255,0.08)",
          border: "1px solid rgba(255,255,255,0.12)",
          borderRadius: 4,
          boxShadow: "0 20px 40px rgba(0,0,0,0.4)",
        }}
      >
        <CardContent sx={{ p: 4 }}>
          <Typography
            variant="h5"
            textAlign="center"
            fontWeight={600}
            color="white"
            mb={1}
          >
            Welcome Back
          </Typography>

          <Typography
            variant="body2"
            textAlign="center"
            color="rgba(255,255,255,0.6)"
            mb={4}
          >
            Sign in to Annotation Studio
          </Typography>

          <Box component="form" onSubmit={handleLogin}>
            <TextField
              fullWidth
              label="Username"
              margin="normal"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              InputLabelProps={{ style: { color: "#cbd5f5" } }}
              InputProps={{ style: { color: "white" } }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  backgroundColor: "rgba(255,255,255,0.08)",
                },
              }}
            />

            <TextField
              fullWidth
              type="password"
              label="Password"
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              InputLabelProps={{ style: { color: "#cbd5f5" } }}
              InputProps={{ style: { color: "white" } }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  backgroundColor: "rgba(255,255,255,0.08)",
                },
              }}
            />

            {error && (
              <Alert severity="error" sx={{ mt: 2 }}>
                {error}
              </Alert>
            )}

            <Button
              type="submit"
              fullWidth
              size="large"
              sx={{
                mt: 3,
                py: 1.5,
                borderRadius: 2,
                fontWeight: 600,
                color: "black",
                background:
                  "linear-gradient(90deg, #3b82f6, #6366f1)",
                boxShadow: "0 10px 30px rgba(59,130,246,0.4)",
                "&:hover": {
                  background:
                    "linear-gradient(90deg, #2563eb, #4f46e5)",
                },
              }}
            >
              Sign In
            </Button>
          </Box>

          <Typography
            variant="body2"
            textAlign="center"
            color="rgba(255,255,255,0.6)"
            mt={3}
          >
            Don’t have an account?{" "}
            <span
              onClick={() => router.push("/register")}
              style={{
                color: "#60a5fa",
                cursor: "pointer",
                fontWeight: 500,
              }}
            >
              Register
            </span>
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}