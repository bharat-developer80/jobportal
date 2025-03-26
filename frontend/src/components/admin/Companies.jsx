import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Navbar from "../shared/Navbar";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import CompaniesTable from "./CompaniesTable";
import { useNavigate } from "react-router-dom";
import useGetAllCompanies from "@/hooks/useGetAllCompanies";
import { useDispatch } from "react-redux";
import { setSearchCompanyByText } from "@/redux/companySlice";

const Companies = () => {
  useGetAllCompanies();
  const [input, setInput] = useState("");
  const [placeholder, setPlaceholder] = useState("Filter by name..."); // Dynamic placeholder
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSearchCompanyByText(input));
  }, [input]);

  // Dynamic placeholder effect
  useEffect(() => {
    const placeholders = ["Search Google", "Search Amazon", "Search Tesla"];
    let index = 0;

    const interval = setInterval(() => {
      setPlaceholder(`Filter by ${placeholders[index]}...`);
      index = (index + 1) % placeholders.length;
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <Navbar />
      <div className="max-w-6xl mx-auto my-10">
        <motion.div
          className="flex items-center justify-between my-5"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          {/* Animated Input Field */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileFocus={{ scale: 1.05 }}
            className="w-full max-w-md"
          >
            <Input
              className="w-full p-2 border border-gray-300 rounded-lg"
              placeholder={placeholder}
              onChange={(e) => setInput(e.target.value)}
            />
          </motion.div>

          {/* Animated Button */}
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              className="ml-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
              onClick={() => navigate("/admin/companies/create")}
            >
              + New Company
            </Button>
          </motion.div>
        </motion.div>

        {/* Companies Table */}
        <CompaniesTable />
      </div>
    </div>
  );
};

export default Companies;
