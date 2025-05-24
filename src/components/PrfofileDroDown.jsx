import { NavLink } from "react-router-dom";

const ProfileDropdown = ({ user, handleLogout }) => {
  if (!user) return null;

  const avatarUrl =
    user.photoURL ||
    `https://ui-avatars.com/api/?name=${encodeURIComponent(
      user.displayName || "User",
    )}&background=random`;

  return (
    <div className="relative group ">
      <button
        className="flex items-center space-x-2 focus:outline-none cursor-pointer"
        aria-haspopup="true"
        aria-expanded="false"
      >
        <img
          src={avatarUrl}
          alt="Profile"
          className="w-10 h-10 rounded-full border-2 border-white shadow"
        />
      </button>

      <div
        className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all duration-200 z-50"
        role="menu"
        aria-label="User menu"
      >
        <NavLink
          to="/profile"
          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          role="menuitem"
        >
          My Profile
        </NavLink>
        <button
          onClick={handleLogout}
          className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-100 cursor-pointer"
          role="menuitem"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default ProfileDropdown;
