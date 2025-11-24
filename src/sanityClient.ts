import { createClient } from "@sanity/client";
import imageUrlBuilder from '@sanity/image-url';

export const client = createClient({
  projectId: "dh053gvl",
  dataset: "production",
  useCdn: true, // Usa cache para ser mais rápido
  apiVersion: "2023-05-03",
});

const builder = imageUrlBuilder(client);

// Função auxiliar para processar imagens
export function urlFor(source: any) {
  return builder.image(source);
}