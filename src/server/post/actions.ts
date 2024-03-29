"use server";

import { db } from "@/server/db";
import { auth } from "@clerk/nextjs";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { revalidatePath } from "next/cache";
import { authAction } from "../safe-action";
import { createPostFormSchema } from "./models";

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(10, "1 m"),
  analytics: true,
});

export const createPost = authAction(createPostFormSchema, async (input) => {
  const { userId } = auth();
  if (!userId) {
    throw new Error("You must be signed in to post.");
  }

  const { success } = await ratelimit.limit(userId);

  if (!success) {
    throw new Error("Rate limit exceeded");
  }
  await db.$transaction(async (db) => {
    await db.post.create({
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
  });
  revalidatePath("/");
});
