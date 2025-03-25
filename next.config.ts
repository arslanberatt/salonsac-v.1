import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false,
};

module.exports = {
  env: {
    APPWRITE_ENDPOINT: process.env.APPWRITE_ENDPOINT,
    APPWRITE_PROJECT: process.env.APPWRITE_PROJECT,
    DATABASE_ID: process.env.DATABASE_ID,
    USER_COLLECTION_ID: process.env.USER_COLLECTION_ID,
    CUSTOMER_COLLECTION_ID: process.env.CUSTOMER_COLLECTION_ID,
  },
};

export default nextConfig;
