import React, { useEffect, useState } from "react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from "@/utils/constant";
import { setSingleJob } from "@/redux/jobSlice";
import { toast } from "sonner";

const JobDescription = () => {
  const { singleJob } = useSelector((store) => store.job);
  const { user } = useSelector((store) => store.auth);
  const isInitiallyApplied =
    singleJob?.applications?.some(
      (application) => application.applicant === user?._id
    ) || false;

  const [isApplied, setIsApplied] = useState(isInitiallyApplied);
  const params = useParams();
  const jobId = params.id;
  const dispatch = useDispatch();

  const applyJobHandler = async () => {
    try {
      const res = await axios.get(
        `${APPLICATION_API_END_POINT}/apply/${jobId}`,
        { withCredentials: true }
      );
      if (res.data.success) {
        setIsApplied(true);
        const updatedSingleJob = {
          ...singleJob,
          applications: [...singleJob.applications, { applicant: user?._id }],
        };
        dispatch(setSingleJob(updatedSingleJob));
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to apply.");
    }
  };

  useEffect(() => {
    const fetchSingleJob = async () => {
      try {
        const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, {
          withCredentials: true,
        });
        if (res.data.success) {
          dispatch(setSingleJob(res.data.job));
          setIsApplied(
            res.data.job.applications.some(
              (application) => application.applicant === user?._id
            )
          );
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchSingleJob();
  }, [jobId, dispatch, user?._id]);

  return (
    <div className="max-w-4xl mx-auto my-10 p-6 bg-white shadow-lg rounded-lg border border-gray-200">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
        <div className="w-full">
          <h1 className="font-bold text-2xl text-gray-800">{singleJob?.title}</h1>
          {/* Badges */}
          <div className="flex flex-wrap items-center gap-2 mt-3">
            <Badge className="text-blue-600 font-bold bg-blue-100">
              {singleJob?.position} Positions
            </Badge>
            <Badge className="text-red-600 font-bold bg-red-100">
              {singleJob?.jobType}
            </Badge>
            <Badge className="text-purple-600 font-bold bg-purple-100">
              {singleJob?.salary} LPA
            </Badge>
          </div>
        </div>

        {/* Apply Button */}
        <Button
          onClick={isApplied ? null : applyJobHandler}
          disabled={isApplied}
          className={`mt-4 md:mt-0 px-6 py-3 rounded-lg text-white font-semibold shadow-md transition-all ${
            isApplied
              ? "bg-gray-500 cursor-not-allowed"
              : "bg-purple-600 hover:bg-purple-700"
          }`}
        >
          {isApplied ? "Already Applied" : "Apply Now"}
        </Button>
      </div>

      {/* Job Details Section */}
      <h2 className="border-b-2 border-gray-300 text-lg font-semibold py-3 text-gray-700">
        Job Details
      </h2>
      <div className="mt-4 space-y-2 text-gray-800">
        <p>
          <strong>Role:</strong>{" "}
          <span className="ml-2 text-gray-600">{singleJob?.title}</span>
        </p>
        <p>
          <strong>Location:</strong>{" "}
          <span className="ml-2 text-gray-600">{singleJob?.location}</span>
        </p>
        <p>
          <strong>Description:</strong>{" "}
          <span className="ml-2 text-gray-600">{singleJob?.description}</span>
        </p>
        <p>
          <strong>Experience:</strong>{" "}
          <span className="ml-2 text-gray-600">
            {singleJob?.experience} years
          </span>
        </p>
        <p>
          <strong>Salary:</strong>{" "}
          <span className="ml-2 text-gray-600">{singleJob?.salary} LPA</span>
        </p>
        <p>
          <strong>Total Applicants:</strong>{" "}
          <span className="ml-2 text-gray-600">
            {singleJob?.applications?.length}
          </span>
        </p>
        <p>
          <strong>Posted Date:</strong>{" "}
          <span className="ml-2 text-gray-600">
            {singleJob?.createdAt?.split("T")[0]}
          </span>
        </p>
      </div>
    </div>
  );
};

export default JobDescription;
