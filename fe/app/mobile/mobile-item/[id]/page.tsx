const Page = async ({ params }: { params: { id: string } }) => {
  const { id } = await params;
  console.log(id);

  return <h1 className="pt-16">Mobile Item</h1>;
};

export default Page;
