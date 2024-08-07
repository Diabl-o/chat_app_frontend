// import { useEffect } from "react";
// import { authAPI } from "../services/api";
import Sidenav from "../components/sidenav";
import Chats from "../components/chats";
import MessageBox from "../components/messagebox";
// import InfoBox from "../components/infobox";

const Home = () => {
  // useEffect(() => {
  //   const fetchdata = async () => {
  //     const response = await authAPI.get("/profile");
  //     console.log(response.data);
  //   };
  //   fetchdata();
  // }, []);
  return (
    <div className="flex bg-[#EFF6FC] ">
      <Sidenav />
      <Chats />
      <MessageBox />
      {/* <InfoBox /> */}
    </div>
  );
};

export default Home;
