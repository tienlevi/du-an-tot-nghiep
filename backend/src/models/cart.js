import mongoose, { Schema } from "mongoose";

const product = new mongoose.Schema({
  name: { type: String },
  slug: { type: String, unique: true, default: "" },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Categories",
  },
  price: { type: Number, default: 0 },
  image: { type: String },
  gallery: { type: [String], default: [] },
  description: { type: String },
  discount: { type: Number, default: 0 },
  countInStock: { type: Number, default: 0 },
  featured: { type: Boolean, default: false },
  tags: { type: [String], default: [] },
  attributes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Attributes",
      default: [],
    },
  ],
});

const cartSchema = new mongoose.Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "Users",
    },
    products: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        product: product,
        quantity: { type: Number },
      },
    ],
  },
  { timestamps: true, versionKey: false }
);

const Cart = mongoose.model("Cart", cartSchema);

export default Cart;
