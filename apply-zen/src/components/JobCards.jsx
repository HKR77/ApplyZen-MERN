import React from "react";
import { FaLocationArrow } from "react-icons/fa";
import { TbListDetails } from "react-icons/tb";
import { MdOutlineWorkHistory } from "react-icons/md";
import { FaCalendarAlt } from "react-icons/fa";
import { FaTrashAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";



const JobCards = ({ job, handleDelete }) => {

  const naviagte = useNavigate()


  
  return (
    <section className="  bg-white dark:bg-zinc-600 dark:text-white px-3 py-3 rounded-lg flex flex-col gap-1.5 shadow-lg hover:scale-105 transition-all duration-300 ease-in-out">
      <div className="flex tracking-wider">
        <h1 className="py-3 px-5 text-2xl font-semibold bg-primary text-white rounded-lg">
          {job.company[0]}
        </h1>
        <div className="flex flex-col justify-between p-1">
          <h1 className="text-sm">{job.position}</h1>
          <p className="text-gray-500 text-xs">{job.company}</p>
        </div>
      </div>
      <div className="border border-gray-400 w-full"></div>

      <ul className="grid grid-cols-2 text-xs gap-3 mt-3">
        <li  className="flex gap-1.5 items-center justify-start">
          <FaLocationArrow />
          <p>{job.location}</p>
        </li>
        <li  className="flex gap-1.5 items-center justify-start">
        <MdOutlineWorkHistory />
        <p>{job.jobType}</p>
        </li>
        <li  className="flex gap-1.5 items-center justify-start">
          <p  className={`px-4 py-2 rounded border-2 w-fit ${job.jobStatus ==='Interviewing'?'border-blue-500 bg-blue-50 text-blue-500':job.jobStatus ==='Offer'?'border-teal-500 bg-teal-50 text-teal-500':job.jobStatus ==='Rejected'?'border-red-500 bg-red-50 text-red-500':'border-gray-400 text-gray-500'}`}>{job.jobStatus}</p>
        </li>
        <li className="flex gap-1.5 items-center justify-start">
          {(job.interviewDetails.length) > 0 ? (
            <p className="flex gap-1.5">
              <FaCalendarAlt />
              {new Date(job.interviewDetails[0].date).toLocaleDateString()}
            </p>
          ) : (
            <></>
          )}
        </li>
      </ul>
      <div className="flex text-white font-medium text-xs gap-3 mt-3">
        <button className="bg-primary px-3 py-1.5 rounded flex gap-1 items-center cursor-pointer" onClick={()=> naviagte(`/home/job-details/${job._id}`)}><TbListDetails /> View</button>
        <button className="bg-red-500 px-3 py-1.5 rounded flex gap-1 items-center cursor-pointer" onClick={()=>handleDelete(job._id)}><FaTrashAlt /> Delete</button>
      </div>
    </section>
  );
};

export default JobCards;
