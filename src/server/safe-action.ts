import { auth, redirectToSignIn } from "@clerk/nextjs";
import { createSafeActionClient } from "next-safe-action";

export const publicAction = createSafeActionClient();

export const authAction = createSafeActionClient({
  // If you need to access validated input, you can use `parsedInput` how you want
  // in your middleware. Please note that `parsedInput` is typed unknown, as it
  // comes from an action, while middleware is an (optional) instance function.
  // Can also be a non async function.
  async middleware() {
    const { userId } = auth();

    if (!userId) {
      redirectToSignIn();
    }
    return { userId };
  },
});
