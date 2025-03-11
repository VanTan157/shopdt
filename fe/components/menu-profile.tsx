"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import ReqApi from "@/lib/ResApi";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaUser } from "react-icons/fa";

const MenuProfile = () => {
  const router = useRouter();
  const handeleLogout = async () => {
    try {
      const res = await ReqApi.logout();
      console.log(res);
      router.refresh();
    } catch (error) {
      if (error instanceof Error) {
        console.log("Logout error:", error.message);
      } else {
        console.log("Lỗi server không xác định");
      }
    }
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <FaUser size={"25"} />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <Link href={"/profile"}>
          <DropdownMenuItem>Profile</DropdownMenuItem>
        </Link>
        <DropdownMenuItem>Billing</DropdownMenuItem>
        <DropdownMenuItem>Team</DropdownMenuItem>
        <DropdownMenuItem onClick={handeleLogout}>Logout</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default MenuProfile;
