import React from "react";
import { Link } from "react-router-dom";
import "./error.css";

const Error = () => {
  return (
    <div className="relative min-h-screen overflow-hidden bg-linear-to-br from-black via-slate-900 to-black text-white flex items-center justify-center px-4">
      {/* GLOW BACKGROUND */}
      <div className="absolute -top-40 -left-40 h-112 w-md rounded-full bg-teal-500/20 blur-3xl animate-orbit" />
      <div className="absolute top-1/2 -right-40 h-128 w-lg rounded-full bg-cyan-500/20 blur-3xl animate-orbit-reverse" />

      {/* CONTENT */}
      <div className="relative z-10 text-center animate-rise">
        <h1 className="text-[110px] md:text-[170px] font-extrabold tracking-widest text-transparent bg-clip-text bg-linear-to-r from-teal-400 via-cyan-400 to-teal-400 animate-breathe">
          404
        </h1>

        <h2 className="mt-2 text-2xl md:text-3xl font-semibold animate-flicker">
          Page Not Found
        </h2>

        <p className="mt-4 text-gray-400 text-sm md:text-base animate-fade">
          This page disappeared into the void.
        </p>

        <Link
          to="/"
          className="inline-block mt-8 rounded-full bg-linear-to-r from-teal-400 to-cyan-500 px-8 py-3 text-sm md:text-base font-semibold text-black shadow-lg shadow-teal-500/40 transition-transform duration-300 hover:scale-110 animate-pulse-soft"
        >
          Go Home
        </Link>
      </div>

      {/* FLOATING PARTICLES */}
      <span className="particle top-1/4 left-1/4" />
      <span className="particle top-1/3 right-1/4 delay-200" />
      <span className="particle bottom-1/4 left-1/3 delay-500" />
      <span className="particle bottom-1/3 right-1/3 delay-700" />
    </div>
  );
};

export default Error;
