import GetOrderProducts from "@/Components/GetOrderProducts";
import { useState } from "react";
import { toast } from "react-toastify";
import bkash from "@/assets/bkash.jpg";
import nagad from "@/assets/nagad.png";
import atmCard from "@/assets/atmCard.png";
import masterCard from "@/assets/mastercard.png";
import { useAppContext } from "@/store/store";
const url = import.meta.env.VITE_ENDPOINT;


const Checkout = () => {
  const [shippingInfo, setShippingInfo] = useState({
    fullName: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
  });
  const [loading, setLoading] = useState(false);

  const { setCartItemsCount } = useAppContext();

  const handleChange = (e) => {
    setShippingInfo({
      ...shippingInfo,
      [e.target.name]: e.target.value.trimStart(),
    });
  };

  const validateForm = () => {
    const { fullName, phone, address, city, postalCode } = shippingInfo;
    if (!fullName.trim()) {
      toast.error("Enter full name");
      return false;
    }
    if (!phone.trim()) {
      toast.error("Enter phone");
      return false;
    }
    if (!address.trim()) {
      toast.error("Enter address");
      return false;
    }
    if (!city.trim()) {
      toast.error("Enter city");
      return false;
    }

    return true;
  };

  const handleCOD = async () => {
    if (!validateForm()) return;
    try {
      setLoading(true);
      const res = await fetch(
        `${url}/api/client/order/handleCOD`,
        {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ shippingInfo }),
        }
      );
      const data = await res.json();
      if (!data.success) return toast.error(data.message || "Order failed");
      toast.success("Order placed successfully!");
      window.location.href = "/success";
      setCartItemsCount(0);
    } catch (err) {
      console.error(err);
      toast.error("Checkout failed!");
    } finally {
      setLoading(false);
    }
  };

  const handleSSL = async () => {
    if (!validateForm()) return;

    try {
      const res = await fetch(
        `${url}/api/client/order/payment/ssl/init`,
        {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ shippingInfo }),
        }
      );

      const data = await res.json();

      if (data.success) {
        // redirect the user
        window.location.href = data.gatewayUrl;
        setCartItemsCount(0);
      } else {
        toast.error("SSL payment failed");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex justify-center bg-black/50 sm:pt-12 font2 pt-10 ">
      <div className=" grid grid-cols-1 lg:grid-cols-2 ">
        <GetOrderProducts />
        <div className="mx-8 max-[430px]:mx-4">
          <div className=" mx-auto px-6  pt-4 pb-6 sm:pt-8 sm:pb-10 h-fit  mb-10  max-[430px]:mb-5   max-[430px]:px-3 border-gray-100 bg-white/95 rounded-2xl  ">
            <div className=" mx-2 ">
              <div className="mb-8 bg-gray-50 rounded-xl text-center">
                <h1 className="text-3xl max-[430px]:text-xl font-extrabold mb-2 text-blue-900 tracking-tight">
                  Checkout
                </h1>
                <p className="text-gray-600 text-lg max-[430px]:text-sm font-medium">
                  Please fill in all the fields carefully
                </p>
              </div>

              <div className="space-y-4 mb-6 ">
                <input
                  type="text"
                  name="fullName"
                  placeholder="Full Name "
                  className="w-full px-3 py-2 md:px-6 bg-gray-50 border border-gray-200 rounded-lg focus:ring-1 focus:ring-teal-800  outline-none shadow-2xl shadow-emerald-600 text-sm max-[430px]:placeholder:text-xs placeholder:text-teal-900 transition"
                  onChange={handleChange}
                  required
                />
                <input
                  type="text"
                  name="phone"
                  placeholder="Phone "
                  className="w-full px-3 py-2 md:px-6 bg-gray-50 border border-gray-200 rounded-lg focus:ring-1 focus:ring-teal-800  outline-none shadow-2xl shadow-emerald-600 text-sm max-[430px]:placeholder:text-xs placeholder:text-teal-900 transition"
                  onChange={handleChange}
                  required
                />
                <input
                  type="text"
                  name="city"
                  placeholder="City / District (eg - Khulna )"
                  className="w-full px-3 py-2 md:px-6  bg-gray-50 border border-gray-200 rounded-lg focus:ring-1 focus:ring-teal-800  outline-none shadow-2xl shadow-emerald-600 text-sm max-[430px]:placeholder:text-xs placeholder:text-teal-900 transition"
                  onChange={handleChange}
                  required
                />
                <input
                  type="text"
                  name="address"
                  placeholder="Full Address ( eg - villege, district, divison )"
                  className="w-full px-3 py-2 md:px-6 bg-gray-50 border border-gray-200 rounded-lg focus:ring-1 focus:ring-teal-800  outline-none shadow-2xl shadow-emerald-600 text-sm max-[430px]:placeholder:text-xs placeholder:text-teal-900 transition"
                  onChange={handleChange}
                  required
                />

                <input
                  type="text"
                  name="postalCode"
                  placeholder="Postal Code ( eg - 1100 )"
                  className="w-full px-3 py-2 md:px-6 bg-gray-50 border border-gray-200 rounded-lg focus:ring-1 focus:ring-teal-800  outline-none shadow-2xl shadow-emerald-600 text-sm max-[430px]:placeholder:text-xs placeholder:text-teal-900 transition"
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Payment Buttons */}
              <div className="flex flex-col gap-3">
                {/* Cash On Delivery */}
                <button
                  type="button"
                  disabled={loading}
                  onClick={handleCOD}
                  className="relative w-full py-3 overflow-hidden rounded-xl font-semibold text-white bg-blue-950 shadow-lg group transition-all duration-300 disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed hover:scale-[1.02]"
                >
                  <span className="absolute inset-0 bg-orange-500 w-0 group-hover:w-full transition-all duration-500 ease-out"></span>
                  <span className="absolute inset-0 rounded-xl group-hover:ring-4 group-hover:ring-blue-300/40 transition-all duration-300"></span>
                  <span className="relative text-sm md:text-base z-10 tracking-wide">
                    Cash On Delivery
                  </span>
                </button>

                {/* Pay Online */}
                <button
                  type="button"
                  disabled={loading}
                  onClick={handleSSL}
                  className="relative w-full py-3 overflow-hidden rounded-xl font-normal text-slate-900 bg-white shadow-lg shadow-green-800 group transition-all duration-300 disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed inset-shadow-sm inset-shadow-green-900"
                >
                  <span className="absolute inset-0 bg-emerald-950 w-0 group-hover:-skew-x-45 group-hover:w-1/3 -translate-x-10  transition-all duration-500 ease-out" />
                  <span
                    className="absolute inset-y-[-25%] right-[-20%] w-[45%] bg-emerald-950 skew-x-45 scale-x-0 origin-right
             group-hover:scale-x-100 transition-transform duration-500 ease-out"
                  />

                  <span className="absolute inset-0 rounded-xl group-hover:ring-4 group-hover:ring-amber-300/40 transition-all duration-300"></span>
                  <div className="relative z-10 text-sm md:text-base tracking-wide">
                    <span className="bg-green-900 text-white px-3 py-0.5 rounded-2xl  ">Pay Online</span>
                    <div className="flex justify-center gap-x-2 items-center text-2xl text-rose-900 mt-2">
                      <img
                        src={bkash}
                        alt=""
                        className="w-8 h-8 group-hover:scale-105 group-hover:transition group-hover:duration-500 rounded-full "
                      />{" "}
                      /
                      <img
                        src={nagad}
                        alt=""
                        className="w-8 h-8  group-hover:scale-105 group-hover:transition  group-hover:duration-500 "
                      />{" "}
                      /
                      <img
                        src={atmCard}
                        alt=""
                        className="w-8 h-8 group-hover:scale-105 group-hover:transition  group-hover:duration-500 "
                      />{" "}
                      /
                      <img
                        src={masterCard}
                        alt=""
                        className="w-8 h-8 group-hover:scale-105 group-hover:transition  group-hover:duration-500 rounded-full"
                      />
                    </div>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
