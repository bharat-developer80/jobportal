import React, { useState } from "react";
import Navbar from "./shared/Navbar";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { Button } from "./ui/button";
import { Contact, Mail, Pen } from "lucide-react";
import { Badge } from "./ui/badge";
import { Label } from "./ui/label";
import AppliedJobTable from "./AppliedJobTable";
import UpdateProfileDialog from "./UpdateProfileDialog";
import { useSelector } from "react-redux";
import useGetAppliedJobs from "@/hooks/useGetAppliedJob";

const Profile = () => {
  useGetAppliedJobs();
  const [open, setOpen] = useState(false);
  const { user } = useSelector((store) => store.auth);

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      <div className="max-w-4xl mx-auto bg-white shadow-lg border border-gray-200 rounded-2xl my-10 p-6 md:p-8">
        {/* Profile Header */}
        <div className="flex flex-col md:flex-row md:justify-between items-center border-b pb-4 mb-4">
          <div className="flex flex-col md:flex-row items-center gap-4">
            <Avatar className="h-20 w-20 border-2 border-gray-300 rounded-full overflow-hidden">
              <AvatarImage
                src={user?.profile?.profilePhoto}
                className="w-full h-full object-cover"
              />
            </Avatar>
            <div className="text-center md:text-left">
              <h1 className="text-2xl font-semibold text-gray-800">
                {user?.fullname}
              </h1>
              <p className="text-gray-600 text-sm">
                {user?.profile?.bio || "No bio available"}
              </p>
            </div>
          </div>
          <Button
            onClick={() => setOpen(true)}
            variant="outline"
            className="flex items-center gap-2 mt-4 md:mt-0"
          >
            <Pen size={16} /> Edit
          </Button>
        </div>

        {/* Contact Information */}
        <div className="space-y-4">
          <div className="flex items-center gap-3 text-gray-700">
            <Mail size={18} />
            <span className="text-md">{user?.email}</span>
          </div>
          <div className="flex items-center gap-3 text-gray-700">
            <Contact size={18} />
            <span className="text-md">{user?.phoneNumber || "No phone number"}</span>
          </div>
        </div>

        {/* Skills Section */}
        <div className="my-6">
          <h2 className="font-semibold text-lg text-gray-800">Skills</h2>
          <div className="flex flex-wrap gap-2 mt-2">
            {user?.profile?.skills?.length ? (
              user.profile.skills.map((skill, index) => (
                <Badge
                  key={index}
                  className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm"
                >
                  {skill}
                </Badge>
              ))
            ) : (
              <span className="text-gray-500">No skills added</span>
            )}
          </div>
        </div>

        {/* Resume Section */}
        <div className="my-6">
          <Label className="text-lg font-semibold text-gray-800">Resume</Label>
          <div className="mt-2">
            {user?.profile?.resume ? (
              <a
                target="_blank"
                rel="noopener noreferrer"
                href={user.profile.resume}
                className="text-blue-500 hover:underline break-all"
              >
                {user.profile.resumeOriginalName || "Download Resume"}
              </a>
            ) : (
              <span className="text-gray-500">No Resume Available</span>
            )}
          </div>
        </div>

        {/* Applied Jobs Section */}
        <div className="mt-8 bg-gray-50 p-4 rounded-lg">
          <h2 className="font-semibold text-lg text-gray-800 border-b pb-2">
            Applied Jobs
          </h2>
          <AppliedJobTable />
        </div>
      </div>

      <UpdateProfileDialog open={open} setOpen={setOpen} />
    </div>
  );
};

export default Profile;
