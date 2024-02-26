import { auth, clerkClient } from "@clerk/nextjs";
import { db } from "../db";

export const getManyByUserId = async (userId: string) => {
  return await db.post.findMany({
    where: { authorId: userId },
    orderBy: { createdAt: "desc" },
    include: {
      likes: {
        where: {
          authorId: userId,
        },
      },
    },
  });
};

export const getOneById = async (postId: string) => {
  const { userId } = auth();

  const post = await db.post.findUnique({
    where: { id: postId },
    include: {
      likes: {
        where: {
          authorId: userId ?? undefined,
        },
      },
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
  const { userId } = auth();

  try {
    const replies = await db.post.findMany({
      where: { replyToId: postId },
      orderBy: { createdAt: "desc" },
      include: {
        likes: {
          where: {
            authorId: userId ?? undefined,
          },
        },
      },
    });

    const userIds = replies.map((reply) => reply.authorId);
    const users = await clerkClient.users.getUserList({ userId: userIds });

    const repliesWithUsers = replies.map((reply) => {
      const author = users.find((user) => user.id === reply.authorId);
      if (!author) {
        throw new Error("Author not found for reply.");
      }

      return {
        post: reply,
        author,
      };
    });

    return repliesWithUsers;
  } catch (error) {
    console.error("Error in getManyRepliesByPostId:", error);
    throw new Error("Failed to retrieve replies.");
  }
};

export const getManyPosts = async () => {
  const { userId } = auth();

  try {
    const posts = await db.post.findMany({
      orderBy: { createdAt: "desc" },
      take: 100,
      where: { replyToId: null },
      include: {
        likes: {
          where: {
            authorId: userId ?? undefined,
          },
        },
      },
    });

    const userIds = posts.map((post) => post.authorId);
    const users = await clerkClient.users.getUserList({
      userId: userIds,
      limit: 100,
    });

    return posts.map((post) => {
      const author = users.find((user) => user.id === post.authorId);
      if (!author) {
        throw new Error("Author not found for post.");
      }

      return {
        post,
        author,
      };
    });
  } catch (error) {
    console.error("Error in getManyPosts:", error);
    throw new Error("Failed to retrieve posts.");
  }
};
