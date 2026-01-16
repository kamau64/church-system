import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Job = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const { data } = await axios.get("http://localhost:5000/api/jobs");
        setJobs(data);
      } catch (err) {
        setError("Failed to load jobs");
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-10">
      <div className="max-w-4xl mx-auto">

        {/* Home Button */}
        <div className="mb-6 text-left">
          <Link
            to="/"
            className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition"
          >
            ← Home
          </Link>
        </div>

        <h1 className="text-3xl font-bold text-center mb-8">
          Job Opportunities
        </h1>

        {loading && <p className="text-center">Loading jobs...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}

        {!loading && jobs.length === 0 && (
          <p className="text-center text-gray-600">
            No job opportunities available at the moment.
          </p>
        )}

        <div className="space-y-6">
          {jobs.map((job) => (
            <div
              key={job._id}
              className="bg-white p-6 rounded-lg shadow-md border-l-4 border-indigo-600"
            >
              <h2 className="text-xl font-semibold">{job.title}</h2>

              <p className="text-gray-700 mt-2">{job.description}</p>

              {job.location && (
                <p className="text-sm text-gray-500 mt-2">
                  📍 Location: {job.location}
                </p>
              )}

              {job.deadline && (
                <p className="text-sm text-gray-500">
                  ⏰ Deadline:{" "}
                  {new Date(job.deadline).toLocaleDateString()}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Job;
