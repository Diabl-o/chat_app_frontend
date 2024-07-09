import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import toast from "react-hot-toast";
import registerImage from "../assets/registerbg.jpg";
import { API } from "../services/api";

const Register = () => {
  const [data, setData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
  });
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((preve) => {
      return {
        ...preve,
        [name]: value,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(data);
    try {
      const response = await API.post("/auth/register", data);
      console.log(response.data);
      toast.success(response.data.message, {
        duration: 1000,
      });
      setTimeout(() => {
        toast(
          `We have sent an OTP to ${data.email}. Please check your email and verify it.`,
          {
            duration: 6000,
          }
        );
        navigate("/verifyOtp", { state: { email: data.email } });
      }, 1000);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };
  const navigate = useNavigate();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="relative flex flex-col m-6 space-y-8 bg-white shadow-2xl rounded-2xl md:flex-row md:space-y-0">
        <div className="relative ">
          <img
            src={registerImage}
            alt="img"
            className=" w-[400px] h-full hidden rounded-l-2xl md:block object-cover"
          />
        </div>
        <div className="flex flex-col justify-center p-8 md:p-14 md:py-10  w-full">
          <span className="mb-3 text-4xl font-bold">Hello!</span>
          <span className="font-light text-gray-400 mb-6">
            Sign Up to Get Started
          </span>
          <form className="">
            <div className="py-4">
              <label className="mb-2 text-md">Full Name</label>
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
                name="name"
                required
                value={data.name}
                onChange={handleOnChange}
              />
            </div>
            <div className="py-4">
              <label className="mb-2 text-md">Username</label>
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
                name="username"
                required
                value={data.username}
                onChange={handleOnChange}
              />
            </div>
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

            <button
              type="submit"
              onClick={handleSubmit}
              className="w-full bg-black text-white p-2 rounded-lg mb-6 border border-transparent hover:border-gray-300"
            >
              Register
            </button>
          </form>
          <div className="text-center text-gray-400">
            Already have an account?
            <span className="font-bold text-black">
              {" "}
              <a
                className=" hover:cursor-pointer"
                onClick={() => navigate("/")}
              >
                Login now
              </a>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
