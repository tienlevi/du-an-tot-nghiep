import mongoose from "mongoose";

const variantSchema = new mongoose.Schema({
  color: { type: mongoose.Schema.Types.Mixed },
  size: { type: mongoose.Schema.Types.Mixed },
  stock: { type: Number },
  sold: { type: Number, default: 0 },
  image: { type: String },
  imageUrlRef: { type: String },
});

const productSchema = new mongoose.Schema(
  {
    name: { type: String },
    category: {
      type: mongoose.Schema.Types.Mixed,
    },
    price: { type: Number, default: 0 },
    variants: [variantSchema],
    description: { type: String },
    tags: [
      {
        type: mongoose.Schema.Types.Mixed,
      },
    ],
  },
  { timestamps: true, versionKey: false }
);

export default mongoose.model("Product", productSchema);
