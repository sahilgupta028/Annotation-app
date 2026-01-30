import express from "express";
import Annotation from "../models/Annotations.js";
import authMiddleware from "../middleware/authmiddleware.js";

const router = express.Router();

/**
 * CREATE annotation
 */
router.post("/", authMiddleware, async (req, res) => {
  try {
    const newAnnotation = await Annotation.create({
      x: req.body.x,
      y: req.body.y,
      width: req.body.width,
      height: req.body.height,
      userId: req.user.id,
    });

    res.status(201).json(newAnnotation);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

/**
 * GET all annotations for logged-in user
 */
router.get("/", authMiddleware, async (req, res) => {
  try {
    const annotations = await Annotation.find({
      userId: req.user.id,
    });

    res.json(annotations);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/**
 * GET annotation by ID
 */
router.get("/:id", authMiddleware, async (req, res) => {
  try {
    const annotation = await Annotation.findOne({
      _id: req.params.id,
      userId: req.user.id,
    });

    if (!annotation) {
      return res.status(404).json({ message: "Annotation not found" });
    }

    res.json(annotation);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

/**
 * UPDATE annotation
 */
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const updatedAnnotation = await Annotation.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      {
        x: req.body.x,
        y: req.body.y,
        width: req.body.width,
        height: req.body.height,
      },
      { new: true }
    );

    if (!updatedAnnotation) {
      return res.status(404).json({ message: "Annotation not found" });
    }

    res.json(updatedAnnotation);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

/**
 * DELETE annotation
 */
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const deleted = await Annotation.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id,
    });

    if (!deleted) {
      return res.status(404).json({ message: "Annotation not found" });
    }

    res.json({ message: "Annotation deleted" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

export default router;