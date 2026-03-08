import { useAppContext } from "@/store/store";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
const url = import.meta.env.VITE_ENDPOINT;


const HomeCategory = () => {
  const [allCategory, setAllCategory] = useState([]);
  const {setCategoryName}= useAppContext()

  // ✅ Fetch LIMITED categories
  const getAllCategories = async () => {
    try {
      const res = await fetch(
        `${url}/api/client/home/categories?limit=12`,
        {
          method: "GET",
        }
      );

      const data = await res.json();

      if (res.ok) {
        setAllCategory(data);
      } else {
        toast.error("Failed to load categories");
      }
    } catch (error) {
      toast.error("Internal server error");
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCategories();
  }, []);

  return (
    <div className="w-[90%] mx-auto mt-2">
      <div className="flex justify-between max-[430px]:mt-0 max-[430px]:mb-6 mt-6 mb-10 px-3">
        <h1 className=" text-2xl sm:text-xl md:text-3xl   font-bold text-gray-900">
          Categories
        </h1>
        <div className="text-md max-[430px]:h-8 h-10 w-28 max-[430px]:w-24 flex justify-center items-center rounded-full border hover:border-teal-800 bg-teal-800 overflow-hidden">
          <Link
            to="/categories"
            className="relative w-full h-full flex items-center justify-center font-semibold group"
          >
            <span className="relative max-[430px]:text-xs z-10 text-white group-hover:text-emerald-950 transition-all duration-300">
              See all
            </span>

            <span className="absolute inset-0 w-0 bg-white transition-all duration-300 ease-out group-hover:w-full"></span>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-3 ">
        {allCategory.map((singleCategory) => (
          <Link
          to={"/categories"}
          onClick={()=>setCategoryName(singleCategory.category_name)}
          key={singleCategory._id}
          className="group relative "
        >
          <div className="relative flex flex-col items-center bg-background px-3 py-2 rounded-xl shadow transition cursor-pointer border overflow-hidden hover:shadow-lg hover:scale-105">
            {/* Overlay */}
            <span className="absolute bottom-0 left-0 w-full h-0 bg-emerald-100 transition-all duration-500 ease-out group-hover:h-full"></span>
        
            {/* Image */}
            <img
              src={`${url}/upload/${singleCategory.image}`}
              alt={singleCategory.category_name}
              className="relative z-10 max-[430px]:w-15 max-[430px]:h-15 w-28 h-28 object-cover rounded-full transition hover:scale-95 border group-hover:border-0 mt-2"
            />
        
            {/* Text */}
            <h1 className="relative z-10 text-xs sm:text-sm 2xl:text-base mt-3 text-md font-semibold text-emerald-950 transition min-h-12 flex items-center justify-center">
              {singleCategory.category_name}
            </h1>
          </div>
        </Link>
        
        ))}
      </div>
    </div>
  );
};

export default HomeCategory;
