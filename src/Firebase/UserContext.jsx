import { createContext, useContext, useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const auth = getAuth();

  useEffect(() => {
    // const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    // if (isLoggedIn) {
    //   setUser(true);
    //   setLoading(false); // loading time komaite ai localstorage use
    // }
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
      // localStorage.setItem("isLoggedIn", !!user);
    });

    return () => unsubscribe();
  }, [auth]);

  const refreshUser = async () => {
    if (auth.currentUser) {
      await auth.currentUser.reload();
      setUser(auth.currentUser);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, refreshUser }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

//for acces context ata jekhane use sekhaneo leka jay
export function UserContextAuth() {
  return useContext(AuthContext);
}
