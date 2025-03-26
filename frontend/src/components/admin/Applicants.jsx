import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Navbar from "../shared/Navbar";
import ApplicantsTable from "./ApplicantsTable";
import axios from "axios";
import { APPLICATION_API_END_POINT } from "@/utils/constant";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setAllApplicants } from "@/redux/applicationSlice";

const Applicants = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const { applicants } = useSelector((store) => store.application);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllApplicants = async () => {
      try {
        const res = await axios.get(
          `${APPLICATION_API_END_POINT}/${params.id}/applicants`,
          { withCredentials: true }
        );
        dispatch(setAllApplicants(res.data.job));
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchAllApplicants();
  }, [dispatch, params.id]);

  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h1
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="font-bold text-2xl my-5 text-center"
        >
          Applicants ({applicants?.applications?.length || 0})
        </motion.h1>
        {loading ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center text-gray-500 py-10"
          >
            Loading applicants...
          </motion.div>
        ) : (
          <ApplicantsTable />
        )}
      </div>
    </div>
  );
};

export default Applicants;
