import mongoose from "mongoose";
// import mongoosePaginate from "mongoose-paginate-v2";

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    costPrice: { type: Number, required: true, default: 0 },
    variants: { type: [variantSchema], required: true },
    description: { type: String },
    tags: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Tag",
      },
    ],
  },
  { timestamps: true, versionKey: false }
);

// productSchema.plugin(mongoosePaginate);
export default mongoose.model("products", productSchema);
