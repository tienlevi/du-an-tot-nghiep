import mongoose from "mongoose";

const variantSchema = new mongoose.Schema({
  color: { type: mongoose.Schema.Types.Mixed },
  size: { type: mongoose.Schema.Types.Mixed },
  stock: { type: Number },
  image: { type: String },
  imageUrlRef: { type: String },
});

const productSchema = new mongoose.Schema(
  {
    name: { type: String },
    category: {
      type: mongoose.Schema.Types.Mixed,
    },
    discount: { type: Number, default: 0, min: 0, max: 99 },
    price: { type: Number, default: 0 },
    variants: [variantSchema],
    description: { type: String },
    sold: { type: Number, default: 0 },
    tags: [
      {
        type: mongoose.Schema.Types.Mixed,
      },
    ],
  },
  { timestamps: true, versionKey: false }
);

export default mongoose.model("Product", productSchema);
