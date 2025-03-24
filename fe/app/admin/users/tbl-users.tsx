"use client";
import { AccountType } from "@/app/validate";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useRouter } from "next/navigation";
import BtnEdit from "./btn-edit";
import BtnDelete from "./btn-delete";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const TblUsers = ({
  paginationData,
}: {
  paginationData: {
    users: AccountType[];
    totalItems: number;
    totalPages: number;
    currentPage: number;
  };
}) => {
  const { users, totalPages, currentPage } = paginationData;
  const router = useRouter();

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(window.location.search);
    params.set("page", page.toString());
    router.push(`?${params.toString()}`);
  };

  return (
    <div className="container mx-auto p-2">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50 hover:bg-gray-50">
              <TableHead className="py-3 px-6 text-left text-sm font-semibold text-gray-700">
                Email
              </TableHead>
              <TableHead className="py-3 px-6 text-left text-sm font-semibold text-gray-700">
                Name
              </TableHead>
              <TableHead className="py-3 px-6 text-left text-sm font-semibold text-gray-700">
                Type
              </TableHead>
              <TableHead className="py-3 px-6 text-left text-sm font-semibold text-gray-700">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.length > 0 ? (
              users.map((item) => (
                <TableRow
                  key={item._id} // Dùng _id nếu có, thay vì index
                  className="border-b hover:bg-gray-100 transition-colors duration-200"
                >
                  <TableCell className="py-4 px-6 text-gray-800">
                    {item.email}
                  </TableCell>
                  <TableCell className="py-4 px-6 text-gray-800">
                    {item.name}
                  </TableCell>
                  <TableCell className="py-4 px-6 text-gray-800">
                    {item.type}
                  </TableCell>
                  <TableCell className="py-4 px-6 flex space-x-2">
                    <BtnEdit user={item} />
                    <BtnDelete user={item} />
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={4}
                  className="py-4 px-6 text-center text-gray-500"
                >
                  Không có dữ liệu
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="fixed bottom-2 left-1/2 transform -translate-x-1/2">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  if (currentPage > 1) handlePageChange(currentPage - 1);
                }}
              />
            </PaginationItem>
            {[...Array(totalPages).keys()].map((i) => (
              <PaginationItem key={i}>
                <PaginationLink
                  href="#"
                  isActive={currentPage === i + 1}
                  onClick={(e) => {
                    e.preventDefault();
                    handlePageChange(i + 1);
                  }}
                >
                  {i + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  if (currentPage < totalPages)
                    handlePageChange(currentPage + 1);
                }}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
};

export default TblUsers;
