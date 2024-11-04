import "dotenv/config";

export const envConfig = {
  PORT: process.env.PORT || 5000,
  MONGODB_URI: process.env.MONGODB_URI || "mongodb://localhost:27017/ecommerce",
  JWT_SECRET: process.env,
};
