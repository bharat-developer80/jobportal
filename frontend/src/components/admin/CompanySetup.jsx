import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { Button } from "../ui/button";
import { ArrowLeft, Loader2 } from "lucide-react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import axios from "axios";
import { COMPANY_API_END_POINT } from "@/utils/constant";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { useSelector } from "react-redux";
import useGetCompanyById from "@/hooks/useGetCompanyById";
import { motion } from "framer-motion"; // ✅ Smooth animations

const CompanySetup = () => {
  const params = useParams();
  useGetCompanyById(params.id);

  const [input, setInput] = useState({
    name: "",
    description: "",
    website: "",
    location: "",
    file: null,
  });
  
  const { singleCompany } = useSelector((store) => store.company);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setInput({
      name: singleCompany.name || "",
      description: singleCompany.description || "",
      website: singleCompany.website || "",
      location: singleCompany.location || "",
      file: singleCompany.file || null,
    });
  }, [singleCompany]);

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const changeFileHandler = (e) => {
    const file = e.target.files?.[0];
    setInput({ ...input, file });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", input.name);
    formData.append("description", input.description);
    formData.append("website", input.website);
    formData.append("location", input.location);
    if (input.file) {
      formData.append("file", input.file);
    }
    try {
      setLoading(true);
      const res = await axios.put(
        `${COMPANY_API_END_POINT}/update/${params.id}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        }
      );
      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/admin/companies");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar />
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="max-w-xl mx-auto mt-8 p-8 bg-white shadow-lg rounded-xl border border-gray-200"
      >
        <form onSubmit={submitHandler}>
          <div className="flex items-center gap-4 mb-6">
            <Button
              type="button"
              variant="outline"
              className="flex items-center gap-2 text-gray-500 font-semibold"
              onClick={() => navigate(-1)}
            >
              <ArrowLeft />
              <span>Back</span>
            </Button>
            <h1 className="font-bold text-xl">Company Setup</h1>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Company Name</Label>
              <Input
                type="text"
                name="name"
                value={input.name}
                onChange={changeEventHandler}
                placeholder="Enter company name"
                className="rounded-lg shadow-sm border-gray-300"
              />
            </div>
            <div>
              <Label>Description</Label>
              <Input
                type="text"
                name="description"
                value={input.description}
                onChange={changeEventHandler}
                placeholder="Brief description"
                className="rounded-lg shadow-sm border-gray-300"
              />
            </div>
            <div>
              <Label>Website</Label>
              <Input
                type="text"
                name="website"
                value={input.website}
                onChange={changeEventHandler}
                placeholder="https://example.com"
                className="rounded-lg shadow-sm border-gray-300"
              />
            </div>
            <div>
              <Label>Location</Label>
              <Input
                type="text"
                name="location"
                value={input.location}
                onChange={changeEventHandler}
                placeholder="City, Country"
                className="rounded-lg shadow-sm border-gray-300"
              />
            </div>
            <div className="col-span-2">
              <Label>Logo</Label>
              <Input
                type="file"
                accept="image/*"
                onChange={changeFileHandler}
                className="rounded-lg shadow-sm border-gray-300"
              />
            </div>
          </div>

          {loading ? (
            <Button className="w-full my-4 flex justify-center">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
            </Button>
          ) : (
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              type="submit"
              className="w-full my-4 bg-blue-500 text-white py-2 rounded-lg shadow-md hover:bg-blue-600 transition"
            >
              Update
            </motion.button>
          )}
        </form>
      </motion.div>
    </div>
  );
};

export default CompanySetup;
