const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const Job = require("../model/jobModel");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

router.post("/add", authMiddleware, async (req, res) => {
  // console.log('hit add job route');

  try {
    const {
      company,
      position,
      location,
      jobType,
      appliedDate,
      jobStatus,
      resume,
    } = req.body;

    const userId = req.user.userId;    

    if (userId=='67a5a5b46c8a6b3822245663') {
      return res.status(201).json({ message: "ReadOnlyUser can't add new job!" });
    }

    const newJob = new Job({
      userId,
      company,
      position,
      location,
      jobType,
      appliedDate,
      jobStatus,
      resume,
    });

    await newJob.save();

    res.status(201).json({ message: "Job added successfully" });
  } catch (error) {
    console.error("Error adding job: ", error);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/fetch", authMiddleware, async (req, res) => {
  try {
    const userId = req.user.userId;

    const jobs = await Job.find({ userId: userId });
    // console.log("Jobs:", jobs); // Log the result of the query

    if (!jobs) {
      return res.status(404).json({ message: "No jobs found" });
    }

    res.json({ jobs });
  } catch (error) {
    console.error("Error fetching jobs:", error);
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/update", authMiddleware, async (req, res) => {
  try {
    const userId = req.user.userId;
    if (userId==='67a5a5b46c8a6b3822245663') {
      return res.status(201).json({ message: "ReadOnlyUser can't modified existing jobs!" });
    }

    const jobId = req.body._id;

    console.log(req.body);

    if (!ObjectId.isValid(jobId)) {
      // Use ObjectId.isValid
      return res.status(400).json({ message: "Invalid job ID" });
    }

    const dbJob = await Job.findById(new ObjectId(jobId)).exec();

    if (!ObjectId.isValid(jobId)) {
      return res.status(404).json({ message: "Job not found" });
    }

    if (dbJob.userId.toString() !== userId) {
      return res
        .status(403)
        .json({ message: "Not authorized to update this job" });
    }

    const updatedJob = await Job.findByIdAndUpdate(jobId, req.body, {
      new: true, // Return the updated job
      runValidators: true, // Validate the update against the schema
    });

    res.json(updatedJob);
  } catch (error) {
    console.error("Error updating job:", error);

    if (error.name === "CastError") {
      // Handle invalid ObjectId errors
      return res.status(400).json({ message: "Invalid job ID" });
    }

    res.status(500).json({ message: "Server error" });
  }
});

router.delete("/delete", authMiddleware, async (req, res) => {
  try {
    const userId = req.user.userId;
    if (userId==='67a5a5b46c8a6b3822245663') {
      return res.status(201).json({ message: "ReadOnlyUser can't delete jobs!" });
    }
    const jobId = req.body.jobId;

    if (!mongoose.Types.ObjectId.isValid(jobId)) {
      return res.status(400).json({ message: "Invalid job ID" });
    }

    const jobToDelete = await Job.findById(new ObjectId(jobId)).exec();

    if (!jobToDelete) {
      return res.status(404).json({ message: "Job not found" });
    }

    if (jobToDelete.userId.toString() !== userId) {
      return res
        .status(403)
        .json({ message: "Not authorized to delete this job" });
    }

    await Job.findByIdAndDelete(new ObjectId(jobId)).exec(); // Delete the job

    res.status(204).json({ message: "Job Deleted successfully!" }).end();
  } catch (error) {
    console.error("Error deleting job:", error);

    if (error.name === "CastError") {
      return res.status(400).json({ message: "Invalid job ID (CastError)" });
    }

    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
