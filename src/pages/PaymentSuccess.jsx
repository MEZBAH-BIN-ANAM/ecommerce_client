import { FaHome } from "react-icons/fa";
import { BsBorderStyle } from "react-icons/bs";
import { Link } from "react-router-dom";

const PaymentSuccess = () => {
  return (
    <div className="h-full pb-10 pt-12 max-[325px]:px-1 px-4 flex items-center justify-center bg-linear-to-br from-gray-100 via-white to-gray-200">
      <div className="relative bg-white shadow-2xl rounded-3xl p-8 max-[430px]:p-6 max-w-md w-full text-center
                      scale-95 opacity-0 animate-[fadeIn_0.9s_ease-out_forwards]">

        {/* Decorative Glow */}
        <div className="absolute -top-6 -right-6 w-24 h-24 bg-emerald-500 rounded-full blur-3xl opacity-30"></div>
        <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-teal-500 rounded-full blur-3xl opacity-30"></div>

        {/* Success Icon */}
        <div className="mx-auto w-15 h-15 max-[430px]:w-16 max-[430px]:h-16 flex items-center justify-center 
                        rounded-full bg-emerald-600 text-white text-5xl max-[430px]:text-3xl mb-4 
                        animate-bounce shadow-xl">
          ✓
        </div>

        {/* Main Title */}
        <h1 className="text-3xl max-[430px]:text-2xl font-bold text-emerald-600 tracking-wide">
          Payment Successful
        </h1>

        <p className="mt-4 text-gray-600 text-lg max-[430px]:text-sm leading-relaxed">
          Your payment was received and your order has been placed successfully.
        </p>

        {/* Buttons Area */}
        <div className="flex justify-center gap-4 mt-8 max-[430px]:gap-2">
          <Link
            to="/"
            className="flex items-center gap-2 px-6 py-3 max-[430px]:px-4 max-[430px]:py-2 
                       bg-emerald-600 text-white font-semibold rounded-lg
                       hover:bg-emerald-700 hover:-translate-y-1 hover:shadow-emerald-400/60
                       transition-all duration-300 max-[430px]:text-xs shadow-md"
          >
            <FaHome className="text-lg max-[430px]:text-base" /> Home
          </Link>

          <Link
            to="/orderHistory"
            className="flex items-center gap-2 px-6 py-3 max-[430px]:px-4 max-[430px]:py-2
                       bg-rose-900 text-white font-semibold rounded-lg
                       hover:bg-rose-800 hover:-translate-y-1 hover:shadow-rose-400/60
                       transition-all duration-300 max-[430px]:text-xs shadow-md"
          >
            <BsBorderStyle className="text-lg max-[430px]:text-base" /> Order History
          </Link>
        </div>

      </div>
    </div>
  );
};

export default PaymentSuccess;
