import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { API } from "../services/api";
import toast from "react-hot-toast";
import forgotImage from "../assets/forgot.png";

const ForgotPassword = () => {
  const navigate = useNavigate();

  const [email, setemail] = useState("");
  const handleOnChange = (e) => {
    const { value } = e.target;
    setemail(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await API.post("/auth/sendResetPasswordEmail", {
        email,
      });
      toast.success(response.data.message);
      navigate("/");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="relative flex flex-col m-6 space-y-8 bg-white shadow-2xl rounded-2xl w-[560px]">
        <div className="flex flex-col justify-center p-14 ">
          <div className="flex justify-center items-center m-3">
            <img src={forgotImage} className=" h-32"></img>
          </div>
          <span className=" flex mb-3 text-2xl font-bold items-center text-center justify-center">
            Forgot Password
          </span>

          <span className="flex items-center justify-center font-light text-gray-400 mb-6 text-center ">
            Enter your email and we w&apos;ll send you a link to reset your
            password.
          </span>

          <form className="">
            <div className="py-4">
              <label className="mb-2 text-md">Email</label>
              <input
                type="email"
                className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
                name="email"
                required
                value={email}
                onChange={handleOnChange}
              />
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

export default ForgotPassword;
