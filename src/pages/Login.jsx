import { useEffect, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import {
  FacebookAuthProvider,
  GithubAuthProvider,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { UserContextAuth } from "../Firebase/UserContext";
import { Eye, EyeOff } from "lucide-react";
import auth from "../Firebase/firebase";

export default function Signin() {
  const navigate = useNavigate();
  const location = useLocation(); // Used to capture error messages passed via navigation
  const errorFromLocation = location.state?.errorMessage || "";

  // user from context and navigate if login
  const { user } = UserContextAuth();
  const [wellcomMessage, setWellcomMessage] = useState("");

  useEffect(() => {
    if (user) {
      setError("");
      setWellcomMessage(`✅ wllcome ${user.displayName}  ! Redirecting...`);
      setTimeout(() => {
        navigate("/dashboard", { replace: true });
      }, 5500);
    }
  }, [user, navigate]);

  //*----------------------------------  ------------- manual login by email/pass ---------------------------------------------------------

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleForm = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    try {
      await signInWithEmailAndPassword(auth, email, password);
      // Redirect handled by context state change & useEffect
    } catch (err) {
      setError(err.message);
    }
    setIsLoading(false);
  };

  //*----------------------------------  ------------- google/fb/github login by button ---------------------------------------------------------

  const handleButton = (providerType) => {
    let provider;

    if (providerType === "google") provider = new GoogleAuthProvider();
    if (providerType === "facebook") provider = new FacebookAuthProvider();
    if (providerType === "github") provider = new GithubAuthProvider();

    signInWithPopup(auth, provider)
      .then((result) => {
        console.log("Signed in:", result.user);
      })
      .catch((error) => {
        console.error("Sign-in error:", error);
      });
  };

  return (
    <div className="bg-gray-500 min-h-screen flex items-center justify-center px-4">
      <div className="bg-white p-10 rounded-xl shadow-lg max-w-md w-full text-center space-y-8">
        <h1 className="text-3xl font-bold text-gray-800">
          Sign In to MyApp 🔥
        </h1>
        {errorFromLocation && !error && !wellcomMessage && (
          <p className="text-[#d9534f] bg-[#f8d7da] border border-[#d9534f] px-4 py-2 rounded font-bold mt-4 text-center">
            {errorFromLocation}
          </p>
        )}
        {error && (
          <p className="text-[#d9534f] bg-[#f8d7da] border border-[#d9534f] px-4 py-2 rounded font-bold mt-4 text-center">
            {error}
          </p>
        )}

        {wellcomMessage && (
          <p className="text-[#28a745] bg-[#d4edda] border border-[#28a745] px-4 py-2 rounded font-bold mt-4 text-center">
            {wellcomMessage}
          </p>
        )}

        {!errorFromLocation && !error && !wellcomMessage && (
          <p className="text-[#28a745] bg-[#d4edda] border border-[#28a745] px-4 py-2 rounded font-bold mt-4 text-center">
            Please enter your username and password.
          </p>
        )}

        <div className="space-y-4">
          {/* Social login buttons */}
          <button
            onClick={() => handleButton("google")}
            className="w-full py-3 rounded bg-red-500 text-white font-semibold hover:bg-red-600 transition cursor-pointer"
          >
            Continue with Google
          </button>
          <button
            onClick={() => handleButton("facebook")}
            className="w-full py-3 rounded bg-blue-600 text-white font-semibold hover:bg-blue-700 transition cursor-pointer"
          >
            Continue with Facebook
          </button>
          <button
            onClick={() => handleButton("github")}
            className="w-full py-3 rounded bg-gray-800 text-white font-semibold hover:bg-gray-900 transition cursor-pointer"
          >
            Continue with GitHub
          </button>
        </div>

        <div className="relative flex items-center text-gray-500 my-6">
          <hr className="flex-grow border-gray-300" />
          <span className="mx-3 text-sm">OR</span>
          <hr className="flex-grow border-gray-300" />
        </div>

        {/* Manual sign in form */}
        <form onSubmit={handleForm} className="space-y-5 text-left">
          <label className="block">
            <span className="text-gray-700 font-semibold">Email</span>
            <input
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="mt-1 block w-full rounded border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-400  text-black"
            />
          </label>
          <label className="block relative">
            <span className="text-gray-700 font-semibold">Password</span>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="********"
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full rounded border border-gray-300 px-4 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-red-400 text-black"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-[42px] text-gray-500"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </label>

          <NavLink
            to="/password-reset"
            className="text-blue-600 hover:underline underline-offset-2 hover:decoration-2 inline-block  "
          >
            Forget Password ?
          </NavLink>

          <button
            type="submit"
            className="w-full bg-red-500 text-white font-semibold py-3 rounded hover:bg-red-600 transition cursor-pointer"
          >
            {isLoading ? "Logging in..." : "Log in"}
          </button>
        </form>

        <p className="text-black">
          Don't have an account?
          <NavLink
            to="/register"
            className="text-blue-600 font-bold hover:underline underline-offset-2 hover:decoration-2 py-3 ml-2 "
          >
            Sign Up
          </NavLink>
        </p>
      </div>
    </div>
  );
}
