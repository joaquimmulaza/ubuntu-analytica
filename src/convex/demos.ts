import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { Doc } from "./_generated/dataModel";
import { QueryCtx, MutationCtx } from "./_generated/server";

// Função para adicionar um novo demo
export const add = mutation({
  args: {
    title: v.string(),
    description: v.string(),
    link: v.string(),
    imageUrls: v.array(v.string()),
  },
  handler: async (ctx: MutationCtx, args: { title: string, description: string, link: string, imageUrls: string[] }) => {
    const { title, description, link, imageUrls } = args;
    
    // Inserir o novo demo no banco de dados
    const id = await ctx.db.insert("demos", {
      title,
      description,
      link,
      imageUrls,
    });
    
    return id;
  },
});

export const getImageUrl = query({
  args: { storageId: v.string() },
  handler: async (ctx, args) => {
    return await ctx.storage.getUrl(args.storageId);
  },
});

// Função para listar todos os demos com os URLs das imagens
export const list = query({
  args: {},
  handler: async (ctx: QueryCtx) => {
    const demos = await ctx.db.query("demos").collect();
    
    // Mapeia os IDs de armazenamento para URLs completos
    return Promise.all(
      demos.map(async (demo) => {
        const imageUrls = await Promise.all(
          demo.imageUrls.map((idOrUrl) => {
            let storageId = null;
            if (typeof idOrUrl === 'string' && idOrUrl.startsWith("https://")) {
              try {
                const url = new URL(idOrUrl);
                const pathParts = url.pathname.split('/');
                storageId = pathParts[pathParts.length - 1];
              } catch (e) {
                return null;
              }
            } else {
              storageId = idOrUrl;
            }
            if (!storageId) return null;
            return ctx.storage.getUrl(storageId);
          })
        );
        return {
          ...demo,
          imageUrls: imageUrls.filter((url): url is string => url !== null),
          imageStorageIds: demo.imageUrls,
        };
      })
    );
  },
});

// Função para obter um demo específico por ID com os URLs das imagens
export const getById = query({
  args: {
    id: v.id("demos"),
  },
  handler: async (ctx: QueryCtx, args: { id: Doc<"demos">["_id"] }) => {
    const demo = await ctx.db.get(args.id);
    
    if (!demo) {
      return null;
    }
    
    // Mapeia os IDs de armazenamento para URLs completos
    const imageUrls = await Promise.all(
      demo.imageUrls.map((idOrUrl) => {
        let storageId = null;
        if (typeof idOrUrl === 'string' && idOrUrl.startsWith("https://")) {
          try {
            const url = new URL(idOrUrl);
            const pathParts = url.pathname.split('/');
            storageId = pathParts[pathParts.length - 1];
          } catch (e) {
            return null;
          }
        } else {
          storageId = idOrUrl;
        }
        if (!storageId) return null;
        return ctx.storage.getUrl(storageId);
      })
    );
    return {
      ...demo,
      imageUrls: imageUrls.filter((url): url is string => url !== null),
      imageStorageIds: demo.imageUrls,
    };
  },
});

// Função para atualizar um demo existente
export const update = mutation({
  args: {
    id: v.id("demos"),
    title: v.optional(v.string()),
    description: v.optional(v.string()),
    link: v.optional(v.string()),
    imageUrls: v.optional(v.array(v.string())),
  },
  handler: async (ctx: MutationCtx, args: { id: Doc<"demos">["_id"], title?: string, description?: string, link?: string, imageUrls?: string[] }) => {
    const { id, ...fields } = args;
    
    // Verificar se o demo existe
    const existingDemo = await ctx.db.get(id);
    if (!existingDemo) {
      throw new Error(`Demo com ID ${id} não encontrado`);
    }
    
    // Atualizar apenas os campos fornecidos
    await ctx.db.patch(id, fields);
    
    return id;
  },
});

// Função para excluir um demo
export const remove = mutation({
  args: {
    id: v.id("demos"),
  },
  handler: async (ctx: MutationCtx, args: { id: Doc<"demos">["_id"] }) => {
    const { id } = args;
    
    // Verificar se o demo existe
    const existingDemo = await ctx.db.get(id);
    if (!existingDemo) {
      throw new Error(`Demo com ID ${id} não encontrado`);
    }
    
    // Excluir o demo
    await ctx.db.delete(id);
    
    return id;
  },
});
