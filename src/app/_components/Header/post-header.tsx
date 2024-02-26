"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { getRandomMessage, toastError, toastSuccess } from "@/lib/utils";
import { celebratoryChirps, errorChirps } from "@/lib/data";
import { LoadingSpinner } from "../loading";
import { useForm } from "react-hook-form";
import { LinkedImage } from "../linked-image";
import { createPost } from "@/server/post/actions";
import type { z } from "zod";
import { useAction } from "next-safe-action/hooks";
import type { createPostFormSchema } from "@/server/post/models";

type createPostFormType = z.infer<typeof createPostFormSchema>;

export default function PostHeader(props: {
  imageUrl: string;
  username: string;
  placeholderMessage: string;
  replyToId?: string;
}) {
  const { imageUrl, username, placeholderMessage, replyToId } = props;
  const { register, handleSubmit, reset, formState } =
    useForm<createPostFormType>({ defaultValues: { replyToId } });

  const { execute } = useAction(createPost, {
    onSuccess: () => {
      toastSuccess(getRandomMessage(celebratoryChirps));
      reset();
    },
    onError: (error) => {
      if (error.validationErrors) {
        toastError(getRandomMessage(errorChirps));
      } else {
        toastError("Post failed! 😢");
      }
    },
  });

  const onSubmit = handleSubmit(async (data: createPostFormType) => {
    execute(data);
  });

  return (
    <div className="flex w-full items-center gap-2 border-b border-secondary p-5">
      <LinkedImage imageUrl={imageUrl} userName={username} />
      <form onSubmit={onSubmit} className="flex w-full gap-2">
        <Input
          type="text"
          {...register("content")}
          placeholder={placeholderMessage}
          className="w-full border-none bg-transparent focus:border-none focus:border-primary focus:outline-none"
          disabled={formState.isSubmitting}
        />
        {!formState.isSubmitting ? (
          <Button
            type="submit"
            disabled={formState.isSubmitting}
            variant="default"
            onKeyDown={(e) => {
              e.preventDefault();
              if (e.key === "Enter") {
                void onSubmit();
              }
            }}
          >
            {formState.isSubmitting ? "⏳" : "📢"}
          </Button>
        ) : (
          <LoadingSpinner size={35} />
        )}
      </form>
    </div>
  );
}
