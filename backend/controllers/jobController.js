import Job from "../models/Job.js";

export const getJobs = async (req, res) => {
  try {
    const jobs = await Job.find().sort({ createdAt: -1 });
    res.json(jobs);
  } catch {
    res.status(500).json({ message: "Failed to fetch jobs" });
  }
};

export const createJob = async (req, res) => {
  const { title, description, location, deadline } = req.body;

  try {
    const job = await Job.create({
      title,
      description,
      location,
      deadline,
    });
    res.status(201).json(job);
  } catch {
    res.status(400).json({ message: "Failed to create job" });
  }
};

export const updateJob = async (req, res) => {
  try {
    const job = await Job.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(job);
  } catch {
    res.status(400).json({ message: "Failed to update job" });
  }
};

export const deleteJob = async (req, res) => {
  try {
    await Job.findByIdAndDelete(req.params.id);
    res.json({ message: "Job deleted" });
  } catch {
    res.status(400).json({ message: "Failed to delete job" });
  }
};
