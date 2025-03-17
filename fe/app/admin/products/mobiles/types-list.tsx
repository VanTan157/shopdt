const TypesList = async ({ params }: { params: { product: string } }) => {
  const { product } = await params;
  return (
    <div>
      <h1>{product}</h1>
    </div>
  );
};
export default TypesList;
