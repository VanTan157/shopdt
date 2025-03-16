import { AccountType } from "@/app/validate";
import https, { HttpError } from "@/lib/http";
import { cookies } from "next/headers";
import TblUsers from "./tbl-users";
import { DiamondPlus } from "lucide-react";
import { Button } from "@/components/ui/button";

const UserPage = async ({
  searchParams,
}: {
  searchParams: { page?: string; limit?: string; search?: string };
}) => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  // Lấy các tham số từ query string (nếu không có thì dùng mặc định)
  const page = searchParams.page || "1";
  const limit = searchParams.limit || "5";
  const search = searchParams.search || "";

  let paginationData: {
    users: AccountType[];
    totalItems: number;
    totalPages: number;
    currentPage: number;
  } | null = null;

  try {
    paginationData = await https.get<{
      users: AccountType[];
      totalItems: number;
      totalPages: number;
      currentPage: number;
    }>(`/users/search?page=${page}&limit=${limit}&search=${search}`, {
      headers: {
        "Content-Type": "application/json",
        Cookie: `accessToken=${accessToken}`,
      },
      credentials: "include",
    });
  } catch (error) {
    if (error instanceof HttpError) {
      console.log(error.message);
    } else {
      console.log("Lỗi không xác định");
    }
  }

  return (
    <div>
      <div className="pl-8 pt-4">
        <Button className="flex bg-green-500 hover:bg-green-600">
          <DiamondPlus />
          Thêm user
        </Button>
      </div>
      {paginationData && <TblUsers paginationData={paginationData} />}
    </div>
  );
};

export default UserPage;
