import React, { useEffect, useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import auth from "./firebase";
import { UserContextAuth } from "./UserContext";
import { useNavigate } from "react-router-dom";

export default function PasswordReset() {
  const { user } = UserContextAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (user) {
      setError("");
      setMessage(`✅ wllcome ${user.displayName}  ! Redirecting...`);
      setTimeout(() => {
        navigate("/dashboard", { replace: true });
      }, 5500);
    }
  }, [user, navigate]);

  const handlePasswordReset = () => {
    setMessage("");
    setError("");

    if (!email) {
      setError("Please enter your email address.");
      return;
    }

    sendPasswordResetEmail(auth, email)
      .then(() => {
        setMessage("Password reset email sent! Check your inbox.");
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  return (
    <div className="bg-gray-500 min-h-[80vh] flex items-center justify-center px-4">
      <div className="bg-white p-12 rounded-xl shadow-xl max-w-lg w-full text-center">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-6">
          🔒 Reset Password
        </h1>
        <p className="text-gray-600 mb-6 text-lg font-medium">
          Enter your registered email address to receive a password reset link.
        </p>

        {message && (
          <p className="text-green-700 bg-green-100 border border-green-500 px-4 py-2 rounded font-semibold mb-4 text-center">
            {message}
          </p>
        )}

        {error && (
          <p className="text-red-700 bg-red-100 border border-red-500 px-4 py-2 rounded font-semibold mb-4 text-center">
            {error}
          </p>
        )}

        <div className="flex flex-col items-center space-y-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="w-full px-4 py-2 border text-black border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handlePasswordReset}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-md transition-colors cursor-pointer"
          >
            Send Reset Link
          </button>
        </div>

        <p className="mt-8 text-sm text-gray-500 italic">
          * You’ll receive an email if the address is registered.
        </p>
      </div>
    </div>
  );
}
