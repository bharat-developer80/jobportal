import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Navbar from "./shared/Navbar";
import Job from "./Job";
import { useDispatch, useSelector } from "react-redux";
import { setSearchedQuery } from "@/redux/jobSlice";
import useGetAllJobs from "@/hooks/useGetAllJobs";
import { Loader2 } from "lucide-react";
import Footer from "./Footer";

const Browse = () => {
  useGetAllJobs();
  const { allJobs } = useSelector((store) => store.job);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (allJobs.length) {
      setLoading(false);
    }
  }, [allJobs]);

  useEffect(() => {
    return () => {
      dispatch(setSearchedQuery(""));
    };
  }, [dispatch]);

  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto px-6 py-10">
        {/* Heading */}
        <h1 className="font-bold text-3xl text-gray-800 mb-6">
          Browse Jobs
        </h1>
        <p className="text-gray-500 mb-8">
          Explore the latest job openings and find your next opportunity.
        </p>

        {/* Search Results Count */}
        <h2 className="font-semibold text-lg text-gray-700 mb-5">
          {loading ? "Loading jobs..." : `Search Results (${allJobs.length})`}
        </h2>

        {/* Loader State */}
        {loading ? (
          <div className="flex justify-center items-center h-40">
            <Loader2 className="animate-spin h-8 w-8 text-gray-500" />
          </div>
        ) : (
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.2 },
              },
            }}
          >
            {allJobs.map((job) => (
              <motion.div
                key={job._id}
                className="bg-white rounded-xl shadow-md p-6 border border-gray-200 
                           hover:shadow-lg transition duration-300 ease-in-out"
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
                }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                <Job job={job} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
      <Footer/>
    </div>
  );
};

export default Browse;
