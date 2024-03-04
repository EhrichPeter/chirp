import { Button } from "@/components/ui/button";
import { Suspense } from "react";
import { LoadingBar } from "../loading";
import FeedItem, { type FeedItemProps } from "./feed-item";

export function Feed(props: { posts: FeedItemProps[] }) {
  const { posts } = props;
  return (
    <Suspense fallback={<LoadingBar />}>
      <div className="flex flex-col">
        {posts.map((item) => {
          return (
            <FeedItem
              key={item.post.id}
              post={item.post}
              author={item.author}
            />
          );
        })}
      </div>
      < Button variant={"outline"}>
        Load more
      </Button>
    </Suspense>

  );
}
