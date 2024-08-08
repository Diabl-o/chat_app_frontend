import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import googleLogo from "../assets/google.svg";
import loginImage from "../assets/loginbg.jpg";
import { API } from "../services/api";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setToken } from "../redux/userSlice";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await API.post("/auth/login", data);
      toast.success(response.data.message);
      dispatch(setToken(response.data));
      localStorage.setItem("accessToken", response.data.accessToken);
      localStorage.setItem("refreshToken", response.data.refreshToken);
      navigate("/Home");
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };
  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="relative flex flex-col m-6 space-y-8 bg-white shadow-2xl rounded-2xl md:flex-row md:space-y-0">
        <div className="flex flex-col justify-center p-8 md:p-14">
          <span className="mb-3 text-4xl font-bold">Hello Again!</span>
          <span className="font-light text-gray-400 mb-8">
            Welcome back! Please enter your details
          </span>
          <form className="">
            <div className="py-4">
              <label className="mb-2 text-md">Email</label>
              <input
                type="email"
                className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
                name="email"
                required
                value={data.email}
                onChange={handleOnChange}
              />
            </div>
            <div className="py-4">
              <label className="mb-2 text-md">Password</label>
              <div className="relative w-full">
                <input
                  type={passwordVisible ? "text" : "password"}
                  name="password"
                  className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500 pr-10"
                  required
                  value={data.password}
                  onChange={handleOnChange}
                />
                {passwordVisible ? (
                  <FaEyeSlash
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer opacity-50"
                    onClick={togglePasswordVisibility}
                  />
                ) : (
                  <FaEye
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer opacity-50"
                    onClick={togglePasswordVisibility}
                  />
                )}
              </div>
            </div>
            <div className="flex justify-between w-full py-3">
              <div className="mr-24">
                <input type="checkbox" name="ch" id="ch" className="mr-2" />
                <span className="text-md">Remember me</span>
              </div>
              <span className="font-bold text-md">
                {" "}
                <a
                  className=" hover:cursor-pointer"
                  onClick={() => navigate("/forgot-password")}
                >
                  Forgot password?
                </a>
              </span>
            </div>
            <button
              type="submit"
              onClick={handleSubmit}
              className="w-full bg-black text-white p-2 rounded-lg mb-6 border border-transparent hover:border hover:border-gray-300"
            >
              Login
            </button>
          </form>
          <button className="w-full border border-gray-300 text-md p-2 rounded-lg mb-6  hover:bg-black hover:text-white">
            <img src={googleLogo} alt="img" className="w-6 h-6 inline mr-2" />
            Sign in with Google
          </button>
          <div className="text-center text-gray-400">
            Dont&apos;have an account?
            <span className="font-bold text-black">
              {" "}
              <a
                className=" hover:cursor-pointer"
                onClick={() => navigate("/Register")}
              >
                Register now
              </a>
            </span>
          </div>
        </div>

        <div className="relative ">
          <img
            src={loginImage}
            alt="img"
            className="w-[400px] h-full hidden rounded-r-2xl md:block object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
