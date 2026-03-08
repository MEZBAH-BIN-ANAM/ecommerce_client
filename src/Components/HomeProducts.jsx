import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import WishListIcon from "./WishListIcon";
import DiscountParcent from "./DiscountParcent";
const api = import.meta.env.VITE_ENDPOINT;

const HomeProducts = () => {
  const [products, setProducts] = useState([]);


  // Fetch LIMITED products
  const getAllProduct = async () => {
    try {
      const res = await fetch(`${api}/api/client/home/products?limit=24`,{method:"get"});

      const data = await res.json();

      if (res.ok) {
        setProducts(data);
      }
    } catch (error) {
      toast.error("Internal server error");
      console.log(error);
    }
  };

  useEffect(() => {
    getAllProduct();
  }, []);

  return (
    <>
      {products.map((item) => (
        <Link
          key={item._id}
          to={`/product/${item._id}`}
          className="group bg-white rounded-lg shadow-sm relative
                     hover:shadow-2xl transition-all duration-300"
        >
          {/* whislist icon */}
          <WishListIcon id={item._id} />
          {/* discount parcent */}
          <DiscountParcent discount={item.discount} />

          {/* IMAGE */}

          <div className="p-3 bg-white rounded-t-lg">
            <div className="w-full aspect-square flex items-center justify-center overflow-hidden">
              <img
                src={`${api}/upload/${item.image}`}
                alt={item.tittle}
                className="max-w-full rounded-md max-h-full object-contain
                           transition-transform duration-300
                           group-hover:scale-95"
                loading="lazy"
              />
            </div>
          </div>

          {/* CONTENT */}
          <div className="px-3 pb-4">
            {/* TITLE */}
            <h2
              className="text-xs md:text-base font-medium text-gray-900
                           leading-tight line-clamp-2 "
            >
              {item.tittle}
            </h2>

            {/* PRICE */}
            <div className="mt-1 flex justify-start gap-x-2 ">
              <div className=" text-base font-semibold text-[#f57224] break-keep">
                <span className=" text-base font-normal mr-1">৳</span>
                {item.price}
              </div>
              <div className="  ">
                <span className={` ${item.discount ===0 ?"hidden":""} text-xs font-normal mr-1 my-auto text-red-600 `}>
                  {" "}
                  -{item.discount}%
                </span>
              </div>
            </div>

            <h1 className="text-sm text-gray-600 mt-2 ml-1">
              <span className="font-semibold">
                <span
                  className={
                    item.stock > 0
                      ? "text-green-800"
                      : "text-red-600"
                  }
                >
                  {item.stock > 0 ? "Available" : "Not Available"}
                </span>
              </span>
            </h1>
            
          </div>
        </Link>
      ))}
    </>
  );
};

export default HomeProducts;
