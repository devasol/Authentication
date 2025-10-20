import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const TitleUpdater = () => {
  const location = useLocation();

  useEffect(() => {
    const pageTitles = {
      "/": "Home | Auth System",
      "/login": "Login | Auth System",
      "/setup-2fa": "Setup 2FA | Auth System",
      "/verify-2fa": "Verify 2FA | Auth System",
    };

    document.title = pageTitles[location.pathname] || "Auth System";
  }, [location]);

  return null; // This component doesn't render anything visible
};

export default TitleUpdater;
