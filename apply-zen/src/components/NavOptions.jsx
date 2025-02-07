import React from "react";
import { NavLink } from "react-router-dom";
import { MdDashboard } from "react-icons/md";
import { ImProfile } from "react-icons/im";
import { PiNetworkXBold } from "react-icons/pi";
import { MdWorkHistory } from "react-icons/md";
import { IoIosArrowBack } from "react-icons/io";

const NavOptions = ({
  getScreenTitle,
  setIsSideBarHidden,
  isSideBarHidden,
}) => {
  return (
    <ul className=" space-y-8 text-lg text-gray-600 dark:text-white tracking-wider">
      <li
        className={`flex gap-2 items-center hover:text-primary font-medium transition-all duration-300 hover:translate-x-1.5 ${
          getScreenTitle() === "Dashboard" && "text-primary"
        }`}
      >
        <MdDashboard />
        <NavLink to={``}>Dashboard</NavLink>
      </li>
      <li
        className={`flex gap-2 items-center hover:text-primary font-medium transition-all duration-300 hover:translate-x-1.5 ${
          getScreenTitle() === "Add Job" && "text-primary"
        }`}
      >
        <PiNetworkXBold />
        <NavLink to={`/home/add-job`}>Add Job</NavLink>
      </li>
      <li
        className={`flex gap-2 items-center hover:text-primary font-medium transition-all duration-300 hover:translate-x-1.5 ${
          getScreenTitle() === "Applied Jobs" && "text-primary"
        }`}
      >
        <MdWorkHistory />
        <NavLink to={`/home/all-jobs`}>All Jobs</NavLink>
      </li>

      <li
        className={`flex gap-2 items-center hover:text-primary font-medium transition-all duration-300 hover:translate-x-1.5 ${
          getScreenTitle() === "Profile" && "text-primary"
        }`}
      >
        <ImProfile />
        <NavLink to={`/home/profile`}>Profile</NavLink>
      </li>
      <li
        className={`flex gap-2 items-center font-semibold transition-all duration-300 hover:translate-x-1.5 sm:hidden text-red-500`}
        onClick={() => setIsSideBarHidden(!isSideBarHidden)}
      >
        <IoIosArrowBack /> Close
      </li>
    </ul>
  );
};

export default NavOptions;
