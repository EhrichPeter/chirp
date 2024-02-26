import type { User } from "@clerk/nextjs/server";
import { Suspense } from "react";
import { getManyByUserId } from "@/server/post/data";

export async function ProfileInsights(props: { author: User }) {
  const { author } = props;

  const posts = (await getManyByUserId(author.id)).map((post) => ({
    post,
    author,
  }));

  return (
    <Suspense>
      <span className="text-sm text-gray-400">
        {posts.filter((item) => !item.post.replyToId).length} chirps
      </span>
      <span className="whitespace-nowrap text-sm">·</span>
      <span className="text-sm text-gray-400">
        {posts.filter((item) => item.post.replyToId).length} chirpbacks
      </span>
    </Suspense>
  );
}
