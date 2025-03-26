import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "./ui/dialog";
import axios from "axios";
import { setUser } from "@/redux/authSlice";
import { toast } from "sonner";
import { Label } from "./ui/label";
import { Loader2, X } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useDispatch, useSelector } from "react-redux";
import { USER_API_END_POINT } from "@/utils/constant";

const UpdateProfileDialog = ({ open, setOpen }) => {
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((store) => store.auth);

  const [input, setInput] = useState({
    fullname: user?.fullname || "",
    email: user?.email || "",
    phoneNumber: user?.phoneNumber || "",
    bio: user?.profile?.bio || "",
    skills: user?.profile?.skills?.join(", ") || "",
    file: null,
  });

  const dispatch = useDispatch();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const fileChangeHandler = (e) => {
    setInput({ ...input, file: e.target.files[0] });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("bio", input.bio);
    formData.append("skills", input.skills);
    if (input.file) {
      formData.append("file", input.file);
    }

    try {
      const res = await axios.post(`${USER_API_END_POINT}/profile/update`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });

      if (res.data.success) {
        dispatch(setUser(res.data.user));
        toast.success(res.data.message);
        setOpen(false);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[450px]">
        {/* Close Button */}
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
          onClick={() => setOpen(false)}
        >
          <X size={20} />
        </button>

        <DialogHeader>
          <DialogTitle>Update Profile</DialogTitle>
        </DialogHeader>

        <form onSubmit={submitHandler}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="fullname" className="text-right">
                Name
              </Label>
              <Input
                id="fullname"
                name="fullname"
                value={input.fullname}
                onChange={changeEventHandler}
                type="text"
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">
                Email
              </Label>
              <Input
                id="email"
                name="email"
                value={input.email}
                onChange={changeEventHandler}
                type="email"
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="phoneNumber" className="text-right">
                Phone
              </Label>
              <Input
                id="phoneNumber"
                name="phoneNumber"
                value={input.phoneNumber}
                onChange={changeEventHandler}
                type="tel"
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="bio" className="text-right">
                Bio
              </Label>
              <Input
                id="bio"
                name="bio"
                value={input.bio}
                onChange={changeEventHandler}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="skills" className="text-right">
                Skills
              </Label>
              <Input
                id="skills"
                name="skills"
                value={input.skills}
                onChange={changeEventHandler}
                placeholder="Comma-separated skills"
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="file" className="text-right">
                Resume
              </Label>
              <Input
                id="file"
                name="file"
                type="file"
                accept=".pdf"
                onChange={fileChangeHandler}
                className="col-span-3"
              />
            </div>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              className="w-full"
            >
              Cancel
            </Button>
            <Button type="submit" className="w-full my-2" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Updating...
                </>
              ) : (
                "Update"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateProfileDialog;
