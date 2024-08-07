import { useState, useRef, useEffect } from "react";
import { API } from "../services/api";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";

const Otp = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [secondsLeft, setSecondsLeft] = useState(() => {
    const savedSeconds = localStorage.getItem("secondsLeft");
    return savedSeconds ? parseInt(savedSeconds, 10) : 180; // 3 minutes = 180 seconds
  });
  const [resendVisible, setResendVisible] = useState(() => {
    const expired = localStorage.getItem("otpExpired");
    return expired === "true";
  });
  const inputRefs = useRef([]);
  const location = useLocation();
  const { email } = location.state;

  useEffect(() => {
    if (secondsLeft > 0) {
      const timerId = setInterval(() => {
        setSecondsLeft((prev) => {
          const newSeconds = prev - 1;
          localStorage.setItem("secondsLeft", newSeconds);
          return newSeconds;
        });
      }, 1000);
      return () => clearInterval(timerId);
    } else {
      setResendVisible(true);
      localStorage.removeItem("secondsLeft");
      localStorage.setItem("otpExpired", "true");
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
      localStorage.removeItem("secondsLeft");
      localStorage.removeItem("otpExpired");
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
      localStorage.setItem("secondsLeft", 180);
      localStorage.setItem("otpExpired", "false");
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

  const otpExpired = localStorage.getItem("otpExpired") === "true";

  return (
    <div className="flex justify-center items-center flex-col min-h-screen">
      <div>
        <div className="flex justify-center text-2xl font-bold">
          {otpExpired
            ? "Your OTP has expired"
            : `Your OTP will expire in ${formatTime(secondsLeft)}`}
        </div>
        <div className="flex justify-center items-center mt-12">
          <form onSubmit={handleSubmit} className="flex gap-2.5">
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
                className={
                  "w-10 h-10 text-center text-lg border border-gray-300 rounded outline-none transition duration-200 focus:border-green-500 focus:shadow-[0_0_5px_rgba(76,175,80,0.5)] focus:shadow-green-500"
                }
              />
            ))}
            <button
              type="submit"
              className="px-5 py-2 bg-[#4CAF50] text-white text-lg rounded cursor-pointer hover:bg-green-600"
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
    </div>
  );
};

export default Otp;
