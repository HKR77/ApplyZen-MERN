import React, { useContext, useMemo } from "react";
import { AppContext } from "../context/AppContext";
import { BiSolidBug } from "react-icons/bi";
import { FiBriefcase } from "react-icons/fi";
import { FaCalendarCheck } from "react-icons/fa";
import ApplicationsPerMonthChart from "../components/ApplicationsPerMonthChart";


const Dashboard = () => {
  const { allJobs } = useContext(AppContext);

  let [applied, rejected, scheduled] = [0, 0, 0];
  // console.log(allJobs);

  allJobs.forEach((element) => {
    if (element.jobStatus === "Applied") {
      applied++;
    } else if (element.jobStatus === "Interviewing") {
      scheduled++;
    } else if (element.jobStatus === "Rejected") {
      rejected++;
    }
  });

  return (
    <>
      <section className="px-4 py-6">
        <section className="flex flex-wrap tracking-wider gap-3">
          <div className=" dark:bg-zinc-600 rounded-lg py-4 px-6 bg-white flex flex-col gap-2 border-b-4 border-amber-500 grow h-[150px] items-center justify-evenly text-center">
            <div className="flex gap-6 text-6xl text-amber-500">
              <h1 className="">{applied}</h1>
              <FiBriefcase />
              </div>
            <p className="text-xs text-gray-500 dark:text-gray-50">Pending Applications</p>
          </div>
          <div className="  dark:bg-zinc-600 rounded-lg py-4 px-6 bg-white flex flex-col gap-2 border-b-4 border-blue-500 grow h-[150px] items-center justify-evenly text-center">
            <div className="flex gap-6 text-6xl text-blue-500">
              <h1 className="">{scheduled}</h1>
              <FaCalendarCheck />
              </div>
            <p className="text-xs text-gray-500 dark:text-gray-50">Interviews Scheduled</p>
          </div>
          <div className="  dark:bg-zinc-600 rounded-lg py-4 px-6 bg-white flex flex-col gap-2 border-b-4 border-red-500 grow h-[150px] items-center justify-evenly text-center">
            <div className="flex gap-6 text-6xl text-red-500">
              <h1 className="">{rejected}</h1>
              <BiSolidBug />
              </div>
            <p className="text-xs text-gray-500 dark:text-gray-50">Jobs Declined</p>
          </div>
        </section>

        <section className="mt-8 px-4 py-6 flex flex-col text-center text-xl font-semibold text-primary gap-3">
          <h1 className="tracking-wider ">Monthly Applications</h1>
        <ApplicationsPerMonthChart jobs={allJobs} />
        </section>
      </section>
    </>
  );
};

export default Dashboard;
