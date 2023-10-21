import { Card } from "@/components/ui/card";
import { PropsWithChildren } from "react";

export default function AuthLayout({ children }: PropsWithChildren) {
  return (
    <div className="h-screen w-screen flex justify-center items-center">
      <Card className="w-[350px] md:w-[450px] dark:bg-[#111111]">
        {children}
      </Card>
    </div>
  );
}
