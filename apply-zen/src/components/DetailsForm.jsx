import React, { useState } from "react";
import { FaRegEdit, FaSave, FaTimes } from "react-icons/fa";
import { setDummyValue } from "../utility/jobUtils";
import moment from 'moment';

const DetailsForm = ({ job, handleSubmit }) => {
  const [editableJob, setEditableJob] = useState(setDummyValue(job));
  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (e) => {
    setEditableJob({ ...editableJob, [e.target.id]: e.target.value });
  };

  return (
    <>
      <div className=" flex gap-4">
        {!isEditing ? (
          <button
            className="flex gap-2 text-gray-500 px-4 py-2 text-sm border-2 border-gray-500 bg-gray-50 rounded-md items-center font-semibold cursor-pointer"
            onClick={() => setIsEditing(!isEditing)}
          >
            <FaRegEdit /> Edit
          </button>
        ) : (
          <>
            <button
              className="flex gap-2 text-white px-4 py-2 text-sm border-2 bg-primary border-primary rounded-md items-center font-semibold cursor-pointer"
              onClick={() => handleSubmit(editableJob)}
            >
              <FaSave /> Save
            </button>
            <button
              className="flex gap-2 text-red-500 px-4 py-2 text-sm border-2 border-red-500 bg-red-50 rounded-md items-center font-semibold cursor-pointer"
              onClick={() =>{ setIsEditing(!isEditing); setEditableJob(setDummyValue(job)) }}
            >
              <FaTimes /> Cancel
            </button>
          </>
        )}
      </div>
      <section className="text-sm tracking-wider">
        <form>
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <li className="flex flex-col gap-1   grow">
              <label htmlFor="position">Position</label>
              <input
                type="text"
                id="position"
                value={editableJob.position}
                onChange={handleChange}
                className="border-2 border-gray-300 bg-gray-50 rounded px-4 py-1 dark:bg-zinc-800"
                disabled={!isEditing}
              />
            </li>
            <li className="flex flex-col gap-1   grow">
              <label htmlFor="company">Company</label>
              <input
                type="text"
                id="company"
                value={editableJob.company}
                onChange={handleChange}
                className="border-2 border-gray-300 bg-gray-50 rounded px-4 py-1 dark:bg-zinc-800"
                disabled={!isEditing}
              />
            </li>
            <li className="flex flex-col gap-1   grow">
              <label htmlFor="location">Location</label>
              <input
                type="text"
                id="location"
                value={editableJob.position}
                onChange={handleChange}
                className="border-2 border-gray-300 bg-gray-50 rounded px-4 py-1 dark:bg-zinc-800"
                disabled={!isEditing}
              />
            </li>

            <li className="flex flex-col gap-1 grow">
              <label htmlFor="jobStatus">Job Status</label>
              <select
                id="jobStatus"
                className="border-2 border-gray-300 bg-gray-50 rounded px-4 py-1 dark:bg-zinc-800"
                value={editableJob.jobStatus}
                onChange={handleChange}
                disabled={!isEditing}
                required
              >
                <option value="Applied">Applied</option>
                <option value="Interviewing">Interviewing</option>
                <option value="Offer">Offer</option>
                <option value="Rejected">Rejected</option>
                <option value="Closed">Closed</option>
              </select>
            </li>

            <li className="flex flex-col gap-1 grow">
              <label htmlFor="jobType">Job Type</label>
              <select
                id="jobType"
                className="border-2 border-gray-300 bg-gray-50 rounded px-4 py-1 dark:bg-zinc-800"
                value={editableJob.jobType}
                onChange={handleChange}
                disabled={!isEditing}
                required
              >
            <option value="Full-time">Full-time</option>
            <option value="Part-time">Part-time</option>
            <option value="Contract">Contract</option>
            <option value="Internship">Internship</option>
            <option value="Freelance">Freelance</option>
              </select>
            </li>

            <li className="flex flex-col gap-1 grow">
            <label htmlFor="appliedDate">Applied Date</label>
            <input type="date" id="appliedDate" disabled={!isEditing} value={moment(editableJob.appliedDate).format('YYYY-MM-DD')} onChange={handleChange} className="border-2 border-gray-300 bg-gray-50 rounded px-4 py-1 dark:bg-zinc-800" />
            </li>

            <li className="flex flex-col gap-1 grow sm:col-span-2  lg:col-span-3">
            <label htmlFor="jobDescription">Job Description</label>
            <textarea id="jobDescription" disabled={!isEditing} value={editableJob.jobDescription} onChange={handleChange} className="border-2 border-gray-300 bg-gray-50 rounded px-4 py-1 dark:bg-zinc-800" />
            </li>

            <li className="flex flex-col gap-1 grow">
            <label htmlFor="applicationSource">Application Source</label>
            <input type="text" id="applicationSource" disabled={!isEditing} value={editableJob.applicationSource} onChange={handleChange} className="border-2 border-gray-300 bg-gray-50 rounded px-4 py-1 dark:bg-zinc-800"/>
            </li>
            <li className="flex flex-col gap-1 grow">
            <label htmlFor="applicationURL">Application URL</label>
            <input type="url" id="applicationURL" disabled={!isEditing} value={editableJob.applicationURL} onChange={handleChange} className="border-2 border-gray-300 bg-gray-50 rounded px-4 py-1 dark:bg-zinc-800" />
            </li>
            <li className="flex flex-col gap-1 grow">
            <label htmlFor="contactEmail">Contact Email</label>
            <input type="email" id="contactEmail" disabled={!isEditing} value={editableJob.contactEmail} onChange={handleChange} className="border-2 border-gray-300 bg-gray-50 rounded px-4 py-1 dark:bg-zinc-800" />
            </li>
            <li className="flex flex-col gap-1 grow">
            <label htmlFor="contactPhone">Contact Phone</label>
            <input type="tel" id="contactPhone" disabled={!isEditing} value={editableJob.contactPhone} onChange={handleChange} className="border-2 border-gray-300 bg-gray-50 rounded px-4 py-1 dark:bg-zinc-800" />
            </li>

            <li className="flex flex-col gap-1 grow">
            <label htmlFor="salaryExpectation">Salary Expectation</label>
            <input type="number" id="salaryExpectation" disabled={!isEditing} value={editableJob.salaryExpectation} onChange={handleChange} className="border-2 border-gray-300 bg-gray-50 rounded px-4 py-1 dark:bg-zinc-800" />
            </li>
            <li className="flex flex-col gap-1 grow">
            <label htmlFor="salaryExpectation">Resume URL</label>
            <input type="url" id="resume" disabled={!isEditing} value={editableJob.resume} onChange={handleChange} className="border-2 border-gray-300 bg-gray-50 rounded px-4 py-1 dark:bg-zinc-800 overflow-hidden" />
            </li>           
          </ul>
        </form>
      </section>
    </>
  );
};

export default DetailsForm;
