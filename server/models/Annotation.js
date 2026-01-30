import mongoose from "mongoose";

const annotationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    x: Number,
    y: Number,
    width: Number,
    height: Number
  },
  { timestamps: true }
);

export default mongoose.model("Annotation", annotationSchema);