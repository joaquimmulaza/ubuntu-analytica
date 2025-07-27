"use node";
import { action } from "./_generated/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { v } from "convex/values";

export const login = action({
  args: {
    username: v.string(),
    password: v.string(),
  },
  handler: async (ctx, { username, password }) => {
    const adminUsername = process.env.ADMIN_USERNAME;
    const adminPasswordHash = process.env.ADMIN_PASSWORD_HASH;
    const jwtSecret = process.env.JWT_SECRET;

    if (!adminUsername || !adminPasswordHash || !jwtSecret) {
      throw new Error("Environment variables not set");
    }

    if (username !== adminUsername) {
      throw new Error("Invalid credentials");
    }

    const isPasswordCorrect = await bcrypt.compare(password, adminPasswordHash);
    if (!isPasswordCorrect) {
      throw new Error("Invalid credentials");
    }

    const token = jwt.sign({ username }, jwtSecret, { expiresIn: "8h" });
    return token;
  },
});
