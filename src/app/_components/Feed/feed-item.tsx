import dayjs from "dayjs";
import Link from "next/link";
import { LinkedImage } from "../linked-image";
import { userSlug } from "@/lib/utils";
import { LikeButton } from "./like-button";
import { CommentCounterLink } from "./comment-counter";

export type FeedItemProps = {
  post: {
    id: string;
    content: string;
    createdAt: Date;
    replyCount: number;
    likeCount: number;
    replyToId: string | null;
    likes: {
      id: string;
      postId: string;
      authorId: string;
    }[];
  };
  author: { username: string | null; imageUrl: string };
};

export async function FeedItem(props: FeedItemProps) {
  const { post, author } = props;

  if (!author.username) return null;

  return (
    <div
      key={post.id}
      className="flex flex-col gap-3 border-y border-secondary p-3 transition-colors duration-200 ease-in-out hover:bg-secondary"
    >
      <div className="flex items-center gap-3">
        <LinkedImage imageUrl={author.imageUrl} userName={author.username} />
        <div className="flex items-center gap-1">
          <Link href={`/${userSlug(author.username)}`}>
            <span className="cursor-pointer whitespace-nowrap text-sm text-gray-400 transition-colors duration-200 hover:text-primary">
              @{author.username}
            </span>
          </Link>
          <Link href={`/post/${post.id}`}>
            <div className="flex items-center gap-1">
              <span className="whitespace-nowrap text-sm">·</span>
              <span className="whitespace-nowrap text-sm text-gray-400">
                {dayjs(post.createdAt).fromNow()}
              </span>
            </div>
          </Link>
          {post.replyToId && (
            <div className="flex items-center gap-1">
              <span className="whitespace-nowrap text-sm">·</span>
              <Link href={`/post/${post.replyToId}`}>
                <span className="whitespace-nowrap text-sm text-primary">
                  chirpback
                </span>
              </Link>
            </div>
          )}
        </div>
      </div>
      <div>
        <p className="text-2xl">{post.content}</p>
      </div>
      <div className="flex items-center gap-3 pl-2">
        <CommentCounterLink post={post} />
        <LikeButton post={post} isLiked={post.likes.length > 0} />
      </div>
    </div>
  );
}
