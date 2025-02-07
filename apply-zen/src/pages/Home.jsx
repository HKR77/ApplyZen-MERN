import React, { useContext, useState, useEffect } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import NavOptions from "../components/NavOptions";
import Header from "../components/Header";
import assets from "../assets/assets";
import Loading from "../components/Loading";
import { checkAuth, fetchUserProfile, getScreenTitle } from "../utility/homeUtils";
import { getAllJobs, getFilteredJob } from "../utility/jobUtils";
import { AppContext } from "../context/AppContext";

const Home = () => {
  const [isSideBarHidden, setIsSideBarHidden] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const {setUser, setAllJobs} = useContext(AppContext)

  const location = useLocation();


  useEffect(() => {
    checkAuth({setIsAuthenticated, setIsLoading, navigate});
  }, [navigate, location]);

  useEffect(()=>{
    getAllJobs(setAllJobs );
    fetchUserProfile(setUser)
  },[])

  return (
    <>
    <section className=" bg-gray-100 dark:bg-zinc-800 ">


      <div className="h-screen w-screen flex relative">
        <aside
          className={` transition-all duration-500 ease-in-out ${
            isSideBarHidden ? "w-0" : "w-[250px] md:w-[350xp]"
          } bg-white dark:bg-zinc-600 z-50`}
        >
          {!isSideBarHidden && (
            <section className=" px-4 py-4 flex flex-col items-center">
              <img className="h-8 mb-8" src={assets.logo} alt="logo" />
              <NavOptions
                getScreenTitle={getScreenTitle}
                setIsSideBarHidden={setIsSideBarHidden}
                isSideBarHidden={isSideBarHidden}
              />
            </section>
          )}
        </aside>
        <section
          className={` transition-all duration-500 ease-in-out w-full max-sm:absolute max-sm:inset-0 flex flex-col `}
        >
          <Header
            isSideBarHidden={isSideBarHidden}
            setIsSideBarHidden={setIsSideBarHidden}
            getScreenTitle={getScreenTitle}
          />

          <main className=" px-3 py-3 lg:px-10 lg:py-8 overflow-y-auto grow">
            {isLoading?<Loading/>:isAuthenticated?<Outlet/>: <div>Authentication was not successfull, <Link to={'/login'} className="text-blue-600 font-semibold">Re-login</Link></div>}
          </main>
        </section>
      </div>
      </section>
    </>
  );
};

export default Home;
