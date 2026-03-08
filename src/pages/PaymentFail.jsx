import { Link } from "react-router-dom";

const PaymentFail = () => {
  return (
    <div className="h-full pb-10 pt-12  max-[325px]:px-3 px-4 flex items-center justify-center bg-linear-to-br from-gray-100 via-white to-gray-200">
      <div className="relative bg-white shadow-2xl rounded-3xl p-8 max-[430px]:p-6 max-w-md w-full text-center">

        {/* Red Glow Elements */}
        <div className="absolute -top-6 -right-6 w-24 h-24 bg-red-500 rounded-full blur-3xl opacity-30"></div>
        <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-rose-700 rounded-full blur-3xl opacity-30"></div>

        {/* Failed Icon */}
        <div className="mx-auto w-24 h-24 max-[430px]:w-16 max-[430px]:h-16 flex items-center justify-center 
                        rounded-full bg-transparent text-white text-5xl max-[430px]:text-3xl mb-4 shadow-xl">
          ❌
        </div>

        {/* Title */}
        <h1 className="text-3xl max-[430px]:text-2xl font-bold text-red-600 tracking-wide">
          Payment Failed
        </h1>

        {/* Message */}
        <p className="mt-4 text-gray-600 text-lg max-[430px]:text-sm leading-relaxed">
          Your transaction was cancelled or failed. Please try again.
        </p>

        {/* Button */}
        <div className="flex justify-center mt-8">
          <Link
            to="/checkout"
            className="px-6 py-3 max-[430px]:px-4 max-[430px]:py-2
                       bg-green-800 text-white font-semibold rounded-lg
                       hover:bg-green-600 hover:shadow-gray-500/60
                       transition-all duration-300 max-[430px]:text-xs shadow-md"
          >
            Try Again
          </Link>
        </div>

      </div>
    </div>
  );
};

export default PaymentFail;
