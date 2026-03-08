import { useEffect, useState } from "react";
import { useAppContext } from "@/store/store";
import { Link } from "react-router-dom";
import { GoHeartFill } from "react-icons/go";
import { BsCartPlus } from "react-icons/bs";
import DiscountParcent from "@/Components/DiscountParcent";
const url = import.meta.env.VITE_ENDPOINT;

const WishLists = () => {
  const { wishlist, handleWishlist } = useAppContext();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchWishlistProducts = async () => {
      if (wishlist.length === 0) {
        setProducts([]);
        return;
      }

      try {
        const res = await fetch(`${url}/api/client/allWishlist`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ wishlist }),
        });

        const data = await res.json();
        if (res.ok) setProducts(data.products);
      } catch (err) {
        console.log(err);
      }
    };

    fetchWishlistProducts();
  }, [wishlist]);

  /* EMPTY STATE */
  if (wishlist.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
        <h2 className="text-3xl font-bold text-gray-800 mb-4 tracking-tight max-[430px]:text-xl">
          Your wishlist is empty
        </h2>

        <p className="text-gray-500 mb-8 max-w-md">
          Looks like you haven’t added anything yet. Start exploring and save
          your favorite items.
        </p>

        <Link
          to="/products"
          className="relative inline-flex items-center justify-center px-8 py-3
                   bg-linear-to-r from-orange-500 to-orange-600
                   text-white font-medium rounded-xl
                   shadow-lg shadow-orange-500/30
                   overflow-hidden transition-all duration-300
                   hover:from-green-600 hover:to-green-700
                   hover:shadow-green-600/40
                   hover:-translate-y-0.5"
        >
          <span
            className="absolute inset-0 bg-white/10 opacity-0
                     transition-opacity duration-300 hover:opacity-100"
          />
          <span className="relative z-10">Continue Shopping</span>
        </Link>
      </div>
    );
  }

  return (
    <div className=" mx-auto px-2 sm:px-4 lg:px-8 pt-10 pb-10 bg-white font2">
      <h1 className="sm:text-2xl text-center max-w-md mx-auto text-teal-800 drop-shadow-xl drop-shadow-emerald-600 font-extrabold mb-8 bg-gray-100 px-5 py-2.5 rounded-br-2xl rounded-bl-2xl ">
        My Wishlist
      </h1>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 max-[430px]:gap-2 gap-3">
        {products.map((item) => (
          <div
            key={item._id}
            className="group bg-white/40 rounded-lg shadow-sm hover:shadow-2xl transition-all duration-300"
          >
            <DiscountParcent discount={item.discount} />
            {/* IMAGE SECTION */}
            <Link to={`/product/${item._id}`}>
              <div className="p-3 bg-white/40 rounded-t-lg">
                <div className="w-full aspect-square flex items-center justify-center overflow-hidden">
                  <img
                    src={`${url}/upload/${item.image}`}
                    alt={item.tittle}
                    className="max-w-full max-h-full rounded-md object-contain transition-transform duration-300 group-hover:scale-95"
                    loading="lazy"
                  />
                </div>
              </div>
            </Link>

            {/* CONTENT */}
            <div className="px-2 pb-2">
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
                  <span className={` ${item.discount === 0 ? "hidden" :""} text-xs font-normal mr-1 my-auto text-red-600`}>
                    {" "}
                    -{item.discount}%
                  </span>
                </div>
              </div>

              <h1 className={`text-sm text-gray-600 mt-2 ml-1 mb-1`}>
                <span className="font-semibold">
                  <span
                    className={
                      item.stock > 0 ? "text-green-800" : "text-red-600"
                    }
                  >
                    {item.stock > 0 ? "Available" : "Not Available"}
                  </span>
                </span>
              </h1>
            </div>
            {/* ACTION BUTTONS */}
            <div className="px-3 pb-4 flex flex-col gap-2">
              <button
                onClick={() => handleWishlist(item._id)}
                className="flex-1 flex items-center justify-center  gap-1 text-xs py-2 rounded-md border border-red-500 text-red-500 hover:bg-red-500 hover:text-white transition duration-300 "
              >
                <GoHeartFill className=" h-full " />
                Remove
              </button>

              <Link
                to={`/product/${item._id}`}
                className="flex-1 flex items-center justify-center gap-1 text-xs py-2 rounded-md hover:bg-[#f57224] text-white bg-orange-700 transition duration-200 "
              >
                <BsCartPlus />
                Add to Cart
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WishLists;
