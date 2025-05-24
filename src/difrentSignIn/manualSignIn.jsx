import { useState } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import app from "../Firebase/firebase";
import styles from "./manualSignin.module.css";

export default function ManualSignin() {
  const auth = getAuth(app);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignin = async (e) => {
    e.preventDefault();
    setError("");

    console.log({ email, password });
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log("Signed in user:", userCredential.user);
        alert("Login successful!");
      })
      .catch((err) => {
        console.error("Sign-in error:", err.message);
        setError("Invalid email or password.");
      });
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Manual Sign In</h2>
      <form onSubmit={handleSignin}>
        <div className={styles.inputGroup}>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className={styles.inputGroup}>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button className={styles.button} type="submit">
          Sign In
        </button>

        {error && <p className={styles.error}>{error}</p>}
      </form>
    </div>
  );
}
