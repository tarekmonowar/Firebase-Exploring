import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import { UserContextAuth } from "../Firebase/UserContext";
import ProfileDropdown from "../components/PrfofileDroDown";

export default function Navbar() {
  const { user } = UserContextAuth();
  const navigate = useNavigate();
  const auth = getAuth();

  const linkStyle = ({ isActive }) =>
    `px-6 py-2.5 mx-2 rounded font-medium transition-all duration-200 ease-in-out ${
      isActive
        ? "bg-blue-600 text-white shadow-lg transform"
        : "text-gray-300 hover:text-white hover:bg-gray-700/50 hover:shadow-md"
    }`;

  const handleLogout = async () => {
    await signOut(auth);
    // localStorage.removeItem("isLoggedIn"); // Clear user data from localStorage
    navigate("/login");
  };

  return (
    <nav className="flex justify-between items-center px-8 py-3 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white shadow-2xl border-b border-gray-700/50">
      <div className="flex items-center">
        <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg flex items-center justify-center mr-3 shadow-lg ml-20">
          <span className="text-white font-bold text-lg">🔥</span>
        </div>
        <h1 className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent ">
          My Firebase App
        </h1>
      </div>

      <div className="flex items-center space-x-1">
        <NavLink to="/" className={linkStyle}>
          Home
        </NavLink>
        <NavLink to="/order" className={linkStyle}>
          Order
        </NavLink>

        {user ? (
          <>
            <NavLink to="/dashboard" className={linkStyle}>
              Dashboard
            </NavLink>
            <ProfileDropdown user={user} handleLogout={handleLogout} />
          </>
        ) : (
          <>
            <NavLink to="/login" className={linkStyle}>
              Log In
            </NavLink>
            <NavLink to="/register" className={linkStyle}>
              Register
            </NavLink>
          </>
        )}
      </div>
    </nav>
  );
}
