import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

/**
 * Busca usuário por email
 */
export const getUserByEmail = query({
    args: { email: v.string() },
    handler: async (ctx, { email }) => {
        return await ctx.db
            .query("users")
            .withIndex("by_email", (q) => q.eq("email", email))
            .unique();
    },
});

/**
 * Busca usuário por token de reset
 */
export const getUserByResetToken = query({
    args: { token: v.string() },
    handler: async (ctx, { token }) => {
        return await ctx.db
            .query("users")
            .withIndex("by_resetToken", (q) => q.eq("resetToken", token))
            .unique();
    },
});

/**
 * Salva o token de reset no usuário
 */
export const saveResetToken = mutation({
    args: {
        userId: v.id("users"),
        resetToken: v.string(),
        resetTokenExpiry: v.number(),
    },
    handler: async (ctx, { userId, resetToken, resetTokenExpiry }) => {
        await ctx.db.patch(userId, {
            resetToken,
            resetTokenExpiry,
        });
    },
});

/**
 * Atualiza a senha e limpa o token de reset
 */
export const updatePasswordAndClearToken = mutation({
    args: {
        userId: v.id("users"),
        newPasswordHash: v.string(),
    },
    handler: async (ctx, { userId, newPasswordHash }) => {
        await ctx.db.patch(userId, {
            passwordHash: newPasswordHash,
            resetToken: undefined,
            resetTokenExpiry: undefined,
        });
    },
});

/**
 * Atualiza o email de um usuário
 * Usado pelo script de migração para adicionar emails aos usuários existentes
 */
export const updateUserEmail = mutation({
    args: {
        userId: v.id("users"),
        email: v.string(),
    },
    handler: async (ctx, { userId, email }) => {
        await ctx.db.patch(userId, {
            email,
        });
    },
});
