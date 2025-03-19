"user client";

import { AccountType } from "@/app/validate";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import https from "@/lib/http";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const BtnDelete = ({ user }: { user: AccountType }) => {
  const router = useRouter();
  const handleDelete = async () => {
    try {
      const response = await https.delete(`/users/${user._id}`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(response);
      router.refresh();
      toast.success("Xóa người dùng thành công");
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else toast.error("Lỗi không xác định");
    }
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition">
        Delete
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Bạn có chác chắn xóa người dùng này không?
          </AlertDialogTitle>
          <AlertDialogDescription>
            Sau khi xóa người dùng: {user.email} sẽ bị xóa vĩnh viễn
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Hủy</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete}>Xác nhận</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default BtnDelete;
