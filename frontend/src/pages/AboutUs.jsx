import React from "react";
import { Link } from "react-router-dom"; // ✅ Import Link
import founder1Img from "../images/leader1.jpg"; // Leader 1
import founder2Img from "../images/leader2.jpg"; // Leader 2
import founder3Img from "../images/leader3.jpg"; // Leader 3
import earlyImg from "../images/pcfm.jpg"; // Early church
import church1Img from "../images/church.jpeg"; // Evolution image 1
import church2Img from "../images/church.jpeg"; // Evolution image 2
import church3Img from "../images/church.jpeg"; // Evolution image 3
import charity1Img from "../images/old.jpg"; // Charity images
import charity2Img from "../images/old.jpg";
import charity3Img from "../images/old.jpg";

const AboutUs = () => {

  const leaders = [
    { img: founder1Img, name: "Pastor John Doe", desc: "Co-founder and visionary, dedicated to nurturing faith and serving the community." },
    { img: founder2Img, name: "Pastor Jane Smith", desc: "Co-founder and spiritual mentor, guiding members in faith and fellowship." },
    { img: founder3Img, name: "Pastor Michael Lee", desc: "Co-founder focused on outreach and community programs, bringing people together in love and service." },
  ];

  const evolution = [
    { img: church1Img, title: "1967 Church", desc: "The humble beginnings of our church, where faith first gathered." },
    { img: church2Img, title: "1980 Expansion", desc: "Our church expanded to accommodate the growing congregation." },
    { img: church3Img, title: "Present Church", desc: "Today, a thriving community with multiple ministries and outreach programs." }
  ];

  const charity = [
    { img: charity1Img, title: "Visiting Elders", desc: "Regular visits to offer companionship and care to our elderly community members." },
    { img: charity2Img, title: "Food & Essentials", desc: "Providing meals, groceries, and daily essentials to senior members in need." },
    { img: charity3Img, title: "Health & Wellness", desc: "Organizing health checkups, medicines, and wellness programs for the elderly." }
  ];

  return (
    <div className="min-h-screen bg-gray-100">

      {/* HOME BUTTON */}
      <div className="py-4 px-6 bg-white shadow-md">
        <Link
          to="/"
          className="text-indigo-600 font-semibold hover:text-indigo-800 transition"
        >
          ← Home
        </Link>
      </div>

      {/* BRIEF DESCRIPTION */}
      <section className="py-12 px-6 text-center bg-white shadow-md mt-4">
        <h1 className="text-4xl font-bold text-indigo-600 mb-4">
          About Our Church
        </h1>
        <p className="text-gray-700 max-w-3xl mx-auto text-lg">
          Our Church is a Christ-centered community dedicated to spreading the Gospel, nurturing believers, and serving our local and global community. 
          We aim to impact lives, build faith, and create a loving and welcoming fellowship for everyone.
        </p>
      </section>

      {/* FOUNDERS / LEADERS */}
      <section className="py-12 px-6 bg-white shadow-md mt-12">
        <h2 className="text-3xl font-bold text-indigo-600 mb-6 text-center">Our Leaders</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {leaders.map((leader, idx) => (
            <div key={idx} className="shadow-lg rounded-lg overflow-hidden hover:scale-105 transition transform">
              <img src={leader.img} alt={leader.name} className="h-64 w-full object-cover" />
              <div className="p-4">
                <h3 className="font-semibold text-lg mb-2">{leader.name}</h3>
                <p className="text-gray-700 text-sm">{leader.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* EARLY DAYS */}
      <section className="py-12 px-6 mt-12">
        <div className="flex flex-col md:flex-row-reverse items-center gap-6">
          <img src={earlyImg} alt="Early Church" className="w-full md:w-1/3 h-64 object-cover rounded-lg shadow-lg" />
          <div className="md:w-2/3">
            <h3 className="text-2xl font-semibold mb-2">Where It All Started</h3>
            <p className="text-gray-700 text-lg">
              The church began as a small fellowship in a rented hall with just 20 members. With faith, prayer, and dedication, it quickly grew as more people joined to experience a loving community.
            </p>
          </div>
        </div>
      </section>

      {/* EVOLUTION / PRESENT */}
      <section className="py-12 px-6 bg-white shadow-md mt-12">
        <h2 className="text-3xl font-bold text-indigo-600 mb-6 text-center">Our Evolution</h2>
        <p className="text-gray-700 max-w-3xl mx-auto text-lg mb-8 text-center">
          From our humble beginnings to our present thriving community, our church has grown and evolved through faith and dedication.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {evolution.map((item, idx) => (
            <div key={idx} className="shadow-lg rounded-lg overflow-hidden hover:scale-105 transition transform">
              <img src={item.img} alt={item.title} className="h-64 w-full object-cover" />
              <div className="p-4">
                <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                <p className="text-gray-700 text-sm">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CHARITY / OUTREACH */}
      <section className="py-12 px-6 bg-white shadow-md mt-12 mb-12">
        <h2 className="text-3xl font-bold text-indigo-600 mb-6 text-center">Our Charity & Outreach</h2>
        <p className="text-gray-700 max-w-3xl mx-auto text-lg mb-8 text-center">
          Our Church is dedicated to supporting the elderly in our community. 
          Through love, care, and practical help, we aim to bring comfort, joy, and dignity to our senior members.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {charity.map((item, idx) => (
            <div key={idx} className="shadow-lg rounded-lg overflow-hidden hover:scale-105 transition transform">
              <img src={item.img} alt={item.title} className="h-48 w-full object-cover" />
              <div className="p-4">
                <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                <p className="text-gray-700 text-sm">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};

export default AboutUs;
