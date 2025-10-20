import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LoginForm from "../components/LoginForm";
import { useSession } from "../context/SessionContext";

const LoginPage = () => {
  const navigate = useNavigate();
  const { isLoggedIn, isMfaActive, login } = useSession();

  useEffect(() => {
    if (isLoggedIn) {
      if (!isMfaActive) {
        navigate("/verify-2fa");
      } else {
        navigate("/setup-2fa");
      }
    }
  }, [isLoggedIn, isMfaActive, navigate]);

  const handleLoginSuccess = (userData) => {
    login(userData);
  };

  return <LoginForm onLoginSuccess={handleLoginSuccess} />;
};

export default LoginPage;
