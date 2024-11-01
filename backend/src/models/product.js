import mongoose from "mongoose";
// import mongoosePaginate from "mongoose-paginate-v2";

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, unique: true, default: "" },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    price: { type: Number, required: true, default: 0 },
    image: { type: String },
    gallery: { type: [String], default: [] },
    description: { type: String },
    discount: { type: Number, default: 0 },
    countInStock: { type: Number, default: 0 },
    featured: { type: Boolean, default: false },
    tags: { type: [String], default: [] },
    attributes: {
      size: {
        type: [String],
        required: true,
      },
      color: [
        {
          name: { type: String, required: true },
          image: { type: String, required: true },
        },
      ],
    },
  },
  { timestamps: true, versionKey: false }
);

// productSchema.plugin(mongoosePaginate);
export default mongoose.model("products", productSchema);
