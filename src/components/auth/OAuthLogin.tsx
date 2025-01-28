"use client";

import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";

const OAuthLogin = () => {
  return (
    <div className="space-y-2">
      <Button
        onClick={() => signIn("github", { redirectTo: "/dashboard" })}
        variant="outline"
        className="w-full"
      >
        Login with Github
      </Button>
      <Button
        onClick={() => signIn("google", { redirectTo: "/dashboard" })}
        variant="outline"
        className="w-full"
      >
        Login with Google
      </Button>
    </div>
  );
};

export default OAuthLogin;
