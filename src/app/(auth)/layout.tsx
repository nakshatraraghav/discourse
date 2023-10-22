import { Card } from "@/components/ui/card";
import { PropsWithChildren } from "react";

import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function AuthLayout({ children }: PropsWithChildren) {
  const session = await getServerSession();

  if (session) {
    redirect("/");
  }

  return (
    <div className="h-screen w-screen flex justify-center items-center">
      <Card className="w-[350px] md:w-[450px] dark:bg-[#111111]">
        {children}
      </Card>
    </div>
  );
}
