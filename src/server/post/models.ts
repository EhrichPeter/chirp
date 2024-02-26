import { z } from "zod";

export const postSchema = z.object({
  id: z.string().uuid(),
  content: z.string(),
  authorId: z.string(),
  createdAt: z.date(),
  updatedAt: z.date().optional(),
  replyCount: z.number(),
  replyToId: z.string().uuid().nullable(),
  likeCount: z.number(),
});

export const postCreateInputSchema = z.object({
  content: z.string().emoji().min(1).max(280),
  replyToId: z.string().uuid().optional(),
});

export const postGetAllOutputSchema = z.array(
  z.object({
    post: postSchema,
    author: z.object({
      id: z.string(),
      firstName: z.string().nullable(),
      lastName: z.string().nullable(),
      emailAddresses: z.array(
        z.object({ id: z.string(), emailAddress: z.string() }),
      ),
      username: z.string().nullable(),
      imageUrl: z.string(),
    }),
  }),
);

export const postGetByUserIdInputSchema = z.object({
  userId: z.string(),
});

export const postGetByIdInputSchema = z.object({
  postId: z.string().uuid(),
});

export const postGetRepliesByPostIdInputSchema = z.object({
  postId: z.string().uuid(),
});

export const createPostFormSchema = z.object({
  content: z.string().min(1).max(280).emoji(),
  replyToId: z.string().optional(),
});
