import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  demos: defineTable({
    title: v.optional(v.string()),
    description: v.string(),
    link: v.string(),
    imageUrls: v.array(v.string()),
  }),
  users: defineTable({
    username: v.string(),
    passwordHash: v.string(),
    email: v.optional(v.string()),
    resetToken: v.optional(v.string()),
    resetTokenExpiry: v.optional(v.number()),
  })
    .index("by_username", ["username"])
    .index("by_email", ["email"])
    .index("by_resetToken", ["resetToken"]),
});
