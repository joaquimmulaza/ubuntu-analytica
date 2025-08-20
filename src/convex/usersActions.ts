"use node";
import { action } from "./_generated/server";
import bcrypt from "bcryptjs";
import { v } from "convex/values";
import { api } from "./_generated/api";

export const createUserAction = action({
  args: {
    username: v.string(),
    password: v.string(),
  },
  handler: async (ctx, { username, password }) => {
    // Hash da senha usando bcrypt (biblioteca Node.js)
    const passwordHash = await bcrypt.hash(password, 10);
    
    // Chama a mutation para criar o usuário
    await ctx.runMutation(api.users.createUser, {
      username,
      passwordHash,
    });
  },
});