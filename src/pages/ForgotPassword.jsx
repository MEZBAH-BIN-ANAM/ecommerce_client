import React, { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const url = import.meta.env.VITE_ENDPOINT; // your backend URL

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);

  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // STEP 1 → Send OTP
  const submitEmail = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${url}/auth/verify-email`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (res.ok) {
        const res = await fetch(`${url}/auth/forgot-password`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        });

        const data = await res.json();

        if (res.ok) {
          toast.success(data.message || "OTP sent");
          setStep(2);
        } else {
          toast.error(data?.message || "Something went wrong");
        }
      } else {
        toast.error("Enter valid email");
      }
    } catch (error) {
      console.error(error.message);
      toast.error("Something went wrong!");
    }
  };

  // STEP 2 → Verify OTP
  const verifyOtp = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${url}/auth/verify-reset-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp }),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success(data.message || "OTP verified");
        setStep(3);
      } else {
        toast.error(data?.message || "Invalid OTP");
      }
    } catch (error) {
      console.error(error.message);
      toast.error("Something went wrong!");
    }
  };

  // STEP 3 → Reset Password
  const resetPassword = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) return alert("Passwords do not match");

    try {
      const res = await fetch(`${url}/auth/reset-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success(data.message || "Password reset successful");
        setStep(1);
        setEmail("");
        setOtp("");
        setPassword("");
        setConfirmPassword("");
        navigate("/login");
      } else {
        toast.error(data?.message || "Failed to reset password");
      }
    } catch (error) {
      console.error(error.message);
      toast.error("Something went wrong!");
    }
  };

  return (
    <div className=" min-h-screen flex items-center justify-center bg-linear-to-br from-black via-neutral-900 to-black px-4">
      <div className="w-full max-w-md rounded-2xl bg-neutral-900/80 backdrop-blur-xl border border-neutral-800 shadow-[0_0_40px_rgba(0,0,0,0.8)] p-8">
        <h2 className="text-center text-2xl font-semibold text-white mb-6">
          Forgot Password
        </h2>

        <div className="flex justify-center gap-2 mb-6">
          {[1, 2, 3].map((s) => (
            <span
              key={s}
              className={`size-7 flex justify-center items-center rounded-full transition-all text-white ${
                step >= s ? "bg-emerald-700" : "bg-neutral-700"
              }`}
            >
              {" "}
              {s}
            </span>
          ))}
        </div>

        {/* STEP 1 */}
        {step === 1 && (
          <form onSubmit={submitEmail} className="space-y-5">
            <input
              type="email"
              placeholder="Email address"
              className="w-full rounded-lg bg-black border border-neutral-700 px-4 py-2.5 text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-orange-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <button className="w-full rounded-lg bg-teal-600 hover:bg-orange-700 transition text-white py-2.5 font-medium">
              Send Verification Code
            </button>
          </form>
        )}

        {/* STEP 2 */}
        {step === 2 && (
          <form onSubmit={verifyOtp} className="space-y-5">
            <input
              type="text"
              placeholder="Verification code"
              className="w-full rounded-lg bg-black border border-neutral-700 px-4 py-2.5 text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-orange-500"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
            />

            <button className="w-full rounded-lg bg-orange-600 hover:bg-orange-700 transition text-white py-2.5 font-medium">
              Verify Code
            </button>

            <button
              type="button"
              onClick={() => setStep(1)}
              className="w-full text-sm text-neutral-400 hover:text-orange-400 transition"
            >
              Change email
            </button>
          </form>
        )}

        {/* STEP 3 */}
        {step === 3 && (
          <form onSubmit={resetPassword} className="space-y-5">
            <input
              type="password"
              placeholder="New password"
              className="w-full rounded-lg bg-black border border-neutral-700 px-4 py-2.5 text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-orange-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <input
              type="password"
              placeholder="Confirm new password"
              className="w-full rounded-lg bg-black border border-neutral-700 px-4 py-2.5 text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-orange-500"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />

            <button className="w-full rounded-lg bg-orange-600 hover:bg-orange-700 transition text-white py-2.5 font-medium">
              Reset Password
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
