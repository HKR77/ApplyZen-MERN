import React, { useState } from 'react'
import { addJob } from '../utility/jobUtils';
import { useNavigate } from "react-router-dom";

const AddJob = () => {
  const [formData, setFormData] = useState({
    company:'',
    position:'',
    location:'',
    jobType:'Full-time',
    appliedDate:'',
    jobStatus:'Applied',
    resume:'',
  });

  const navigate = useNavigate()

  const [message, setMessage] = useState('');
  const [error, setError] = useState(null);

  const handelChange = (e)=>{
    setFormData({
      ...formData, [e.target.id] : e.target.value,
    })
  }
  const handelSubmit = async(e)=>{
    e.preventDefault();
    console.log(formData);
    
    addJob(formData, setMessage, setError, setFormData, navigate);
  }

  return (<>
    <form className={`bg-white dark:bg-zinc-600 dark:text-white rounded-lg px-4 lg:px-8 py-8`} onSubmit={handelSubmit}>
      <ul className=' grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-xs md:text-sm tracking-wider'>
        <li className='flex flex-col gap-2 '>
          <label htmlFor="company">Company</label>
          <input type="text" id='company' className='py-2 px-3 border-2 border-gray-300 bg-gray-50 dark:bg-zinc-800 dark:text-gray-50 rounded' value={formData.company} onChange={handelChange} required/>
        </li>
        <li className='flex flex-col gap-2   '>
          <label htmlFor="position">Position / Role</label>
          <input type="text" id='position' className='py-2 px-3 border-2 border-gray-300 bg-gray-50 dark:bg-zinc-800 dark:text-gray-50 rounded' value={formData.position} onChange={handelChange} required/>
        </li>
        <li className='flex flex-col gap-2   '>
          <label htmlFor="location">Job Location</label>
          <input type="text" id='location' className='py-2 px-3 border-2 border-gray-300 bg-gray-50 dark:bg-zinc-800 dark:text-gray-50 rounded' value={formData.location} onChange={handelChange} required/>
        </li>
        <li className='flex flex-col gap-2   '>
          <label htmlFor="appliedDate">Applied Date</label>
          <input type="date" id='appliedDate' className='py-2 px-3 border-2 border-gray-300 bg-gray-50 dark:bg-zinc-800 dark:text-gray-50 rounded' value={formData.appliedDate} onChange={handelChange} required/>
        </li>
        <li className='flex flex-col gap-2   '>
          <label htmlFor="jobType">Job Type</label>
          <select name="" id="jobType" className='py-2 px-3 border-2 border-gray-300 bg-gray-50 dark:bg-zinc-800 dark:text-gray-50 rounded ' value={formData.jobType} onChange={handelChange} required>
            <option value="Full-time">Full-time</option>
            <option value="Part-time">Part-time</option>
            <option value="Contract">Contract</option>
            <option value="Internship">Internship</option>
            <option value="Freelance">Freelance</option>
          </select>
        </li>

        <li className='flex flex-col gap-2   '>
          <label htmlFor="jobStatus">Job Status</label>
          <select name="" id="jobStatus" className='py-2 px-3 border-2 border-gray-300 bg-gray-50 dark:bg-zinc-800 dark:text-gray-50 rounded ' value={formData.jobStatus} onChange={handelChange} required>
            <option value="Applied">Applied</option>
            <option value="Interviewing">Interviewing</option>
            <option value="Offer">Offer</option>
            <option value="Rejected">Rejected</option>
            <option value="Closed">Closed</option>
          </select>
        </li>

        <li className='flex flex-col gap-2   '>
          <label htmlFor="resume">Resume-V (URL)</label>
          <input type="url" id='resume' className='py-2 px-3 border-2 border-gray-300 bg-gray-50 dark:bg-zinc-800 dark:text-gray-50 rounded' value={formData.resume} onChange={handelChange} required/>
        </li>

        <li className='flex flex-col justify-end gap-2   '>
          <input type="submit" id='submit' className='py-2 px-3 border-2 border-primary bg-primary font-semibold text-white rounded cursor-pointer'/>
        </li>
        
      </ul>
      {error&&(<p className='text-sm text-red-600 text-center mt-4'>{error}</p>)}
      {message&&(<p className='text-sm text-teal-600 text-center mt-4'>{message}</p>)}
      <p className='text-center mt-4 text-sm text-gray-400'>Note: Additional details can be filled later once the jobs is added.</p>
    </form>
    </>
  )
}

export default AddJob