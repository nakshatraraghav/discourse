export default function ServerPage({
  params,
}: {
  params: {
    id: string;
  };
}) {
  return (
    <div className="bg-[#ffffff] dark:bg-[#36363837] w-full h-screen">
      server id is: {params.id}
    </div>
  );
}
