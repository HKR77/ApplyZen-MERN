import React, { useState } from "react";
import SearchBar from "../components/SearchBar";
import SearchResult from "../components/SearchResult";

const Jobs = () => {
  const [filters, setFilters] = useState({});
  return (
    <>
      <div>
        <SearchBar setFilters={setFilters} />

        <SearchResult filters={filters} />
      </div>
    </>
  );
};

export default Jobs;
