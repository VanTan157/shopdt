"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import ReqApi from "@/lib/ResApi"; // Giả sử đây là API client của bạn
import {
  LogOut,
  ShieldCheck,
  ShoppingCart,
  UserRoundCog,
  WalletCards,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaUser } from "react-icons/fa";
import { useEffect } from "react";
import https from "@/lib/http";
import { useCartStore } from "@/lib/cartStore";
import { AccountType } from "@/app/validate";

const MenuProfile = ({ user }: { user: AccountType }) => {
  const router = useRouter();
  const { cartCount, setCartCount } = useCartStore(); // State để lưu số lượng giỏ hàng

  useEffect(() => {
    const fetchCartCount = async () => {
      try {
        const res = await https.get<{ count: number }>(
          `/order-items/cart-count`,
          {
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          }
        ); // Giả sử API trả về { count: number }
        setCartCount(res.count);
      } catch (error) {
        console.log("Error fetching cart count:", error);
      }
    };

    fetchCartCount();
  }, [setCartCount]);

  const handeleLogout = async () => {
    try {
      const res = await ReqApi.logout();
      console.log(res);
      router.push("/login");
      router.refresh();
    } catch (error) {
      if (error instanceof Error) {
        console.log("Logout error:", error.message);
      } else {
        console.log("Lỗi server không xác định");
      }
    }
  };

  // Hàm hiển thị số lượng giỏ hàng
  const renderCartCount = () => {
    if (cartCount > 5) return "5+";
    return cartCount > 0 ? cartCount : null; // Không hiển thị nếu bằng 0
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <FaUser size={"25"} />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {user.type === "ADMIN" && (
          <Link href={"/admin"}>
            <DropdownMenuItem>
              <ShieldCheck className="mr-2" />
              Admin
            </DropdownMenuItem>
          </Link>
        )}
        <Link href={"/profile"}>
          <DropdownMenuItem>
            <UserRoundCog className="mr-2" />
            Profile
          </DropdownMenuItem>
        </Link>
        <Link href={"/cart"}>
          <DropdownMenuItem>
            <div className="relative flex items-center space-x-3">
              <ShoppingCart className="mr-4" />
              Cart
              {renderCartCount() && (
                <span className="absolute top-0 left-0 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center transform translate-x-1/2 -translate-y-1/2">
                  {renderCartCount()}
                </span>
              )}
            </div>
          </DropdownMenuItem>
        </Link>
        <Link href={"/order"}>
          <DropdownMenuItem>
            <WalletCards className="mr-2" />
            Order
          </DropdownMenuItem>
        </Link>
        <DropdownMenuItem onClick={handeleLogout}>
          <LogOut className="mr-2" />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default MenuProfile;
