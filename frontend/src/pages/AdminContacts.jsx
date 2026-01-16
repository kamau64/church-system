import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const API_URL = "http://localhost:5000/api/contact-info";

const AdminContacts = () => {
  const token = localStorage.getItem("adminToken");

  const [contact, setContact] = useState({
    _id: null,
    phone: "",
    whatsapp: "",
    facebook: "",
    instagram: "",
  });

  const [contacts, setContacts] = useState([]);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  // ---------------- FETCH CONTACTS ----------------
  const fetchContacts = async () => {
    try {
      const { data } = await axios.get(API_URL, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (Array.isArray(data)) setContacts(data);
      else if (data) setContacts([data]);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch contact info");
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  // ---------------- ADD / UPDATE CONTACT ----------------
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      if (contact._id) {
        // UPDATE
        const { data } = await axios.put(
          `${API_URL}/${contact._id}`,
          contact,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setSuccess("Contact info updated!");
      } else {
        // ADD
        const { data } = await axios.post(API_URL, contact, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setSuccess("Contact info added!");
      }

      // Reset form after submission
      setContact({ _id: null, phone: "", whatsapp: "", facebook: "", instagram: "" });
      fetchContacts(); // Refresh list
    } catch (err) {
      console.error(err);
      setError("Failed to save contact info");
    }
  };

  // ---------------- DELETE ----------------
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this contact?")) return;

    try {
      await axios.delete(`${API_URL}/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSuccess("Contact info deleted!");
      fetchContacts();
    } catch (err) {
      console.error(err);
      setError("Failed to delete contact info");
    }
  };

  // ---------------- EDIT ----------------
  const handleEdit = (c) => {
    setContact(c);
  };

  return (
    <div className="min-h-screen bg-gray-100 px-4 pt-10 flex justify-center">
      <div className="w-full max-w-xl bg-white p-6 rounded shadow">

        {/* BACK BUTTON */}
        <Link
          to="/admin/dashboard"
          className="inline-block mb-6 bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition"
        >
          ← Back to Dashboard
        </Link>

        <h1 className="text-2xl font-bold mb-4">Manage Contact Info</h1>

        {success && <p className="text-green-600 mb-3">{success}</p>}
        {error && <p className="text-red-600 mb-3">{error}</p>}

        {/* ADD / UPDATE FORM */}
        <form onSubmit={handleSubmit} className="space-y-4 mb-6">
          <input
            type="text"
            placeholder="Phone"
            value={contact.phone}
            onChange={(e) => setContact({ ...contact, phone: e.target.value })}
            className="w-full border px-4 py-2 rounded"
            required
          />
          <input
            type="text"
            placeholder="WhatsApp"
            value={contact.whatsapp}
            onChange={(e) => setContact({ ...contact, whatsapp: e.target.value })}
            className="w-full border px-4 py-2 rounded"
            required
          />
          <input
            type="text"
            placeholder="Facebook URL"
            value={contact.facebook}
            onChange={(e) => setContact({ ...contact, facebook: e.target.value })}
            className="w-full border px-4 py-2 rounded"
          />
          <input
            type="text"
            placeholder="Instagram URL"
            value={contact.instagram}
            onChange={(e) => setContact({ ...contact, instagram: e.target.value })}
            className="w-full border px-4 py-2 rounded"
          />

          <div className="flex gap-4">
            <button
              type="submit"
              className="flex-1 bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
            >
              {contact._id ? "Update" : "Add"}
            </button>

            {contact._id && (
              <button
                type="button"
                onClick={() => handleDelete(contact._id)}
                className="flex-1 bg-red-500 text-white py-2 rounded hover:bg-red-600 transition"
              >
                Delete
              </button>
            )}
          </div>
        </form>

        {/* EXISTING CONTACTS */}
        {contacts.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold mb-2">Existing Contacts</h2>
            {contacts.map((c) => (
              <div
                key={c._id}
                className="bg-gray-50 p-4 rounded-lg border-l-4 border-indigo-600 flex flex-col gap-2"
              >
                <p><strong>Phone:</strong> {c.phone}</p>
                <p><strong>WhatsApp:</strong> {c.whatsapp}</p>
                <p><strong>Facebook:</strong> {c.facebook}</p>
                <p><strong>Instagram:</strong> {c.instagram}</p>

                <div className="flex gap-2 mt-2">
                  <button
                    onClick={() => handleEdit(c)}
                    className="bg-yellow-400 text-white px-3 py-1 rounded hover:bg-yellow-500 transition"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(c._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
};

export default AdminContacts;
