"use server";

import { db } from "@/server/db";
import { auth } from "@clerk/nextjs";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { revalidatePath } from "next/cache";
import { authAction } from "../safe-action";
import { likeToggleInputSchema } from "./models";

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(5, "1 m"),
  analytics: true,
});

export const toggleLike = authAction(likeToggleInputSchema, async (input) => {
  const { userId } = auth();

  if (!userId) {
    throw new Error("You must be logged in to chirp!");
  }

  const { success } = await ratelimit.limit(userId);

  if (!success) {
    throw new Error("Too many likes! Chirp again later.");
  }

  try {
    const isLiked = await db.$transaction(async (db) => {
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
        return false;
      } else {
        await db.like.create({
          data: { authorId: userId, postId: input.postId },
        });
        await db.post.update({
          where: { id: input.postId },
          data: { likeCount: { increment: 1 } },
        });
        return true;
      }
    });
    revalidatePath("/");
    return isLiked;
  } catch (error) {
    // Handle potential database errors more gracefully
    console.error("Error during like toggle:", error);
    throw new Error("Something went wrong. Please try again.");
  }
});
