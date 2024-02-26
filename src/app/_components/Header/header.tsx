import { getRandomMessage } from "@/lib/utils";
import { LogInHeader } from "./log-in-header";
import { PostHeader } from "./post-header";
import { currentUser } from "@clerk/nextjs/server";
import { placeholders } from "@/lib/data";

export async function Header(props: { replyToId?: string }) {
  const user = await currentUser();
  if (!user?.username) {
    return <LogInHeader />;
  }

  return (
    <PostHeader
      imageUrl={user.imageUrl}
      username={user.username}
      placeholderMessage={getRandomMessage(placeholders)}
      replyToId={props.replyToId}
    />
  );
}
