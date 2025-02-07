import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import Loading from "../components/Loading";
import DetailsForm from "../components/DetailsForm";
import { submitJobDetails } from "../utility/jobUtils";

const jobDetails = () => {
  const { jobId } = useParams();
  const { allJobs } = useContext(AppContext);
  const [job, setJob] = useState(null);
  const [postStatus, setPostStatus] = useState({status:'', msg:''})
  const navigate = useNavigate()
  useEffect(() => {
    let temp = allJobs.filter((j) => j._id === jobId);
    setJob(temp[0]);
  }, [jobId, allJobs]);

  // console.log(job);

  const handleSubmit = (editableJob)=>{
    submitJobDetails(editableJob, setPostStatus);
    setTimeout(() => {
      navigate('/home/all-jobs')
    }, 2000);
  } 



  return (
    <>
      {job ? (
        <section className=" flex flex-col gap-2.5 tracking-wide bg-white dark:bg-zinc-600 dark:text-white px-4 py-6 rounded-lg shadow-lg">
          <div className=" flex gap-6">
            <h1 className="py-3 px-5 text-2xl font-semibold bg-primary text-white rounded-lg">
              {job.company[0]}
            </h1>
            <div className="flex flex-col justify-between p-1">
              <h1 className="text-lg font-semibold">{job.position}</h1>
              <p className="text-gray-500 text-sm">{job.company}</p>
            </div>
          </div>

          <div className="border border-gray-400 w-full"></div>

          {postStatus.status && <p className="text-blue-600">{postStatus.msg}</p>}


          <DetailsForm job={job} handleSubmit={handleSubmit} />
        </section>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default jobDetails;
