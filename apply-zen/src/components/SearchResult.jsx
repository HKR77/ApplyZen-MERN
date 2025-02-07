import React, { useContext, useEffect, useRef, useState } from "react";
import { getAllJobs, getFilteredJob } from "../utility/jobUtils";
import JobCards from "./JobCards";
import { AppContext } from "../context/AppContext";
import { apiJobDelete } from "../utility/jobUtils";

const SearchResult = ({ filters }) => {
  const {allJobs, setAllJobs} = useContext(AppContext);
  const [filteredJobs, setFilteredJobs] = useState([])
  const noOfPages = useRef(0);



  useEffect(()=>{
    if (allJobs.length>0) {
      getFilteredJob(allJobs, filters, setFilteredJobs);
    }
  },[filters, allJobs])

  const handleDelete = async (jobId )=>{    
    await apiJobDelete(jobId)
    await getAllJobs(setAllJobs)
  }

  return (
    <>

        <section className="mt-4">
          {(allJobs.length > 0 && filteredJobs.length > 0) ? (
            <>
              <h1 className="text">{filteredJobs.length} Jobs Found</h1>
              <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredJobs.map((job) => {
                  return (
                    <li key={job._id}>
                      <JobCards job={job} handleDelete={handleDelete} />
                    </li>
                  );
                })}
              </ul>
              <ul>

              </ul>
            </>
          ) : (
            <><div className="w-full min-h-64 flex items-center justify-center text-red-500">Sorry! no job mathced the filter criteria</div></>
          )}
        </section>

    </>
  );
};

export default SearchResult;
