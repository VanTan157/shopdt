import ReqApi from "@/lib/ResApi";
import MobileTable from "../tbl-mobiles";

const Page = async ({ params }: { params: { type: string } }) => {
  let mobiles = null;
  try {
    const { type } = await params;
    const res = await ReqApi.getAllMobilebyType(type);
    mobiles = res;
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
    } else {
      console.log("Lỗi không xác định");
    }
  }
  return (
    <div>
      <MobileTable mobiles={mobiles || []} />
    </div>
  );
};

export default Page;
