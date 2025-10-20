import { useNavigate } from "react-router-dom";
import { useSession } from "../context/SessionContext";
import { logoutUser } from "../services/authApi";

const HomePage = () => {
  const navigate = useNavigate();
  const { user, logout } = useSession();

  const handleLogout = async () => {
    try {
      const { data } = await logoutUser();
      logout(data);
      navigate("/login");
    } catch (error) {
      console.log("Error : ", error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-float animation-delay-2000"></div>
        <div className="absolute bottom-1/4 left-1/2 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl animate-float animation-delay-4000"></div>

        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]"></div>
      </div>

      {/* Main Content Card */}
      <div className="relative w-full max-w-lg">
        {/* Success Celebration */}
        <div className="flex justify-center mb-8">
          <div className="relative">
            <div className="w-24 h-24 bg-gradient-to-r from-green-400 to-blue-500 rounded-2xl flex items-center justify-center shadow-2xl transform rotate-6 hover:rotate-12 transition-transform duration-500">
              <span className="text-4xl">🎉</span>
            </div>
            <div className="absolute -top-2 -right-2 w-8 h-8 bg-green-400 rounded-full flex items-center justify-center shadow-lg">
              <span className="text-sm">✓</span>
            </div>
          </div>
        </div>

        {/* Welcome Card */}
        <div className="relative bg-white/10 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden transition-all duration-500 hover:shadow-3xl">
          {/* Header Gradient */}
          <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 border-b border-white/10 p-8 text-center">
            <h1 className="text-4xl font-bold text-white mb-2">
              Welcome Back!
            </h1>
            <div className="w-16 h-1 bg-white/30 rounded-full mx-auto"></div>
          </div>

          {/* Content */}
          <div className="p-8">
            {/* User Welcome */}
            <div className="text-center mb-8">
              <div className="flex justify-center mb-4">
                <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
                  <span className="text-2xl text-white font-bold">
                    {user.username?.charAt(0).toUpperCase()}
                  </span>
                </div>
              </div>
              <h2 className="text-2xl font-semibold text-white mb-2">
                Hello,{" "}
                <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  {user.username}
                </span>
                !
              </h2>
              <p className="text-gray-300 text-lg leading-relaxed">
                You have successfully logged in and verified your two-factor
                authentication.
              </p>
            </div>

            {/* Security Status */}
            <div className="bg-white/5 rounded-2xl p-6 mb-8 border border-white/10">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-white font-semibold flex items-center">
                  <span className="mr-2">🛡️</span>
                  Security Status
                </h3>
                <div className="flex items-center bg-green-500/20 px-3 py-1 rounded-full">
                  <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
                  <span className="text-green-400 text-sm font-medium">
                    Protected
                  </span>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">2FA Status</span>
                  <span className="text-green-400 flex items-center">
                    <span className="mr-1">✅</span>
                    Enabled
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">Session</span>
                  <span className="text-blue-400 flex items-center">
                    <span className="mr-1">🔒</span>
                    Secure
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="bg-white/5 rounded-xl p-4 text-center border border-white/10 hover:bg-white/10 transition-all duration-300">
                <div className="text-2xl mb-1">🕒</div>
                <div className="text-white font-semibold">Live</div>
                <div className="text-gray-400 text-xs">Session</div>
              </div>
              <div className="bg-white/5 rounded-xl p-4 text-center border border-white/10 hover:bg-white/10 transition-all duration-300">
                <div className="text-2xl mb-1">🔐</div>
                <div className="text-white font-semibold">2FA</div>
                <div className="text-gray-400 text-xs">Active</div>
              </div>
            </div>

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="w-full group relative overflow-hidden bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white font-semibold py-4 px-6 rounded-2xl transition-all duration-500 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl"
            >
              <div className="relative z-10 flex items-center justify-center">
                <span className="mr-2 transition-transform duration-300 group-hover:scale-110">
                  🚪
                </span>
                Sign Out
                <span className="ml-2 transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </div>

              {/* Animated background */}
              <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-pink-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

              {/* Ripple effect */}
              <div className="absolute inset-0 overflow-hidden rounded-2xl">
                <div className="absolute inset-0 bg-white/20 transform scale-0 group-hover:scale-100 transition-transform duration-500 opacity-0 group-hover:opacity-100 rounded-2xl"></div>
              </div>
            </button>
          </div>

          {/* Footer */}
          <div className="bg-gradient-to-r from-blue-600/10 to-purple-600/10 border-t border-white/10 p-4">
            <div className="text-center text-white/40 text-sm">
              <div className="flex justify-center items-center space-x-4">
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-ping"></div>
                  <span>Secure Connection</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Floating Action Buttons */}
        <div className="fixed bottom-8 right-8 z-20 flex flex-col space-y-4">
          <button className="w-12 h-12 bg-blue-600/20 backdrop-blur-lg border border-blue-400/30 rounded-full flex items-center justify-center text-white/60 hover:text-white hover:bg-blue-600/30 transition-all duration-300 hover:scale-110 shadow-lg hover:shadow-blue-500/25">
            <span className="text-lg">⚙️</span>
          </button>
          <button className="w-12 h-12 bg-purple-600/20 backdrop-blur-lg border border-purple-400/30 rounded-full flex items-center justify-center text-white/60 hover:text-white hover:bg-purple-600/30 transition-all duration-300 hover:scale-110 shadow-lg hover:shadow-purple-500/25">
            <span className="text-lg">👤</span>
          </button>
        </div>
      </div>

      {/* Custom Animations */}
      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) scale(1);
          }
          50% {
            transform: translateY(-20px) scale(1.05);
          }
        }
        .animate-float {
          animation: float 8s ease-in-out infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }

        /* Smooth scrolling */
        html {
          scroll-behavior: smooth;
        }
      `}</style>
    </div>
  );
};

export default HomePage;
