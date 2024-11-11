import jwt from "jsonwebtoken";

export const generateToken = (user, key, expires) => {
  const secreteKey = key;
  return jwt.sign(user, secreteKey, { expiresIn: expires });
};
