import { useEffect, useState } from "react";
import { setup2FA } from "../services/authApi";

const TwoFASetup = ({ onSetupComplete }) => {
  const [response, setResponse] = useState({});
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isCopied, setIsCopied] = useState(false);

  const fetchQRCode = async () => {
    setIsLoading(true);
    try {
      const { data } = await setup2FA();
      setResponse(data);
    } catch (error) {
      console.error("Error fetching 2FA setup:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchQRCode();
  }, []);

  const copyClipBoard = async () => {
    try {
      await navigator.clipboard.writeText(response.secret);
      setMessage("Secret copied to clipboard");
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (error) {
      setMessage("Failed to copy secret");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 p-4">
      <div className="w-full max-w-md">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse animation-delay-2000"></div>
        </div>

        {/* Main Card */}
        <div className="relative bg-white/80 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20 overflow-hidden transition-all duration-500 hover:shadow-3xl">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-8 text-center">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                <span className="text-2xl">🔐</span>
              </div>
            </div>
            <h2 className="text-3xl font-bold text-white mb-2">
              Enable 2FA Security
            </h2>
            <p className="text-blue-100 text-lg font-light">
              Protect your account with two-factor authentication
            </p>
          </div>

          <div className="p-8">
            {/* Loading State */}
            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-12 space-y-4">
                <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
                <p className="text-gray-600 font-medium">
                  Generating your secure QR code...
                </p>
              </div>
            ) : (
              <>
                {/* Instructions */}
                <div className="text-center mb-8">
                  <p className="text-gray-600 text-lg font-light mb-4">
                    Scan the QR code with your authenticator app
                  </p>

                  {/* QR Code Container */}
                  <div className="relative inline-block p-4 bg-white rounded-2xl shadow-lg border border-gray-100 transition-all duration-300 hover:shadow-xl hover:scale-105">
                    {response.qrCode && (
                      <img
                        src={response.qrCode}
                        alt="2FA QR Code"
                        className="w-48 h-48 rounded-lg"
                      />
                    )}
                    {/* Animated Border */}
                    <div className="absolute inset-0 rounded-2xl border-2 border-transparent bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-padding opacity-0 hover:opacity-100 transition-opacity duration-500 -z-10">
                      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500 to-purple-500 blur-sm"></div>
                    </div>
                  </div>
                </div>

                {/* Divider */}
                <div className="flex items-center my-8">
                  <div className="flex-grow border-t border-gray-200"></div>
                  <span className="flex-shrink mx-4 text-gray-500 text-sm font-medium bg-white px-3 py-1 rounded-full border border-gray-200">
                    Or enter manually
                  </span>
                  <div className="flex-grow border-t border-gray-200"></div>
                </div>

                {/* Secret Key Section */}
                <div className="space-y-4">
                  {message && (
                    <div
                      className={`animate-fadeIn p-3 rounded-xl text-center font-medium ${
                        isCopied
                          ? "bg-green-50 border border-green-200 text-green-600"
                          : "bg-blue-50 border border-blue-200 text-blue-600"
                      }`}
                    >
                      <div className="flex items-center justify-center">
                        {isCopied ? (
                          <>
                            <span className="mr-2">✅</span>
                            {message}
                          </>
                        ) : (
                          <>
                            <span className="mr-2">📋</span>
                            {message}
                          </>
                        )}
                      </div>
                    </div>
                  )}

                  <div className="relative group">
                    <label className="block text-gray-700 text-sm font-medium mb-2">
                      Secret Key
                    </label>
                    <div className="relative">
                      <input
                        readOnly
                        value={response.secret}
                        className="w-full p-4 pr-12 border border-gray-200 rounded-xl bg-gray-50/50 text-sm font-mono text-gray-600 transition-all duration-300 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none group-hover:shadow-md cursor-pointer"
                        onClick={copyClipBoard}
                      />
                      <button
                        onClick={copyClipBoard}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 p-2 text-gray-400 hover:text-blue-600 transition-colors duration-200 hover:scale-110"
                        title="Copy to clipboard"
                      >
                        {isCopied ? (
                          <span className="text-green-500">✅</span>
                        ) : (
                          <span className="text-gray-400 hover:text-blue-600">
                            📋
                          </span>
                        )}
                      </button>

                      {/* Animated copy feedback */}
                      {isCopied && (
                        <div className="absolute inset-0 bg-green-500/10 rounded-xl animate-pingOnce pointer-events-none"></div>
                      )}
                    </div>
                    <p className="text-xs text-gray-500 mt-2 text-center">
                      Click the input or copy icon to copy the secret key
                    </p>
                  </div>
                </div>

                {/* Continue Button */}
                <button
                  onClick={onSetupComplete}
                  className="w-full mt-8 py-4 px-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl transition-all duration-500 transform hover:scale-[1.02] active:scale-[0.98] hover:shadow-xl hover:from-blue-700 hover:to-purple-700 shadow-lg"
                >
                  Continue to Verification 🚀
                </button>
              </>
            )}
          </div>

          {/* Security Tips */}
          <div className="bg-gray-50/50 border-t border-gray-200 p-6">
            <div className="flex items-start space-x-3">
              <span className="text-blue-500 text-lg">💡</span>
              <div>
                <p className="text-sm font-medium text-gray-700">
                  Security Tip
                </p>
                <p className="text-xs text-gray-600">
                  Use apps like Google Authenticator, Authy, or Microsoft
                  Authenticator to scan the QR code.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Custom Animations */}
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
        @keyframes pingOnce {
          0% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(1.05);
            opacity: 0.5;
          }
          100% {
            transform: scale(1);
            opacity: 0;
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }
        .animate-pingOnce {
          animation: pingOnce 0.6s ease-out;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }

        /* Smooth transitions for all interactive elements */
        * {
          transition: all 0.2s ease-in-out;
        }
      `}</style>
    </div>
  );
};

export default TwoFASetup;
