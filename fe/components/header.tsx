import Link from "next/link";
import { cookies } from "next/headers";
import MenuProfile from "./menu-profile";
import { SidebarTrigger } from "./ui/sidebar";
import { AccountType } from "@/app/validate";
import ReqApi from "@/lib/ResApi";
import Contification from "./contification";

const Header = async () => {
  const cookieStore = await cookies();
  const access_token = cookieStore.get("accessToken");
  let user: AccountType | null = null;
  try {
    user = await ReqApi.getMe(access_token?.value || "");
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
    } else console.log("Lỗi không xác định");
  }

  return (
    <header className="fixed top-0 left-0 w-full z-20 bg-gray-900 text-white shadow-lg">
      <div className="flex items-center justify-between p-4 h-16 max-w-screen-xl mx-auto">
        <SidebarTrigger />
        <div className="flex-1 mx-6">
          <input
            type="text"
            placeholder="Tìm kiếm sản phẩm..."
            className="w-full px-4 py-2 text-gray-800 bg-white rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300"
          />
        </div>
        {access_token ? (
          <div className="pr-4 flex space-x-4" id="avatar-icon">
            <Contification />
            {user && <MenuProfile user={user} />}
          </div>
        ) : (
          <div className="flex space-x-6 pr-4">
            <Link
              href="/login"
              className="text-lg hover:text-blue-300 transition-colors duration-200"
            >
              Đăng nhập
            </Link>
            <Link
              href="/register"
              className="text-lg hover:text-blue-300 transition-colors duration-200"
            >
              Đăng ký
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
