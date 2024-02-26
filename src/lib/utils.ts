import type { User } from "@clerk/nextjs/server";
import { type ClassValue, clsx } from "clsx";
import toast from "react-hot-toast";
import { twMerge } from "tailwind-merge";

export const getRandomMessage = (messages: string[]): string => {
  return (
    messages[Math.floor(Math.random() * messages.length)] ??
    "This is not the chirp you're looking for"
  );
};

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function userSlug(username: string) {
  return `@${username}`;
}

export function displayName(user: User) {
  if (user.firstName && user.lastName) {
    return user.firstName + " " + user.lastName;
  } else {
    return user.username;
  }
}

export function toastSuccess(message: string) {
  return toast.success(message, {
    style: {
      backgroundColor: "hsl(var(--background))",
      color: "hsl(var(--foreground))",
      outlineColor: "green",
      outlineStyle: "solid",
      outlineWidth: "1px",
      boxShadow: "0 0 2px 0 green",
    },
  });
}

export function toastError(message: string) {
  return toast.error(message, {
    style: {
      backgroundColor: "hsl(var(--background))",
      color: "hsl(var(--foreground))",
      outlineColor: "red",
      outlineStyle: "solid",
      outlineWidth: "1px",
      boxShadow: "0 0 2px 0 red",
    },
  });
}

export function toastInfo(message: string) {
  return toast(message, {
    icon: "ℹ️",
    style: {
      backgroundColor: "hsl(var(--background))",
      color: "hsl(var(--foreground))",
      outlineColor: "blue",
      outlineStyle: "solid",
      outlineWidth: "1px",
      boxShadow: "0 0 2px 0 blue",
    },
  });
}

export function toastWarning(message: string) {
  return toast(message, {
    icon: "⚠️",
    style: {
      backgroundColor: "hsl(var(--background))",
      color: "hsl(var(--foreground))",
      outlineColor: "orange",
      outlineStyle: "solid",
      outlineWidth: "1px",
      boxShadow: "0 0 2px 0 orange",
    },
  });
}
