import { ServerNavigation } from "@/components/sidebar/server-navigation";

export default function MainAppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="">
      <div className="hidden md:flex h-full w-[80px] z-10 flex-col fixed inset-y-0 border-r-[2px] dark:border-r-[#111111]">
        <ServerNavigation />
      </div>
      <main className="md:pl-[80px] h-full">{children}</main>
    </div>
  );
}
