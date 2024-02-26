"use server";

import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { db } from "@/server/db";
import { action } from "../safe-action";
import { likeToggleInputSchema } from "./models";
import { auth } from "@clerk/nextjs";

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(30, "1 m"),
  analytics: true,
});

export const toggleLike = action(likeToggleInputSchema, async (input) => {
  const { userId } = auth();

  if (!userId) {
    throw new Error("You must be logged in to like a post.");
  }

  const { success } = await ratelimit.limit(userId);

  if (!success) {
    throw new Error("Too many like attempts. Please try again later.");
  }

  try {
    await db.$transaction(async (db) => {
      const existingLike = await db.like.findFirst({
        where: {
          authorId: userId,
          postId: input.postId,
        },
      });

      if (existingLike) {
        await db.like.delete({ where: { id: existingLike.id } });
        await db.post.update({
          where: { id: input.postId },
          data: { likeCount: { decrement: 1 } },
        });
      } else {
        await db.like.create({
          data: { authorId: userId, postId: input.postId },
        });
        await db.post.update({
          where: { id: input.postId },
          data: { likeCount: { increment: 1 } },
        });
      }
    });
  } catch (error) {
    // Handle potential database errors more gracefully
    console.error("Error during like toggle:", error);
    throw new Error("Something went wrong. Please try again.");
  }
});
