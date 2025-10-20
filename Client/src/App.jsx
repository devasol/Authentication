import { RouterProvider } from "react-router-dom";
import router from "./routes";
import "./App.css";
import { SessionProvider } from "./context/SessionContext";
import TitleUpdater from "./components/TitleUpdater";

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating Orbs */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-float animation-delay-2000"></div>
        <div className="absolute bottom-1/4 left-1/2 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl animate-float animation-delay-4000"></div>

        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]"></div>

        {/* Animated Gradient Border */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-transparent to-purple-500/20 animate-pulse"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex justify-center items-center p-4 pb-24">
        <div className="w-full max-w-4xl transform transition-all duration-500 hover:scale-[1.01]">
          {/* Glass Container */}
          <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl shadow-2xl overflow-hidden">
            {/* Header Bar */}
            <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 border-b border-white/10 p-4">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full animate-pulse animation-delay-1000"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse animation-delay-2000"></div>
                <div className="text-white/60 text-sm font-light ml-2">
                  React Application
                </div>
              </div>
            </div>

            {/* Content Area */}
            <div className="p-8">
              <SessionProvider>
                <RouterProvider router={router}>
                  <TitleUpdater />
                </RouterProvider>
              </SessionProvider>
            </div>

            {/* Footer */}
            <div className="bg-gradient-to-r from-blue-600/10 to-purple-600/10 border-t border-white/10 p-4">
              <div className="text-center text-white/40 text-sm">
                <div className="flex justify-center items-center space-x-4">
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-ping"></div>
                    <span>Live</span>
                  </div>
                  <span>•</span>
                  <span>Secure</span>
                  <span>•</span>
                  <span>Powered by React</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Action Buttons */}
      <div className="fixed bottom-8 right-8 z-20 flex flex-col space-y-4">
        <button className="w-12 h-12 bg-blue-600/20 backdrop-blur-lg border border-blue-400/30 rounded-full flex items-center justify-center text-white/60 hover:text-white hover:bg-blue-600/30 transition-all duration-300 hover:scale-110 shadow-lg hover:shadow-blue-500/25">
          <span className="text-lg">⚡</span>
        </button>
        <button className="w-12 h-12 bg-purple-600/20 backdrop-blur-lg border border-purple-400/30 rounded-full flex items-center justify-center text-white/60 hover:text-white hover:bg-purple-600/30 transition-all duration-300 hover:scale-110 shadow-lg hover:shadow-purple-500/25">
          <span className="text-lg">🔔</span>
        </button>
      </div>

      {/* Add custom animations */}
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
        .animation-delay-1000 {
          animation-delay: 1s;
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
}

export default App;
