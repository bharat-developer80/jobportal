import React, { useState } from "react";
import { motion } from "framer-motion"; // Importing framer-motion
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useSelector } from "react-redux";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import axios from "axios";
import { JOB_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";

const PostJob = () => {
  const [input, setInput] = useState({
    title: "",
    description: "",
    requirements: "",
    salary: "",
    location: "",
    jobType: "",
    experience: "",
    position: 0,
    companyId: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { companies } = useSelector((store) => store.company);

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const selectChangeHandler = (value) => {
    const selectedCompany = companies.find(
      (company) => company.name.toLowerCase() === value
    );
    setInput({ ...input, companyId: selectedCompany._id });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axios.post(`${JOB_API_END_POINT}/post`, input, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/admin/jobs");
      }
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center min-h-screen my-5">
        {/* Animated form */}
        <motion.form
          onSubmit={submitHandler}
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="p-8 max-w-4xl w-full border border-gray-300 shadow-2xl rounded-lg bg-white"
        >
          <h2 className="text-2xl font-bold text-center mb-6 text-gray-700">
            Post a New Job
          </h2>

          <div className="grid grid-cols-2 gap-4">
            {[
              { label: "Title", name: "title" },
              { label: "Description", name: "description" },
              { label: "Requirements", name: "requirements" },
              { label: "Salary", name: "salary" },
              { label: "Location", name: "location" },
              { label: "Job Type", name: "jobType" },
              { label: "Experience Level", name: "experience" },
            ].map(({ label, name }) => (
              <motion.div
                key={name}
                whileHover={{ scale: 1.02 }}
                whileFocus={{ scale: 1.05 }}
              >
                <Label>{label}</Label>
                <Input
                  type="text"
                  name={name}
                  value={input[name]}
                  onChange={changeEventHandler}
                  className="focus:ring-2 focus:ring-blue-400 focus:outline-none border-gray-300 p-2 rounded-lg shadow-sm my-1"
                />
              </motion.div>
            ))}

            <motion.div whileHover={{ scale: 1.02 }}>
              <Label>No of Positions</Label>
              <Input
                type="number"
                name="position"
                value={input.position}
                onChange={changeEventHandler}
                className="focus:ring-2 focus:ring-blue-400 focus:outline-none border-gray-300 p-2 rounded-lg shadow-sm my-1"
              />
            </motion.div>

            {companies.length > 0 && (
              <motion.div whileHover={{ scale: 1.02 }}>
                <Label>Select a Company</Label>
                <Select onValueChange={selectChangeHandler}>
                  <SelectTrigger className="w-full border-gray-300 p-2 rounded-lg shadow-sm">
                    <SelectValue placeholder="Choose Company" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {companies.map((company) => (
                        <SelectItem key={company._id} value={company?.name?.toLowerCase()}>
                          {company.name}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </motion.div>
            )}
          </div>

          {/* Animated button */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mt-6"
          >
            {loading ? (
              <Button className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition flex items-center justify-center">
                <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Posting...
              </Button>
            ) : (
              <Button
                type="submit"
                className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
              >
                Post New Job
              </Button>
            )}
          </motion.div>

          {/* Alert if no companies exist */}
          {companies.length === 0 && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-xs text-red-600 font-bold text-center mt-3"
            >
              * Please register a company first before posting a job.
            </motion.p>
          )}
        </motion.form>
      </div>
    </div>
  );
};

export default PostJob;
