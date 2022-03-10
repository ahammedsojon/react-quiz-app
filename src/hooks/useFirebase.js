import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { useEffect, useState } from "react";
import initializeAuthentication from "../firebase/firebase.init";

initializeAuthentication();

const useFirebase = () => {
  const [currentUser, setCurrentUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const auth = getAuth();

  // current signed in user
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
      } else {
        setCurrentUser(user);
      }
      setLoading(false);
    });
    return () => unsubscribe;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // signup function
  const signupUser = (email, password, username, history) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setLoading(true);
        setCurrentUser({ displayName: username });
        updateProfile(auth.currentUser, { displayName: username });
        setError("");
        history.push("/");
      })
      .catch((error) => {
        setError(error.message);
      })
      .finally(() => setLoading(false));
  };

  // login function
  const loginUser = (email, password, history) => {
    setLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setError("");
        history.push("/");
      })
      .catch((error) => {
        setError(error.message);
      })
      .finally(() => setLoading(false));
  };

  // login function
  const logoutUser = () => {
    return signOut(auth);
  };

  return {
    currentUser,
    loading,
    signupUser,
    loginUser,
    logoutUser,
    error,
    setError,
  };
};

export default useFirebase;
