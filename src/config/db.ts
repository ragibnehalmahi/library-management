import dotenv from "dotenv";
dotenv.config();

export const MONGO_URI = process.env.MONGODB_URI as string;
export const PORT = process.env.PORT || 5000;

if (!MONGO_URI) {
    throw new Error("MONGODB_URI must be defined in environment variables");
}