import React, { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { Avatar, AvatarImage } from "../ui/avatar";
import { LogOut, User2, Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { USER_API_END_POINT } from "@/utils/constant";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import axios from "axios";
import { setUser } from "@/redux/authSlice";
import { motion } from "framer-motion";

const Navbar = () => {
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${USER_API_END_POINT}/logout`, {
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(null));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Logout failed");
    }
  };

  return (
    <motion.div
      className="bg-white shadow-md"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center justify-between px-6 md:px-10 mx-auto max-w-7xl h-20">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold flex items-center">
          Hire<span className="text-[#6A38C2]">Up</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-10">
          <ul className="flex font-medium text-gray-700 items-center gap-5">
            {user?.role === "recruiter" ? (
              <>
                <li>
                  <Link
                    to="/admin/companies"
                    className="hover:text-[#6A38C2] transition"
                  >
                    Companies
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/jobs"
                    className="hover:text-[#6A38C2] transition"
                  >
                    Jobs
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/" className="hover:text-[#6A38C2] transition">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/jobs" className="hover:text-[#6A38C2] transition">
                    Jobs
                  </Link>
                </li>
                <li>
                  <Link
                    to="/browse"
                    className="hover:text-[#6A38C2] transition"
                  >
                    Browse
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>

        {/* User Authentication Section */}
        {!user ? (
          <div className="hidden md:flex items-center gap-3">
            <Link to="/login">
              <Button variant="outline" className="hover:bg-gray-100">
                Login
              </Button>
            </Link>
            <Link to="/signup">
              <Button className="bg-[#6A38C2] hover:bg-[#5b30a6] transition-all">
                Sign Up
              </Button>
            </Link>
          </div>
        ) : (
          <Popover>
            <PopoverTrigger asChild>
              <Avatar className="cursor-pointer hover:ring-2 hover:ring-[#6A38C2] transition">
                <AvatarImage
                  src={user?.profile?.profilePhoto}
                  alt={user?.fullname}
                />
              </Avatar>
            </PopoverTrigger>
            <PopoverContent className="w-80">
              <div className="flex gap-2 space-y-2">
                <Avatar className="cursor-pointer">
                  <AvatarImage
                    src={user?.profile?.profilePhoto}
                    alt={user?.fullname}
                  />
                </Avatar>
                <div>
                  <h4 className="font-medium">{user?.fullname}</h4>
                  <p className="text-sm text-muted-foreground">
                    {user?.profile?.bio}
                  </p>
                </div>
              </div>
              <div className="flex flex-col text-gray-600">
                {user?.role === "student" && (
                  <div className="flex w-fit my-2 items-center gap-2 cursor-pointer">
                    <User2 />
                    <Button variant="link">
                      <Link to="/profile">View Profile</Link>
                    </Button>
                  </div>
                )}
              </div>
              <div className="flex w-fit items-center gap-2 cursor-pointer">
                <LogOut />
                <Button onClick={logoutHandler} variant="link">
                  Logout
                </Button>
              </div>
            </PopoverContent>
          </Popover>
        )}

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-20 left-0 w-full bg-white shadow-lg py-5 z-50">
          <ul className="flex flex-col items-center gap-4 font-medium text-gray-700">
            {user?.role === "recruiter" ? (
              <>
                <li>
                  <Link
                    to="/admin/companies"
                    className="hover:text-[#6A38C2] transition"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Companies
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/jobs"
                    className="hover:text-[#6A38C2] transition"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Jobs
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link
                    to="/"
                    className="hover:text-[#6A38C2] transition"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    to="/jobs"
                    className="hover:text-[#6A38C2] transition"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Jobs
                  </Link>
                </li>
                <li>
                  <Link
                    to="/browse"
                    className="hover:text-[#6A38C2] transition"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Browse
                  </Link>
                </li>
              </>
            )}
            {!user ? (
              <>
                <li>
                  <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                    <Button variant="outline" className="w-full">
                      Login
                    </Button>
                  </Link>
                </li>
                <li>
                  <Link to="/signup" onClick={() => setIsMenuOpen(false)}>
                    <Button className="bg-[#6A38C2] w-full">Sign Up</Button>
                  </Link>
                </li>
              </>
            ) : (
              <>
                {user?.role === "student" && (
                  <li>
                    <Link
                      to="/profile"
                      className="hover:text-[#6A38C2]"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      View Profile
                    </Link>
                  </li>
                )}
                <li>
                  <button onClick={logoutHandler} className="text-red-600">
                    Logout
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      )}
    </motion.div>
  );
};

export default Navbar;
