import { getManyRepliesByPostId } from "@/server/post/data";
import { Suspense } from "react";

export async function PostInsights(props: { postId: string }) {
  const { postId } = props;
  const replies = await getManyRepliesByPostId(postId);

  return (
    <Suspense>
      <span className="text-sm text-gray-400">{replies.length} chirpbacks</span>
    </Suspense>
  );
}
