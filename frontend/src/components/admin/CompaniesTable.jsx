import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Edit2, MoreHorizontal } from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const CompaniesTable = () => {
  const { companies, searchCompanyByText } = useSelector(
    (store) => store.company
  );
  const [filterCompany, setFilterCompany] = useState(companies);
  const navigate = useNavigate();

  useEffect(() => {
    const filteredCompany =
      companies.length > 0
        ? companies.filter((company) =>
            searchCompanyByText
              ? company?.name
                  ?.toLowerCase()
                  .includes(searchCompanyByText.toLowerCase())
              : true
          )
        : [];
    setFilterCompany(filteredCompany);
  }, [companies, searchCompanyByText]);

  return (
    <div className="p-4 bg-gray-50 rounded-xl shadow-lg">
      <h2 className="text-lg font-semibold text-gray-700 mb-3">
        Registered Companies
      </h2>

      {/* Table for larger screens */}
      <div className="hidden md:block overflow-x-auto">
        <Table className="min-w-full border border-gray-200 shadow-lg rounded-lg">
          <TableCaption className="text-gray-600">
            A list of your recently registered companies
          </TableCaption>

          {/* Table Header with Solid Blue Background and White Text */}
          <TableHeader className="bg-blue-500 text-white">
            <TableRow>
              <TableHead className="whitespace-nowrap py-3 px-4 text-left text-white">
                Logo
              </TableHead>
              <TableHead className="whitespace-nowrap py-3 px-4 text-left text-white">
                Name
              </TableHead>
              <TableHead className="whitespace-nowrap py-3 px-4 text-left text-white">
                Date
              </TableHead>
              <TableHead className="text-right whitespace-nowrap py-3 px-4 text-white">
                Action
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {filterCompany.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan="4"
                  className="text-center text-gray-500 py-4"
                >
                  No companies found.
                </TableCell>
              </TableRow>
            ) : (
              filterCompany.map((company) => (
                <TableRow key={company._id}>
                  <TableCell className="py-3 px-4">
                    <Avatar className="w-10 h-10">
                      <AvatarImage
                        src={company.logo || "/default-logo.png"}
                        alt={company.name}
                      />
                    </Avatar>
                  </TableCell>
                  <TableCell className="py-3 px-4 text-gray-700 font-medium">
                    {company.name}
                  </TableCell>
                  <TableCell className="py-3 px-4">
                    <span className="px-2 py-1 text-xs font-semibold text-white bg-blue-600 rounded-full shadow">
                      {company.createdAt.split("T")[0]}
                    </span>
                  </TableCell>
                  <TableCell className="text-right py-3 px-4">
                    <Popover>
                      <PopoverTrigger>
                        <MoreHorizontal className="cursor-pointer text-gray-600 hover:text-blue-500 transition" />
                      </PopoverTrigger>
                      <PopoverContent className="w-36 bg-white shadow-lg rounded-lg p-2">
                        <div
                          onClick={() =>
                            navigate(`/admin/companies/${company._id}`)
                          }
                          className="flex items-center gap-2 cursor-pointer p-2 rounded-md hover:bg-gray-200 transition"
                        >
                          <Edit2 className="w-4 text-gray-700" />
                          <span>Edit</span>
                        </div>
                      </PopoverContent>
                    </Popover>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Card layout for small screens */}
      <div className="md:hidden space-y-4">
        {filterCompany.length === 0 ? (
          <p className="text-center text-gray-500">No companies found.</p>
        ) : (
          filterCompany.map((company) => (
            <div
              key={company._id}
              className="bg-white p-4 rounded-lg shadow-md border border-gray-200"
            >
              <div className="flex items-center space-x-3">
                <Avatar className="w-12 h-12">
                  <AvatarImage
                    src={company.logo || "/default-logo.png"}
                    alt={company.name}
                  />
                </Avatar>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">
                    {company.name}
                  </h3>
                  <span className="text-sm text-white bg-blue-600 px-2 py-1 rounded-md mt-2 inline-block">
                    {company.createdAt.split("T")[0]}
                  </span>
                </div>
              </div>

              <div className="flex justify-end mt-3">
                <Popover>
                  <PopoverTrigger>
                    <MoreHorizontal className="cursor-pointer text-gray-600 hover:text-blue-500" />
                  </PopoverTrigger>
                  <PopoverContent className="w-36 bg-white shadow-lg rounded-lg p-2">
                    <div
                      onClick={() =>
                        navigate(`/admin/companies/${company._id}`)
                      }
                      className="flex items-center gap-2 w-full cursor-pointer p-2 rounded-md hover:bg-gray-200 transition"
                    >
                      <Edit2 className="w-4 text-gray-700" />
                      <span>Edit</span>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CompaniesTable;
