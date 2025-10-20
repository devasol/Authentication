import { useState } from "react";
import { reset2FA, verify2FA } from "../services/authApi";

const TwoFAVerification = ({ onVerifySuccess, onResetSuccess }) => {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isResetting, setIsResetting] = useState(false);

  const handleTokenVerification = async (e) => {
    e.preventDefault();
    if (otp.length !== 6) {
      setError("Please enter a 6-digit code");
      return;
    }

    setIsLoading(true);
    setError("");
    try {
      const { data } = await verify2FA(otp);
      onVerifySuccess(data);
    } catch (error) {
      setOtp("");
      console.log("The err is : ", error.message);
      setError("Invalid OTP. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = async (e) => {
    e.preventDefault();
    setIsResetting(true);
    setError("");
    try {
      const { data } = await reset2FA();
      onResetSuccess(data);
    } catch (error) {
      console.log("The err is : ", error.message);
      setError("Error resetting 2FA. Please try again.");
    } finally {
      setIsResetting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 p-4">
      <div className="w-full max-w-md">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 right-1/4 w-32 h-32 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
          <div className="absolute bottom-1/3 left-1/4 w-40 h-40 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse animation-delay-2000"></div>
        </div>

        {/* Main Card */}
        <div className="relative bg-white/80 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20 overflow-hidden transition-all duration-500 hover:shadow-3xl">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-8 text-center">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                <span className="text-2xl">⏰</span>
              </div>
            </div>
            <h2 className="text-3xl font-bold text-white mb-2">
              Verify 2FA Code
            </h2>
            <p className="text-blue-100 text-lg font-light">
              Enter your 6-digit Time-based OTP
            </p>
          </div>

          <form onSubmit={handleTokenVerification} className="p-8">
            {/* Instructions */}
            <div className="text-center mb-8">
              <p className="text-gray-600 text-lg font-light leading-relaxed">
                Open your authenticator app and enter the 6-digit verification
                code
              </p>
            </div>

            {/* OTP Input */}
            <div className="space-y-4 mb-6">
              <label className="text-gray-700 text-sm font-medium flex items-center">
                <span className="mr-2">🔢</span>
                6-Digit Verification Code
              </label>
              <div className="relative group">
                <input
                  type="text"
                  value={otp}
                  maxLength={6}
                  onChange={(e) => {
                    const value = e.target.value.replace(/[^0-9]/g, "");
                    setOtp(value);
                    setError("");
                  }}
                  className="w-full p-4 text-2xl font-mono text-center border border-gray-200 rounded-xl bg-white/50 transition-all duration-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none group-hover:shadow-md tracking-widest"
                  placeholder="000000"
                  required
                />
                <div className="absolute inset-0 rounded-xl border-2 border-transparent group-hover:border-blue-200 transition-all duration-300 pointer-events-none"></div>
              </div>
              <p className="text-xs text-gray-500 text-center">
                Enter the 6-digit code from your authenticator app
              </p>
            </div>

            {/* Error Message */}
            {error && (
              <div className="animate-shake bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl flex items-center justify-center mb-6">
                <span className="mr-2">⚠️</span>
                {error}
              </div>
            )}

            {/* Verify Button */}
            <button
              type="submit"
              disabled={isLoading || otp.length !== 6}
              className={`w-full py-4 px-6 rounded-xl font-semibold text-white transition-all duration-500 transform hover:scale-[1.02] active:scale-[0.98] mb-4 ${
                isLoading || otp.length !== 6
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl"
              }`}
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="w-5 h-5 border-t-2 border-white rounded-full animate-spin mr-2"></div>
                  Verifying...
                </div>
              ) : (
                "Verify Code ✅"
              )}
            </button>

            {/* Reset Button */}
            <button
              type="button"
              onClick={handleReset}
              disabled={isResetting}
              className={`w-full py-3 px-6 rounded-xl font-medium transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] border ${
                isResetting
                  ? "bg-gray-400 cursor-not-allowed border-gray-400 text-white"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50 hover:border-gray-400 hover:shadow-md"
              }`}
            >
              {isResetting ? (
                <div className="flex items-center justify-center">
                  <div className="w-4 h-4 border-t-2 border-gray-600 rounded-full animate-spin mr-2"></div>
                  Resetting...
                </div>
              ) : (
                <div className="flex items-center justify-center">
                  <span className="mr-2">🔄</span>
                  Reset 2FA Setup
                </div>
              )}
            </button>
          </form>

          {/* Help Section */}
          <div className="bg-gray-50/50 border-t border-gray-200 p-6">
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <span className="text-blue-500 text-lg">💡</span>
                <div>
                  <p className="text-sm font-medium text-gray-700">
                    Can't find your code?
                  </p>
                  <p className="text-xs text-gray-600">
                    Make sure your authenticator app is synchronized and you're
                    using the correct account.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <span className="text-orange-500 text-lg">⚠️</span>
                <div>
                  <p className="text-sm font-medium text-gray-700">
                    Reset carefully
                  </p>
                  <p className="text-xs text-gray-600">
                    Resetting 2FA will disable your current setup. You'll need
                    to set it up again.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Custom Animations */}
      <style jsx>{`
        @keyframes shake {
          0%,
          100% {
            transform: translateX(0);
          }
          25% {
            transform: translateX(-5px);
          }
          75% {
            transform: translateX(5px);
          }
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-shake {
          animation: shake 0.5s ease-in-out;
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }

        /* Input number styling */
        input[type="text"] {
          letter-spacing: 0.5em;
        }

        /* Remove number input arrows */
        input::-webkit-outer-spin-button,
        input::-webkit-inner-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }
      `}</style>
    </div>
  );
};

export default TwoFAVerification;
