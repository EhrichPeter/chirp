import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import FeedItem from "@/app/_components/Feed/feed-item";
import Header from "@/app/_components/Header/header";
import PostInsights from "@/app/_components/Post/post-insights";
import ReplyFeed from "@/app/_components/Post/reply-feed";
import { Button } from "@/components/ui/button";
import { getOneById } from "@/server/post/data";

export default async function Post({ params }: { params: { id: string } }) {
  const id = decodeURIComponent(params.id);
  const data = await getOneById(id);

  return (
    <main>
      <div className="flex w-full items-center">
        <Button variant={"ghost"} className="m-2 rounded-full">
          <Link href="/">
            <ArrowLeft />
          </Link>
        </Button>
        <div className="flex flex-col">
          <span className="text-lg">Chirp</span>
          <PostInsights postId={data.post.id} />
        </div>
      </div>
      <FeedItem author={data.user} post={data.post} />
      <Header replyToId={data.post.id ?? undefined} />
      <ReplyFeed postId={data.post.id} />
    </main>
  );
}
