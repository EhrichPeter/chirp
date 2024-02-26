"use server";

import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { action } from "../safe-action";
import { auth } from "@clerk/nextjs";
import { db } from "@/server/db";
import { revalidatePath } from "next/cache";
import { createPostFormSchema } from "./models";

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(30, "1 m"),
  analytics: true,
});

export const createPost = action(createPostFormSchema, async (input) => {
  const { userId } = auth();
  if (!userId) {
    throw new Error("You must be signed in to post.");
  }

  const { success } = await ratelimit.limit(userId);

  if (!success) {
    throw new Error("Rate limit exceeded");
  }

  const post = await db.$transaction(async (db) => {
    const post = await db.post.create({
      data: {
        content: input.content,
        authorId: userId,
        replyToId: input.replyToId,
      },
    });

    if (input.replyToId) {
      await db.post.update({
        where: { id: input.replyToId },
        data: { replyCount: { increment: 1 } },
      });
    }

    return post;
  });
  revalidatePath("/post/" + post.id);
});
