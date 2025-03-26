import React from "react";
import { motion } from "framer-motion";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { MoreHorizontal } from "lucide-react";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import { APPLICATION_API_END_POINT } from "@/utils/constant";
import axios from "axios";

const shortlistingStatus = ["Accepted", "Rejected"];

const ApplicantsTable = () => {
  const { applicants } = useSelector((store) => store.application);

  const statusHandler = async (status, id) => {
    try {
      axios.defaults.withCredentials = true;
      const res = await axios.post(
        `${APPLICATION_API_END_POINT}/status/${id}/update`,
        { status }
      );
      if (res.data.success) {
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="overflow-x-auto">
      <Table className="min-w-full border border-gray-200 shadow-lg rounded-lg">
        <TableCaption className="text-gray-500 text-sm">
          A list of your recent applied users
        </TableCaption>
        <TableHeader>
          <TableRow className="bg-gray-100">
            <TableHead className="p-3 text-gray-700">Full Name</TableHead>
            <TableHead className="p-3 text-gray-700">Email</TableHead>
            <TableHead className="p-3 text-gray-700">Contact</TableHead>
            <TableHead className="p-3 text-gray-700">Resume</TableHead>
            <TableHead className="p-3 text-gray-700">Date</TableHead>
            <TableHead className="p-3 text-right text-gray-700">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {applicants?.applications?.length > 0 ? (
            applicants.applications.map((item, index) => (
              <motion.tr
                key={item._id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="border-b hover:bg-gray-50 transition"
              >
                <TableCell className="p-3">{item?.applicant?.fullname}</TableCell>
                <TableCell className="p-3">{item?.applicant?.email}</TableCell>
                <TableCell className="p-3">{item?.applicant?.phoneNumber}</TableCell>
                <TableCell className="p-3">
                  {item.applicant?.profile?.resume ? (
                    <a
                      className="text-blue-600 hover:underline"
                      href={item?.applicant?.profile?.resume}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {item?.applicant?.profile?.resumeOriginalName}
                    </a>
                  ) : (
                    <span className="text-gray-400">NA</span>
                  )}
                </TableCell>
                <TableCell className="p-3">
                  {item?.applicant.createdAt.split("T")[0]}
                </TableCell>
                <TableCell className="p-3 text-right">
                  <Popover>
                    <PopoverTrigger>
                      <MoreHorizontal className="cursor-pointer text-gray-600 hover:text-black" />
                    </PopoverTrigger>
                    <PopoverContent className="w-32 bg-white shadow-md p-2 rounded-md border">
                      {shortlistingStatus.map((status, index) => (
                        <div
                          key={index}
                          onClick={() => statusHandler(status, item?._id)}
                          className="cursor-pointer text-gray-700 hover:text-blue-500 p-1"
                        >
                          {status}
                        </div>
                      ))}
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </motion.tr>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan="6" className="text-center py-4 text-gray-500">
                No applicants found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default ApplicantsTable;
