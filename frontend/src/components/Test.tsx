export default function Test(props: { hello: string }) {
  const { hello } = props;
  return (
    <div className="w-[400px]">
      <h1 className="text-2xl font-bold">Test component</h1>
      <p>{hello}</p>
    </div>
  );
}
