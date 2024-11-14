import jwt from "jsonwebtoken";

export const generateToken = (user, key, expires) => {
  const payload = { userId: user._id, role: user.role };
  const secretKey = key;
  return jwt.sign(payload, secretKey, { expiresIn: expires });
};
