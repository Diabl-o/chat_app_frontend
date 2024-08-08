import { AiFillMessage } from "react-icons/ai";
import { FaSignOutAlt } from "react-icons/fa";
import { MdOutlineSettings } from "react-icons/md";
import { useState } from "react";
import { refreshAPI } from "../services/api";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/userSlice";
import Avatar from "./avatar";

const Sidenav = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const [editProfile, setEditProfile] = useState(false);
  const [isActive, setIsActive] = useState({
    button1: true,
    button2: false,
  });
  const handleClick = (button) => {
    setIsActive({
      button1: button === "button1",
      button2: button === "button2",
    });
  };

  const handelLogout = async () => {
    try {
      const response = await refreshAPI.post("/auth/logout");
      toast.success(response.data.message);
      dispatch(logout());
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      navigate("/");
    } catch (error) {
      toast.error("Session Expired");
      if (error.response.logout) {
        dispatch(logout());
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        navigate("/");
      }
    }
  };
  return (
    <div className=" min-h-screen pl-5 pt-5 pb-5 pr-1">
      <div className="bg-[#0e0e0e] h-full w-20 rounded-3xl">
        <div className="flex flex-col h-full">
          <div className="flex justify-center pt-4">
            <button
              className="mx-auto"
              title="Profile"
              onClick={() => setEditProfile(true)}
            >
              <Avatar width={50} height={50} name={user.name} />
            </button>
          </div>
          <div className="flex flex-col h-full ">
            <button
              className={` text-white flex items-center justify-center w-full mt-9 p-3 relative   ${
                isActive.button1
                  ? "bg-slate-600 hover:bg-slate-500"
                  : "hover:bg-slate-800"
              }`}
              onClick={() => handleClick("button1")}
              aria-label="Messages"
              title="Chats"
            >
              <AiFillMessage size={40} />
              <div
                className={`absolute bg-[#F3B559] h-full w-1 right-0  ${
                  isActive.button1 ? "opacity-100" : "opacity-0"
                }`}
              ></div>
            </button>
            <button
              className={`text-white flex items-center justify-center w-full mt-2 p-3 relative  ${
                isActive.button2
                  ? "bg-slate-600 hover:bg-slate-500"
                  : "hover:bg-slate-800"
              }`}
              onClick={() => handleClick("button2")}
              aria-label="Settings"
              title="Settings"
            >
              <MdOutlineSettings size={40} />
              <div
                className={`absolute bg-[#F3B559] h-full w-1 right-0  ${
                  isActive.button2 ? "opacity-100" : "opacity-0"
                }`}
              ></div>
            </button>
            <button
              onClick={handelLogout}
              className="flex items-center justify-center text-white mt-auto mb-4 p-3 cursor-pointer"
              title="Logout"
            >
              <FaSignOutAlt size={30} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidenav;
