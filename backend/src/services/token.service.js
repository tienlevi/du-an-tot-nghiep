import jwt from "jsonwebtoken";

export const generateToken = (user, key, expires) => {
  const payload = user;
  const secretKey = key;
  return jwt.sign(payload, secretKey, { expiresIn: "300d" });
};
