import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const AdminDashboard = () => {
  const token = localStorage.getItem("adminToken");

  // ----------------- ANNOUNCEMENTS STATE -----------------
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [image, setImage] = useState(null);
  const [announcements, setAnnouncements] = useState([]);
  const [editingAnnId, setEditingAnnId] = useState(null);

  // ----------------- JOBS STATE -----------------
  const [jobTitle, setJobTitle] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [location, setLocation] = useState("");
  const [deadline, setDeadline] = useState("");
  const [jobs, setJobs] = useState([]);
  const [editingJobId, setEditingJobId] = useState(null);

  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  // ----------------- FETCH ANNOUNCEMENTS -----------------
  const fetchAnnouncements = useCallback(async () => {
    try {
      const { data } = await axios.get("http://localhost:5000/api/announcements", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAnnouncements(data);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch announcements");
    }
  }, [token]);

  // ----------------- FETCH JOBS -----------------
  const fetchJobs = useCallback(async () => {
    try {
      const { data } = await axios.get("http://localhost:5000/api/jobs", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setJobs(data);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch jobs");
    }
  }, [token]);

  useEffect(() => {
    fetchAnnouncements();
    fetchJobs();
  }, [fetchAnnouncements, fetchJobs]);

  // ----------------- ANNOUNCEMENTS CRUD -----------------
  const handleAnnouncementSubmit = async (e) => {
    e.preventDefault();
    setError(""); setSuccess("");

    if (!title || !description || !eventDate) {
      setError("Title, Description, and Event Date are required");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("eventDate", eventDate);
      if (image) formData.append("image", image);

      if (editingAnnId) {
        await axios.put(
          `http://localhost:5000/api/announcements/${editingAnnId}`,
          formData,
          { headers: { Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data" } }
        );
        setSuccess("Announcement updated!");
      } else {
        await axios.post(
          "http://localhost:5000/api/announcements",
          formData,
          { headers: { Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data" } }
        );
        setSuccess("Announcement added!");
      }

      setTitle(""); setDescription(""); setEventDate(""); setImage(null); setEditingAnnId(null);
      fetchAnnouncements();
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Operation failed");
    }
  };

  const handleEditAnnouncement = (ann) => {
    setTitle(ann.title);
    setDescription(ann.description);
    setEventDate(ann.eventDate ? new Date(ann.eventDate).toISOString().slice(0, 16) : "");
    setEditingAnnId(ann._id);
  };

  const handleDeleteAnnouncement = async (id) => {
    if (!window.confirm("Delete this announcement?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/announcements/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSuccess("Announcement deleted!");
      fetchAnnouncements();
    } catch {
      setError("Failed to delete announcement");
    }
  };

  // ----------------- JOBS CRUD -----------------
  const handleJobSubmit = async (e) => {
    e.preventDefault();
    setError(""); setSuccess("");

    if (!jobTitle || !jobDescription) {
      setError("Job title and description required");
      return;
    }

    const payload = { title: jobTitle, description: jobDescription, location, deadline };

    try {
      if (editingJobId) {
        await axios.put(`http://localhost:5000/api/jobs/${editingJobId}`, payload, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setSuccess("Job updated!");
      } else {
        await axios.post(`http://localhost:5000/api/jobs`, payload, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setSuccess("Job added!");
      }

      setJobTitle(""); setJobDescription(""); setLocation(""); setDeadline(""); setEditingJobId(null);
      fetchJobs();
    } catch {
      setError("Failed to save job");
    }
  };

  const handleEditJob = (job) => {
    setJobTitle(job.title);
    setJobDescription(job.description);
    setLocation(job.location || "");
    setDeadline(job.deadline ? job.deadline.slice(0, 10) : "");
    setEditingJobId(job._id);
  };

  const handleDeleteJob = async (id) => {
    if (!window.confirm("Delete this job?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/jobs/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSuccess("Job deleted!");
      fetchJobs();
    } catch {
      setError("Failed to delete job");
    }
  };

  // ----------------- RENDER -----------------
  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100 px-4 pt-10">
      <div className="w-full max-w-5xl">

        {/* TOP BUTTONS */}
        <div className="mb-6 flex gap-4">
          <Link
            to="/"
            className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition"
          >
            ← Home
          </Link>

          {/* MANAGE CONTACTS BUTTON */}
          <Link
            to="/admin/contacts"
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
          >
            Manage Contacts
          </Link>
        </div>

        <h1 className="text-3xl font-bold mb-6 text-center">Admin Dashboard</h1>

        {/* SUCCESS / ERROR */}
        {success && <p className="text-green-500 mb-3">{success}</p>}
        {error && <p className="text-red-500 mb-3">{error}</p>}

        {/* ANNOUNCEMENTS & JOBS SIDE BY SIDE */}
        <div className="flex flex-col md:flex-row gap-6 mb-12">

          {/* ----------------- ANNOUNCEMENTS ----------------- */}
          <div className="flex-1 bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">
              {editingAnnId ? "Edit Announcement" : "Add Announcement"}
            </h2>
            <form onSubmit={handleAnnouncementSubmit} className="space-y-4">
              <input type="text" placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} className="w-full border px-4 py-2 rounded" required />
              <textarea placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} className="w-full border px-4 py-2 rounded" rows={4} required />
              <input type="datetime-local" value={eventDate} onChange={e => setEventDate(e.target.value)} className="w-full border px-4 py-2 rounded" required />
              <input type="file" accept="image/*" onChange={e => setImage(e.target.files[0])} className="w-full" />
              <button type="submit" className="w-full bg-indigo-600 text-white py-2 rounded">{editingAnnId ? "Update" : "Add"}</button>
            </form>

            <ul className="space-y-4 mt-6">
              {announcements.map(a => (
                <li key={a._id} className="bg-gray-50 p-4 rounded-lg border-l-4 border-indigo-600 flex flex-col gap-2">
                  <h3 className="font-semibold">{a.title}</h3>
                  <p className="text-gray-700">{a.description}</p>
                  <p className="text-sm text-gray-500">Date: {a.eventDate ? new Date(a.eventDate).toLocaleString() : "TBA"}</p>
                  {a.image && <img src={`http://localhost:5000/uploads/${a.image}`} alt={a.title} className="mt-2 h-48 w-full object-cover rounded-md" />}
                  <div className="flex gap-2 mt-2">
                    <button onClick={() => handleEditAnnouncement(a)} className="bg-yellow-400 text-white px-3 py-1 rounded">Edit</button>
                    <button onClick={() => handleDeleteAnnouncement(a._id)} className="bg-red-500 text-white px-3 py-1 rounded">Delete</button>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* ----------------- JOBS ----------------- */}
          <div className="flex-1 bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">{editingJobId ? "Edit Job" : "Add Job"}</h2>
            <form onSubmit={handleJobSubmit} className="space-y-4">
              <input type="text" placeholder="Job Title" value={jobTitle} onChange={e => setJobTitle(e.target.value)} className="w-full border px-4 py-2 rounded" required />
              <textarea placeholder="Job Description" value={jobDescription} onChange={e => setJobDescription(e.target.value)} className="w-full border px-4 py-2 rounded" rows={3} required />
              <input type="text" placeholder="Location (optional)" value={location} onChange={e => setLocation(e.target.value)} className="w-full border px-4 py-2 rounded" />
              <input type="date" value={deadline} onChange={e => setDeadline(e.target.value)} className="w-full border px-4 py-2 rounded" />
              <button type="submit" className="w-full bg-indigo-600 text-white py-2 rounded">{editingJobId ? "Update" : "Add"}</button>
            </form>

            <ul className="space-y-4 mt-6">
              {jobs.map(job => (
                <li key={job._id} className="bg-gray-50 p-4 rounded-lg border-l-4 border-indigo-600 flex flex-col gap-2">
                  <h3 className="font-semibold">{job.title}</h3>
                  <p className="text-gray-700">{job.description}</p>
                  {job.location && <p className="text-sm text-gray-500">📍 {job.location}</p>}
                  {job.deadline && <p className="text-sm text-gray-500">⏰ Deadline: {new Date(job.deadline).toLocaleDateString()}</p>}
                  <div className="flex gap-2 mt-2">
                    <button onClick={() => handleEditJob(job)} className="bg-yellow-400 text-white px-3 py-1 rounded">Edit</button>
                    <button onClick={() => handleDeleteJob(job._id)} className="bg-red-500 text-white px-3 py-1 rounded">Delete</button>
                  </div>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
