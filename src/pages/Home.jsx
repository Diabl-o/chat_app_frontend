import { useEffect } from "react";
import { authAPI } from "../services/api";
import Sidenav from "../components/sidenav";
import Chats from "../components/chats";
import MessageBox from "../components/messagebox";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { logout, setUser } from "../redux/userSlice";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  console.log("data", user);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await authAPI.get("/profile");
        dispatch(setUser(response.data.user));
      } catch (error) {
        dispatch(logout());
        toast.error("Session Expired");
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        navigate("/");
      }
    };
    fetchUserData();
  }, [dispatch, navigate]);
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
