"use client";

import { Button } from "@/components/ui/button";
import { toastError, toastInfo, toastSuccess } from "@/lib/utils";
import { toggleLike } from "@/server/like/action";
import { useUser } from "@clerk/nextjs";
import { Heart } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import { useState } from "react";

export function LikeButton(props: {
  post: { id: string; likeCount: number, likes: { authorId: string }[] };
  isLiked: boolean;
}) {
  const { user } = useUser()
  const { post } = props;
  const [isLiked, setIsLiked] = useState(props.isLiked)
  const [likeCount, setLikeCount] = useState(post.likeCount)
  const { execute, status } = useAction(toggleLike, {
    onError: () => {
      toastError("Failed to like.")
      setIsLiked(props.isLiked)
      setLikeCount(post.likeCount)
    },
  });


  const toggleInteractiveLike = () => {
    if (!user) {
      toastInfo("Please log in to like.")

    } else {
      setIsLiked(!isLiked);

      if (isLiked) {
        setLikeCount(likeCount - 1);
        toastSuccess("Unliked! 😢");
      } else {
        setLikeCount(likeCount + 1);
        toastSuccess("Liked! ❤️");
      }
      execute({ postId: post.id });
    }
  }


  const onHandleSubmit = async () => {
    toggleInteractiveLike();
  };

  return (
    <div className="flex items-center">
      <Button variant={"ghost"} className="-m-3" onClick={onHandleSubmit} disabled={status === "executing"}>
        {isLiked ? <Heart size={16} fill="red" /> : <Heart size={16} />}
      </Button>
      <span className=" text-xs text-gray-400">{likeCount}</span>
    </div>
  );
}
