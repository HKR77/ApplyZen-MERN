import axios from "axios";

export const addJob = async (
  formData,
  setMessage,
  setError,
  setFormData,
  navigate
) => {
  const token = sessionStorage.getItem("token");

  if (!token) {
    setError("Session expired, please re-authenticate.");
    setTimeout(() => {
      navigate("/login");
    }, 1500);
    return;
  }

  try {
    const response = await axios.post(
      "https://applyzen-mern.onrender.com/api/job/add",
      formData,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    // console.log("Job added successfully:", response.data); // Log the successful response data

    setMessage("Job added successfully!");
    setFormData({
      company: "",
      position: "",
      location: "",
      jobType: "",
      appliedDate: "",
      jobStatus: "",
      resume: "",
    });
  } catch (error) {
    setError(error.response?.data?.message || "Error adding job");
    console.error("Error adding job:", error);
    setMessage(null);
  }
};

// ========== * getAllJobs * ================

export const getAllJobs = async (setAllJobs) => {
  // console.log('getAllJobs');
  
  const token = sessionStorage.getItem("token");

  if (!token) {
    alert("Session expired, please re-authenticate.");
    setTimeout(() => {
      navigate("/login");
    }, 1500);
    return;
  }

  try {
    const response = await axios.get("https://applyzen-mern.onrender.com/api/job/fetch", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    // console.log(response.data.jobs);

    setAllJobs(response.data.jobs);
  } catch (err) {
    console.error("Error fetching jobs:", err);
  }
};

// ==============* function to filter the jobs * ======================
export const getFilteredJob = async (allJobs, filters, setFilteredJobs) => {
  let filteredJobs = [...allJobs];
  // console.log(filteredJobs);
  // console.log(filters);

  if (filters.search) {
    const searchTearm = filters.search.toLowerCase();
    filteredJobs = filteredJobs.filter((job) => {
      return (
        job.company.toLowerCase().includes(searchTearm) ||
        job.position.toLowerCase().includes(searchTearm) ||
        job.location.toLowerCase().includes(searchTearm)
      );
    });
  }

  if (filters.jobStatusFilter !== "All") {
    filteredJobs = filteredJobs.filter(
      (job) => job.jobStatus === filters.jobStatusFilter
    );
  }

  if (filters.jobTypeFilter !== "All") {
    filteredJobs = filteredJobs.filter(
      (job) => job.jobType === filters.jobTypeFilter
    );
  }

  // Sorting

  switch (filters.sort) {
    case "newest":
      filteredJobs.sort(
        (a, b) => new Date(b.lastUpdated) - new Date(a.lastUpdated)
      );
      break;
    case "oldest":
      filteredJobs.sort(
        (a, b) => new Date(a.lastUpdated) - new Date(b.lastUpdated)
      );
      break;
    case "companyAsc":
      filteredJobs.sort((a, b) => a.company.localeCompare(b.company));
      break;
    case "companyDesc":
      filteredJobs.sort((a, b) => b.company.localeCompare(a.company));
      break;
    case "positionAsc":
      filteredJobs.sort((a, b) => a.position.localeCompare(b.position));
      break;
    case "positionDesc":
      filteredJobs.sort((a, b) => b.position.localeCompare(a.position));
      break;

    default:
      break;
  }

  setFilteredJobs(filteredJobs);
};

// ==================* setDummyValue *========================

export const setDummyValue = (job) => {
  let emptyJob = {
    userId: "", // Important:  This should be a valid ObjectId when actually saving.
    company: "",
    position: "",
    location: "",
    jobType: "",
    jobStatus: "",
    applicationSource: "",
    applicationURL: "",
    contactEmail: "",
    contactPhone: "",
    jobDescription: "",
    appliedDate: null, // Or undefined
    salaryExpectation: 0, // Or undefined
    resume: "",
    lastUpdated: null, // Or undefined
  };

  return { ...emptyJob, ...job };
};

// ===============* submitJobDetails *==================

export const submitJobDetails = async (job, setPostStatus) => {
  const token = sessionStorage.getItem("token");

  if (!token) {
    alert("Session expired, please re-authenticate.");
    setTimeout(() => {
      navigate("/login");
    }, 1500);
    return;
  }

  try {
    const response = await axios.post(
      "https://applyzen-mern.onrender.com/api/job/update",
      job,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    setPostStatus({ status: "success", msg: "Job updated successfully" });
  } catch (err) {
    console.error("Update Job Error: ", err);
    setPostStatus({
      status: "failure",
      msg: "Job updated was not successfully",
    });
  }
};

// ===============* apiJobDelete *==================
export const apiJobDelete = async (jobId) => {
  const token = sessionStorage.getItem("token");

  if (!token) {
    alert("Session expired, please re-authenticate.");
    setTimeout(() => {
      navigate("/login");
    }, 1500);
    return;
  }

  try {
    const response = await axios.delete(
      "https://applyzen-mern.onrender.com/api/job/delete",
      {
        headers: { Authorization: `Bearer ${token}` },
        data: { jobId }
      }
    );


    console.log(response);
    // if (!response.ok) {
      
    //   const errorData = await response.json();
    //   throw new Error(errorData.message || 'Failed to delete job');
    // }

  } catch (error) {
    console.error('Error deleting job:', error);
  }
};
