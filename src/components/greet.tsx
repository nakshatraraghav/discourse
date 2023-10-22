"use client";

import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import { Button } from "./ui/button";

export function Greet() {
  const { data: session } = useSession();

  if (!session) {
    return <div>not logged in</div>;
  }

  return (
    <div>
      <div>hello {session?.user.username}</div>
      <Button
        onClick={() => {
          signOut();
        }}
      >
        Sign Out
      </Button>
    </div>
  );
}
