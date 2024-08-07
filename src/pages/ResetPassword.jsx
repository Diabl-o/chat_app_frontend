import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { API } from "../services/api";
import toast from "react-hot-toast";
import resetImage from "../assets/resetpassword.png";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const ResetPassword = () => {
  const navigate = useNavigate();
  const { token } = useParams();

  const [data, setdata] = useState({
    newPassword: "",
    confirmPassword: "",
  });
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setdata((prevData) => {
      return { ...prevData, [name]: value };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await API.post(
        "/auth/resetPassword",
        {
          newPassword: data.newPassword,
          confirmPassword: data.confirmPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success(response.data.message);
      navigate("/");
    } catch (error) {
      console.log(token);
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  const [visibility, setVisibility] = useState({
    newPassword: false,
    confirmPassword: false,
  });

  const toggleVisibility = (fieldname) => {
    setVisibility((prevState) => ({
      ...prevState,
      [fieldname]: !prevState[fieldname],
    }));
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="relative flex flex-col m-6 space-y-8 bg-white shadow-2xl rounded-2xl w-[560px]">
        <div className="flex flex-col justify-center p-14 ">
          <div className="flex justify-center items-center m-3">
            <img src={resetImage} className=" h-32"></img>
          </div>
          <span className=" flex mb-3 text-2xl font-bold items-center text-center justify-center">
            Reset Password
          </span>

          <form className="">
            <div className="py-4">
              <label className="mb-2 text-md">New Password</label>
              <div className="relative w-full">
                <input
                  type={visibility.newPassword ? "text" : "password"}
                  name="newPassword"
                  className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500 pr-10"
                  required
                  value={data.newPassword}
                  onChange={handleOnChange}
                />
                {visibility.newPassword ? (
                  <FaEyeSlash
                    name="newPassword"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer opacity-50"
                    onClick={() => toggleVisibility("newPassword")}
                  />
                ) : (
                  <FaEye
                    name="newPassword"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer opacity-50"
                    onClick={() => toggleVisibility("newPassword")}
                  />
                )}
              </div>
            </div>
            <div className="py-4">
              <label className="mb-2 text-md">Confirm Password</label>
              <div className="relative w-full">
                <input
                  type={visibility.confirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500 pr-10"
                  required
                  value={data.confirmPassword}
                  onChange={handleOnChange}
                />
                {visibility.confirmPassword ? (
                  <FaEyeSlash
                    name="confirmPassword"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer opacity-50"
                    onClick={() => toggleVisibility("confirmPassword")}
                  />
                ) : (
                  <FaEye
                    name="confirmPassword"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer opacity-50"
                    onClick={() => toggleVisibility("confirmPassword")}
                  />
                )}
              </div>
            </div>

            <button
              type="submit"
              onClick={handleSubmit}
              className="w-full bg-black text-white p-2 rounded-lg mb-6 border border-transparent hover:border hover:border-gray-300"
            >
              Submit
            </button>
          </form>

          <div className="text-center relative w-full">
            <a onClick={() => navigate("/")} className="hover:cursor-pointer">
              <span className=" absolute text-2xl left-[153px] top-[-3px]">
                {"<"}
              </span>
              <span className="text-gray-400">Back to Login</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
