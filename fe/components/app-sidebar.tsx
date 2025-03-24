import {
  Headset,
  Home,
  Laptop,
  LaptopMinimal,
  LayoutDashboard,
  Logs,
  ShieldUser,
  Smartphone,
  SquareKanban,
  User,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import Link from "next/link";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"; // Adjust the path as needed

const items = [
  { title: "Trang chủ", url: "/", icon: Home },
  { title: "Điện thoại", url: "/mobile", icon: Smartphone },
  { title: "Laptop", url: "#", icon: Laptop },
  { title: "PC", url: "#", icon: LaptopMinimal },
  { title: "Tai nghe", url: "#", icon: Headset },
];

const adminItems = [
  { title: "Bảng điều khiển", url: "/admin", icon: LayoutDashboard },
  {
    title: "Sản phẩm",
    url: "#",
    icon: SquareKanban,
    subItems: [
      { title: "Điện thoại", url: "/admin/products/mobiles", icon: Smartphone },
      { title: "Laptop", url: "/admin/products/laptops", icon: Laptop },
      { title: "PC", url: "/admin/products/pcs", icon: LaptopMinimal },
      { title: "Tai nghe", url: "/admin/products/headsets", icon: Headset },
    ],
  },
  { title: "Khách hàng", url: "/admin/users", icon: ShieldUser },
  { title: "Đơn hàng", url: "/admin/orders", icon: Logs },
  { title: "Trang khách hàng", url: "/", icon: User },
];

export function AppSidebar({ admin }: { admin?: boolean }) {
  return (
    <div>
      {admin ? (
        <Sidebar>
          <SidebarContent>
            <SidebarGroup>
              <div className="fixed top-0 left-0 z-20 ">
                <SidebarTrigger />
              </div>
              <div className="pt-8">
                <SidebarGroupLabel>Admin</SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {adminItems.map((item) => (
                      <SidebarMenuItem key={item.title}>
                        {item.subItems ? (
                          <Collapsible
                            defaultOpen={false}
                            className="group/collapsible"
                          >
                            <CollapsibleTrigger asChild>
                              <SidebarMenuButton>
                                <item.icon />
                                <span>{item.title}</span>
                              </SidebarMenuButton>
                            </CollapsibleTrigger>
                            <CollapsibleContent>
                              <SidebarMenuSub>
                                {item.subItems.map((subItem) => (
                                  <SidebarMenuSubItem key={subItem.url}>
                                    <SidebarMenuSubButton asChild>
                                      <Link href={subItem.url}>
                                        <subItem.icon />
                                        <span>{subItem.title}</span>
                                      </Link>
                                    </SidebarMenuSubButton>
                                  </SidebarMenuSubItem>
                                ))}
                              </SidebarMenuSub>
                            </CollapsibleContent>
                          </Collapsible>
                        ) : (
                          <SidebarMenuButton asChild>
                            <Link href={item.url}>
                              <item.icon />
                              <span>{item.title}</span>
                            </Link>
                          </SidebarMenuButton>
                        )}
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </div>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>
      ) : (
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
                                item.title === "Trang chủ"
                                  ? "w-6 h-6"
                                  : "w-5 h-5"
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
      )}
    </div>
  );
}
