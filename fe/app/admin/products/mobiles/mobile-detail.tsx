import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { MobileType } from "@/lib/validate/mobile";
import { useState } from "react";
import MobileEditForm from "./mobile-edit-form";
import MobileDetailView from "./mobile-detail-view";
import MobileApi from "@/lib/api/mobile/mobile";
import { HttpError } from "@/lib/http";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface MobileDetailProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  mobile?: MobileType;
  setMobile: (mobile: MobileType | undefined) => void;
}

const MobileDetail = ({
  open,
  setOpen,
  mobile,
  setMobile,
}: MobileDetailProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const router = useRouter();

  const handleClose = (): void => {
    setOpen(false);
    // setMobile(undefined);
    setIsEditing(false);
  };

  const handleEdit = (): void => {
    setIsEditing(true);
  };

  const handleDelete = async () => {
    console.log("Xóa điện thoại:", mobile?._id);
    try {
      await MobileApi.removeMobile(mobile?._id || "");
      toast.success("Xóa thành công");
      router.refresh();
      setMobile(undefined);
    } catch (error) {
      if (error instanceof HttpError) {
        toast.error(error.message);
      } else {
        console.log(error);
      }
    }
    handleClose();
  };

  const handleConfirmEdit = async (updatedMobile: MobileType) => {
    console.log("Lưu điện thoại đã chỉnh sửa:", updatedMobile, mobile?._id);
    try {
      const res = await MobileApi.editMobile({
        id: mobile?._id || "",
        mobile: updatedMobile,
      });
      console.log("checkRes>>: ", res);
      router.refresh();
      setIsEditing(false);
      toast.success("Cập nhật thành công");
      setMobile(res);
      setOpen(false);
    } catch (error) {
      if (error instanceof HttpError) {
        toast.error(error.message);
      } else {
        console.log(error);
      }
    }
  };

  const handleCancelEdit = (): void => {
    // setEditedMobile(mobile);
    setIsEditing(false);
  };

  if (!mobile) return null;

  return (
    <Dialog open={open} onOpenChange={handleClose} modal={true}>
      <DialogContent
        style={{ width: "80vw", maxWidth: "none", maxHeight: "90vh" }}
        className="overflow-y-auto"
      >
        <DialogHeader>
          <DialogTitle>
            {isEditing ? "Chỉnh sửa điện thoại" : "Chi tiết điện thoại"}
          </DialogTitle>
          <DialogDescription>
            {isEditing
              ? "Chỉnh sửa thông tin bên dưới và xác nhận để lưu thay đổi."
              : "Xem chi tiết của thiết bị di động đã chọn."}
          </DialogDescription>
        </DialogHeader>

        {isEditing ? (
          <MobileEditForm
            mobile={mobile}
            onConfirm={handleConfirmEdit}
            onCancel={handleCancelEdit}
          />
        ) : (
          <MobileDetailView
            mobile={mobile}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        )}
      </DialogContent>
    </Dialog>
  );
};

export default MobileDetail;
