// src/home.jsx
import React from "react";

export default function Home() {
  return (
    <div className="bg-gray-500 min-h-screen flex items-center justify-center">
      <div className="bg-white p-10 rounded-xl shadow-lg max-w-xl text-center space-y-6">
        <h1 className="text-4xl font-bold text-gray-800">
          Welcome to MyApp 🔥
        </h1>
        <p className="text-lg text-gray-700">
          This is a demo project using Firebase authentication.
        </p>
        <p className="text-md text-gray-600">
          To access <span className="font-semibold">Order</span> or{" "}
          <span className="font-semibold">Dashboard</span>, you must be logged
          in.
        </p>
        <p className="text-md text-gray-600">
          Use the <span className="font-semibold">Login</span> or{" "}
          <span className="font-semibold">Register</span> options in the navbar
          above to get started.
        </p>
      </div>
    </div>
  );
}
