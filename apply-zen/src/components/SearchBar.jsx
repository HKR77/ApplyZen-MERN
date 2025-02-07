import React, { useEffect, useState } from "react";

const SearchBar = ({ setFilters }) => {
  const [search, setSearch] = useState("");
  const [jobTypeFilter, setJobTypeFilter] = useState("All");
  const [jobStatusFilter, setJobStatusFilter] = useState("All");
  const [sort, setSort] = useState("newest");

  useEffect(() => {
    setFilters({ search, jobStatusFilter, jobTypeFilter, sort });
  }, [search, jobStatusFilter, jobTypeFilter, sort]);

  return (
    <section className=" py-4 px-4 lg:px-10 lg:py-8 bg-white dark:bg-zinc-600 dark:text-white rounded tracking-wider text-xs lg:text-sm">
      <h1 className="font-semibold">Search Form</h1>
      <form onSubmit={(e) => e.preventDefault()}>
        <ul className=" grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
          <li className="flex flex-col gap-2">
            <label htmlFor="search">Search</label>
            <input
              id="search"
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border border-gray-300 bg-gray-50 px-4 py-2 rounded-md dark:bg-zinc-800 "
            />
          </li>
          <li className="flex flex-col gap-2">
            <label htmlFor="typeFilter"> Job Type</label>
            <select
              id="typeFilter"
              value={jobTypeFilter}
              onChange={(e) => setJobTypeFilter(e.target.value)}
              className="border border-gray-300 bg-gray-50 px-4 py-2 rounded-md dark:bg-zinc-800 "
            >
              <option value="All">All</option>
              <option value="Full-time">Full-time</option>
              <option value="Part-time">Part-time</option>
              <option value="Contract">Contract</option>
              <option value="Internship">Internship</option>
              <option value="Freelance">Freelance</option>
            </select>
          </li>
          <li className="flex flex-col gap-2">
            <label htmlFor="statusFilter"> Job Status</label>
            <select
              id="statusFilter"
              value={jobStatusFilter}
              onChange={(e) =>                 setJobStatusFilter(e.target.value)}
              className="border border-gray-300 bg-gray-50 px-4 py-2 rounded-md dark:bg-zinc-800 "
            >
              <option value="All">All</option>
              <option value="Applied">Applied</option>
              <option value="Interviewing">Interviewing</option>
              <option value="Offer">Offer</option>
              <option value="Rejected">Rejected</option>
              <option value="Closed">Closed</option>
            </select>
          </li>
          <li className="flex flex-col gap-2">
            <label htmlFor="sort">Sort</label>
            <select
              id="sort"
              value={sort}
              onChange={(e) =>                 setSort(e.target.value)}
              className="border border-gray-300 bg-gray-50 px-4 py-2 rounded-md dark:bg-zinc-800 "
            >
              <option value="newest">newest</option>
              <option value="oldest">oldest</option>
              <option value="companyAsc">companyAsc</option>
              <option value="companyDesc">companyDesc</option>
              <option value="positionAsc">positionAsc</option>
              <option value="positionDesc">positionDesc</option>

            </select>
          </li>
          <li className="flex flex-col justify-end">
            <button
              className="bg-primary px-4 py-2 rounded-md text-white cursor-pointer"
              onClick={() => {
                setSearch("");
                setJobStatusFilter("All");
                setJobTypeFilter("All");
                setSort("newest");
              }}
            >
              Reset Filters & Sort
            </button>
          </li>
        </ul>
      </form>
    </section>
  );
};

export default SearchBar;
