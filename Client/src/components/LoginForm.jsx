import { useState } from "react";
import { Link } from "react-router-dom";
import { register, loginUser } from "../services/authApi";

const LoginForm = ({ onLoginSuccess }) => {
  const [isRegister, setIsRegister] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords don't match");
      return;
    }

    setIsLoading(true);
    try {
      const { data } = await register(username, password);
      setMessage(data.message);
      setUsername("");
      setPassword("");
      setIsRegister(false);
      setConfirmPassword("");
      setError("");
    } catch (error) {
      console.log("The err is : ", error.message);
      setUsername("");
      setPassword("");
      setConfirmPassword("");
      setMessage("");
      if (error.response) {
        setError(error.response.data.error);
      } else {
        setError("Network Error");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = async (e) => {
    console.log("handleLogin called");
    e.preventDefault();
    setIsLoading(true);
    try {
      const { data } = await loginUser(username, password);
      setMessage(data.message);
      setUsername("");
      setPassword("");
      onLoginSuccess(data);
      setError("");
    } catch (error) {
      console.log("The err is : ", error.message);
      setUsername("");
      setPassword("");
      if (error.response) {
        setError(error.response.data.error);
      } else {
        setError("Network Error");
      }
      setMessage("");
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegisterToggle = () => {
    setIsRegister(!isRegister);
    setError("");
    setMessage("");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 p-4">
      <div className="w-full max-w-md">
        {/* Animated Background Card */}
        <div className="relative">
          {/* Floating background elements */}
          <div className="absolute -top-4 -left-4 w-20 h-20 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
          <div className="absolute -bottom-4 -right-4 w-20 h-20 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse animation-delay-2000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse animation-delay-4000"></div>

          {/* Main Form Card */}
          <div className="relative bg-white/80 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20 overflow-hidden transition-all duration-500 hover:shadow-3xl">
            {/* Animated Header */}
            <div className="relative bg-gradient-to-r from-blue-600 to-purple-600 p-8">
              <div className="text-center">
                <h2 className="text-3xl font-bold text-white mb-2 transform transition-transform duration-300 hover:scale-105">
                  {isRegister ? "Create Account" : "Welcome Back"}
                </h2>
                <div className="w-16 h-1 bg-white/50 rounded-full mx-auto mb-4"></div>
                <p className="text-blue-100 text-lg font-light">
                  {isRegister
                    ? "Join us today! 🎉"
                    : "We're thrilled to see you again! 👋"}
                </p>
              </div>

              {/* Toggle Indicator */}
              <div className="flex justify-center mt-6">
                <div className="bg-white/20 rounded-full p-1 flex">
                  <button
                    onClick={() => !isRegister && handleRegisterToggle()}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                      !isRegister
                        ? "bg-white text-blue-600 shadow-lg"
                        : "text-white/80 hover:text-white"
                    }`}
                  >
                    Login
                  </button>
                  <button
                    onClick={() => isRegister && handleRegisterToggle()}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                      isRegister
                        ? "bg-white text-purple-600 shadow-lg"
                        : "text-white/80 hover:text-white"
                    }`}
                  >
                    Register
                  </button>
                </div>
              </div>
            </div>

            <form
              onSubmit={isRegister ? handleRegister : handleLogin}
              className="p-8 space-y-6"
            >
              {/* Username Field */}
              <div className="space-y-2">
                <label className="text-gray-700 text-sm font-medium flex items-center">
                  <span className="mr-2">👤</span>
                  Username
                </label>
                <div className="relative group">
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full p-4 border border-gray-200 rounded-xl bg-white/50 focus:bg-white transition-all duration-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none group-hover:shadow-md"
                    placeholder="Enter your username"
                    required
                  />
                  <div className="absolute inset-0 rounded-xl border-2 border-transparent group-hover:border-blue-200 transition-all duration-300 pointer-events-none"></div>
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <label className="text-gray-700 text-sm font-medium flex items-center">
                  <span className="mr-2">🔒</span>
                  Password
                </label>
                <div className="relative group">
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-4 border border-gray-200 rounded-xl bg-white/50 focus:bg-white transition-all duration-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none group-hover:shadow-md"
                    placeholder="Enter your password"
                    required
                  />
                  <div className="absolute inset-0 rounded-xl border-2 border-transparent group-hover:border-blue-200 transition-all duration-300 pointer-events-none"></div>
                </div>
              </div>

              {/* Confirm Password Field - Animated */}
              {isRegister && (
                <div className="space-y-2 animate-fadeIn">
                  <label className="text-gray-700 text-sm font-medium flex items-center">
                    <span className="mr-2">✅</span>
                    Confirm Password
                  </label>
                  <div className="relative group">
                    <input
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full p-4 border border-gray-200 rounded-xl bg-white/50 focus:bg-white transition-all duration-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none group-hover:shadow-md"
                      placeholder="Confirm your password"
                      required
                    />
                    <div className="absolute inset-0 rounded-xl border-2 border-transparent group-hover:border-blue-200 transition-all duration-300 pointer-events-none"></div>
                  </div>
                </div>
              )}

              {/* Messages */}
              <div className="space-y-3">
                {error && (
                  <div className="animate-shake bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl flex items-center">
                    <span className="mr-2">⚠️</span>
                    {error}
                  </div>
                )}
                {message && (
                  <div className="animate-fadeIn bg-green-50 border border-green-200 text-green-600 px-4 py-3 rounded-xl flex items-center">
                    <span className="mr-2">✅</span>
                    {message}
                  </div>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full py-4 px-6 rounded-xl font-semibold text-white transition-all duration-500 transform hover:scale-[1.02] active:scale-[0.98] ${
                  isLoading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl"
                }`}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="w-5 h-5 border-t-2 border-white rounded-full animate-spin mr-2"></div>
                    {isRegister ? "Creating Account..." : "Signing In..."}
                  </div>
                ) : isRegister ? (
                  "Create Account 🚀"
                ) : (
                  "Sign In ✨"
                )}
              </button>

              {/* Toggle Link */}
              <div className="text-center pt-4">
                <p className="text-gray-600 text-sm">
                  {isRegister
                    ? "Already have an account?"
                    : "Don't have an account?"}{" "}
                  <button
                    type="button"
                    onClick={handleRegisterToggle}
                    className="text-blue-600 hover:text-purple-600 font-medium transition-colors duration-300 underline hover:no-underline"
                  >
                    {isRegister ? "Sign In" : "Create Account"}
                  </button>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Add custom animations to global CSS */}
      <style jsx>{`
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
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }
        .animate-shake {
          animation: shake 0.5s ease-in-out;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
};

export default LoginForm;
