import mongoose, { Schema } from "mongoose";

const reviewSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  rating: {
    type: Number,
    required: true,
  },
  content: {
    type: String,
  },
});

export default mongoose.model("Review", reviewSchema);
