import { Feed } from "../Feed/feed";
import { getManyRepliesByPostId } from "@/server/post/data";

export default async function ReplyFeed(props: { postId: string }) {
  const { postId } = props;
  const replies = await getManyRepliesByPostId(postId);

  return <Feed posts={replies} />;
}
