import { getManyByUserId } from "@/server/post/data";
import type { User } from "@clerk/nextjs/server";
import { Feed } from "../Feed/feed";

export async function ProfileFeed(props: { author: User }) {
  const { author } = props;
  const posts = await getManyByUserId(author.id);

  return <Feed posts={posts} />;
}
