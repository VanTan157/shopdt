import { Button } from "@/components/ui/button";
import { MobileType } from "@/lib/validate/mobile";
import Image from "next/image";

interface MobileDetailProps {
  mobile: MobileType;
  onEdit: () => void;
  onDelete: () => void;
}

const MobileDetailView = ({ mobile, onEdit, onDelete }: MobileDetailProps) => {
  return (
    <>
      <div className="space-y-4">
        <div>
          <strong>Tên:</strong> {mobile.name}
        </div>
        <div>
          <strong>Giá khởi điểm:</strong>{" "}
          {mobile.StartingPrice.toLocaleString()} VND
        </div>
        <div>
          <strong>Giá cuối cùng:</strong> {mobile.finalPrice.toLocaleString()}{" "}
          VND
        </div>
        <div>
          <strong>Khuyến mãi:</strong> {mobile.promotion}%
        </div>
        <div>
          <strong>Mô tả:</strong> {mobile.description}
        </div>
        <div>
          <strong>Camera:</strong> Trước: {mobile?.camera?.front}, Sau:{" "}
          {mobile?.camera?.rear}
        </div>
        <div>
          <strong>Màu sắc:</strong>
          {mobile.colorVariants?.map((variant) => (
            <div key={variant._id} className="flex space-x-2 items-center py-2">
              <Image
                src={`http://localhost:8080${variant.image}`}
                alt={variant.color}
                width={60}
                height={60}
                quality={100}
                priority
                unoptimized
              />
              <p>
                {variant.color} - Số lượng: {variant.stock}
              </p>
            </div>
          ))}
        </div>
        <div>
          <strong>Thông số kỹ thuật:</strong>
          <ul className="list-disc ml-5">
            <li>CPU: {mobile?.specifications?.cpu}</li>
            <li>RAM: {mobile.specifications?.ram}GB</li>
            <li>Bộ nhớ: {mobile.specifications?.storage}GB</li>
            <li>Pin: {mobile.specifications?.battery}mAh</li>
            <li>Kích thước màn hình: {mobile.specifications?.screenSize}</li>
            <li>Độ phân giải: {mobile.specifications?.resolution}</li>
            <li>Hệ điều hành: {mobile.specifications?.os}</li>
          </ul>
        </div>
        <div>
          <strong>Thẻ:</strong> {mobile.tags.join(", ")}
        </div>
      </div>
      <div className="flex justify-end space-x-2 mt-4">
        <Button variant="destructive" onClick={onDelete}>
          Xóa
        </Button>
        <Button onClick={onEdit}>Sửa</Button>
      </div>
    </>
  );
};

export default MobileDetailView;
