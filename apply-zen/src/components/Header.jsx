import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaAlignLeft, FaSun, FaMoon } from "react-icons/fa";
import { IoPersonCircleSharp } from "react-icons/io5";
import { AppContext } from "../context/AppContext";

const Header = ({ isSideBarHidden, setIsSideBarHidden, getScreenTitle }) => {
  const { isDark, setIsDark } = useContext(AppContext)
  const navigate = useNavigate()


  const toggleSidebar = () => {
    setIsSideBarHidden(!isSideBarHidden);
  };
  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDark]);

  return (
    <header
      className={`flex items-center justify-between bg-white px-8 py-4  dark:bg-zinc-600 tracking-widest`}
    >
      <FaAlignLeft
        className=" cursor-pointer hover:scale-110 transition-all duration-300 ease-in-out text-primary text-2xl"
        onClick={toggleSidebar}
      />
      <h1 className={`text-primary font-semibold`}>{getScreenTitle()}</h1>
      <section className={`flex items-center gap-6`}>
        {isDark ? (
          <FaSun
            className=" cursor-pointer hover:scale-110 text-white text-lg"
            onClick={toggleTheme}
          />
        ) : (
          <FaMoon
            className=" cursor-pointer hover:scale-110 transition-all duration-300 ease-in-out text-black text-sm"
            onClick={toggleTheme}
          />
        )}
        <IoPersonCircleSharp onClick={()=>navigate('/home/profile')}  className=" cursor-pointer hover:scale-110 transition-all duration-300 ease-in-out text-primary text-2xl max-lg:hidden" />
      </section>
    </header>
  );
};

export default Header;
