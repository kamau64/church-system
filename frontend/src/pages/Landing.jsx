import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

import churchImg from "../images/church.jpeg";
import choir from "../images/choir.jpg";
import pcfm from "../images/pcfm.jpg";
import trop from "../images/trop.jpg";

import leader1 from "../images/leader1.jpg";
import leader2 from "../images/leader2.jpg";
import leader3 from "../images/leader3.jpg";
import logo from "../images/logo.jpg";

/* HERO IMAGES + NAMES */
const heroSlides = [
  { image: churchImg, name: "Our Church" },
  { image: choir, name: "Choir Ministry" },
  { image: pcfm, name: "PCFM Fellowship" },
  { image: trop, name: "TROP Ministry" },
];

/* MISSION / VISION / MOTTO */
const churchStatements = [
  {
    title: "Our Mission",
    text:
      "To preach the Gospel of Jesus Christ, nurture believers, and serve our community with love and compassion.",
  },
  {
    title: "Our Theme",
    text:
      "Jude 1:3 — Beloved, while I was very eager to write to you about our common salvation, I found it necessary to write appealing that you contend for the faith that was once for all delivered to the saints.",
  },
  {
    title: "Our Vision",
    text:
      "To be a Christ-centered church transforming lives and impacting generations.",
  },
  {
    title: "Our Motto",
    text: "Faith • Love • Service",
  },
];

/* LEADERS DATA */
const leaders = [
  { img: leader1, name: "Pastor John Doe", position: "Senior Pastor" },
  { img: leader2, name: "Pastor Jane Smith", position: "Assistant Pastor" },
  { img: leader3, name: "Pastor Michael Lee", position: "Youth Pastor" },
];

const Landing = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentStatement, setCurrentStatement] = useState(0);

  const slideIntervalRef = useRef(null);
  const statementIntervalRef = useRef(null);

  /* HERO AUTO SLIDE – 15 SECONDS */
  const startAutoSlide = () => {
    slideIntervalRef.current = setInterval(() => {
      setCurrentSlide((prev) =>
        prev === heroSlides.length - 1 ? 0 : prev + 1
      );
    }, 15000);
  };

  const stopAutoSlide = () => {
    if (slideIntervalRef.current) clearInterval(slideIntervalRef.current);
  };

  useEffect(() => {
    startAutoSlide();
    return () => stopAutoSlide();
  }, []);

  /* MISSION / VISION AUTO SWITCH – 8 SECONDS */
  useEffect(() => {
    statementIntervalRef.current = setInterval(() => {
      setCurrentStatement((prev) =>
        prev === churchStatements.length - 1 ? 0 : prev + 1
      );
    }, 8000);

    return () => clearInterval(statementIntervalRef.current);
  }, []);

  /* HERO ARROWS */
  const prevSlide = () => {
    setCurrentSlide(
      currentSlide === 0 ? heroSlides.length - 1 : currentSlide - 1
    );
  };

  const nextSlide = () => {
    setCurrentSlide(
      currentSlide === heroSlides.length - 1 ? 0 : currentSlide + 1
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* NAVBAR */}
      <nav className="bg-white shadow-md px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img src={logo} alt="Church Logo" className="h-10 w-10" />
          <span className="font-bold text-xl text-indigo-600">Our Church</span>
        </div>

        <ul className="flex gap-6 items-center text-gray-700 font-medium">
          <li>
            <Link to="/" className="hover:text-indigo-600">
              Home
            </Link>
          </li>
          <li>
            <Link to="/about" className="hover:text-indigo-600">
              About Us
            </Link>
          </li>
          <li>
            <Link to="/announcements" className="hover:text-indigo-600">
              View Announcements
            </Link>
          </li>
          <li>
            <Link to="/jobs" className="hover:text-indigo-600">
              Jobs
            </Link>
          </li>
          <li>
            <Link to="/contact" className="hover:text-indigo-600">
              Contact
            </Link>
          </li>

          <li>
            <Link
              to="/admin/login"
              className="bg-yellow-400 text-white px-4 py-2 rounded hover:bg-yellow-500 transition"
            >
              Admin Login
            </Link>
          </li>
        </ul>
      </nav>

      {/* HERO SECTION */}
      <section
        className="relative h-[400px] overflow-hidden"
        onMouseEnter={stopAutoSlide}
        onMouseLeave={startAutoSlide}
      >
        {/* IMAGE */}
        <img
          src={heroSlides[currentSlide].image}
          alt={heroSlides[currentSlide].name}
          className="w-full h-full object-cover"
        />

        {/* TOP TEXT (Light Glass) */}
        <div className="absolute top-6 left-1/2 -translate-x-1/2 z-30">
          <div className="backdrop-blur-md bg-black/30 text-indigo-600 px-6 py-3 rounded-xl text-center shadow-lg">
            <h1 className="text-3xl font-bold">Welcome to Our Church</h1>
            <p className="text-sm mt-1 max-w-md text-white">
              Stay updated with announcements, events, and church programs
            </p>
          </div>
        </div>

        {/* IMAGE NAME (Bottom Pill) */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30">
          <div className="backdrop-blur-md bg-black/40 text-white px-5 py-2 rounded-full text-lg font-semibold shadow-md">
            {heroSlides[currentSlide].name}
          </div>
        </div>

        {/* LEFT ARROW */}
        <div
          className="absolute left-0 top-0 h-full w-20 z-40 flex items-center justify-center cursor-pointer"
          onClick={prevSlide}
        >
          <div className="bg-black/60 text-white text-3xl px-4 py-2 rounded-full">
            ‹
          </div>
        </div>

        {/* RIGHT ARROW */}
        <div
          className="absolute right-0 top-0 h-full w-20 z-40 flex items-center justify-center cursor-pointer"
          onClick={nextSlide}
        >
          <div className="bg-black/60 text-white text-3xl px-4 py-2 rounded-full">
            ›
          </div>
        </div>
      </section>

      {/* MISSION / VISION / MOTTO */}
      <section className="bg-white py-12 px-6 text-center shadow-md">
        <h2 className="text-3xl font-bold text-indigo-600 mb-4">
          {churchStatements[currentStatement].title}
        </h2>

        <p className="text-gray-700 text-lg max-w-3xl mx-auto">
          {churchStatements[currentStatement].text}
        </p>

        <div className="flex justify-center gap-3 mt-6">
          {churchStatements.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentStatement(index)}
              className={`h-3 w-3 rounded-full ${
                index === currentStatement
                  ? "bg-indigo-600 scale-110"
                  : "bg-gray-300"
              }`}
            />
          ))}
        </div>
      </section>

      {/* LEADERS (Carousel Style) */}
      <section className="py-12 px-6 bg-white shadow-md mt-12">
        <h2 className="text-3xl font-bold mb-6 text-indigo-600 text-center">
          Our Church Leaders
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {leaders.map((leader, index) => (
            <div
              key={index}
              className="shadow-lg rounded-lg overflow-hidden hover:scale-105 transition transform"
            >
              <img
                src={leader.img}
                alt={leader.name}
                className="h-64 w-full object-cover"
              />
              <div className="p-4">
                <h3 className="font-semibold text-lg mb-1">{leader.name}</h3>
                <p className="text-gray-600">{leader.position}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

 {/* FOOTER */}
<footer className="bg-indigo-600 text-white py-6 mt-auto text-center">
  <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-2">
    <span>© {new Date().getFullYear()} PCEA Kibochoi Church. All rights reserved.</span>
    <div className="flex gap-4 mt-2 md:mt-0">
      {/* Facebook */}
      <a
        href="https://www.facebook.com/yourpage"
        target="_blank"
        rel="noopener noreferrer"
        className="hover:text-gray-300 transition text-2xl"
        aria-label="Facebook"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-6 h-6">
          <path d="M22.675 0H1.325C.593 0 0 .593 0 1.326v21.348C0 23.406.593 24 1.325 24h11.495v-9.294H9.69v-3.622h3.13V8.41c0-3.1 1.893-4.788 4.658-4.788 1.325 0 2.464.099 2.796.143v3.24l-1.918.001c-1.504 0-1.795.716-1.795 1.764v2.313h3.587l-.467 3.622h-3.12V24h6.116C23.406 24 24 23.406 24 22.674V1.326C24 .593 23.406 0 22.675 0z"/>
        </svg>
      </a>

      {/* Instagram */}
      <a
        href="https://www.instagram.com/yourpage"
        target="_blank"
        rel="noopener noreferrer"
        className="hover:text-gray-300 transition text-2xl"
        aria-label="Instagram"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-6 h-6">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.337 3.608 1.312.975.975 1.25 2.242 1.312 3.608.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.337 2.633-1.312 3.608-.975.975-2.242 1.25-3.608 1.312-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.337-3.608-1.312-.975-.975-1.25-2.242-1.312-3.608C2.175 15.747 2.163 15.367 2.163 12s.012-3.584.07-4.85c.062-1.366.337-2.633 1.312-3.608.975-.975 2.242-1.25 3.608-1.312C8.416 2.175 8.796 2.163 12 2.163zm0-2.163C8.741 0 8.332.013 7.052.072 5.765.13 4.605.457 3.635 1.427c-.97.97-1.296 2.13-1.354 3.417C2.013 6.332 2 6.741 2 12c0 5.259.013 5.668.072 6.948.058 1.287.384 2.447 1.354 3.417.97.97 2.13 1.296 3.417 1.354C8.332 23.987 8.741 24 12 24s3.668-.013 4.948-.072c1.287-.058 2.447-.384 3.417-1.354.97-.97 1.296-2.13 1.354-3.417.058-1.28.072-1.689.072-6.948s-.013-5.668-.072-6.948c-.058-1.287-.384-2.447-1.354-3.417-.97-.97-2.13-1.296-3.417-1.354C15.668.013 15.259 0 12 0z"/>
          <path d="M12 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zm0 10.162a3.999 3.999 0 1 1 0-7.998 3.999 3.999 0 0 1 0 7.998z"/>
          <circle cx="18.406" cy="5.594" r="1.44"/>
        </svg>
      </a>

      {/* WhatsApp */}
      <a
        href="https://wa.me/yourphonenumber"
        target="_blank"
        rel="noopener noreferrer"
        className="hover:text-gray-300 transition text-2xl"
        aria-label="WhatsApp"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-6 h-6">
          <path d="M20.52 3.483A11.92 11.92 0 0 0 12 .08C5.373.08.08 5.373.08 12c0 2.12.554 4.12 1.606 5.87L.08 24l6.383-1.592A11.922 11.922 0 0 0 12 23.92c6.627 0 11.92-5.373 11.92-11.92 0-3.18-1.24-6.17-3.4-8.517zM12 21.08c-1.77 0-3.46-.486-4.91-1.4l-.35-.22-3.77.942.995-3.666-.23-.36A9.916 9.916 0 0 1 2.08 12c0-5.44 4.44-9.92 9.92-9.92 2.64 0 5.12 1.03 6.97 2.88a9.91 9.91 0 0 1 2.88 6.97c0 5.48-4.44 9.92-9.92 9.92z"/>
          <path d="M17.593 14.7c-.293-.146-1.735-.857-2.004-.955-.268-.098-.464-.146-.66.146-.195.293-.753.955-.923 1.15-.17.195-.338.219-.63.073-.293-.146-1.236-.455-2.36-1.457-.872-.776-1.46-1.735-1.63-2.028-.17-.293-.018-.452.128-.598.13-.129.293-.338.44-.507.146-.146.195-.244.293-.39.098-.146.049-.27-.024-.39-.073-.122-.66-1.59-.902-2.18-.236-.573-.476-.497-.66-.507l-.566-.01c-.17 0-.44.063-.67.293s-.878.86-.878 2.094c0 1.233.9 2.427 1.026 2.595.122.17 1.772 2.705 4.29 3.79 2.518 1.085 2.518.723 2.974.677.44-.049 1.436-.586 1.64-1.15.195-.561.195-1.04.136-1.15-.049-.098-.195-.146-.39-.293z"/>
        </svg>
      </a>

      {/* Twitter */}
      <a
        href="https://twitter.com/yourpage"
        target="_blank"
        rel="noopener noreferrer"
        className="hover:text-gray-300 transition text-2xl"
        aria-label="Twitter"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-6 h-6">
          <path d="M23.954 4.569c-.885.392-1.83.656-2.825.775a4.92 4.92 0 0 0 2.163-2.723 9.865 9.865 0 0 1-3.127 1.195 4.917 4.917 0 0 0-8.38 4.482A13.938 13.938 0 0 1 1.671 3.149a4.822 4.822 0 0 0-.664 2.475 4.92 4.92 0 0 0 2.188 4.096 4.904 4.904 0 0 1-2.228-.616v.06a4.918 4.918 0 0 0 3.946 4.827 4.996 4.996 0 0 1-2.224.084 4.93 4.93 0 0 0 4.6 3.417A9.867 9.867 0 0 1 0 19.54a13.94 13.94 0 0 0 7.548 2.212c9.056 0 14.009-7.496 14.009-13.986 0-.21-.005-.423-.014-.634a9.936 9.936 0 0 0 2.457-2.548l.002-.003z"/>
        </svg>
      </a>
    </div>
  </div>
</footer>


    </div>
  );
};

export default Landing;
