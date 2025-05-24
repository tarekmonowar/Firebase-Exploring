import { FacebookAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import app from "../Firebase/firebase";

export default function signinWithFacebook() {
  const provider = new FacebookAuthProvider();

  const handlerButton = () => {
    const auth = getAuth(app);
    signInWithPopup(auth, provider)
      .then((result) => {
        console.log("Signed in:", result.user);
        // setUser(result.user);
      })
      .catch((error) => {
        console.error("Sign-in error:", error);
      });
  };
  return (
    <div>
      <button onClick={handlerButton}>sign in With Facebook</button>
    </div>
  );
}
