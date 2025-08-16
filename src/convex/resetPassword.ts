"use node";
import { action } from "./_generated/server";
import bcrypt from "bcryptjs";
import { v } from "convex/values";

export const resetPassword = action({
  args: {
    password: v.string(),
  },
  handler: async (ctx, { password }) => {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    console.log("New password hash:", hash);
    return hash;
  },
});
