import { Feed } from "../Feed/feed";
import type { User } from "@clerk/nextjs/server";
import { getManyByUserId } from "@/server/post/data";

export async function ProfileFeed(props: { author: User }) {
  const { author } = props;
  const posts = (await getManyByUserId(author.id)).map((post) => ({
    post,
    author,
  }));

  return <Feed posts={posts} />;
}
