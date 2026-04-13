"use node";

import { action } from "./_generated/server";
import { v } from "convex/values";
import { Resend } from "resend";

export const sendCareerApplication = action({
  args: {
    name: v.string(),
    email: v.string(),
    phone: v.string(),
    portfolio: v.optional(v.string()),
    position: v.string(),
    message: v.optional(v.string()),
    cvStorageId: v.string(),
  },
  handler: async (ctx, args) => {
    const resendApiKey = process.env.RESEND_API_KEY;
    if (!resendApiKey) {
      throw new Error("RESEND_API_KEY environment variable not set in Convex");
    }

    const resend = new Resend(resendApiKey);

    // Get CV URL from Convex Storage
    const cvUrl = await ctx.storage.getUrl(args.cvStorageId);
    if (!cvUrl) {
      throw new Error("Failed to generate CV download URL");
    }

    // Determine recipient based on environment
    // In Convex, NODE_ENV is "production" for production deployments
    const isProduction = process.env.NODE_ENV === "production";
    const toEmail = isProduction 
      ? "recursoshumanos@ubuntuanalytica.ao" 
      : "joaquimmulazadev@gmail.com";

    const subject = `Nova Candidatura - ${args.position} - ${args.name}`;
    
    try {
      await resend.emails.send({
        from: "Ubuntu Analytica <noreply@ubuntuanalytica.ao>",
        to: toEmail,
        subject: subject,
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
            <h2 style="color: #3f45ff; border-bottom: 2px solid #3f45ff; padding-bottom: 10px;">Nova Candidatura Recebida</h2>
            <p style="margin: 15px 0;"><strong>Nome Completo:</strong> ${args.name}</p>
            <p style="margin: 15px 0;"><strong>Email:</strong> ${args.email}</p>
            <p style="margin: 15px 0;"><strong>Telefone:</strong> ${args.phone}</p>
            <p style="margin: 15px 0;"><strong>Posição:</strong> ${args.position}</p>
            <p style="margin: 15px 0;"><strong>LinkedIn / Portfólio:</strong> ${args.portfolio ? `<a href="${args.portfolio}">${args.portfolio}</a>` : "Não fornecido"}</p>
            
            <div style="margin-top: 20px; padding: 15px; background-color: #f9f9f9; border-radius: 5px;">
              <p style="margin-top: 0;"><strong>Mensagem / Carta de Motivação:</strong></p>
              <p style="white-space: pre-wrap; font-style: italic;">${args.message || "Sem mensagem adicional."}</p>
            </div>
            
            <div style="margin-top: 30px; text-align: center;">
              <p>O Curriculum Vitae está disponível para download abaixo:</p>
              <a href="${cvUrl}" style="display: inline-block; background-color: #3f45ff; color: white; padding: 12px 25px; text-decoration: none; border-radius: 5px; font-weight: bold; box-shadow: 0 4px 6px rgba(63, 69, 255, 0.2);">
                📄 Baixar Curriculum Vitae
              </a>
            </div>
            
            <hr style="margin-top: 40px; border: none; border-top: 1px dashed #ccc;" />
            <p style="font-size: 12px; color: #666; text-align: center;">
              Este é um aviso automático gerado pelo sistema de carreiras da Ubuntu Analytica.<br/>
              Ambiente: ${isProduction ? "Produção" : "Desenvolvimento"}
            </p>
          </div>
        `,
      });

      return { success: true };
    } catch (error) {
      console.error("Resend Error:", error);
      throw new Error(`Erro ao enviar e-mail: ${error instanceof Error ? error.message : String(error)}`);
    }
  },
});
