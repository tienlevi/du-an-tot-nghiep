import mongoose, { Schema } from "mongoose";
import bcrypt from "bcryptjs";
import { ROLE } from "../constants/role";

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
    role: {
      type: String,
      enum: Object.values(ROLE),
      default: ROLE.USER,
    },
    avatar: {
      type: String,
      default: "../upload/default-avatar.jpeg",
    },
  },
  { timestamps: true, versionKey: false }
);

UserSchema.pre("save", async function (next) {
  if (this.isNew || this.isModified("password")) {
    await mongoose.model("Cart").create({ userId: this._id });
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }
  next();
});

export default mongoose.model("User", userSchema);
