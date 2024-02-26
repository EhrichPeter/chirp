import { Feed } from "../Feed/feed";
import { getManyPosts } from "@/server/post/data";

export default async function HomeFeed() {
  const posts = await getManyPosts();
  return <Feed posts={posts} />;
}
