import { useEffect, useState } from "react";
import {
  updateProfile,
  updatePassword,
  sendEmailVerification,
} from "firebase/auth";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { UserContextAuth } from "../Firebase/UserContext";

export default function Profile() {
  const { user, refreshUser } = UserContextAuth();

  const storage = getStorage();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [profilePic, setProfilePic] = useState(null);
  const [previewURL, setPreviewURL] = useState("");

  useEffect(() => {
    if (user) {
      setName(user.displayName || "");
      setEmail(user.email || "");
      setIsVerified(user.emailVerified || false);
    }
  }, [user]);

  const [message, setMessage] = useState("");

  const handleFileChange = (file) => {
    setProfilePic(file);
    setPreviewURL(URL.createObjectURL(file));
  };

  const handleVerifyEmail = () => {
    sendEmailVerification(user)
      .then(() => {
        setMessage("Verification email sent! Check your inbox.");
      })
      .catch((error) => {
        console.error("Error sending verification email:", error);
        alert(error.message);
      });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setMessage("");
    console.log("Update started");

    try {
      if (!user) throw new Error("No user logged in");

      let photoURL = user.photoURL || "";
      console.log("Current photoURL:", photoURL);

      if (profilePic) {
        console.log("Uploading new profile picture...");
        const storageRef = ref(storage, `profilePics/${user.uid}`);
        await uploadBytes(storageRef, profilePic);
        photoURL = await getDownloadURL(storageRef);
        console.log("Uploaded and got photoURL:", photoURL);
      }

      console.log("Updating profile...");
      await updateProfile(user, { displayName: name, photoURL });

      await refreshUser();

      if (newPassword.trim()) {
        try {
          console.log("Updating password...");
          await updatePassword(user, newPassword);
          console.log("Password updated");
        } catch (passwordError) {
          setMessage(
            "Password update failed: Please sign out and sign in again before changing your password.",
          );
          console.error("Password update error:", passwordError);
          return;
        }
      }

      setMessage("Profile updated successfully.");
      setNewPassword("");
      console.log("Update finished successfully");
    } catch (err) {
      console.error("Profile update error:", err);
      setMessage("Error: " + err.message);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 mt-10 bg-white rounded-lg shadow-lg text-black">
      <div className="flex justify-between items-center px-4 py-3">
        <h2 className="text-2xl font-semibold">Edit Profile</h2>

        {isVerified ? (
          <button className="text-[#28a745] bg-[#d4edda] border border-[#28a745] px-3 py-1 rounded font-bold my-4 text-center cursor-not-allowed">
            Verified
          </button>
        ) : (
          <button
            onClick={handleVerifyEmail}
            className="text-[#d9534f] bg-[#f8d7da] hover:bg-[#181616] border border-[#d9534f] px-3 py-1 rounded my-4 font-bold cursor-pointer"
          >
            Not verified
          </button>
        )}
      </div>
      {!isVerified && !message && (
        <p className="text-[#d9534f] bg-[#f8d7da] border border-[#d9534f] px-4 py-2 rounded font-bold my-4  text-center">
          Your Email is not Verified. For Pro service Please verify Email
        </p>
      )}
      {message && (
        <p className="text-[#28a745] bg-[#d4edda] border border-[#28a745] px-4 py-2 rounded font-bold my-4 text-center">
          {message}
        </p>
      )}
      <form onSubmit={handleUpdate} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Display Name</label>
          <input
            type="text"
            value={name}
            className="w-full p-2 border rounded"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Email</label>
          <input
            type="email"
            value={email}
            className="w-full p-2 border rounded bg-gray-100 cursor-not-allowed"
            disabled
          />
        </div>
        <div>
          <label className="block text-sm font-medium">New Password</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="Leave blank to keep current"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Profile Picture</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleFileChange(e.target.files[0])}
            className="w-full p-2 border rounded bg-white"
          />
          {previewURL && (
            <img
              src={previewURL}
              alt="Profile Preview"
              className="mt-2 w-24 h-24 rounded-full object-cover"
            />
          )}
        </div>
        <button
          type="submit"
          className="px-6 py-2 rounded transition bg-blue-600 text-white hover:bg-blue-700"
        >
          Save
        </button>
      </form>
    </div>
  );
}
