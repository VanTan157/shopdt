import { Headset, Home, Laptop, LaptopMinimal, Smartphone } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";

const items = [
  { title: "Trang chủ", url: "/", icon: Home },
  { title: "Điện thoại", url: "/mobile", icon: Smartphone },
  { title: "Laptop", url: "#", icon: Laptop },
  { title: "PC", url: "#", icon: LaptopMinimal },
  { title: "Tai nghe", url: "#", icon: Headset },
];

export function AppSidebar() {
  return (
    <Sidebar className="text-white transition-all duration-300 ease-in-out">
      <SidebarContent className="pt-16 bg-gray-900">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <div key={item.title}>
                  <SidebarMenuItem>
                    <SidebarMenuButton
                      asChild
                      className={`flex items-center w-full py-3 px-4 text-white hover:bg-gray-800 hover:text-blue-300 transition-all duration-200 ${
                        item.title === "Trang chủ"
                          ? "text-xl font-semibold"
                          : "text-base"
                      }`}
                    >
                      <Link href={item.url}>
                        <item.icon
                          className={`mr-3 ${
                            item.title === "Trang chủ" ? "w-6 h-6" : "w-5 h-5"
                          }`}
                        />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  {item.title === "Trang chủ" && (
                    <div className="border-b border-gray-700 my-3 mx-4" />
                  )}
                </div>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
