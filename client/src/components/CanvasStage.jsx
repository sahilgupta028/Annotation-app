"use client";

import { Stage, Layer, Rect, Transformer } from "react-konva";
import { useEffect, useRef, useState } from "react";
import api from "../lib/api";

import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Stack,
  Chip,
  Divider,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { toast } from "react-toast";

export default function CanvasStage() {
  const [rects, setRects] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [drawingRect, setDrawingRect] = useState(null);
  const router = useRouter();

  const trRef = useRef(null);
  const shapeRef = useRef(null);

  const selectedRect = rects.find((r) => r._id === selectedId);

  useEffect(() => {
    api.get("/annotations").then((res) => setRects(res.data));
  }, []);

  useEffect(() => {
    if (shapeRef.current && trRef.current) {
      trRef.current.nodes([shapeRef.current]);
      trRef.current.getLayer().batchDraw();
    }
  }, [selectedId]);

  const handleMouseDown = (e) => {
    if (e.target !== e.target.getStage()) return;
    const pos = e.target.getStage().getPointerPosition();
    setDrawingRect({ x: pos.x, y: pos.y, width: 0, height: 0 });
  };

  const handleMouseMove = (e) => {
    if (!drawingRect) return;
    const pos = e.target.getStage().getPointerPosition();
    setDrawingRect((prev) => ({
      ...prev,
      width: pos.x - prev.x,
      height: pos.y - prev.y,
    }));
  };

  const handleMouseUp = async () => {
    if (!drawingRect) return;
    const res = await api.post("/annotations", drawingRect);
    setRects((prev) => [...prev, res.data]);
    setDrawingRect(null);
  };

  const updateRect = async (id, attrs) => {
    setRects((prev) =>
      prev.map((r) => (r._id === id ? { ...r, ...attrs } : r))
    );
    await api.put(`/annotations/${id}`, attrs);
  };

  const deleteRect = async () => {
    if (!selectedId) return;
    await api.delete(`/annotations/${selectedId}`);
    setRects((prev) => prev.filter((r) => r._id !== selectedId));
    setSelectedId(null);
  };

  const logout = async () => {
    localStorage.clear();
    router.push('/');
    toast.success("User logout");
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg, #020617 0%, #020617 40%, #0f172a 100%)",
        p: 3,
        color: "white",
      }}
    >
      {/* Header */}
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
      >
        <Typography variant="h5" fontWeight={600}>
          ✨ Annotation Studio
        </Typography>

        <Button
          variant="contained"
          color="error"
          disabled={!selectedId}
          onClick={deleteRect}
          sx={{
            borderRadius: 2,
            textTransform: "none",
            boxShadow: selectedId
              ? "0 10px 30px rgba(239,68,68,0.35)"
              : "none",
          }}
        >
          Delete
        </Button>

        <Button
          variant="contained"
          color="success"
          onClick={logout}
          sx={{
            borderRadius: 2,
            textTransform: "none",
            boxShadow: selectedId
              ? "0 10px 30px rgba(239,68,68,0.35)"
              : "none",
          }}
        >
          Logout
        </Button>
      </Stack>

      {/* Layout */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "280px 1fr",
          gap: 3,
        }}
      >
        {/* Inspector */}
        <Card
          sx={{
            background: "rgba(255,255,255,0.08)",
            backdropFilter: "blur(14px)",
            border: "1px solid rgba(255,255,255,0.12)",
            borderRadius: 3,
          }}
        >
          <CardContent>
            <Typography variant="h6" mb={2} color="white">
              Inspector
            </Typography>

            {selectedRect ? (
              <Stack spacing={1.2} fontSize={14} color="rgba(255,255,255,0.8)">
                {["x", "y", "width", "height"].map((key) => (
                  <Stack
                    key={key}
                    direction="row"
                    justifyContent="space-between"
                  >
                    <span>{key.toUpperCase()}</span>
                    <span>{Math.round(selectedRect[key])}</span>
                  </Stack>
                ))}
              </Stack>
            ) : (
              <Typography variant="body2" color="rgba(255,255,255,0.4)">
                Select a rectangle to inspect
              </Typography>
            )}

            <Divider sx={{ my: 2, borderColor: "rgba(255,255,255,0.1)" }} />

            <Typography variant="caption" color="rgba(255,255,255,0.4)">
              • Drag to draw<br />
              • Click to select<br />
              • Resize with handles
            </Typography>
          </CardContent>
        </Card>

        {/* Canvas */}
        <Card
          sx={{
            position: "relative",
            background: "rgba(255,255,255,0.06)",
            backdropFilter: "blur(16px)",
            border: "1px solid rgba(255,255,255,0.12)",
            borderRadius: 3,
            p: 2,
          }}
        >
          <Chip
            label="Canvas"
            size="small"
            sx={{
              position: "absolute",
              top: 16,
              right: 16,
              background: "rgba(59,130,246,0.2)",
              color: "#93c5fd",
              border: "1px solid rgba(59,130,246,0.3)",
            }}
          />

          <Stage
            width={800}
            height={600}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
          >
            <Layer>
              {rects.map((rect) => (
                <Rect
                  key={rect._id}
                  {...rect}
                  draggable
                  ref={rect._id === selectedId ? shapeRef : null}
                  fill="rgba(99,102,241,0.35)"
                  stroke={rect._id === selectedId ? "#f87171" : "#c7d2fe"}
                  strokeWidth={2}
                  cornerRadius={6}
                  onClick={() => setSelectedId(rect._id)}
                  onDragEnd={(e) =>
                    updateRect(rect._id, {
                      x: e.target.x(),
                      y: e.target.y(),
                    })
                  }
                  onTransformEnd={(e) => {
                    const node = e.target;
                    const scaleX = node.scaleX();
                    const scaleY = node.scaleY();

                    updateRect(rect._id, {
                      x: node.x(),
                      y: node.y(),
                      width: Math.max(5, node.width() * scaleX),
                      height: Math.max(5, node.height() * scaleY),
                    });

                    node.scaleX(1);
                    node.scaleY(1);
                  }}
                />
              ))}

              {drawingRect && (
                <Rect
                  {...drawingRect}
                  stroke="#60a5fa"
                  dash={[8, 4]}
                  cornerRadius={6}
                />
              )}

              <Transformer
                ref={trRef}
                anchorSize={8}
                borderStroke="#f87171"
              />
            </Layer>
          </Stage>
        </Card>
      </Box>
    </Box>
  );
}