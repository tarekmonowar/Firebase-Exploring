import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import auth from "../Firebase/firebase";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  FacebookAuthProvider,
  GithubAuthProvider,
  updateProfile,
  signInWithPopup,
} from "firebase/auth";
import { UserContextAuth } from "../Firebase/UserContext";

export default function Signup() {
  const navigate = useNavigate();
  const { user } = UserContextAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [wellcomMessage, setWellcomMessage] = useState("");

  useEffect(() => {
    if (user) {
      setMessage("");
      setError("");
      setWellcomMessage(`✅ wllcome ${user.displayName}  ! Redirecting...`);
      setTimeout(() => {
        navigate("/dashboard", { replace: true });
      }, 5500);
    }
  }, [user, navigate]);

  const [showPassword, setShowPassword] = useState(false);

  //*----------------------------------------------------------manual sign up by form----------------------------------------------------
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("");

  const handleForm = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      ); //ati just 3ta arg ney for more info use updateprofile

      const user = userCredential.user;

      await updateProfile(user, {
        displayName: name,
        photoURL: `https://ui-avatars.com/api/?name=${encodeURIComponent(
          name,
        )}&background=random`,
      });
      setIsLoading(false);
      setEmail("");
      setPassword("");
      setGender("");
      setName("");

      setWellcomMessage("✅ Account created successfully ! Redirecting...");
      setTimeout(() => {
        navigate("/dashboard");
      }, 5500);
    } catch (err) {
      console.error("Sign-in error:", err.message);
      setError(err.message);
      setIsLoading(false);
    }
  };

  //*----------------------------------------------------------googgle/fb/github sign up by button----------------------------------------------------

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
      <div className="bg-white p-10 rounded-xl shadow-lg max-w-xl w-full text-center space-y-8">
        <h1 className="text-3xl font-bold text-gray-800">
          Create your account
        </h1>
        {message && (
          <p className="text-[#28a745] bg-[#d4edda] border border-[#28a745] px-4 py-2 rounded font-bold mt-4 text-center">
            Please enter your username and password.
          </p>
        )}

        {wellcomMessage && (
          <p className="text-[#28a745] bg-[#d4edda] border border-[#28a745] px-4 py-2 rounded font-bold mt-4 text-center">
            {wellcomMessage}
          </p>
        )}
        {error && (
          <p className="text-[#d9534f] bg-[#f8d7da] border border-[#d9534f] px-4 py-2 rounded font-bold mt-4 text-center">
            {error}
          </p>
        )}
        {/* Social login buttons */}
        <div className="space-y-4">
          <button
            onClick={() => handleButton("google")}
            className="w-full py-3 rounded bg-red-500 text-white font-semibold hover:bg-red-600 transition cursor-pointer"
          >
            Sign up with Google
          </button>
          <button
            onClick={() => handleButton("facebook")}
            className="w-full py-3 rounded bg-blue-600 text-white font-semibold hover:bg-blue-700 transition cursor-pointer"
          >
            Sign up with Facebook
          </button>
          <button
            onClick={() => handleButton("github")}
            className="w-full py-3 rounded bg-gray-800 text-white font-semibold hover:bg-gray-900 transition cursor-pointer"
          >
            Sign up with GitHub
          </button>
        </div>

        <div className="relative flex items-center text-gray-500 my-6">
          <hr className="flex-grow border-gray-300" />
          <span className="mx-3 text-sm">OR</span>
          <hr className="flex-grow border-gray-300" />
        </div>

        {/* Manual signup form */}
        <form onSubmit={handleForm} className="space-y-5 text-left">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <label className="block">
              <span className="text-gray-700 font-semibold">Name</span>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                placeholder="Full name"
                className="mt-1 block w-full rounded border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-400  text-black"
              />
            </label>
            <label className="block">
              <span className="text-gray-700 font-semibold">Email</span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="you@example.com"
                className="mt-1 block w-full rounded border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-400  text-black"
              />
            </label>
          </div>

          {/* Password and Gender on same row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <label className="block relative">
              <span className="text-gray-700 font-semibold">Password</span>
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="********"
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
            <label className="block">
              <span className="text-gray-700 font-semibold">Gender</span>
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="mt-1 block w-full rounded border border-gray-300 px-4 py-2 text-black focus:outline-none focus:ring-2 focus:ring-red-400"
              >
                <option value="">Select gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </label>
          </div>

          <button
            type="submit"
            className="w-full bg-red-500 text-white font-semibold py-3 rounded hover:bg-red-600 transition cursor-pointer"
          >
            {isLoading ? "Signing UP..." : "Register"}
          </button>
        </form>
        <p className="text-black">
          Have already an account?{" "}
          <NavLink
            to="/login"
            className="text-blue-600 font-bold hover:underline underline-offset-2 hover:decoration-2 py-3 ml-2"
          >
            Login here
          </NavLink>
        </p>
      </div>
    </div>
  );
}
