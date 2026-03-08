import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
const url = import.meta.env.VITE_ENDPOINT;


const GetOrderProducts = () => {
  const [cartItems, setCartItems] = useState([]);

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
        const items = data.cart.items.map((item) => ({
          id: item.product._id,
          title: item.product.tittle,
          category: item.product.category,
          price: item.product.price,
          quantity: item.quantity,
          image: item.product.image || "https://via.placeholder.com/150",
        }));
        setCartItems(items);
      } else {
        setCartItems([]);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getCartData();
  }, []);

  // Calculate total price
  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );


  return (
    <div className="bg-white w-[90%] md:w-[90%] lg:w-[90%] h-fit mx-auto rounded-2xl mb-5 md:mb-8 pt-6 pb-8 sm:pt-10 sm:pb-14 px-6 max-[430px]:px-2 ">
      {/* Header */}
      <h1 className="text-center max-[430px]:text-xl text-2xl md:text-3xl font-extrabold text-teal-800 tracking-tight mb-8">
        Order Summary
      </h1>

      {/* Product List */}
      <div className="">
        {cartItems.length > 0 ? (
          cartItems.map((singleItem) => (
            <div key={singleItem.id} className=" bg-gray-50 p-4 rounded-xl ">
              <div className="grid grid-cols-6 gap-4">
                <img
                  src={`${url}/upload/${singleItem.image}`}
                  alt={singleItem.title}
                  className="w-10 h-10 object-contain  my-auto"
                />
                <div className="col-span-3">
                  <h2 className="text-lg max-[430px]:text-xs font-semibold text-gray-800 line-clamp-1">
                    {singleItem.title}
                  </h2>
                  <p className="text-sm max-[430px]:text-xs text-gray-500">
                    Quantity: {singleItem.quantity}
                  </p>
                </div>
                <div className="text-right max-[430px]:text-xs font-bold text-lg text-teal-700 my-auto col-span-2 ">
                <span className="sm:text-lg text-sm font-normal mr-1">৳</span>{" "}
                  {singleItem.price * singleItem.quantity}
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">
            No products found in cart.
          </p>
        )}
      </div>

      {/* Total */}
      <div className="mt-8 border-t pt-4 max-[430px]:text-sm text-lg font-semibold text-gray-800 mx-3 ">
        <div className="flex justify-between items-center">
          <span>Product price:</span>
          <span className="text-teal-700">
          <span className="sm:text-lg text-sm font-normal mr-1">৳</span> {totalPrice}
          </span>
        </div>
        <div className="flex justify-between items-center border-t pt-2">
          <span>Total price:</span>
          <span className="text-teal-700">
          <span className="sm:text-lg text-sm font-normal mr-1">৳</span>{" "}
            {totalPrice }
          </span>
        </div>
        <div className="flex justify-end text-sky-900">+ Other Charge </div>
      </div>
      {/* go to cart button */}
      <Link to="/cart" className="block mt-6 mx-8">
        <button className="relative w-full py-3 overflow-hidden rounded-xl font-semibold text-white bg-orange-500 shadow-lg transition-all duration-300 group">
          {/* Hover overlay */}
          <span className="absolute inset-0 bg-blue-950 w-0 group-hover:w-full transition-all duration-500 ease-out"></span>

          {/* Glow ring */}
          <span className="absolute inset-0 rounded-xl group-hover:ring-4 group-hover:ring-blue-300/40 transition-all duration-300"></span>

          {/* Text */}
          <span className="relative max-[430px]:text-xs z-10 group-hover:text-white tracking-wide">
            For customize - Go to cart
          </span>
        </button>
      </Link>
    </div>
  );
};

export default GetOrderProducts;
