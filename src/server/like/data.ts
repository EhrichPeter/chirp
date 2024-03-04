import { db } from "../db";

export const getLikeCountByUserId = async (userId: string) => {
  return db.like.count({
    where: {
      authorId: userId,
    },
  });
};
