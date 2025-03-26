import React from "react";
import { Badge } from "./ui/badge";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const LatestJobCards = ({ job }) => {
  const navigate = useNavigate();

  return (
    <motion.div
      onClick={() => navigate(`/description/${job._id}`)}
      className="p-5 rounded-lg shadow-lg bg-white border border-gray-200 cursor-pointer 
                 transition-all duration-300 ease-in-out hover:shadow-xl min-h-[180px] flex flex-col justify-between"
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      whileHover={{ scale: 1.03 }} // Smooth hover effect
    >
      {/* Company Info */}
      <div>
        <h1 className="font-semibold text-lg truncate">{job?.company?.name}</h1>
        <p className="text-sm text-gray-500">India</p>
      </div>

      {/* Job Title & Description */}
      <div className="my-2">
        <h1 className="font-bold text-lg truncate">{job?.title}</h1>
        <p className="text-sm text-gray-600 line-clamp-2">{job?.description}</p>
      </div>

      {/* Job Details */}
      <div className="flex items-center gap-2 mt-4">
        <Badge className="text-blue-700 font-bold" variant="ghost">
          {job?.position} Positions
        </Badge>
        <Badge className="text-[#F83002] font-bold" variant="ghost">
          {job?.jobType}
        </Badge>
        <Badge className="text-[#7209b7] font-bold" variant="ghost">
          {job?.salary} LPA
        </Badge>
      </div>
    </motion.div>
  );
};

export default LatestJobCards;
