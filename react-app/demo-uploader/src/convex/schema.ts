import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  demos: defineTable({
    title: v.optional(v.string()),
    description: v.string(),
    link: v.string(),
    imageUrls: v.array(v.string()),
  }),
});
