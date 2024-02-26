import { SignInButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";

export default function LogInHeader() {
  return (
    <div className="flex items-center gap-2 border-b border-secondary bg-secondary p-5">
      <SignInButton>
        <Button variant="ghost" className="w-full">
          Sign in to post
        </Button>
      </SignInButton>
    </div>
  );
}
