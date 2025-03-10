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
  { title: "Home", url: "/", icon: Home },
  { title: "Mobile", url: "/mobile", icon: Smartphone },
  { title: "Laptop", url: "#", icon: Laptop },
  { title: "PC", url: "#", icon: LaptopMinimal },
  { title: "Earphone", url: "#", icon: Headset },
];

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent className="bg-gray-800 text-white pt-18">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <div key={item.title}>
                  <SidebarMenuItem>
                    <SidebarMenuButton
                      asChild
                      className={`text-white hover:text-gray-300 hover:bg-gray-700 ${
                        item.title === "Home" ? "text-xl" : "text-base"
                      }`}
                    >
                      <Link href={item.url}>
                        <item.icon
                          className={`text-white ${
                            item.title === "Home" ? "w-6 h-6" : "w-5 h-5"
                          }`}
                        />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  {/* Đường gạch trắng dưới Home */}
                  {item.title === "Home" && (
                    <div className="border-b border-white my-2 mx-4" />
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
