export default function MainAppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="hidden md:flex h-full w-[80px] z-10 flex-col fixed inset-y-0"></div>
      <main className="md:pl-[80px] h-full">{children}</main>
    </div>
  );
}
