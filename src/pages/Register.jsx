import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FaUser, FaEnvelope, FaLock, FaMapMarkerAlt } from "react-icons/fa";
import { HiEye, HiEyeSlash } from "react-icons/hi2";
const url = import.meta.env.VITE_ENDPOINT;


const Register = () => {
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    address: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleInput = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${url}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
        credentials: "include",
      });

      const data = await res.json();
      if (res.ok) {
        toast.success("Registration Successful");
        navigate("/login");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="pb-10 pt-14 flex items-center justify-center bg-linear-to-b from-slate-900 via-black to-slate-900 px-4">
      <div className="w-full max-w-xl bg-transparent p-3 sm:p-8 rounded-xl">
        <h1 className="text-3xl font-bold text-center text-white mb-1">
          Create Account
        </h1>
        <p className="text-center text-sm text-slate-400 mb-6">
          Join us and start shopping smarter
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Username */}
          <div>
            <label className="text-sm font-medium text-slate-300">
              Full Name
            </label>
            <div className="flex items-center mt-1 bg-white rounded-md px-3 border border-slate-300 focus-within:border-amber-500">
              <FaUser className="text-slate-500" />
              <input
                type="text"
                name="username"
                placeholder="Your full name"
                value={user.username}
                onChange={handleInput}
                required
                className="w-full px-3 py-2 outline-none text-slate-800 placeholder:text-slate-400 bg-transparent"
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="text-sm font-medium text-slate-300">Email</label>
            <div className="flex items-center mt-1 bg-white rounded-md px-3 border border-slate-300 focus-within:border-amber-500">
              <FaEnvelope className="text-slate-500" />
              <input
                type="email"
                name="email"
                placeholder="example@email.com"
                value={user.email}
                onChange={handleInput}
                required
                className="w-full px-3 py-2 outline-none text-slate-800 placeholder:text-slate-400 bg-transparent"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="text-sm font-medium text-slate-300">
              Password
            </label>
            <div className="flex items-center mt-1 bg-white rounded-md px-3 border border-slate-300 focus-within:border-amber-500">
              <FaLock className="text-slate-500" />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Create a strong password"
                value={user.password}
                onChange={handleInput}
                required
                className="w-full px-3 py-2 outline-none text-slate-800 placeholder:text-slate-400 bg-transparent"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="ml-1 text-slate-500 hover:text-slate-700"
              >
                {!showPassword ? (
                  <HiEyeSlash className="text-xl" />
                ) : (
                  <HiEye className="text-xl" />
                )}
              </button>
            </div>
          </div>

          {/* Address */}
          <div>
            <label className="text-sm font-medium text-slate-300">
              Address
            </label>
            <div className="flex items-center mt-1 bg-white rounded-md px-3 border border-slate-300 focus-within:border-amber-500">
              <FaMapMarkerAlt className="text-slate-500" />
              <input
                type="text"
                name="address"
                placeholder="Your delivery address"
                value={user.address}
                onChange={handleInput}
                required
                className="w-full px-3 py-2 outline-none text-slate-800 placeholder:text-slate-400 bg-transparent"
              />
            </div>
          </div>

          {/* CTA */}
          <button
            type="submit"
            className="w-full relative overflow-hidden border border-orange-600 bg-orange-600 text-white  py-2.5 rounded-lg font-semibold transition group my-4"
          >
            {/* Hover sliding background */}
            <span className="absolute inset-0 w-0 h-full bg-white transition-all duration-500 ease-out group-hover:w-full pointer-events-none" />

            {/* Button text */}
            <span className="relative z-10 transition-colors duration-300 group-hover:text-orange-600">
              CREATE ACCOUNT
            </span>
          </button>
        </form>

        <p className="text-center text-sm sm:text-base mt-4 text-slate-400">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-amber-500 font-semibold hover:underline underline-offset-2"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
