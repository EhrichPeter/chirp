"use client";

import { Button } from "@/components/ui/button";
import { toastError, toastSuccess } from "@/lib/utils";
import { toggleLike } from "@/server/like/action";
import { Heart } from "lucide-react";
import { useAction } from "next-safe-action/hooks";

export function LikeButton(props: {
  post: { id: string; likeCount: number };
  isLiked: boolean;
}) {
  const { post } = props;
  const { execute } = useAction(toggleLike, {
    onSuccess: () => {
      if (props.isLiked) {
        toastSuccess("Unliked! 😢");
      } else {
        toastSuccess("Liked! ❤️");
      }

      console.log(props.isLiked);
    },
    onError: () => {
      toastError("Like failed! 😢");
    },
  });

  const onHandleSubmit = async () => {
    execute({ postId: post.id });
  };

  return (
    <div className="flex items-center">
      <Button variant={"ghost"} className="-m-3" onClick={onHandleSubmit}>
        {props.isLiked ? <Heart size={16} fill="red" /> : <Heart size={16} />}
      </Button>
      <span className=" text-xs text-gray-400">{post.likeCount}</span>
    </div>
  );
}
