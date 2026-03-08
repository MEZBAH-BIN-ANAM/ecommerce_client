import { Link } from "react-router-dom";
import WishListIcon from "./WishListIcon";
import DiscountParcent from "./DiscountParcent";
const url = import.meta.env.VITE_ENDPOINT;

const ProductElement = ({ products }) => {
  return (
    <>
      {products.map((item) => (
        <Link
          key={item._id}
          to={`/product/${item._id}`}
          className="group bg-white relative  rounded-lg shadow-sm hover:shadow-2xl transition-all duration-300 mb-12"
        >
          {/* wishlist icon */}
          <WishListIcon id={item._id} />

          {/* discount parcent */}
          <span>
            <DiscountParcent discount={item.discount} />
          </span>

          {/* IMAGE SECTION */}
          <div className="p-3 bg-white rounded-t-lg">
            <div className="w-full aspect-square flex items-center justify-center overflow-hidden">
              <img
                src={`${url}/upload/${item.image}`}
                alt={item.tittle}
                className="max-w-full max-h-full rounded-md object-contain transition-transform duration-300 group-hover:scale-95"
                loading="lazy"
              />
            </div>
          </div>

          {/* CONTENT */}
          <div className="px-3 pb-4">
            {/* TITLE */}
            <h2 className="text-xs md:text-base font-medium text-gray-900 leading-tight line-clamp-2 ">
              {item.tittle}
            </h2>

            {/* PRICE */}
            <div className="mt-1 flex justify-start gap-x-2 ">
              <div className=" text-base font-semibold text-[#f57224] break-keep">
                <span className=" text-base font-normal mr-1">৳</span>
                {item.price}
              </div>
              <div className="  ">
                <span className={` ${item.discount ===0 ?"hidden":""} text-xs font-normal mr-1 my-auto text-red-600`}>
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

export default ProductElement;
