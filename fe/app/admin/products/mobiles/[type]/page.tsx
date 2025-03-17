const ProductPage = async ({ params }: { params: { type: string } }) => {
  const { type } = await params;
  return (
    <div>
      <h1>{type}</h1>
    </div>
  );
};
export default ProductPage;
