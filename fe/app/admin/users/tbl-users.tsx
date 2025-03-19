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
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
          <thead>
            <tr className="bg-gray-100 border-b">
              <th className="py-1 px-4 text-left text-sm font-semibold text-gray-700">
                Email
              </th>
              <th className="py-1 px-4 text-left text-sm font-semibold text-gray-700">
                Name
              </th>
              <th className="py-1 px-4 text-left text-sm font-semibold text-gray-700">
                Type
              </th>
              <th className="py-1 px-4 text-left text-sm font-semibold text-gray-700">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((item, index) => (
              <tr key={index} className="border-b hover:bg-gray-50">
                <td className="py-1 px-4 text-gray-800">{item.email}</td>
                <td className="py-1 px-4 text-gray-800">{item.name}</td>
                <td className="py-1 px-4 text-gray-800">{item.type}</td>
                <td className="py-1 px-4 flex space-x-2">
                  <BtnEdit user={item} />
                  <BtnDelete user={item} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
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
