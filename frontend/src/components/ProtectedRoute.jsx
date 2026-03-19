import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { token } = useSelector((state) => state.auth || {});
  const location = useLocation();

  // If user is NOT logged in → redirect to login
  if (!token) {
    return (
      <Navigate
        to="/login"
        state={{ from: location }} // preserves previous route
        replace
      />
    );
  }

  // If logged in → allow access
  return children;
};

export default ProtectedRoute;