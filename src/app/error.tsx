"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Error() {
  return (
    <main className="flex h-full flex-col items-center justify-center gap-4 pt-10">
      <h2 className="text-4xl font-bold text-primary">
        There is nothing here! 🤷‍♂️
      </h2>
      <Button variant={"outline"}>
        <Link href="/">Go Back</Link>
      </Button>
    </main>
  );
}
