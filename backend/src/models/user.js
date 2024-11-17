import mongoose, { Schema } from "mongoose";
import bcrypt from "bcryptjs";
import Cart from "./cart.js";
import { ROLE } from "../constants/role.js";

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 30,
    },
    phone: {
      type: String,
      default: "Chưa cập nhật",
    },
    role: {
      type: String,
      enum: Object.values(ROLE),
      default: ROLE.USER,
    },
    avatar: {
      type: String,
      default: "../upload/default-avatar.jpeg",
    },
    imageUrlRef: { type: String },
  },
  { timestamps: true, versionKey: false }
);

userSchema.pre("save", async function (next) {
  if (this.isNew || this.isModified("password")) {
    await Cart.create({ userId: this._id });
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }
  next();
});

userSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

export default mongoose.model("User", userSchema);
