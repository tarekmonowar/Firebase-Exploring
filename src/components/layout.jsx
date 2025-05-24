import { Outlet } from "react-router-dom";
import Navbar from "./navbar";

export default function Layout() {
  return (
    <div className="bg-gray-500 min-h-screen text-white">
      <Navbar />
      <main className="p-4">
        <Outlet />
      </main>
    </div>
  );
}
