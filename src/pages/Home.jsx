import Carousel from "@/Components/Carosel";
import React from "react";
import { Link } from "react-router-dom";
import HomeCategory from "@/Components/HomeCategory";
import HomeProducts from "@/Components/HomeProducts";

const Home = () => {
  return (
    <div className=" bg-background font2 ">
      <Carousel />
      {/* categories */}
      <HomeCategory />

      {/* product element */}
      <div className="w-[90%] mx-auto relative mb-12">
        <div className="flex justify-between px-3 max-[430px]:my-8 my-12">
          <h1 className=" text-2xl sm:text-xl md:text-3xl  font-bold text-gray-900">
            Just For You
          </h1>
          <div className=" text-md max-[430px]:h-8 h-10 max-[430px]:w-24 w-28 flex justify-center items-center rounded-full border border-rose-950 hover:border-teal-900 bg-transparent overflow-hidden ">
            <Link
              to="/products"
              className=" relative w-full h-full flex items-center justify-center  font-semibold  group"
            >
              <span className="relative z-10 max-[430px]:text-xs text-black group-hover:text-white transition duration-300">
                View all
              </span>

              <span className="absolute inset-0 w-0 bg-teal-900 transition-all duration-300 ease-out group-hover:w-full " />
            </Link>
          </div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 max-[430px]:gap-2 gap-3">
          <HomeProducts />
        </div>
      </div>
    </div>
  );
};

export default Home;
