import { useAppContext } from "@/store/store";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
const url = import.meta.env.VITE_ENDPOINT;

const ProductDetails = () => {
  const [productDetails, setProductDetails] = useState([]);

  const param = useParams();
  const navigate = useNavigate();

  const {
    productId,
    setProductId,
    quantity,
    setQuantity,
    haveToken,
    addToTempCart, // ✅ added
  } = useAppContext();

  const getProductById = async () => {
    try {
      const res = await fetch(`${url}/api/client/product/${param.id}`, {
        method: "get",
      });
      const data = await res.json();
      if (res.ok) {
        setProductDetails(data.singleProduct[0]);
        setProductId(data.singleProduct[0]._id); // ✅ ensure productId is set
      }
    } catch (error) {
      console.log(error);
    }
  };

  // =========================
  // ADD TO CART
  // =========================
  const handleCart = async () => {
    if (!haveToken) {
      addToTempCart(productDetails._id, quantity);
      toast.info("Please login to continue");
      navigate("/login");
      return;
    }

    try {
      const res = await fetch(`${url}/api/client/cart/add`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ productId, quantity }),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      console.error(err);
    }
  };

  // =========================
  // BUY NOW
  // =========================
  const handleBuyNow = async () => {
    if (!haveToken) {
      addToTempCart(productDetails._id, quantity);
      toast.info("Please login to continue");
      navigate("/login");
      return;
    }

    try {
      const res = await fetch(`${url}/api/client/cart/add`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId, quantity }),
      });

      const data = await res.json();
      if (res.ok) {
        toast.success("Checkout now");
        return navigate("/checkout");
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    getProductById();
  }, []);

  return (
    <div>
      <div className=" font2 max-w-4xl mx-auto bg-white  rounded-2xl overflow-hidden md:flex md:items-start md:gap-6 sm:py-0 px-10 my-20 max-[430px]:mb-8 max-[430px]:mt-4  ">
        <div className="md:w-1/3 shrink-0 bg-gray-50 rounded-lg p-4 flex flex-col items-center justify-center  ">
          <img
            src={`${url}/upload/${productDetails?.image}`}
            alt={productDetails.tittle}
            className="w-full h-56 md:h-48 object-contain rounded-lg  "
          />
        </div>

        <div className="md:w-2/3 ">
          <div className="space-y-3 ">
            <h1 className="text-xl font-semibold ">
              <div className="text-base font-bold text-emerald-900  ">
                {productDetails.tittle}{" "}
              </div>
            </h1>

            <div>
              <span className="  ">
                <span className=" text-base font-normal mr-1 line-through  text-gray-500">
                  ৳
                  {productDetails.price +
                    parseInt(
                      (productDetails.price * productDetails.discount) / 100
                    )}
                </span>

                <span className="text-red-500">
                  {" "}
                  -{productDetails.discount || 0}%
                </span>
              </span>
              <h1 className="text-xl text-orange-800 font-bold">
                <span className=" font-normal mr-1.5">৳</span>
                {productDetails.price}
              </h1>
            </div>
            <h1 className="text-sm text-gray-600">
              <span className="font-medium text-gray-700">
                <span className="font-bold text-black ">Brand Name : </span>
                <span className="font-normal ml-1 ">
                  {productDetails.brand}{" "}
                </span>
              </span>
            </h1>
            <h1 className="text-sm text-gray-600">
              <span className="font-normal text-gray-800">
                <span className="text-black font-bold mr-2 "> Stock : </span>{" "}
                <span
                  className={
                    productDetails.stock > 0
                      ? "text-white rounded-full bg-green-800 border border-green-800 px-3 py-1"
                      : "text-white rounded-full bg-red-700 border border-red-700 px-3 py-1"
                  }
                >
                  {productDetails.stock > 0 ? "Available" : "Not Available"}
                </span>
              </span>
            </h1>

            <h1 className="text-sm font-bold text-white bg-orange-900 w-fit px-4 py-1 rounded-r-2xl rounded-l-md ">
              Description
            </h1>

            <p className="my-4 text-gray-800 text-sm leading-relaxed ml-2">
              {productDetails.description}
            </p>

            <div className="flex items-center gap-3">
              <h1 className="text-sm font-medium text-black">Quantity:</h1>

              <button
                className="px-3 py-1 rounded-md border border-gray-300 bg-white hover:bg-gray-100 text-gray-700 cursor-pointer shadow-sm"
                onClick={() => {
                  if (quantity !== 1) {
                    setQuantity((prev) => prev - 1);
                  }
                }}
              >
                -
              </button>

              <button className="px-4 py-1 rounded-md border border-gray-300 bg-white text-gray-800 font-medium shadow inset-0">
                {quantity}
              </button>

              <button
                className="px-3 py-1 rounded-md border border-gray-300 bg-white hover:bg-gray-100 text-gray-700 cursor-pointer shadow-sm"
                onClick={() => setQuantity((prev) => prev + 1)}
              >
                +
              </button>
            </div>

            <div className="mt-3 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <button
                onClick={() => {
                  handleBuyNow(productDetails._id, quantity);
                }}
                className="relative w-full sm:w-auto px-6 py-2 rounded-xl  font-semibold tracking-wide bg-emerald-600 text-white border border-emerald-600 overflow-hidden group transition-all duration-500 ease-out  hover:text-emerald-600 active:scale-[0.97] shadow-md shadow-emerald-600/30 hover:shadow-emerald-600/10"
              >
                {/* White slide overlay */}
                <span className="absolute inset-0 w-0 bg-white transition-all duration-500 ease-out  group-hover:w-full rounded-xl"></span>

                {/* Text */}
                <span className="relative z-10 text-sm sm:text-base">
                  Buy Now
                </span>
              </button>

              <Link
                to={"/cart"}
                onClick={() => handleCart(productDetails._id, quantity)}
              >
                <button className="relative w-full sm:w-auto px-6 py-2 rounded-xl  font-semibold tracking-wide border border-emerald-600 group-hover:border-0  text-emerald-600 overflow-hidden group transition-all duration-500 ease-out  hover:text-white active:scale-[0.97] shadow-md shadow-emerald-600/10 hover:shadow-emerald-600/30">
                  {/* Gradient Fill Animation */}
                  <span className="absolute inset-0 w-0 bg-linear-to-r from-emerald-600 to-emerald-800  transition-all duration-500 ease-out group-hover:w-full rounded-xl"></span>

                  {/* Soft Glow Layer */}
                  <span className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-emerald-500/10 blur-md transition duration-300"></span>

                  {/* Text */}
                  <span className="relative z-10 text-sm sm:text-base">
                    Add to Cart
                  </span>
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;

