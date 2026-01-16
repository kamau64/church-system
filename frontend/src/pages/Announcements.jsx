import React, { useEffect, useState } from "react";
import { format, differenceInCalendarDays, isPast } from "date-fns";
import { Link } from "react-router-dom"; // Home button

const Announcements = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/announcements");
        if (!res.ok) throw new Error("Failed to fetch announcements");
        const data = await res.json();
        setAnnouncements(data);
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAnnouncements();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 md:px-12">

      {/* HOME BUTTON */}
      <div className="mb-6">
        <Link
          to="/"
          className="inline-block bg-indigo-600 text-white px-5 py-2 rounded-lg hover:bg-indigo-700 transition"
        >
          ← Home
        </Link>
      </div>

      {/* PAGE HEADER */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-indigo-600 mb-2">
          Church Announcements
        </h1>
        <p className="text-gray-700 max-w-2xl mx-auto">
          Stay updated with all the latest church events, programs, and important notices.
        </p>
      </div>

      {/* LOADING / ERROR */}
      {loading && <p className="text-center text-gray-500">Loading announcements...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}
      {!loading && !error && announcements.length === 0 && (
        <p className="text-center text-gray-500">No announcements yet</p>
      )}

      {/* ANNOUNCEMENTS LIST */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {!loading &&
          !error &&
          announcements.map((ann) => {
            const eventDate = ann.eventDate ? new Date(ann.eventDate) : null;
            const eventPassed = eventDate ? isPast(eventDate) : false;
            const daysRemaining =
              eventDate && !eventPassed
                ? differenceInCalendarDays(eventDate, new Date())
                : null;

            return (
              <div
                key={ann._id}
                className="bg-white rounded-xl shadow-md p-6 flex flex-col justify-between transform transition hover:scale-105"
              >
                {/* IMAGE */}
                {ann.image && (
                  <img
                    src={`http://localhost:5000/uploads/${ann.image}`}
                    alt={ann.title}
                    className="w-full h-48 object-cover rounded-lg mb-4"
                  />
                )}

                {/* TITLE & DESCRIPTION */}
                <div>
                  <h2 className="text-2xl font-semibold text-indigo-600 mb-2">{ann.title}</h2>
                  <p className="text-gray-700 mb-4">{ann.description}</p>
                </div>

                {/* EVENT DATE */}
                <div className="mt-auto">
                  {eventDate ? (
                    <p
                      className={`text-sm font-medium ${
                        eventPassed ? "text-red-500" : "text-green-600"
                      }`}
                    >
                      Event Date:{" "}
                      <span className="font-bold">{format(eventDate, "PPpp")}</span>{" "}
                      {!eventPassed && (
                        <span className="ml-2 px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs">
                          {daysRemaining} days remaining
                        </span>
                      )}
                      {eventPassed && (
                        <span className="ml-2 px-2 py-1 bg-red-100 text-red-600 rounded-full text-xs">
                          Already happened
                        </span>
                      )}
                    </p>
                  ) : (
                    <p className="text-sm text-gray-400">Event date: TBA</p>
                  )}
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Announcements;
