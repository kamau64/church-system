import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaPhoneAlt, FaWhatsapp, FaFacebook, FaInstagram, FaHome } from "react-icons/fa";
import axios from "axios";

export default function Contact() {
  const [contacts, setContacts] = useState([]);

  // Fetch all contact info from backend
  useEffect(() => {
    const fetchContactInfo = async () => {
      try {
        const { data } = await axios.get("http://localhost:5000/api/contact-info");
        if (Array.isArray(data)) {
          setContacts(data);
        } else if (data) {
          setContacts([data]);
        }
      } catch (err) {
        console.error("Failed to fetch contact info:", err);
      }
    };

    fetchContactInfo();
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-6 py-12 font-sans">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800">Contact Us</h1>
        <Link
          to="/"
          className="flex items-center gap-2 bg-blue-800 text-white px-4 py-2 rounded hover:bg-blue-900 transition"
        >
          <FaHome /> Home
        </Link>
      </div>

      {/* CONTACT CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {contacts.length > 0 ? (
          contacts.map((info) => (
            <div key={info._id}>
              <ContactCard
                icon={<FaPhoneAlt className="text-gray-700" />}
                text={info.phone || "Not available"}
                link={`tel:${info.phone}`}
              />
              <ContactCard
                icon={<FaWhatsapp className="text-green-500" />}
                text={info.whatsapp ? `+${info.whatsapp}` : "Not available"}
                link={
                  info.whatsapp
                    ? `https://wa.me/${info.whatsapp}?text=Hello%20Church`
                    : "#"
                }
              />
              <ContactCard
                icon={<FaFacebook className="text-blue-600" />}
                text="Facebook Page"
                link={info.facebook || "#"}
              />
              <ContactCard
                icon={<FaInstagram className="text-pink-500" />}
                text="Instagram Page"
                link={info.instagram || "#"}
              />
            </div>
          ))
        ) : (
          <p className="text-gray-500 col-span-full">No contact info available</p>
        )}
      </div>
    </div>
  );
}

// ====== CONTACT CARD COMPONENT ======
function ContactCard({ icon, text, link }) {
  return (
    <a
      href={link}
      target="_blank"
      rel="noreferrer"
      className="flex items-center gap-3 bg-gray-100 p-6 rounded shadow hover:shadow-lg transition font-medium"
    >
      <span className="text-2xl">{icon}</span>
      <span className="text-gray-700">{text}</span>
    </a>
  );
}
