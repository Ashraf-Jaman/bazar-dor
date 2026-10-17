
import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";

const mongoUrl = process.env.MONGODB_AUTH_URL;

if (!mongoUrl) {
  throw new Error(
    "MONGODB_AUTH_URL is missing. Check your root .env file."
  );
}

const client = new MongoClient(mongoUrl);
const db = client.db("bazar-dor");

export const auth = betterAuth({
  baseURL: process.env.BETTER_AUTH_URL || "http://localhost:3000", "https://bazar-dor-five-theta.vercel.app",

  secret: process.env.BETTER_AUTH_SECRET,

  database: mongodbAdapter(db, {
    client,
  }),

  emailAndPassword: {
    enabled: true,
    minPasswordLength: 8,
    maxPasswordLength: 128,
  },

  socialProviders: {
    ...(process.env.GOOGLE_CLIENT_ID &&
    process.env.GOOGLE_CLIENT_SECRET
      ? {
          google: {
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
          },
        }
      : {}),

    ...(process.env.GITHUB_CLIENT_ID &&
    process.env.GITHUB_CLIENT_SECRET
      ? {
          github: {
            clientId: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET,
          },
        }
      : {}),
  },

  trustedOrigins: [
    process.env.BETTER_AUTH_URL || "http://localhost:3000",
  ],
});
