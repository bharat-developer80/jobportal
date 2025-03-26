import React, { useEffect } from "react";
import Navbar from "./shared/Navbar";
import HeroSection from "./HeroSection";
import CategoryCarousel from "./CategoryCarousel";
import LatestJobs from "./LatestJobs";
import Footer from "./Footer";
import useGetAllJobs from "@/hooks/useGetAllJobs";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Home = () => {
  useGetAllJobs();
  const { user } = useSelector((store) => store.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.role === "recruiter") {
      navigate("/admin/companies");
    }
  }, [user, navigate]); // ✅ Added dependencies to prevent infinite re-renders

  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <HeroSection />
        <CategoryCarousel />
        <LatestJobs />
      </main>
      <Footer />
    </div>
  );
};

export default Home;
