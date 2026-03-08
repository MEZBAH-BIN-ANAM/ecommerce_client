import React from "react";
import { FaHome } from "react-icons/fa";
import { BsBorderStyle } from "react-icons/bs";
import { Link } from "react-router-dom";

const CODSuccess = () => {
  return (
    <div className="h-full py-10 max-[325px]:px-1 px-4 flex items-center justify-center bg-linear-to-br from-gray-100 via-white ">
      <div className="relative bg-white shadow-2xl rounded-3xl p-8 max-w-md w-full text-center
                      scale-95 opacity-0 animate-[fadeIn_0.9s_ease-out_forwards]">

        {/* Decorative Glow */}
        <div className="absolute -top-6 z-12 -right-6 w-15 h-15 bg-emerald-500 rounded-full blur-3xl opacity-30"></div>
        <div className="absolute -bottom-6 -left-6 w-15 h-15 bg-teal-500 rounded-full blur-3xl opacity-30"></div>

        {/* Success Icon */}
        <div className="mx-auto w-15 h-15 flex items-center justify-center rounded-full bg-emerald-600 text-white text-5xl mb-4 animate-bounce shadow-xl">
          ✓
        </div>

        <h2 className="text-3xl max-[430px]:text-xl font-bold text-gray-800 tracking-wide">
          Order Confirmed!
        </h2>

        <p className="mt-4 text-gray-600 text-lg leading-relaxed">
          Thank you for ordering. Your product is on the way!
        </p>

        {/* Buttons */}
        <div className="flex items-center justify-around gap-2 mt-8">
          <Link
            to="/"
            className="flex items-center gap-2 px-6 py-3 bg-emerald-600 text-white font-semibold rounded-lg
                       hover:bg-emerald-700 hover:-translate-y-1 hover:shadow-emerald-400/60
                       transition-all duration-300 max-[430px]:text-xs shadow-md"
          >
            <FaHome className="text-lg" /> Home
          </Link>

          <Link
            to="/orderHistory"
            className="flex items-center gap-2 px-6 py-3 bg-rose-900 text-white font-semibold rounded-lg
                       hover:bg-rose-700 hover:-translate-y-1 hover:shadow-teal-400/60
                       transition-all max-[430px]:px-4 max-[430px]:text-xs duration-300 shadow-md"
          >
            <BsBorderStyle className="text-lg" /> Order History
          </Link>
        </div>

      </div>
    </div>
  );
};

export default CODSuccess;
