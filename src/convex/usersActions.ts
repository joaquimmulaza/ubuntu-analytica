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

/**
 * Adiciona ou atualiza o email de um usuário existente
 * Use este script para adicionar emails aos usuários que foram criados antes da implementação
 * do sistema de recuperação de senha
 * 
 * Exemplo de uso no Convex Dashboard:
 * await action("usersActions.addEmailToUserAction", { 
 *   username: "admin", 
 *   email: "admin@ubuntuanalytica.ao" 
 * });
 */
export const addEmailToUserAction = action({
  args: {
    username: v.string(),
    email: v.string(),
  },
  handler: async (ctx, { username, email }) => {
    // Validar formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw new Error("Formato de email inválido");
    }

    // Buscar usuário por username
    const user = await ctx.runQuery(api.auth.getUserByUsername, { username });

    if (!user) {
      throw new Error(`Usuário '${username}' não encontrado`);
    }

    // Verificar se o email já está em uso por outro usuário
    const existingUserWithEmail = await ctx.runQuery(api.passwordRecoveryQueries.getUserByEmail, { email });

    if (existingUserWithEmail && existingUserWithEmail._id !== user._id) {
      throw new Error(`Email '${email}' já está em uso por outro usuário`);
    }

    // Atualizar email do usuário via mutation
    await ctx.runMutation(api.passwordRecoveryQueries.updateUserEmail, {
      userId: user._id,
      email,
    });

    return {
      success: true,
      message: `Email '${email}' adicionado ao usuário '${username}' com sucesso`
    };
  },
});
