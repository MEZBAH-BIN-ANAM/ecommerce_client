import React, { useEffect, useState } from "react";
import { FaArrowDown } from "react-icons/fa";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
const url = import.meta.env.VITE_ENDPOINT;

const OrderHistory = () => {
  const [allOrders, setAllOrders] = useState([]);
  const [openOrderId, setOpenOrderId] = useState(null);

  const toggleOrderProducts = (orderId) => {
    setOpenOrderId((prev) => (prev === orderId ? null : orderId));
  };

  const getAllOrders = async () => {
    try {
      const res = await fetch(`${url}/api/client/order/my-orders`, {
        method: "GET",
        credentials: "include",
      });

      const data = await res.json();

      if (res.ok) {
        setAllOrders(data.orders);
      } else {
        toast.error(data.message || "Failed to fetch orders");
      }
    } catch (error) {
      toast.error("Internal server error");
    }
  };

  /* ================= CANCEL LOGIC (ONLY CHANGE) ================= */

  const CANCEL_WINDOW_MS = 12 * 60 * 60 * 1000;

  const getCancelInfo = (createdAt) => {
    const createdTime = new Date(createdAt).getTime();
    const cancelUntil = createdTime + CANCEL_WINDOW_MS;

    return {
      canCancel: Date.now() <= cancelUntil,
      cancelUntil,
    };
  };

  const handleCancelClick = async (order) => {
    const { canCancel } = getCancelInfo(order.createdAt);

    if (!canCancel) {
      toast.info("Cancel time is over. You can cancel only within 12 hours.");
      return;
    } else {
      const res = await fetch(
        `${url}/api/client/order/my-orders/cancel/${order._id}`,
        {
          method: "delete",
        }
      );

      const data = await res.json();

      if (res.ok) {
        toast.success(data.message || "Order cancelled successfully");
        getAllOrders();
      } else {
        toast.error(data.message || "Failed to cancel order");
      }
    }

    // CALL CANCEL API HERE
  };

  /* =============================================================== */

  useEffect(() => {
    getAllOrders();
  }, [allOrders]);

  useEffect(() => {
    const closeDropdown = () => setOpenOrderId(null);

    document.addEventListener("click", closeDropdown);

    return () => {
      document.removeEventListener("click", closeDropdown);
    };
  }, []);

  return (
    <div className="w-full  mx-auto pb-10 pt-6  ">
      <div className="sm:mx-8 md:mx-10 mx-3">
        {allOrders.length === 0 ? (
          <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
            <h2 className="text-3xl font-bold text-gray-800 mb-4 tracking-tight max-[430px]:text-xl">
              Your Order history is empty
            </h2>

            <p className="text-gray-500 mb-8 max-w-md">
              Looks like you haven’t order anything yet. Start exploring and
              order your favorite items.
            </p>

            <Link
              to="/products"
              className="relative inline-flex items-center justify-center px-8 py-3
                           bg-linear-to-r from-teal-500 to-cyan-800
                           text-white font-medium rounded-xl
                           shadow-lg shadow-orange-500/30
                           overflow-hidden transition-all duration-300 delay-100
                           hover:from-cyan-800 hover:to-teal-700
                           hover:shadow-green-600/40
                           hover:-translate-y-0.5 "
            >
              <span
                className="absolute inset-0 bg-white/10 opacity-0
                             transition-opacity duration-300 hover:opacity-100"
              />
              <span className="relative z-10">Continue Shopping</span>
            </Link>
          </div>
        ) : (
          <>
            <h1 className="text-3xl max-[430px]:text-2xl font-extrabold text-start text-emerald-800 mb-1 font1 drop-shadow-xl drop-shadow-cyan-200  py-4 px-2 ">
              Order History
            </h1>
            <div className=" grid grid-cols-1 sm:grid-cols-2 2xl:grid-cols-3 gap-4 my-auto">
              {allOrders.map((order) => {
                const { canCancel, cancelUntil } = getCancelInfo(
                  order.createdAt
                );

                return (
                  <div
                    key={order._id}
                    className="bg-white text-primary rounded-xl px-5 pb-5 inset-shadow-sm hover:inset-shadow-xs inset-shadow-amber-700 hover:shadow-lg transition delay-75 duration-250 h-fit "
                  >
                    {/* Header */}
                    <div className="my-4">
                      <span className="sm:text-sm text-xs">
                        Order ID :{" "}
                        <span className="font-semibold">{order._id}</span>
                      </span>
                      <hr className="text-black bg-gray-300 h-0.5 mt-2" />
                    </div>

                    {/* Order Details */}
                    <div className="text-sm">
                      <p>
                        Payment :
                        <span className="font-normal text-white mx-2 px-2 rounded bg-emerald-600">
                          {order.paymentMethod.trim() === "SSLCommerz"
                            ? "Paid without charge"
                            : order.paymentMethod}
                        </span>
                      </p>

                      <p>
                        Product Price :
                        <span className="font-bold text-teal-700 mx-2 px-2 rounded bg-white">
                          {order.totalAmount} BDT
                        </span>
                      </p>

                      <p>
                        Delivery Charge :
                        <span
                          className={
                            order.deliveryCharge === "0"
                              ? "text-xs font-bold text-teal-700 mx-2 px-2 rounded bg-white "
                              : "text-sm font-bold text-teal-700 mx-2 px-2 rounded bg-white "
                          }
                        >
                          {order.deliveryCharge === "0"
                            ? "Wait for response... "
                            : order.deliveryCharge + "  BDT"}
                        </span>
                      </p>

                      <p>
                        Total Amount :
                        <span className="font-bold text-teal-700 mx-2 px-2 rounded bg-white">
                          {parseInt(order.totalAmount) +
                            parseInt(order.deliveryCharge)}{" "}
                          BDT
                        </span>
                      </p>

                      <div
                        className="relative "
                        onClick={(e) => e.stopPropagation()}
                      >
                        <div className="flex justify-between items-center gap-2">
                          <div>
                            Total Items:
                            <span className="font-semibold text-white px-2 ml-2 rounded bg-orange-700">
                              {order.items?.length || 0}
                            </span>
                          </div>
                          <button
                            onClick={(e) => {
                              e.stopPropagation(); // IMPORTANT
                              setOpenOrderId((prev) =>
                                prev === order._id ? null : order._id
                              );
                            }}
                            className=" px-2 py-1 rounded bg-slate-200 transition flex justify-center items-center"
                          >
                            See all items :
                            <FaArrowDown
                              className={`transition-transform ml-2 ${
                                openOrderId === order._id ? "rotate-180 " : ""
                              }`}
                            />
                          </button>
                        </div>

                        {/* DROPDOWN */}
                        <div
                          className={`absolute z-50 w-full
  bg-slate-900/85 text-primary-foreground
  border rounded-lg shadow-lg
  origin-top transform
  transition-all duration-500 ease-out
  ${
    openOrderId === order._id
      ? "opacity-100 scale-y-100 translate-y-0 "
      : "opacity-0 scale-y-95 -translate-y-2 pointer-events-none "
  }`}
                          onClick={(e) => e.stopPropagation()}
                        >
                          <ul className=" p-2">
                            {order.items?.map((item, index) => {
                              if (!item.product) return null;

                              return (
                                <li
                                  key={item.product._id}
                                  className="flex items-center  gap-2 px-3 py-2 text-sm  "
                                >
                                  <span className="font-semibold text-teal-100 bg-transparent ">
                                    {index + 1}.
                                  </span>
                                  <span className="line-clamp-1 ">
                                    {item.product.tittle}
                                  </span>
                                </li>
                              );
                            })}
                          </ul>
                        </div>
                      </div>

                      <p>
                        Date :
                        <span className="text-blue-950 mx-2 px-2 rounded bg-white">
                          {new Date(order.createdAt).toLocaleDateString()}
                        </span>
                      </p>

                      {/* 🔹 CANCELLATION TIME SHOWN HERE */}
                      <p className="text-xs mt-1">
                        {canCancel ? (
                          <>
                            Cancellation time:
                            <span className="ml-1 font-medium text-gray-700">
                              {new Date(cancelUntil).toLocaleString()}
                            </span>
                          </>
                        ) : (
                          <span className="text-red-500 font-medium">
                            Cancellation time expired
                          </span>
                        )}
                      </p>

                      <div className="flex justify-between mt-3">
                        <div className="my-auto">
                          <span>Status : </span>
                          <span
                            className={`text-sm max-[430px]:text-xs font-semibold px-3 py-1 rounded
                            ${
                              order.status === "Delivered"
                                ? "bg-green-100 text-green-800"
                                : order.status === "Shipped"
                                ? "bg-blue-100 text-blue-800"
                                : order.status === "Cancelled"
                                ? "bg-red-100 text-red-800"
                                : "bg-yellow-100 text-yellow-800"
                            }
                          `}
                          >
                            {order.status}
                          </span>
                        </div>

                        <button
                          onClick={() => handleCancelClick(order)}
                          disabled={!canCancel}
                          className={`px-4 py-1.5 rounded-full transition
                          ${
                            canCancel
                              ? "bg-red-700 text-white hover:bg-red-800 cursor-pointer"
                              : "bg-gray-300 text-gray-500 cursor-not-allowed"
                          }
                        `}
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default OrderHistory;
