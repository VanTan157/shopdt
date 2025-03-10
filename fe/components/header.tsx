import Link from "next/link";
import { cookies } from "next/headers";
import MenuProfile from "./menu-profile";
import { SidebarTrigger } from "./ui/sidebar";

const Header = async () => {
  const cookieStore = await cookies();
  const access_token = cookieStore.get("accessToken");
  console.log(access_token);

  return (
    <>
      <div className="fixed top-0 left-0 w-full z-10">
        <div className="flex items-center justify-between bg-gray-800 text-white p-4 shadow-md h-16">
          {/* SidebarTrigger giữ nguyên */}
          <SidebarTrigger />
          {/* Điều chỉnh max-width của input để linh hoạt hơn */}
          <div className="flex-1 mx-4 max-w-lg">
            <input
              type="text"
              placeholder="Tìm kiếm..."
              className="w-full px-4 py-2 text-gray-800 bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {access_token ? (
            <div className="pr-4">
              <MenuProfile />
            </div>
          ) : (
            <div className="flex space-x-6 pr-4">
              <p className="text-lg hover:text-gray-300 cursor-pointer transition-colors">
                <Link href={"/login"}>Login</Link>
              </p>
              <p className="text-lg hover:text-gray-300 cursor-pointer transition-colors">
                <Link href={"/register"}>Register</Link>
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Header;
