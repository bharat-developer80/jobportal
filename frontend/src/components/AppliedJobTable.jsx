import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Badge } from "./ui/badge";
import { useSelector } from "react-redux";

const AppliedJobTable = () => {
  const { allAppliedJobs } = useSelector((store) => store.job);

  return (
    <div className="w-full">
      {/* Mobile View - Cards */}
      <div className="block md:hidden">
        {allAppliedJobs.length === 0 ? (
          <p className="text-center text-gray-500 py-4">You haven't applied for any jobs yet.</p>
        ) : (
          allAppliedJobs.map((appliedJob) => (
            <div
              key={appliedJob._id}
              className="bg-white shadow-md rounded-lg p-4 mb-4 border border-gray-200"
            >
              <p className="text-sm text-gray-500">{appliedJob?.createdAt?.split("T")[0]}</p>
              <h2 className="text-lg font-semibold text-gray-900">{appliedJob.job?.title}</h2>
              <p className="text-gray-700">{appliedJob.job?.company?.name}</p>
              <Badge
                className={`mt-2 inline-block px-3 py-1 text-sm font-semibold rounded-full ${
                  appliedJob?.status === "rejected"
                    ? "bg-red-500 text-white"
                    : appliedJob.status === "pending"
                    ? "bg-gray-400 text-white"
                    : "bg-green-500 text-white"
                }`}
              >
                {appliedJob.status.toUpperCase()}
              </Badge>
            </div>
          ))
        )}
      </div>

      {/* Medium & Large Screen - Table */}
      <div className="hidden md:block overflow-x-auto">
        <Table className="min-w-full border-collapse">
          <TableCaption>A list of your applied jobs</TableCaption>
          <TableHeader>
            <TableRow className="bg-gray-100">
              <TableHead className="px-4 py-2">Date</TableHead>
              <TableHead className="px-4 py-2">Job Role</TableHead>
              <TableHead className="px-4 py-2">Company</TableHead>
              <TableHead className="px-4 py-2 text-right">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {allAppliedJobs.length === 0 ? (
              <TableRow>
                <TableCell colSpan="4" className="text-center text-gray-500 py-4">
                  You haven't applied for any jobs yet.
                </TableCell>
              </TableRow>
            ) : (
              allAppliedJobs.map((appliedJob) => (
                <TableRow key={appliedJob._id} className="hover:bg-gray-50 transition">
                  <TableCell className="px-4 py-2">{appliedJob?.createdAt?.split("T")[0]}</TableCell>
                  <TableCell className="px-4 py-2">{appliedJob.job?.title}</TableCell>
                  <TableCell className="px-4 py-2">{appliedJob.job?.company?.name}</TableCell>
                  <TableCell className="px-4 py-2 text-right">
                    <Badge
                      className={`px-3 py-1 text-sm font-semibold rounded-full ${
                        appliedJob?.status === "rejected"
                          ? "bg-red-500 text-white"
                          : appliedJob.status === "pending"
                          ? "bg-gray-400 text-white"
                          : "bg-green-500 text-white"
                      }`}
                    >
                      {appliedJob.status.toUpperCase()}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default AppliedJobTable;
