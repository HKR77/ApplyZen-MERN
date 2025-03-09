import React from "react";
import icon from "../assets/icon.svg";
import { useNavigate } from "react-router-dom";
import assets from "../assets/assets";

const Landing = () => {
  const navigate = useNavigate();
  return (
    <main className=" h-screen bg-gray-100">
      <div className=" container mx-auto py-6 px-6 lg:px-16 xl:px-20 flex flex-col">
        <div>
          <img className="h-12 md:h-14 " src={icon} alt="logo" />
        </div>

        {/*  */}
        <div className="flex-grow flex items-center pt-[20vh] ">
          <section className=" space-y-4 md:w-1/2">
            <div className=" flex gap-3 font-bold text-3xl lg:text-6xl tracking-wider">
              <span>Job</span>
              <span className="text-primary">Tracking</span>
              <span>App</span>
            </div>
            <p className=" tracking-wider leading-7 text-gray-500 text-sm">
              <span className="font-semibold">ApplyZen</span>, "
              <span className=" italic">
                A stress-free way to track job applications
              </span>
              ," simplifies your job hunt. Effortlessly monitor application
              statuses, track submissions, and stay organized, all in one place.
            </p>
            <div className="flex gap-4">
              <button
                className="bg-teal-50 border-2 border-primary cursor-pointer px-10 py-2 rounded font-semibold text-primary"
                onClick={() => navigate("/register")}
              >
                Register
              </button>
              <button
                className="bg-teal-50 border-2 border-primary cursor-pointer px-10 py-2 rounded font-semibold text-primary"
                onClick={() => navigate("/login")}
              >
                Login
              </button>
            </div>
          </section>
          <section className=" flex items-center justify-center justify-items-center  max-md:hidden md:w-1/2">
            <img src={assets.jobSearch} alt="job search image" className=" h-[250px]" />
          </section>
        </div>
      </div>
    </main>
  );
};

export default Landing;
