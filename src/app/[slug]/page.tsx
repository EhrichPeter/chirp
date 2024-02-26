import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { displayName, userSlug } from "@/lib/utils";
import { Suspense } from "react";
import { LoadingBar } from "../_components/loading";
import Image from "next/image";
import { ProfileFeed } from "../_components/Profile/profile-feed";
import { ProfileInsights } from "../_components/Profile/profile-insights";
import { getOneByUsername } from "@/server/profile/data";

export default async function Profile({
  params,
}: {
  params: { slug: string };
}) {
  const slug = decodeURIComponent(params.slug);

  const user = await getOneByUsername(slug.replace("@", ""));

  return (
    <main>
      <div className="flex h-full w-full flex-col">
        <div className="flex w-full items-center">
          <Button variant={"ghost"} className="m-2 rounded-full">
            <Link href="/">
              <ArrowLeft />
            </Link>
          </Button>
          <div className="flex flex-col">
            <span className="text-lg">{displayName(user)}</span>
            <div className="flex items-center gap-1">
              <ProfileInsights author={user} />
            </div>
          </div>
        </div>
        <div className="h-60 w-full bg-primary"></div>
        <div className="-mt-20 pl-10">
          <Image
            src={user.imageUrl}
            alt="Profile Image"
            width={150}
            height={150}
            placeholder="empty"
            className="cursor-pointer rounded-full border-4 border-background"
          />
        </div>
        <div className="flex flex-col p-5">
          <h1 className="text-2xl font-bold ">{displayName(user)}</h1>
          <h2 className="text-gray-400">{userSlug(user.username!)}</h2>
          <p className="pt-5">This is a test bio.</p>
        </div>
        <Suspense fallback={<LoadingBar />}>
          <ProfileFeed author={user} />
        </Suspense>
      </div>
    </main>
  );
}
