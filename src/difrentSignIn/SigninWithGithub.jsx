import { useState } from "react";
import app from "../Firebase/firebase";
import {
  getAuth,
  GithubAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";

export default function SigninWithGithub() {
  const [userInfo, setUserinfo] = useState(null);

  const provider = new GithubAuthProvider();

  const handlerButton = () => {
    const auth = getAuth(app);
    signInWithPopup(auth, provider)
      .then((result) => {
        console.log("Signed in:", result.user);
        setUserinfo(result.user);
      })
      .catch((error) => {
        console.error("Sign-in error:", error);
      });
  };

  const handlerSignout = () => {
    const auth = getAuth(app);
    signOut(auth)
      .then(() => {
        console.log("User signed out.");
        setUserinfo(null);
      })
      .catch((error) => {
        console.error("Sign-out error:", error);
      });
  };

  return (
    <div>
      <div>
        {userInfo ? (
          <div>
            <img src={userInfo.photoURL} alt="user photo" width="100" />
            <h2>{userInfo.displayName}</h2>
            <h4>{userInfo.email}</h4>
            <button onClick={handlerSignout}>Sign out</button>
          </div>
        ) : (
          <>
            <p>No user signed in</p>
            <button onClick={handlerButton}>Sign in with GitHub</button>
          </>
        )}
      </div>
    </div>
  );
}
