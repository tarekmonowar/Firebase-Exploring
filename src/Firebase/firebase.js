import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC95d_WzU3kRRS09Pql7h35oFNJyAi6OnM",
  authDomain: "fir-explore-5ddd9.firebaseapp.com",
  projectId: "fir-explore-5ddd9",
  storageBucket: "fir-explore-5ddd9.firebasestorage.app",
  messagingSenderId: "616038536034",
  appId: "1:616038536034:web:f083e266345c478c78523b",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default auth;
