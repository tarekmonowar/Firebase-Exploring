import { useState, useEffect } from "react";
import auth from "../Firebase/firebase"; // your firebase config file
import {
  deleteUser,
  EmailAuthProvider,
  reauthenticateWithCredential,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { UserContextAuth } from "./UserContext";
import { useLocation } from "react-router-dom";

export default function VerifyEmail() {
  const location = useLocation();
  const password = location.state?.password;

  const { user, refreshUser } = UserContextAuth();
  const [checking, setChecking] = useState(false);
  const [message, setMessage] = useState("");
  const [deleting, setDeleting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (auth.currentUser?.emailVerified) {
      setMessage("✅ Email already verified! Redirecting...");
      setTimeout(() => {
        navigate("/dashboard");
      }, 1500);
    }
  }, [navigate]);

  const checkVerification = async () => {
    setChecking(true);
    setMessage("");

    if (!user) {
      setMessage("User not logged in. Please log in first.");
      setChecking(false);
      navigate("/register");
      return;
    }

    try {
      await refreshUser();

      if (user.emailVerified) {
        setMessage("✅ Email verified! Redirecting...");
        setTimeout(() => {
          navigate("/dashboard");
        }, 1500);
      } else {
        setMessage("❌ Email still not verified. Please check your inbox.");
      }
    } catch (err) {
      setMessage("Error checking verification: " + err.message);
    }

    setChecking(false);
  };

  // Inside your component
  const handleCancelAndDelete = async (userPassword) => {
    if (!user || !user.email || !userPassword) {
      setMessage("Missing user or password");
      return;
    }

    setDeleting(true);
    setMessage("");

    try {
      const credential = EmailAuthProvider.credential(user.email, userPassword);

      // Silent reauthentication
      await reauthenticateWithCredential(user, credential);

      // Now safely delete user
      await deleteUser(user);

      setMessage("Account deleted. Redirecting to register...");
      setTimeout(() => {
        navigate("/register");
      }, 1500);
    } catch (error) {
      setMessage("Error deleting account: " + error.message);
    }

    setDeleting(false);
  };

  return (
    <div className="p-4 text-center">
      <h1>Please verify your email</h1>
      <p>
        We've sent you a verification link. Click it, then click the button
        below to continue.
      </p>
      <button
        onClick={checkVerification}
        disabled={checking || auth.currentUser?.emailVerified}
        className="bg-blue-500 text-white px-4 py-2 mt-4 rounded"
      >
        {checking ? "Checking..." : "I’ve verified my email"}
      </button>
      <br />
      <button
        onClick={() => handleCancelAndDelete(password)}
        disabled={deleting}
        className="bg-red-500 text-white px-4 py-2 mt-4 rounded"
      >
        {deleting ? "Deleting account..." : "Cancel and Delete Account"}
      </button>
      {message && <p className="mt-4">{message}</p>}
    </div>
  );
}
