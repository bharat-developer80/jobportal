import React, { useState } from "react";
import { Button } from "./ui/button";
import { Search } from "lucide-react";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "@/redux/jobSlice";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const HeroSection = () => {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchJobHandler = () => {
    if (!query.trim()) return;
    dispatch(setSearchedQuery(query));
    navigate("/browse");
  };

  return (
    <div className="text-center px-4 py-10 md:py-20">
      <motion.div
        className="flex flex-col items-center gap-6 max-w-lg sm:max-w-2xl md:max-w-3xl mx-auto"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <span className="px-4 py-2 rounded-full bg-gray-100 text-[#F83002] font-medium text-sm">
          No. 1 Job Hunt Website
        </span>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">
          Search, Apply & <br /> Get Your{" "}
          <span className="text-[#6A38C2]">Dream Job</span>
        </h1>

        <p className="text-gray-600 text-base sm:text-lg">
          Find thousands of job opportunities that match your skills & passion.
        </p>

        <div className="flex w-full sm:w-[80%] md:w-[60%] bg-white shadow-lg border border-gray-200 pl-3 rounded-full items-center gap-3 mx-auto transition">
          <input
            type="text"
            placeholder="Find your dream job..."
            onChange={(e) => setQuery(e.target.value)}
            className="outline-none border-none w-full py-3 px-4 rounded-full focus:ring-2 focus:ring-[#6A38C2] transition"
          />
          <motion.div whileTap={{ scale: 0.95 }}>
            <Button
              onClick={searchJobHandler}
              className="rounded-r-full bg-[#6A38C2] hover:bg-[#532b9d] transition-all"
            >
              <Search className="h-5 w-5 text-white" />
            </Button>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default HeroSection;
