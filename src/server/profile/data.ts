import { clerkClient } from "@clerk/nextjs";

export const getOneByUsername = async (username: string) => {
  const [user] = await clerkClient.users.getUserList({
    username: [username],
  });

  if (!user) {
    throw new Error("User not found");
  }

  return user;
};

export const getOneById = async (userId: string) => {
  console.log("userId", userId);
  const [user] = await clerkClient.users.getUserList({
    userId: [userId],
  });

  if (!user) {
    throw new Error("User not found");
  }

  return user;
};
