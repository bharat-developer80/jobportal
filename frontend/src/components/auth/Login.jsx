import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setUser } from "@/redux/authSlice";
import { Loader2 } from "lucide-react";
import { USER_API_END_POINT } from "@/utils/constant";

const Login = () => {
  const [input, setInput] = useState({
    email: "",
    password: "",
    role: "",
  });

  const { loading, user } = useSelector((store) => store.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });

      if (res.data.success) {
        dispatch(setUser(res.data.user));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(
        error.response?.data?.message || "Login failed. Please try again."
      );
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4 sm:px-6">
        {/* Responsive Card Container */}
        <motion.form
          onSubmit={submitHandler}
          className="w-full max-w-md bg-white shadow-lg rounded-xl p-6 sm:p-8 md:p-10"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <h1 className="text-2xl md:text-3xl font-bold text-center text-gray-800">Login</h1>
          <p className="text-sm md:text-base text-gray-500 text-center mb-6">
            Welcome back! Please enter your credentials.
          </p>

          {/* Email Input */}
          <div className="mb-4">
            <Label>Email</Label>
            <Input
              type="email"
              value={input.email}
              name="email"
              onChange={changeEventHandler}
              placeholder="bharat@gmail.com"
              className="mt-2 p-3 text-base md:text-lg"
            />
          </div>

          {/* Password Input */}
          <div className="mb-4">
            <Label>Password</Label>
            <Input
              type="password"
              value={input.password}
              name="password"
              onChange={changeEventHandler}
              placeholder="********"
              className="mt-2 p-3 text-base md:text-lg"
            />
          </div>

          {/* Role Selection */}
          <div className="flex flex-col sm:flex-row justify-between mb-5">
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="role"
                value="student"
                checked={input.role === "student"}
                onChange={changeEventHandler}
                className="cursor-pointer accent-[#6A38C2] w-4 h-4 sm:w-5 sm:h-5"
              />
              <span className="text-sm md:text-lg text-gray-700">Student</span>
            </label>
            <label className="flex items-center space-x-2 mt-2 sm:mt-0">
              <input
                type="radio"
                name="role"
                value="recruiter"
                checked={input.role === "recruiter"}
                onChange={changeEventHandler}
                className="cursor-pointer accent-[#6A38C2] w-4 h-4 sm:w-5 sm:h-5"
              />
              <span className="text-sm md:text-lg text-gray-700">Recruiter</span>
            </label>
          </div>

          {/* Animated Button */}
          {loading ? (
            <Button className="w-full bg-[#6A38C2] hover:bg-[#5b30a6] text-white flex items-center justify-center py-3 text-lg">
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Please wait
            </Button>
          ) : (
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button className="w-full bg-[#6A38C2] hover:bg-[#5b30a6] text-white transition py-3 text-lg">
                Login
              </Button>
            </motion.div>
          )}

          {/* Signup Link */}
          <p className="text-center text-sm md:text-md text-gray-500 mt-4">
            Don't have an account?{" "}
            <Link to="/signup" className="text-[#6A38C2] hover:underline font-semibold">
              Sign Up
            </Link>
          </p>
        </motion.form>
      </div>
    </div>
  );
};

export default Login;
