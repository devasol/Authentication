import { Navigate, Outlet } from "react-router-dom";
import { useSession } from "../context/SessionContext";
import TitleUpdater from "./TitleUpdater";

const ProtectedRoute = () => {
  const { isLoggedIn, loading } = useSession();
  if (loading) {
    return <div>Loading...</div>;
  }
  return isLoggedIn ? (
    <>
      <TitleUpdater />
      <Outlet />
    </>
  ) : (
    <Navigate to="/login" />
  );
};

export default ProtectedRoute;
