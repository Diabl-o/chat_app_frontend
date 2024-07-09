import { useState, useRef, useEffect } from "react";
import { API } from "../services/api";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";

const Otp = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [secondsLeft, setSecondsLeft] = useState(180); // 3 minutes = 180 seconds
  const [resendVisible, setResendVisible] = useState(false);
  const inputRefs = useRef([]);
  const location = useLocation();
  const { email } = location.state;

  useEffect(() => {
    if (secondsLeft > 0) {
      const timerId = setInterval(() => {
        setSecondsLeft((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timerId);
    } else {
      setResendVisible(true);
    }
  }, [secondsLeft]);

  const handleChange = (element, index) => {
    if (isNaN(element.value)) return;

    let newOtp = [...otp];
    newOtp[index] = element.value;
    setOtp(newOtp);

    // Move to the next input field
    if (element.value !== "" && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleBackspace = (element, index) => {
    if (element.value === "" && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await API.post("/auth/otpVerify", {
        otp: otp.join(""),
        email,
      });
      console.log(response.data);
      toast.success(response.data.message);
      navigate("/");
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  const handleResend = async () => {
    try {
      const response = await API.post("/auth/resendOtp", { email });
      console.log(response.data);
      toast.success(response.data.message, {
        duration: 1000,
      });
      setTimeout(() => {
        toast(
          `We have sent an OTP to ${email}. Please check your email and verify it.`,
          {
            duration: 6000,
          }
        );
      }, 1000);
      setOtp(new Array(6).fill(""));
      setSecondsLeft(180);
      setResendVisible(false);
      inputRefs.current[0].focus();
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  return (
    <div>
      <div className="flex justify-center text-4xl font-bold">
        {secondsLeft > 0
          ? `Your OTP will expire in ${formatTime(secondsLeft)}`
          : "Your OTP has expired"}
      </div>
      <div className="flex justify-center items-center mt-10">
        <form onSubmit={handleSubmit} className="flex gap-4">
          {otp.map((data, index) => (
            <input
              key={index}
              type="text"
              maxLength="1"
              value={data}
              onChange={(e) => handleChange(e.target, index)}
              onKeyDown={(e) =>
                e.key === "Backspace" && handleBackspace(e.target, index)
              }
              ref={(el) => (inputRefs.current[index] = el)}
              className={`w-10 h-10 text-center text-lg border border-gray-300 rounded-md outline-none transition duration-200 ${
                data.length === 1 ? "border-green-500 shadow-md" : ""
              }`}
            />
          ))}
          <button
            type="submit"
            className="px-5 py-2 bg-green-500 text-white text-lg rounded-md cursor-pointer hover:bg-green-600"
          >
            Submit
          </button>
        </form>
      </div>
      {resendVisible && (
        <button
          onClick={handleResend}
          className=" w-full bg-blue-600 text-white text-lg font-medium py-2 px-4 rounded-md mt-5"
        >
          Resend OTP
        </button>
      )}
    </div>
  );
};

export default Otp;
