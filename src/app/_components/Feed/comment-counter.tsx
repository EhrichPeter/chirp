import { MessagesSquare } from "lucide-react";
import Link from "next/link";

export function CommentCounterLink(props: {
  post: { id: string; replyCount: number };
}) {
  "use client";
  const { post } = props;
  return (
    <Link href={`/post/${post.id}`}>
      <div className="flex items-center gap-1">
        <MessagesSquare size={10} />
        <span className="text-xs text-gray-400">{post.replyCount}</span>
      </div>
    </Link>
  );
}
