// src/routes/PrivateRoute.jsx
import { Navigate, useLocation } from "react-router-dom";
import { UserContextAuth } from "./UserContext";

export default function PrivateRoute({ children }) {
  const { user, loading } = UserContextAuth();
  const location = useLocation();
  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ from: location, errorMessage: "You need to log in first !" }}
      />
    );
  }

  return children;
}
