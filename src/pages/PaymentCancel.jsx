import { Link } from "react-router-dom";

const PaymentCancel = () => {
  return (
    <div className="h-full pt-12 pb-10  max-[325px]:px-1 px-4 flex items-center justify-center bg-linear-to-br from-gray-100 via-white to-gray-200">
      <div className="relative bg-white shadow-2xl rounded-3xl p-8 max-[430px]:p-6 max-w-md w-full text-center
                      scale-95 ">

        {/* Warning Glow Circle */}
        <div className="absolute -top-6 -right-6 w-24 h-24 bg-yellow-500 rounded-full blur-3xl opacity-30"></div>
        <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-orange-500 rounded-full blur-3xl opacity-30"></div>

        {/* Warning Icon */}
        <div className="mx-auto w-24 h-24 max-[430px]:w-16 max-[430px]:h-16 flex items-center justify-center 
                        rounded-full bg-transparent text-white text-5xl max-[430px]:text-3xl mb-4  shadow-xl">
          ⚠
        </div>

        <h1 className="text-3xl max-[430px]:text-2xl font-bold text-yellow-600 tracking-wide">
          Payment Cancelled
        </h1>

        <p className="mt-4 text-gray-600 text-lg max-[430px]:text-sm leading-relaxed">
          You cancelled the payment. Your order has not been placed.
        </p>

        {/* Back Button */}
        <div className="flex flex-col justify-center gap-6 mt-8">
        <Link
            to="/checkout"
            className="px-6 py-3 max-[430px]:px-4 max-[430px]:py-2
                       bg-orange-600 text-white font-semibold rounded-lg
                       hover:bg-orange-900 hover:-translate-y-1 hover:shadow-gray-500/60
                       transition-all duration-300 max-[430px]:text-xs shadow-md"
          >
            Go to cart
          </Link>
          <Link
            to="/checkout"
            className="px-6 py-3 max-[430px]:px-4 max-[430px]:py-2
                       bg-green-800 text-white font-semibold rounded-lg
                       hover:bg-gray-900 hover:-translate-y-1 hover:shadow-gray-500/60
                       transition-all duration-300 max-[430px]:text-xs shadow-md"
          >
            Go Back to Checkout
          </Link>
        </div>

      </div>
    </div>
  );
};

export default PaymentCancel;
