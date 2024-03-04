"use server";

import { clerkClient } from "@clerk/nextjs";
import { Prisma } from "@prisma/client";
import { db } from "../db";

export const getCommentCountByUserId = async (userId: string) => {
  return getCountByCondition({
    authorId: userId,
    replyToId: { not: null },
  });
};

export const getCommentCountByPostId = async (postId: string) => {
  return getCountByCondition({ id: postId, replyToId: { not: null } });
};

export const getPostCountByUserId = async (userId: string) => {
  return getCountByCondition({ authorId: userId, replyToId: null });
};

export const getManyByUserId = async (userId: string) => {
  return await getMany({ where: { authorId: userId } });
};

export const getOneById = async (postId: string) => {
  const post = await db.post.findUnique({
    where: { id: postId },
    include: {
      likes: true,
    },
  });

  if (!post) {
    throw new Error("Post not found.");
  }

  const [user] = await clerkClient.users.getUserList({
    userId: [post.authorId],
  });

  if (!user) {
    throw new Error("User not found for post.");
  }

  return { post, user };
};

export const getManyRepliesByPostId = async (postId: string) => {
  return await getMany({ where: { replyToId: postId } });
};

export const getManyPosts = async () => {
  return await getMany({ where: { replyToId: null } });
};

const getMany = async (inputParams: {
  take?: number;
  where: Prisma.PostWhereInput;
}) => {
  try {
    const posts = await db.post.findMany({
      orderBy: { createdAt: "desc" },
      take: inputParams.take ?? 10,
      where: inputParams.where,
      include: {
        likes: true,
      },
    });

    const userIds = posts.map((post) => post.authorId);
    const users = await clerkClient.users.getUserList({ userId: userIds });

    const postsWithUsers = posts.map((post) => {
      const author = users.find((user) => user.id === post.authorId);
      if (!author) {
        throw new Error("Author not found for reply.");
      }

      return {
        post,
        author,
      };
    });

    return postsWithUsers;
  } catch (error) {
    console.error("Error in getManyPosts:", error);
    throw new Error("Failed to retrieve posts.");
  }
};

export const getCountByCondition = async (condition: Prisma.PostWhereInput) => {
  return db.post.count({
    where: condition,
  });
};
