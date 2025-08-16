import { mutation } from "./_generated/server";
import { v } from "convex/values";
import { MutationCtx } from "./_generated/server";

// Função para gerar URLs de upload para imagens
export const generateUploadUrl = mutation({
  args: {},
  handler: async (ctx: MutationCtx) => {
    // Gerar uma URL de upload para o Convex Storage
    return await ctx.storage.generateUploadUrl();
  },
});
