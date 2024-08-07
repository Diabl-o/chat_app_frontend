import { AiFillMessage } from "react-icons/ai";
import profileImage from "../assets/profilepicture.png";
import { FaSignOutAlt } from "react-icons/fa";
import { MdOutlineSettings } from "react-icons/md";
import { useState } from "react";

const Sidenav = () => {
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
  return (
    <div className=" min-h-screen pl-5 pt-5 pb-5 pr-1">
      <div className="bg-[#0e0e0e] h-full w-20 rounded-3xl">
        <div className="flex flex-col h-full">
          <div className="flex justify-center pt-4">
            <img className=" rounded-full w-[60%]" src={profileImage}></img>
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
            >
              <MdOutlineSettings size={40} />
              <div
                className={`absolute bg-[#F3B559] h-full w-1 right-0  ${
                  isActive.button2 ? "opacity-100" : "opacity-0"
                }`}
              ></div>
            </button>
            <button className="flex items-center justify-center text-white mt-auto mb-4 p-3">
              <FaSignOutAlt size={30} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidenav;
