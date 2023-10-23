export default function ServerPage({
  params,
}: {
  params: {
    id: string;
  };
}) {
  return <div>server id is: {params.id}</div>;
}
