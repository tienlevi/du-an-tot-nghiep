import mongoose from "mongoose";

const environment = process.env.NODE_ENV || "development";
const variantSchema = new mongoose.Schema({
  color:
    environment === "development"
      ? { type: mongoose.Schema.Types.Mixed }
      : { type: mongoose.Schema.Types.ObjectId, ref: "Color", required: true },
  size:
    environment === "development"
      ? { type: mongoose.Schema.Types.Mixed }
      : { type: mongoose.Schema.Types.ObjectId, ref: "Size", required: true },
  tags: [
    environment === "development"
      ? { type: mongoose.Schema.Types.Mixed }
      : { type: mongoose.Schema.Types.ObjectId, ref: "Tag", required: true },
  ],
  stock: { type: Number, required: true },
  image: { type: String, required: true },
  imageUrlRef: { type: String, required: true },
});

const productSchema = new mongoose.Schema(
  {
    name: { type: String },
    category:
      environment === "development"
        ? { type: mongoose.Schema.Types.Mixed }
        : {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Category",
          },
    discount: { type: Number, default: 0, min: 0, max: 99 },
    price: { type: Number, default: 0 },
    variants: [variantSchema],
    description: { type: String },
    sold: { type: Number, default: 0 },
    tags: [
      environment === "development"
        ? { type: mongoose.Schema.Types.Mixed }
        : {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Tag",
          },
    ],
  },
  { timestamps: true, versionKey: false }
);

export default mongoose.model("Product", productSchema);
