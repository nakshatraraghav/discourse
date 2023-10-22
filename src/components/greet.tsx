"use client";

import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import { Button } from "./ui/button";
import { ThemeSwitcher } from "./theme/theme-switcher";

export function Greet() {
  const { data: session } = useSession();

  if (!session) {
    return <div>not logged in</div>;
  }

  return (
    <div>
      <div>hello {session?.user.username}</div>
      <ThemeSwitcher />
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
