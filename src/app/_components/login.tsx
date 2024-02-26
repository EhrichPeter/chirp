import { SignInButton, SignOutButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import { LogInIcon, LogOutIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

export async function Login() {
  const user = await currentUser();

  if (user) {
    return (
      <SignOutButton>
        <Button variant="secondary" size="icon">
          <LogOutIcon />
        </Button>
      </SignOutButton>
    );
  } else {
    return (
      <SignInButton>
        <Button variant="secondary" size="icon">
          <LogInIcon />
        </Button>
      </SignInButton>
    );
  }
}
