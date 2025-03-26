import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { RadioGroup } from "../ui/radio-group";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";
import { setLoading } from "@/redux/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { Loader2 } from "lucide-react";
import imageCompression from "browser-image-compression";

const Signup = () => {
  const [input, setInput] = useState({
    fullname: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: "",
    file: "",
  });

  const { loading, user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const compressImage = async (file) => {
    if (!file) return null;
    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 800,
      useWebWorker: true,
    };
    try {
      return await imageCompression(file, options);
    } catch (error) {
      console.error("Image compression error:", error);
      return file;
    }
  };

  const changeFileHandler = async (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const compressedFile = await compressImage(file);
      setInput({ ...input, file: compressedFile });
    }
  };

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("password", input.password);
    formData.append("role", input.role);
    if (input.file) formData.append("file", input.file);

    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });

      if (res.data.success) {
        navigate("/login");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Signup failed");
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  });

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      <div className="flex items-center justify-center min-h-screen px-4 sm:px-0">
        <motion.form
          onSubmit={submitHandler}
          className="w-full max-w-lg bg-white shadow-lg rounded-xl p-6 sm:p-12"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <h1 className="text-2xl font-bold text-center text-gray-800">Sign Up</h1>
          <p className="text-sm text-gray-500 text-center mb-6">
            Create an account to get started!
          </p>

          <div className="space-y-4">
            <div>
              <Label>Full Name</Label>
              <Input
                type="text"
                name="fullname"
                value={input.fullname}
                onChange={changeEventHandler}
                placeholder="John Doe"
                className="w-full"
              />
            </div>
            <div>
              <Label>Email</Label>
              <Input
                type="email"
                name="email"
                value={input.email}
                onChange={changeEventHandler}
                placeholder="john@example.com"
                className="w-full"
              />
            </div>
            <div>
              <Label>Phone Number</Label>
              <Input
                type="text"
                name="phoneNumber"
                value={input.phoneNumber}
                onChange={changeEventHandler}
                placeholder="1234567890"
                className="w-full"
              />
            </div>
            <div>
              <Label>Password</Label>
              <Input
                type="password"
                name="password"
                value={input.password}
                onChange={changeEventHandler}
                placeholder="********"
                className="w-full"
              />
            </div>

            {/* Role Selection & File Upload - Responsive */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <Label>Role</Label>
                <RadioGroup className="flex flex-wrap gap-4 mt-2">
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="role"
                      value="student"
                      checked={input.role === "student"}
                      onChange={changeEventHandler}
                      className="cursor-pointer accent-[#6A38C2]"
                    />
                    <span className="text-gray-700">Student</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="role"
                      value="recruiter"
                      checked={input.role === "recruiter"}
                      onChange={changeEventHandler}
                      className="cursor-pointer accent-[#6A38C2]"
                    />
                    <span className="text-gray-700">Recruiter</span>
                  </label>
                </RadioGroup>
              </div>

              <div>
                <Label>Profile Picture</Label>
                <Input
                  accept="image/*"
                  type="file"
                  onChange={changeFileHandler}
                  className="cursor-pointer w-full sm:w-auto"
                />
              </div>
            </div>
          </div>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="mt-6">
            <Button className="w-full bg-[#6A38C2] hover:bg-[#5b30a6] text-white py-3">
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Please wait...
                </>
              ) : (
                "Sign Up"
              )}
            </Button>
          </motion.div>

          <p className="text-center text-sm text-gray-500 mt-4">
            Already have an account?{" "}
            <Link to="/login" className="text-[#6A38C2] hover:underline">
              Login
            </Link>
          </p>
        </motion.form>
      </div>
    </div>
  );
};

export default Signup;
