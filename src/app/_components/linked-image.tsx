"use client";

import Image from "next/image";
import Link from "next/link";
import { userSlug } from "@/lib/utils";

export const LinkedImage = (props: {
  imageUrl: string;
  userName: string;
  size?: number;
  border?: boolean;
}) => {
  const { imageUrl, userName, size = 40, border = false } = props;

  return (
    <Link href={`/${userSlug(userName)}`}>
      <Image
        src={imageUrl}
        alt="Profile Image"
        width={size}
        height={size}
        placeholder="empty"
        className={`cursor-pointer rounded-full ${border ? "border-4 border-background" : ""}`}
      />
    </Link>
  );
};
