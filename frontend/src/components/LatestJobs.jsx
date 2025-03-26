import React from "react";
import LatestJobCards from "./LatestJobCards";
import { useSelector } from "react-redux";

const LatestJobs = () => {
  const { allJobs } = useSelector((store) => store.job);

  return (
    <div className="max-w-7xl mx-auto my-20 px-4">
      {/* Section Heading */}
      <h1 className="text-3xl sm:text-4xl font-bold text-center">
        <span className="text-[#6A38C2]">Latest & Top </span> Job Openings
      </h1>

      {/* Job Listings */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 my-8">
        {allJobs?.length > 0 ? (
          allJobs.slice(0, 6).map((job) => (
            <LatestJobCards key={job._id} job={job} />
          ))
        ) : (
          <div className="col-span-full flex justify-center items-center text-gray-500 text-lg font-medium">
            No Job Available
          </div>
        )}
      </div>
    </div>
  );
};

export default LatestJobs;
