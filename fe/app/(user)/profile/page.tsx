import ReqApi from "@/lib/ResApi";
import { cookies } from "next/headers";
import BtnEditProfile from "./btn-edit-profile";
import { AccountType } from "@/app/validate";

const Profile = async () => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  let user: AccountType | null = null;
  try {
    const res = await ReqApi.getMe(accessToken as string);
    user = res;
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
    } else console.log("Lỗi không xác định");
  }
  return (
    <div className="h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Profile Page</h1>
        {user ? (
          <div className="space-y-3">
            <p className="text-gray-700">
              <span className="font-semibold">Name:</span> {user.name}
            </p>
            <p className="text-gray-700">
              <span className="font-semibold">Email:</span> {user.email}
            </p>
            <p className="text-gray-700">
              <span className="font-semibold">Type:</span> {user.type}
            </p>
            <div>
              <BtnEditProfile user={user} />
            </div>
          </div>
        ) : (
          <p className="text-red-500 text-center">
            Không thể tải thông tin người dùng
          </p>
        )}
      </div>
    </div>
  );
};

export default Profile;
