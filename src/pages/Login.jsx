// import { useAppContext } from "@/store/store";
// import React, { useState } from "react";
// import { FaEnvelope, FaLock } from "react-icons/fa";
// import { HiEyeSlash, HiMiniEye } from "react-icons/hi2";
// import { Link, useNavigate, useLocation, useParams } from "react-router-dom";
// import { toast } from "react-toastify";
// const url = import.meta.env.VITE_ENDPOINT;


// const Login = () => {
//   const [user, setUser] = useState({ email: "", password: "" });
//   const { getLoginUser } = useAppContext();
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [passStatus, setPassStatus] = useState(false);
//   const param = useParams();

//   const redirectTo =
//     location.state?.from?.pathname ||
//     localStorage.getItem("redirectAfterLogin") ||
//     "/";

//   const handleInput = (e) => {
//     const { name, value } = e.target;
//     setUser((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await fetch(`${url}/auth/login`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(user),
//         credentials: "include",
//       });

//       const data = await res.json();

//       if (res.ok) {
//         await getLoginUser();
//         toast.success("Login Successful");
//         localStorage.removeItem("redirectAfterLogin");
//         navigate(redirectTo, { replace: true });
//       } else {
//         toast.error(data?.message || "Invalid Credentials");
//       }
//     } catch (error) {
//       console.error(error.message);
//       toast.error("Something went wrong!");
//     }
//   };

//   return (
//     <div className="pt-12 pb-10 flex items-center justify-center px-4 bg-linear-to-b from-slate-900 via-slate-800 to-slate-900">
//       <div className="w-full max-w-sm bg-transparent p-6 sm:p-8 rounded-2xl shadow-[0_25px_60px_rgba(0,0,0,0.45)]">
//         {/* Header */}
//         <h1 className="text-3xl font-bold text-center text-white mb-1">
//           Welcome Back
//         </h1>
//         <p className="text-center text-sm text-slate-400 mb-6">
//           Login to continue shopping
//         </p>

//         <form onSubmit={handleSubmit} className="space-y-5">
//           {/* Email */}
//           <div>
//             <label className="block text-sm font-medium text-slate-300 mb-1">
//               Email
//             </label>
//             <div className="flex items-center gap-x-3 px-4 py-2 bg-white rounded-xl border border-slate-300 focus-within:border-emerald-500 transition">
//               <FaEnvelope className="text-slate-400" />
//               <input
//                 type="email"
//                 name="email"
//                 placeholder="you@example.com"
//                 value={user.email}
//                 onChange={handleInput}
//                 autoComplete="off"
//                 required
//                 className="w-full outline-none text-slate-800 placeholder:text-slate-400 bg-transparent"
//               />
//             </div>
//           </div>

//           {/* Password */}
//           <div>
//             <label className="block text-sm font-medium text-slate-300 mb-1">
//               Password
//             </label>
//             <div className="flex items-center gap-x-3 px-4 py-2 bg-white rounded-xl border border-slate-300 focus-within:border-emerald-500 transition">
//               <FaLock className="text-slate-400" />
//               <input
//                 type={passStatus ? "text" : "password"}
//                 name="password"
//                 placeholder="Enter your password"
//                 value={user.password}
//                 onChange={handleInput}
//                 autoComplete="off"
//                 required
//                 className="w-full outline-none text-slate-800 placeholder:text-slate-400 bg-transparent"
//               />
//               <button
//                 type="button"
//                 onClick={() => setPassStatus(!passStatus)}
//                 className="text-slate-500 hover:text-emerald-600 transition"
//               >
//                 {passStatus ? (
//                   <HiMiniEye className="text-xl" />
//                 ) : (
//                   <HiEyeSlash className="text-xl" />
//                 )}
//               </button>
//             </div>

//             <Link
//               to={"/forgotPassword"}
//               className="block text-right mt-2 text-xs sm:text-sm text-emerald-400 hover:underline"
//             >
//               Forgot Password?
//             </Link>
//           </div>

//           {/* Submit */}
//           <button
//             type="submit"
//             className="w-full relative overflow-hidden border border-emerald-700 bg-white text-emerald-800 py-2 rounded-xl font-semibold transition group"
//           >
//             {/* Hover sliding background */}
//             <span className="absolute inset-0 w-0 h-full bg-emerald-600 transition-all duration-300 ease-out group-hover:w-full pointer-events-none" />

//             {/* Button text */}
//             <span className="relative z-10 transition-colors duration-300 group-hover:text-white">
//               Login
//             </span>
//           </button>
//         </form>

//         {/* Footer */}
//         <p className="text-center text-sm sm:text-base mt-5 text-slate-400">
//           Don’t have an account?{" "}
//           <Link
//             to="/register"
//             className="text-emerald-500 font-semibold hover:underline underline-offset-2"
//           >
//             Register here
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Login;



import { useAppContext } from "@/store/store";
import React, { useState } from "react";
import { HiEyeSlash, HiMiniEye } from "react-icons/hi2";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
const url = import.meta.env.VITE_ENDPOINT;

const Login = () => {
  const [user, setUser] = useState({ email: "", password: "" });
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState(1); // 1 = login, 2 = otp
  const [passStatus, setPassStatus] = useState(false);

  const { getLoginUser } = useAppContext();
  const navigate = useNavigate();
  const location = useLocation();

  const redirectTo =
    location.state?.from?.pathname ||
    localStorage.getItem("redirectAfterLogin") ||
    "/";

  // ---------- Handlers ----------
  const handleInput = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${url}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
        credentials: "include",
      });

      const data = await res.json();

      // ---------- Check OTP requirement FIRST ----------
      if (data.otpRequired) {
        toast.info(data.message || "Verification code sent to your email");
        setStep(2); // switch to OTP step
        return;
      }

      // ---------- Normal login success ----------
      if (res.ok) {
        await getLoginUser();
        localStorage.removeItem("redirectAfterLogin");
        toast.success(data.message || "Login Successful");
        navigate(redirectTo, { replace: true });
      } else {
        // ---------- Any other login error ----------
        toast.error(data.message || "Invalid Credentials");
      }
    } catch (error) {
      console.error(error.message);
      toast.error("Something went wrong!");
    }
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${url}/auth/verify-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: user.email, otp }),
        credentials: "include",
      });

      const data = await res.json();

      if (res.ok) {
        await getLoginUser();
        localStorage.removeItem("redirectAfterLogin");
        toast.success("Login Successful");
        navigate(redirectTo, { replace: true });
      } else {
        toast.error(data?.message || "Invalid OTP");
      }
    } catch (error) {
      console.error(error.message);
      toast.error("Something went wrong!");
    }
  };

  return (
    <div className="pt-16 pb-10 flex items-center justify-center px-4 bg-linear-to-b from-slate-900 via-slate-800 to-slate-900">
      <div className="w-full max-w-sm bg-transparent p-6 sm:p-8 rounded-2xl shadow-[0_25px_60px_rgba(0,0,0,0.45)]">
        {/* Header */}
        <h1 className="text-3xl font-bold text-center text-white mb-1">
          Welcome Back
        </h1>
        <p className="text-center text-sm text-slate-400 mb-6">
          Login to continue shopping
        </p>

        {/* ---------- Step 1: Login Form ---------- */}
        {step === 1 && (
          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">
                Email
              </label>
              <div className="flex items-center gap-x-3 px-4 py-2 bg-white rounded-xl border border-slate-300 focus-within:border-emerald-500 transition">
                <input
                  type="email"
                  name="email"
                  placeholder="you@example.com"
                  value={user.email}
                  onChange={handleInput}
                  autoComplete="off"
                  required
                  className="w-full outline-none text-slate-800 placeholder:text-slate-400 bg-transparent"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">
                Password
              </label>
              <div className="flex items-center gap-x-3 px-4 py-2 bg-white rounded-xl border border-slate-300 focus-within:border-emerald-500 transition">
                <input
                  type={passStatus ? "text" : "password"}
                  name="password"
                  placeholder="Enter your password"
                  value={user.password}
                  onChange={handleInput}
                  autoComplete="off"
                  required
                  className="w-full outline-none text-slate-800 placeholder:text-slate-400 bg-transparent"
                />
                <button
                  type="button"
                  onClick={() => setPassStatus(!passStatus)}
                  className="text-slate-500 hover:text-emerald-600 transition"
                >
                  {passStatus ? <HiMiniEye className="text-xl" /> : <HiEyeSlash className="text-xl" />}
                </button>
              </div>

              <Link
                to={"/forgotPassword"}
                className="block text-right mt-2 text-xs sm:text-sm text-emerald-400 hover:underline"
              >
                Forgot Password?
              </Link>
            </div>

            <button
              type="submit"
              className="w-full relative overflow-hidden border border-emerald-700 bg-white text-emerald-800 py-2 rounded-xl font-semibold transition group"
            >
              <span className="absolute inset-0 w-0 h-full bg-emerald-600 transition-all duration-300 ease-out group-hover:w-full pointer-events-none" />
              <span className="relative z-10 transition-colors duration-300 group-hover:text-white">
                Login
              </span>
            </button>
          </form>
        )}

        {/* ---------- Step 2: OTP Form ---------- */}
        {step === 2 && (
          <form onSubmit={handleOtpSubmit} className="space-y-5">
            <label className="block text-sm font-medium text-slate-300 mb-1">
              Enter Verification Code
            </label>
            <input
              type="text"
              placeholder="OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full px-4 py-2 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-slate-800 bg-white"
              required
            />
            <button
              type="submit"
              className="w-full relative overflow-hidden border border-emerald-700 bg-white text-emerald-800 py-2 rounded-xl font-semibold transition group"
            >
              <span className="absolute inset-0 w-0 h-full bg-emerald-600 transition-all duration-300 ease-out group-hover:w-full pointer-events-none" />
              <span className="relative z-10 transition-colors duration-300 group-hover:text-white">
                Verify OTP
              </span>
            </button>
          </form>
        )}

        {/* Footer */}
        <p className="text-center text-sm sm:text-base mt-5 text-slate-400">
          Don’t have an account?{" "}
          <Link
            to="/register"
            className="text-emerald-500 font-semibold hover:underline underline-offset-2"
          >
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;

