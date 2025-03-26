import React, { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { COMPANY_API_END_POINT } from "@/utils/constant";
import { useDispatch } from "react-redux";
import { setSingleCompany } from "@/redux/companySlice";
import { toast } from "sonner";

const CompanyCreate = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [companyName, setCompanyName] = useState("");

  const registerNewCompany = async () => {
    if (!companyName.trim()) {
      toast.error("Company name cannot be empty!");
      return;
    }

    try {
      const res = await axios.post(
        `${COMPANY_API_END_POINT}/register`,
        { companyName },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      if (res?.data?.success) {
        dispatch(setSingleCompany(res.data.company));
        toast.success(res.data.message);
        navigate(`/admin/companies/${res.data.company._id}`);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong!");
    }
  };

  return (
    <div>
      <Navbar />
      <div className="max-w-3xl mx-auto min-h-screen flex flex-col justify-start items-center pt-40 px-4">
        {/* ✅ Adjusted the form position higher using pt-16 */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="w-full p-6 bg-white shadow-xl rounded-lg border border-gray-200"
        >
          <h1 className="text-2xl font-bold text-gray-700 text-center">
            Your Company Name
          </h1>
          <p className="text-gray-500 text-center mb-6">
            What would you like to name your company? You can change this later.
          </p>

          <motion.div whileHover={{ scale: 1.02 }}>
            <Label>Company Name</Label>
            <Input
              type="text"
              className="my-2 p-2 border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
              placeholder="JobHunt, Microsoft, etc."
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
            />
          </motion.div>

          <div className="flex items-center gap-4 mt-6 justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg shadow-md hover:bg-gray-300 transition"
              onClick={() => navigate("/admin/companies")}
            >
              Cancel
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition"
              onClick={registerNewCompany}
            >
              Continue
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default CompanyCreate;
