import { ProductType } from "@/app/validate";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const MobileTable = ({ mobiles }: { mobiles: ProductType[] }) => {
  return (
    <div className="overflow-x-auto pr-4 pt-4">
      <table className="min-w-full border-collapse border border-gray-200">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-200 px-4 py-2 text-left">
              Hình ảnh
            </th>
            <th className="border border-gray-200 px-4 py-2 text-left">
              Tên sản phẩm
            </th>
            <th className="border border-gray-200 px-4 py-2 text-left">
              Giá khởi điểm
            </th>

            <th className="border border-gray-200 px-4 py-2 text-left">
              Khuyến mãi
            </th>
            <th className="border border-gray-200 px-4 py-2 text-left">
              Giá cuối cùng
            </th>
            <th className="border border-gray-200 px-4 py-2 text-left">
              Đang khuyến mãi
            </th>
            <th className="border border-gray-200 px-4 py-2 text-left">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {mobiles.map((mobile) => (
            <tr key={mobile._id} className="hover:bg-gray-50">
              {/* Hình ảnh */}
              <td className="border border-gray-200 px-4 py-2">
                <div className="relative w-16 h-16">
                  <Image
                    src={`http://localhost:8080${mobile.image}`}
                    alt={mobile.name}
                    fill
                    className="object-cover rounded-md"
                  />
                </div>
              </td>

              {/* Tên sản phẩm */}
              <td className="border border-gray-200 px-4 py-2">
                {mobile.name}
              </td>

              {/* Giá khởi điểm */}
              <td className="border border-gray-200 px-4 py-2">
                {mobile.StartingPrice.toLocaleString("vi-VN")} VNĐ
              </td>

              {/* Khuyến mãi */}
              <td className="border border-gray-200 px-4 py-2">
                {mobile.promotion}%
              </td>

              {/* Giá cuối cùng */}
              <td className="border border-gray-200 px-4 py-2">
                {mobile.finalPrice.toLocaleString("vi-VN")} VNĐ
              </td>

              {/* Trạng thái khuyến mãi */}
              <td className="border border-gray-200 px-4 py-2">
                {mobile.IsPromotion ? (
                  <span className="text-green-500">Có</span>
                ) : (
                  <span className="text-red-500">Không</span>
                )}
              </td>
              <td className="border border-gray-200 px-4 py-2">
                <Button>Sửa</Button>
                <Button>Xóa</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MobileTable;
