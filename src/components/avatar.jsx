import profileImage from "../assets/profilepicture.png";
import PropTypes from "prop-types";

const Avatar = ({ userid, name, profile_pic, width, height }) => {
  let avatarName = "";
  if (name) {
    const splitName = name.split(" ");
    if (splitName.length > 1) {
      avatarName =
        splitName[0][0].toUpperCase() + splitName[1][0].toUpperCase();
    } else {
      avatarName = splitName[0][0].toUpperCase();
    }
  }
  const bgColor = [
    "bg-slate-800",
    "bg-red-800",
    "bg-lime-800",
    "bg-emerald-800",
    "bg-green-800",
    "bg-teal-800",
    "bg-cyan-800",
    "bg-sky-800",
    "bg-blue-800",
  ];
  const randomNumber = Math.floor(Math.random() * 9);
  return (
    <div
      className={`flex overflow-hidden rounded-full justify-center items-center text-white shadow shadow-gray-800 border text-lg border-gray-800 ${bgColor[randomNumber]}`}
      style={{ width: width + "px", height: height + "px" }}
    >
      {profile_pic ? (
        <img
          src={profile_pic}
          width={width}
          height={height}
          alt="Profile"
          className=" overflow-hidden rounded-full"
        />
      ) : name ? (
        <div
          className=" overflow-hidden rounded-full flex justify-center items-center"
          style={{ width: width + "px", height: height + "px" }}
        >
          {avatarName}
        </div>
      ) : (
        <img
          className="overflow-hidden rounded-full"
          width={width}
          height={height}
          alt="Default Profile"
          src={profileImage}
        ></img>
      )}
    </div>
  );
};

Avatar.propTypes = {
  userid: PropTypes.string,
  name: PropTypes.string,
  profile_pic: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
};

export default Avatar;
