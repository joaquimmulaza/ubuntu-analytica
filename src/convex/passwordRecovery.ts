"use node";
import { action } from "./_generated/server";
import { v } from "convex/values";
import { api } from "./_generated/api";
import crypto from "crypto";
import { Resend } from "resend";

/**
 * Gera um token de reset de senha seguro e envia email para o usuário
 */
export const requestPasswordReset = action({
    args: {
        email: v.string(),
    },
    handler: async (ctx, { email }) => {
        // Buscar usuário por email
        const user = await ctx.runQuery(api.passwordRecoveryQueries.getUserByEmail, { email });

        if (!user) {
            // Por segurança, não revelamos se o email existe ou não
            console.log(`Password reset requested for non-existent email: ${email}`);
            return { success: true, message: "Se o email existir, você receberá instruções para redefinir sua senha." };
        }

        // Gerar token seguro
        const resetToken = crypto.randomBytes(32).toString("hex");
        const resetTokenExpiry = Date.now() + 3600000; // 1 hora

        // Salvar token no banco de dados
        await ctx.runMutation(api.passwordRecoveryQueries.saveResetToken, {
            userId: user._id,
            resetToken,
            resetTokenExpiry,
        });

        // Enviar email com o token
        const resendApiKey = process.env.RESEND_API_KEY;
        if (!resendApiKey) {
            throw new Error("RESEND_API_KEY não configurada");
        }

        const resend = new Resend(resendApiKey);

        // URL de reset (ajuste conforme seu domínio)
        const resetUrl = `${process.env.APP_URL || "http://localhost:3000"}/reset-password?token=${resetToken}`;

        try {
            await resend.emails.send({
                from: "Ubuntu Analytica <noreply@ubuntuanalytica.ao>",
                to: email,
                subject: "Recuperação de Senha - Ubuntu Analytica",
                html: `
          <!DOCTYPE html>
          <html>
            <head>
              <meta charset="utf-8">
              <style>
                body {
                  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                  line-height: 1.6;
                  color: #333;
                  max-width: 600px;
                  margin: 0 auto;
                  padding: 20px;
                }
                .container {
                  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                  border-radius: 10px;
                  padding: 30px;
                  color: white;
                }
                .content {
                  background: white;
                  color: #333;
                  padding: 30px;
                  border-radius: 8px;
                  margin-top: 20px;
                }
                .button {
                  display: inline-block;
                  padding: 15px 30px;
                  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                  color: white;
                  text-decoration: none;
                  border-radius: 5px;
                  font-weight: bold;
                  margin: 20px 0;
                }
                .footer {
                  margin-top: 20px;
                  font-size: 12px;
                  color: #666;
                  text-align: center;
                }
              </style>
            </head>
            <body>
              <div class="container">
                <h1>🔐 Recuperação de Senha</h1>
                <div class="content">
                  <p>Olá,</p>
                  <p>Recebemos uma solicitação para redefinir a senha da sua conta no painel administrativo da Ubuntu Analytica.</p>
                  <p>Clique no botão abaixo para criar uma nova senha:</p>
                  <center>
                    <a href="${resetUrl}" class="button">Redefinir Senha</a>
                  </center>
                  <p>Ou copie e cole este link no seu navegador:</p>
                  <p style="word-break: break-all; color: #667eea;">${resetUrl}</p>
                  <p><strong>Este link expira em 1 hora.</strong></p>
                  <p>Se você não solicitou esta redefinição de senha, ignore este email. Sua senha permanecerá inalterada.</p>
                </div>
                <div class="footer">
                  <p>© ${new Date().getFullYear()} Ubuntu Analytica. Todos os direitos reservados.</p>
                  <p>Este é um email automático, por favor não responda.</p>
                </div>
              </div>
            </body>
          </html>
        `,
            });

            console.log(`Password reset email sent to: ${email}`);
        } catch (error) {
            console.error("Error sending email:", error);
            throw new Error("Erro ao enviar email de recuperação. Tente novamente mais tarde.");
        }

        return {
            success: true,
            message: "Se o email existir, você receberá instruções para redefinir sua senha."
        };
    },
});

/**
 * Valida o token e redefine a senha
 */
export const resetPasswordWithToken = action({
    args: {
        token: v.string(),
        newPassword: v.string(),
    },
    handler: async (ctx, { token, newPassword }) => {
        // Buscar usuário pelo token
        const user = await ctx.runQuery(api.passwordRecoveryQueries.getUserByResetToken, { token });

        if (!user) {
            throw new Error("Token inválido ou expirado");
        }

        // Verificar se o token expirou
        if (!user.resetTokenExpiry || user.resetTokenExpiry < Date.now()) {
            throw new Error("Token expirado. Solicite uma nova recuperação de senha.");
        }

        // Hash da nova senha
        const bcrypt = require("bcryptjs");
        const newPasswordHash = await bcrypt.hash(newPassword, 10);

        // Atualizar senha e limpar token
        await ctx.runMutation(api.passwordRecoveryQueries.updatePasswordAndClearToken, {
            userId: user._id,
            newPasswordHash,
        });

        return {
            success: true,
            message: "Senha redefinida com sucesso! Você já pode fazer login."
        };
    },
});
