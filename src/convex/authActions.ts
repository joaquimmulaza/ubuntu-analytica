"use node";
import { action } from "./_generated/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { v } from "convex/values";
import { api } from "./_generated/api";
import { Id } from "./_generated/dataModel";

export const login = action({
  args: {
    username: v.string(),
    password: v.string(),
  },
  handler: async (ctx, { username, password }): Promise<string> => {
    const user = await ctx.runQuery(api.auth.getUserByUsername, { username });

    if (!user) {
      throw new Error("Invalid credentials");
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.passwordHash);
    if (!isPasswordCorrect) {
      throw new Error("Invalid credentials");
    }

    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      throw new Error("Environment variable JWT_SECRET not set");
    }

    const token = jwt.sign({ userId: user._id }, jwtSecret, { expiresIn: "8h" });
    return token;
  },
});

export const changePasswordAction = action({
  args: {
    token: v.string(),
    currentPassword: v.string(),
    newPassword: v.string(),
    confirmNewPassword: v.string(),
  },
  handler: async (ctx, { token, currentPassword, newPassword, confirmNewPassword }) => {
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      throw new Error("Environment variable JWT_SECRET not set");
    }

    let decoded;
    try {
      decoded = jwt.verify(token, jwtSecret) as { userId: string };
    } catch (error: any) {
      if (error.name === "TokenExpiredError") {
        throw new Error("Token expired");
      }
      throw new Error("Invalid token");
    }


    // ✅ Cast direto para Id<"users"> - o JWT já contém um ID válido
    const userId = decoded.userId as Id<"users">;

    // ✅ Use o userId convertido
    const user = await ctx.runQuery(api.auth.getUserById, { userId });

    if (!user) {
      throw new Error("User not found");
    }

    const isPasswordCorrect = await bcrypt.compare(currentPassword, user.passwordHash);
    if (!isPasswordCorrect) {
      throw new Error("Invalid current password");
    }

    if (newPassword !== confirmNewPassword) {
      throw new Error("New passwords do not match");
    }

    const newPasswordHash = await bcrypt.hash(newPassword, 10);

    await ctx.runMutation(api.auth.changePassword, { 
      userId: user._id, 
      passwordHash: newPasswordHash 
    });
  },
});