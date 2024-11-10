import "dotenv/config";

export const envConfig = {
  PORT: process.env.PORT || 5000,
  JWT_SECRET: process.env.JWT_SECRET || "12345678hehe",
  DB_URL: process.env.DB_URL || "mongodb://localhost:27017/dev",
  FIREBASE: {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID,
    measurementId: process.env.FIREBASE_MEASUREMENT_ID,
  },
  VN_PAY_CONFIG: {
    vnpTmnCode: process.env.VNP_TMNCODE,
    vnp_HashSecret: process.env.VNP_HASHSECRET,
    vnp_Url: process.env.VNP_URL,
    vnp_Api: process.env.VNP_API,
    vnp_ReturnUrl: process.env.VNP_RETURNURL,
    urlSuccess: process.env.VNP_RETURNURL,
  },
};
