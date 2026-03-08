import React, { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { RiTimerFlashFill } from "react-icons/ri";
import { useAppContext } from "@/store/store";
const url = import.meta.env.VITE_ENDPOINT;


const Cart = () => {
  const [cartItems, setCartItems] = useState([]);

  const { setCartItemsCount,setQuantity } = useAppContext();

  // Fetch cart from backend
  const getCartData = async () => {
    try {
      const res = await fetch(
        `${url}/api/client/cart/cartData`,
        {
          method: "GET",
          credentials: "include",
        }
      );

      const data = await res.json();

      if (res.ok && data.cart) {
        // Map items to frontend-friendly format
        const items = data.cart.items.map((item) => ({
          id: item.product._id,
          tittle: item.product.tittle,
          category: item.product.category,
          price: item.product.price,
          quantity: item.quantity,
          image: item.product.image || "https://via.placeholder.com/150",
        }));

        setCartItems(items);
        setCartItemsCount(cartItems.length);
      } else {
        setCartItems([]);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    setQuantity(1)
    getCartData();
  }, [cartItems]);

  // Increase quantity
  const increaseQty = async (id) => {
    try {
      const res = await fetch(`${url}/api/client/cart/update`, {
        method: "put",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productId: id,
          quantity: 1,
        }),
      });

      if (res.ok) getCartData();
    } catch (err) {
      console.error(err);
    }
  };

  // Decrease quantity
  const decreaseQty = async (id) => {
    const item = cartItems.find((item) => item.id === id);

    if (!item) return;
    if (item.quantity === 1) {
      return toast.error("Quantity can't be less than 1");
    }

    try {
      const res = await fetch(`${url}/api/client/cart/update`, {
        method: "put",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productId: id,
          quantity: -1,
        }),
      });

      if (res.ok) getCartData();
    } catch (err) {
      console.error(err);
    }
  };

  // Remove item from backend
  const removeItem = async (id) => {
    if (!confirm("Are you sure you want to delete this product ?")) return;

    try {
      const res = await fetch(
        `${url}/api/client/cart/removeCartItem/${id}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );
      if (res.ok) {
        getCartData();
        toast.success("Successfully remove ");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const total = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div className="mx-4 max-[430px]:mx-0 mt-8 sm:mt-6 px-4 py-4 font2 ">
      <div
        className={`grid mx-auto md:gap-4 md:mx-0 ${
          cartItems.length === 0
            ? "grid-cols-1 lg:grid-cols-1"
            : "grid-cols-1 lg:grid-cols-3"
        }`}
      >
        <div className="col-span-2">
          <div className="flex justify-end mr-2 ">
            <Link
              to={"/orderHistory"}
              className=" flex items-center justify-center gap-2 px-4 py-2 rounded-md border border-emerald-500/40 bg-emerald-50 text-black font-medium text-sm md:text-lg shadow-sm hover:bg-emerald-100 hover:border-emerald-600 hover:shadow-md transition-all delay-150 duration-150 w-fit"
            >
              Order History
              <RiTimerFlashFill className=" text-sm md:text-lg " />
            </Link>
          </div>

          {/* CART LIST */}
          <div className=" shadow-2xl my-6 py-4 rounded-2xl ">
            <div className="absolute -top-10 -left-10 h-40 w-40 bg-blue-200 rounded-full blur-3xl opacity-40 animate-pulse"></div>
            <div className="absolute -bottom-10 -right-10 h-40 w-40 bg-purple-200 rounded-full blur-3xl opacity-40 animate-pulse"></div>

            {cartItems.length === 0 && (
              <>
                <p
                  className="text-center text-gray-900 text-xl max-[430px]:text-base font-semibold py-10"
                >
                  Your cart is empty
                </p>

                <div className="flex justify-center gap-6 mb-8 animate-slide-up">
                  <Link
                    to={"/"}
                    className="relative px-5 py-2 my-auto rounded border border-gray-300 text-white font-semibold
                     bg-teal-800 backdrop-blur-sm hover:-translate-y-1 hover:shadow-lg transition-all duration-300"
                  >
                    Home
                  </Link>

                  <Link
                    to={"/products"}
                    className="relative px-5 py-2 rounded my-auto font-semibold text-white
                     bg-linear-to-r from-orange-700 to-orange-400
                     hover:from-orange-400 hover:to-orange-700
                     hover:-translate-y-1 hover:shadow-xl
                     transition duration-300 delay-75"
                  >
                    Shop Now
                  </Link>
                </div>
              </>
            )}

            {cartItems.map((item) => (
              <div
                key={item.id}
                className="grid grid-cols-6 gap-4 bg-white  rounded-xl px-4 mx-4 py-2 relative mb-2"
              >
                <img
                  src={`${url}/upload/${item.image}`}
                  alt={item.tittle}
                  className=" col-span-1 max-[430px]:w-20 max-[430px]:h-20 w-24 h-24 my-auto object-contain  sm:rounded-lg sm:bg-gray-100"
                />

                <div className="flex-1 max-[430px]:flex-0 ml-4 col-span-4 ">
                  <h2 className="text-sm lg:text-lg w-full font-normal line-clamp-2 max-[430px]:text-xs ">
                    {item.tittle}
                  </h2>
                  <p className="text-gray-500 text-xs sm:text-sm my-1">
                    {item.category}
                  </p>
                  <p className="text-orange-600 font-bold max-[430px]:text-sm text-base sm:text-lg mt-1">
                    <span className=" text-sm md:text-lg font-normal mr-1">
                      ৳
                    </span>
                    {item.price}
                  </p>

                  {/* QUANTITY */}
                  <div className="flex items-center gap-2 mt-2">
                    <button
                      onClick={() => decreaseQty(item.id)}
                      className="px-3 py-0.5 border rounded-md hover:bg-gray-100 cursor-pointer"
                    >
                      -
                    </button>

                    <span className="px-4 py-1 sm:text-base text-sm border rounded-md bg-gray-50">
                      {item.quantity}
                    </span>

                    <button
                      onClick={() => increaseQty(item.id)}
                      className="px-3 py-0.5 border rounded-md hover:bg-gray-100 cursor-pointer"
                    >
                      +
                    </button>
                  </div>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-red-600 bg-gray-200 p-2 rounded-md hover:text-red-800 absolute top-4 right-4 md:top-8 md:right-8"
                  >
                    <IoMdClose />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* TOTAL AND CHECKOUT */}
        <div
          className={`shadow-2xl h-fit w-[95%] inset-shadow-sm lg:inset-shadow-none inset-shadow-orange-600 mt-0 p-6 rounded-xl border mb-8 mx-auto lg:mt-20 ${
            cartItems.length === 0 ? "hidden" : "block"
          }`}
        >
          {cartItems.length > 0 && (
            <div className={`space-y-4 `}>
              <div className="p-4 bg-gray-50 rounded-xl  text-sm sm:text-base">
                <div className="flex justify-between font-semibold pt-3">
                  <span className="text-emerald-900">Total Price:</span>
                  <span className="text-blue-900">
                    <span className=" text-sm md:text-lg font-normal mr-1">
                      ৳
                    </span>
                    {total}
                  </span>
                </div>
              </div>

              {/* checkout button */}
              <Link to="/checkout" className="block">
                <button className="relative w-full py-2 overflow-hidden rounded-xl font-semibold text-white bg-orange-500 shadow-lg transition-all duration-300 group">
                  {/* Hover overlay */}
                  <span className="absolute inset-0 bg-blue-900 w-0 group-hover:w-full transition-all duration-500 ease-out"></span>

                  {/* Glow ring */}
                  <span className="absolute inset-0 rounded-xl group-hover:ring-4 group-hover:ring-blue-300/40 transition-all duration-300"></span>

                  {/* Text */}
                  <span className="relative z-10 group-hover:text-white tracking-wide">
                    Checkout
                  </span>
                </button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
