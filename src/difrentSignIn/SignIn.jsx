import { useState } from "react";
import "./signin.css";
import app from "./Firebase/firebase";
import {
  getAuth,
  GoogleAuthProvider,
  FacebookAuthProvider,
  GithubAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";

//*----------------------------------------------3ta aksate------------------------------------------------
export default function Signin() {
  const [user, setUser] = useState(null);
  const auth = getAuth(app);

  const signIn = (providerType) => {
    let provider;

    if (providerType === "google") provider = new GoogleAuthProvider();
    if (providerType === "facebook") provider = new FacebookAuthProvider();
    if (providerType === "github") provider = new GithubAuthProvider();

    signInWithPopup(auth, provider)
      .then((result) => {
        console.log("Signed in:", result.user);
        setUser(result.user);
      })
      .catch((error) => {
        console.error("Sign-in error:", error);
      });
  };

  const signOutUser = () => {
    signOut(auth)
      .then(() => {
        console.log("User signed out.");
        setUser(null);
      })
      .catch((error) => {
        console.error("Sign-out error:", error);
      });
  };

  return (
    <div className="container">
      {user ? (
        <div className="userCard">
          <img src={user.photoURL} alt="User" className="userImage" />
          <h2>{user.displayName}</h2>
          <h4>{user.email}</h4>
          <button className="button" onClick={signOutUser}>
            Sign out
          </button>
        </div>
      ) : (
        <>
          <p>No user signed in</p>
          <button className="button" onClick={() => signIn("google")}>
            Sign in with Google
          </button>
          <button className="button" onClick={() => signIn("facebook")}>
            Sign in with Facebook
          </button>
          <button className="button" onClick={() => signIn("github")}>
            Sign in with GitHub
          </button>
        </>
      )}
    </div>
  );
}
