import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
} from "firebase/auth";
import app from "../Firebase/firebase";
import { useState } from "react";

function SigninwithGoogl() {
  const [user, setUser] = useState(null);

  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();

  const handlerButton = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        console.log("Signed in:", result.user);
        setUser(result.user);
      })
      .catch((error) => {
        console.error("Sign-in error:", error);
      });
  };

  const handlerSignout = () => {
    signOut(auth)
      .then(() => {
        setUser(null);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      {user ? (
        <div>
          <img src={user.photoURL} alt="user photo" />
          <h2>{user.displayName}</h2>
          <h4>{user.email}</h4>
        </div>
      ) : (
        <p>No user signed in</p>
      )}
      {user ? (
        <button onClick={handlerSignout}>Sign out</button>
      ) : (
        <button onClick={handlerButton}>Sign in with Google</button>
      )}
    </div>
  );
}

export default SigninwithGoogl;
