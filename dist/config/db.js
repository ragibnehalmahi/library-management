"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PORT = exports.MONGO_URI = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.MONGO_URI = process.env.MONGODB_URI;
exports.PORT = process.env.PORT || 5000;
if (!exports.MONGO_URI) {
    throw new Error("MONGODB_URI must be defined in environment variables");
}
