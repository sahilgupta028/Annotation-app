"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "../../lib/api";

import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
  Alert,
} from "@mui/material";

export default function RegisterPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await api.post("/auth/register", { username, password });
      router.push("/");
      toast.success("User registered. Login...");
    } catch {
      setError("Registration failed. Username may already exist.");
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
          "linear-gradient(135deg, #020617 0%, #020617 40%, #0f172a 100%)",
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
            Create Account
          </Typography>

          <Typography
            variant="body2"
            textAlign="center"
            color="rgba(255,255,255,0.6)"
            mb={4}
          >
            Join Annotation Studio
          </Typography>

          <Box component="form" onSubmit={handleRegister}>
            <TextField
              fullWidth
              label="Username"
              margin="normal"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              InputLabelProps={{ style: { color: "#cbd5f5" } }}
              InputProps={{
                style: { color: "white" },
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  backgroundColor: "rgba(255,255,255,0.08)",
                },
              }}
              required
            />

            <TextField
              fullWidth
              type="password"
              label="Password"
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              InputLabelProps={{ style: { color: "#cbd5f5" } }}
              InputProps={{
                style: { color: "white" },
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  backgroundColor: "rgba(255,255,255,0.08)",
                },
              }}
              required
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
                color: "white",
                background:
                  "linear-gradient(90deg, #22c55e, #16a34a)",
                boxShadow: "0 10px 30px rgba(34,197,94,0.35)",
                "&:hover": {
                  background:
                    "linear-gradient(90deg, #16a34a, #15803d)",
                },
              }}
            >
              Register
            </Button>
          </Box>

          <Typography
            variant="body2"
            textAlign="center"
            color="rgba(255,255,255,0.6)"
            mt={3}
          >
            Already have an account?{" "}
            <span
              onClick={() => router.push("/")}
              style={{
                color: "#60a5fa",
                cursor: "pointer",
                fontWeight: 500,
              }}
            >
              Login
            </span>
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}