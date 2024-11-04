import mongoose from "mongoose";

const variantSchema = new mongoose.Schema({
  price: { type: Number, required: true },
  color: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Color" },
  size: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Size" },
  stock: { type: Number, required: true },
  sold: { type: Number, default: 0 },
  discount: { type: Number, default: 0 },
  image: { type: String, required: true },
});

export default mongoose.model("variants", variantSchema);
