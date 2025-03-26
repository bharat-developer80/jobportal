import React, { useEffect, useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Edit2, Eye, MoreHorizontal } from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const AdminJobsTable = () => {
  const { allAdminJobs, searchJobByText } = useSelector((store) => store.job);
  const [filterJobs, setFilterJobs] = useState(allAdminJobs);
  const navigate = useNavigate();

  useEffect(() => {
    const filteredJobs =
      allAdminJobs?.length > 0
        ? allAdminJobs.filter((job) => {
            if (!searchJobByText) return true;
            return (
              job?.title?.toLowerCase().includes(searchJobByText.toLowerCase()) ||
              job?.company?.name?.toLowerCase().includes(searchJobByText.toLowerCase())
            );
          })
        : [];
    setFilterJobs(filteredJobs);
  }, [allAdminJobs, searchJobByText]);

  return (
    <div className="p-4 bg-gray-50 rounded-xl shadow-lg">
      <h2 className="text-lg font-semibold text-gray-700 mb-3">Recent Posted Jobs</h2>

      {/* Table for larger screens */}
      <div className="hidden md:block overflow-x-auto">
        <table className="min-w-full border-collapse">
          <thead className="bg-gradient-to-r bg-blue-500  text-white">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-semibold">Company Name</th>
              <th className="px-4 py-3 text-left text-sm font-semibold">Role</th>
              <th className="px-4 py-3 text-left text-sm font-semibold">Date</th>
              <th className="px-4 py-3 text-right text-sm font-semibold">Action</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filterJobs.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center text-gray-500 py-4">
                  No jobs found.
                </td>
              </tr>
            ) : (
              filterJobs.map((job) => (
                <tr
                  key={job._id}
                  className="hover:bg-gray-100 transition-all duration-300 transform hover:scale-[1.02]"
                >
                  <td className="px-4 py-3 text-gray-700 font-medium">{job?.company?.name}</td>
                  <td className="px-4 py-3 text-gray-700">{job?.title}</td>
                  <td className="px-4 py-3">
                    <span className="px-2 py-1 text-xs font-semibold text-white bg-blue-600 rounded-full shadow">
                      {job?.createdAt?.split("T")[0]}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <Popover>
                      <PopoverTrigger>
                        <MoreHorizontal className="cursor-pointer text-gray-600 hover:text-blue-300" />
                      </PopoverTrigger>
                      <PopoverContent className="w-36 bg-white shadow-lg rounded-lg p-2">
                        <div
                          onClick={() => navigate(`/admin/companies/${job._id}`)}
                          className="flex items-center gap-2 w-full cursor-pointer p-2 rounded-md hover:bg-gray-200 transition"
                        >
                          <Edit2 className="w-4 text-gray-700" />
                          <span>Edit</span>
                        </div>
                        <div
                          onClick={() => navigate(`/admin/jobs/${job._id}/applicants`)}
                          className="flex items-center w-full gap-2 cursor-pointer p-2 rounded-md hover:bg-gray-200 transition"
                        >
                          <Eye className="w-4 text-gray-700" />
                          <span>Applicants</span>
                        </div>
                      </PopoverContent>
                    </Popover>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Card layout for small screens */}
      <div className="md:hidden space-y-4">
        {filterJobs.length === 0 ? (
          <p className="text-center text-gray-500">No jobs found.</p>
        ) : (
          filterJobs.map((job) => (
            <div
              key={job._id}
              className="bg-white p-4 rounded-lg shadow-md border border-gray-200"
            >
              <h3 className="text-lg font-semibold text-gray-800">{job?.title}</h3>
              <p className="text-gray-600">{job?.company?.name}</p>
              <span className="text-sm text-white bg-blue-600 px-2 py-1 rounded-md mt-2 inline-block">
                {job?.createdAt?.split("T")[0]}
              </span>
              <div className="flex justify-end mt-3">
                <Popover>
                  <PopoverTrigger>
                    <MoreHorizontal className="cursor-pointer text-gray-600 hover:text-blue-600" />
                  </PopoverTrigger>
                  <PopoverContent className="w-36 bg-white shadow-lg rounded-lg p-2">
                    <div
                      onClick={() => navigate(`/admin/companies/${job._id}`)}
                      className="flex items-center gap-2 w-full cursor-pointer p-2 rounded-md hover:bg-gray-200 transition"
                    >
                      <Edit2 className="w-4 text-gray-700" />
                      <span>Edit</span>
                    </div>
                    <div
                      onClick={() => navigate(`/admin/jobs/${job._id}/applicants`)}
                      className="flex items-center w-full gap-2 cursor-pointer p-2 rounded-md hover:bg-gray-200 transition"
                    >
                      <Eye className="w-4 text-gray-700" />
                      <span>Applicants</span>
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

export default AdminJobsTable;
