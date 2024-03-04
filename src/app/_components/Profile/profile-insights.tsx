import { getLikeCountByUserId } from "@/server/like/data";
import { getCommentCountByUserId, getPostCountByUserId } from "@/server/post/data";
import type { User } from "@clerk/nextjs/server";
import { Suspense } from "react";

export async function ProfileInsights(props: { author: User }) {
  const { author } = props;

  const commentCount = await getCommentCountByUserId(author.id)
  const postCount = await getPostCountByUserId(author.id)
  const likeCount = await getLikeCountByUserId(author.id);

  return (
    <Suspense>
      <span className="text-sm text-gray-400">
        {postCount} chirps
      </span>
      <span className="whitespace-nowrap text-sm">·</span>
      <span className="text-sm text-gray-400">
        {commentCount} chirpbacks
      </span>
      <span className="whitespace-nowrap text-sm">·</span>
      <span className="text-sm text-gray-400">
        {likeCount} likes
      </span>
    </Suspense>
  );
}
