import { Suspense } from "react";
import { FeedItem, type FeedItemProps } from "./feed-item";
import { LoadingBar } from "../loading";

export async function Feed(props: { posts: FeedItemProps[] }) {
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
    </Suspense>
  );
}
