import { IoSearch } from "react-icons/io5";
import profileImage from "../assets/profilepicture.png";
import "../assets/css/custum-scrollbar.css";
const Chats = () => {
  return (
    <div className="flex flex-col pl-[12px] pt-5 pb-[4px]  h-screen">
      <div className="relative h-12 pl-2 pr-2">
        <input
          className=" rounded-3xl h-12 shadow-[0px_4px_5px_2px_#79C5EF61] pl-12 w-full"
          placeholder="Search"
        ></input>
        <IoSearch
          size={25}
          className=" absolute top-[11px] left-[25px] opacity-50"
        />
      </div>
      <div className=" mt-4 flex-grow w-[350px]  flex flex-col overflow-hidden p-2 pb-4 pt-0">
        <div className=" bg-white flex flex-col flex-grow-[38] max-h-[38%] rounded-3xl shadow-[0px_4px_5px_2px_#79C5EF61] pt-5 pb-5 mb-4 overflow-hidden">
          <span className=" text-xl font-bold inline-block pr-5 pl-5">
            Groups
          </span>
          <div className="flex flex-col flex-grow w-full overflow-x-hidden overflow-y-scroll no-scrollbar">
            <div className="flex pb-2 pt-2 pr-5 pl-5 hover:bg-slate-200 cursor-pointer">
              <div className=" mr-5">
                <img src={profileImage} className="rounded-full h-10"></img>
              </div>
              <div className="flex justify-between flex-grow">
                <div className="flex flex-col mt-2 ">
                  <span className=" text-sm leading-3 font-semibold">
                    Group Name
                  </span>
                  <span className="text-sm font-light">
                    Last message is thajhsd
                  </span>
                </div>
                <div className="flex flex-col mt-2">
                  <span className="text-sm font-light leading-3 text-[#7c7c7c]">
                    Time
                  </span>
                  <div className="rounded-full bg-[#F24E1E;] text-center h-[17px] w-[17px] relative mt-1 flex self-end">
                    <span className=" absolute text-white text-sm top-[-0.5px] left-[4.4px]">
                      3
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <hr className=" border-[#B4ABABA8] border-[1px]" />
            <div className="flex pb-2 pt-2 pl-5 pr-5 hover:bg-slate-200 cursor-pointer">
              <div className=" mr-5">
                <img src={profileImage} className="rounded-full h-10"></img>
              </div>
              <div className="flex justify-between flex-grow">
                <div className="flex flex-col mt-2 ">
                  <span className=" text-sm leading-3 font-semibold">
                    Group Name
                  </span>
                  <span className="text-sm font-light">
                    Last message is thajhsd
                  </span>
                </div>
                <div className="flex flex-col mt-2">
                  <span className="text-sm font-light leading-3 text-[#7c7c7c]">
                    Time
                  </span>
                  <div className="rounded-full bg-[#F24E1E;] text-center h-[17px] w-[17px] relative mt-1 flex self-end">
                    <span className=" absolute text-white text-sm top-[-0.5px] left-[4.4px]">
                      3
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <hr className=" border-[#B4ABABA8] border-[1px]" />
            <div className="flex pb-2 pt-2 pr-5 pl-5 hover:bg-slate-200 cursor-pointer">
              <div className=" mr-5">
                <img src={profileImage} className="rounded-full h-10"></img>
              </div>
              <div className="flex justify-between flex-grow">
                <div className="flex flex-col mt-2 ">
                  <span className=" text-sm leading-3 font-semibold">
                    Group Name
                  </span>
                  <span className="text-sm font-light">
                    Last message is thajhsd
                  </span>
                </div>
                <div className="flex flex-col mt-2">
                  <span className="text-sm font-light leading-3 text-[#7c7c7c]">
                    Time
                  </span>
                  <div className="rounded-full bg-[#F24E1E;] text-center h-[17px] w-[17px] relative mt-1 flex self-end">
                    <span className=" absolute text-white text-sm top-[-0.5px] left-[4.4px]">
                      3
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <hr className=" border-[#B4ABABA8] border-[1px] mb-2" />
          </div>
        </div>

        <div className=" bg-white flex-grow-[62] max-h-[62%] rounded-3xl flex flex-col shadow-[0px_4px_5px_2px_#79C5EF61] pb-5 pt-5 overflow-hidden ">
          <span className=" text-xl font-bold pr-5 pl-5 inline-block">
            People
          </span>
          <div className="flex flex-col flex-grow w-full overflow-x-hidden overflow-y-scroll no-scrollbar">
            <div className="flex pb-2 pt-2 pr-5 pl-5 hover:bg-slate-200 cursor-pointer">
              <div className=" mr-5">
                <img src={profileImage} className="rounded-full h-10"></img>
              </div>
              <div className="flex justify-between flex-grow">
                <div className="flex flex-col mt-2 ">
                  <span className=" text-sm leading-3 font-semibold">
                    Group Name
                  </span>
                  <span className="text-sm font-light">
                    Last message is thajhsd
                  </span>
                </div>
                <div className="flex flex-col mt-2">
                  <span className="text-sm font-light leading-3 text-[#7c7c7c]">
                    Time
                  </span>
                  <div className="rounded-full bg-[#F24E1E;] text-center h-[17px] w-[17px] relative mt-1 flex self-end">
                    <span className=" absolute text-white text-sm top-[-0.5px] left-[4.4px]">
                      3
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <hr className=" border-[#B4ABABA8] border-[1px]" />
            <div className="flex pb-2 pt-2 pr-5 pl-5 hover:bg-slate-200 cursor-pointer">
              <div className=" mr-5">
                <img src={profileImage} className="rounded-full h-10"></img>
              </div>
              <div className="flex justify-between flex-grow">
                <div className="flex flex-col mt-2 ">
                  <span className=" text-sm leading-3 font-semibold">
                    Group Name
                  </span>
                  <span className="text-sm font-light">
                    Last message is thajhsd
                  </span>
                </div>
                <div className="flex flex-col mt-2">
                  <span className="text-sm font-light leading-3 text-[#7c7c7c]">
                    Time
                  </span>
                  <div className="rounded-full bg-[#F24E1E;] text-center h-[17px] w-[17px] relative mt-1 flex self-end">
                    <span className=" absolute text-white text-sm top-[-0.5px] left-[4.4px]">
                      3
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <hr className=" border-[#B4ABABA8] border-[1px]" />
            <div className="flex pb-2 pt-2 pr-5 pl-5 hover:bg-slate-200 cursor-pointer">
              <div className=" mr-5">
                <img src={profileImage} className="rounded-full h-10"></img>
              </div>
              <div className="flex justify-between flex-grow">
                <div className="flex flex-col mt-2 ">
                  <span className=" text-sm leading-3 font-semibold">
                    Group Name
                  </span>
                  <span className="text-sm font-light">
                    Last message is thajhsd
                  </span>
                </div>
                <div className="flex flex-col mt-2">
                  <span className="text-sm font-light leading-3 text-[#7c7c7c]">
                    Time
                  </span>
                  <div className="rounded-full bg-[#F24E1E;] text-center h-[17px] w-[17px] relative mt-1 flex self-end">
                    <span className=" absolute text-white text-sm top-[-0.5px] left-[4.4px]">
                      3
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <hr className=" border-[#B4ABABA8] border-[1px]" />
            <div className="flex pb-2 pt-2 pr-5 pl-5 hover:bg-slate-200 cursor-pointer">
              <div className=" mr-5">
                <img src={profileImage} className="rounded-full h-10"></img>
              </div>
              <div className="flex justify-between flex-grow">
                <div className="flex flex-col mt-2 ">
                  <span className=" text-sm leading-3 font-semibold">
                    Group Name
                  </span>
                  <span className="text-sm font-light">
                    Last message is thajhsd
                  </span>
                </div>
                <div className="flex flex-col mt-2">
                  <span className="text-sm font-light leading-3 text-[#7c7c7c]">
                    Time
                  </span>
                  <div className="rounded-full bg-[#F24E1E;] text-center h-[17px] w-[17px] relative mt-1 flex self-end">
                    <span className=" absolute text-white text-sm top-[-0.5px] left-[4.4px]">
                      3
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <hr className=" border-[#B4ABABA8] border-[1px]" />
            <div className="flex pb-2 pt-2 pr-5 pl-5 hover:bg-slate-200 cursor-pointer">
              <div className=" mr-5">
                <img src={profileImage} className="rounded-full h-10"></img>
              </div>
              <div className="flex justify-between flex-grow">
                <div className="flex flex-col mt-2 ">
                  <span className=" text-sm leading-3 font-semibold">
                    Group Name
                  </span>
                  <span className="text-sm font-light">
                    Last message is thajhsd
                  </span>
                </div>
                <div className="flex flex-col mt-2">
                  <span className="text-sm font-light leading-3 text-[#7c7c7c]">
                    Time
                  </span>
                  <div className="rounded-full bg-[#F24E1E;] text-center h-[17px] w-[17px] relative mt-1 flex self-end">
                    <span className=" absolute text-white text-sm top-[-0.5px] left-[4.4px]">
                      3
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <hr className=" border-[#B4ABABA8] border-[1px]" />
            <div className="flex pb-2 pt-2 pr-5 pl-5 hover:bg-slate-200 cursor-pointer">
              <div className=" mr-5">
                <img src={profileImage} className="rounded-full h-10"></img>
              </div>
              <div className="flex justify-between flex-grow">
                <div className="flex flex-col mt-2 ">
                  <span className=" text-sm leading-3 font-semibold">
                    Group Name
                  </span>
                  <span className="text-sm font-light">
                    Last message is thajhsd
                  </span>
                </div>
                <div className="flex flex-col mt-2">
                  <span className="text-sm font-light leading-3 text-[#7c7c7c]">
                    Time
                  </span>
                  <div className="rounded-full bg-[#F24E1E;] text-center h-[17px] w-[17px] relative mt-1 flex self-end">
                    <span className=" absolute text-white text-sm top-[-0.5px] left-[4.4px]">
                      3
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <hr className=" border-[#B4ABABA8] border-[1px]" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chats;
