"use client";

import { Button } from "@/components/ui/button";
import OrderApi from "@/lib/api/mobile/order";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const BtnCompeleteOrder = ({ id }: { id: string }) => {
  const router = useRouter();
  const handleCompleteOrder = async () => {
    try {
      // Gọi API để chuyển trạng thái sang "Đang vận chuyển" (bạn sẽ thêm sau)
      const res = await OrderApi.editOrder({
        id,
        orderUpdate: { status: "Hoàn thành" },
      });
      console.log(res);
      // Ví dụ: await OrderApi.updateOrderStatus(orderId, "Đang vận chuyển");
      toast.success("Xác nhận hoàn thành đơn hàng thành công!");
      router.refresh(); // Refresh để cập nhật dữ liệu
    } catch (error) {
      toast.error("Không thể cập nhật trạng thái đơn hàng!");
      console.error(error);
    }
  };
  return (
    <Button className="mt-4" onClick={() => handleCompleteOrder()}>
      Đã nhận được hàng
    </Button>
  );
};

export default BtnCompeleteOrder;
