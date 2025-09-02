import { createContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile as firebaseUpdateProfile
} from "firebase/auth";
import PropTypes from "prop-types";
import { app } from "../Firebase/firebase.config";

export const AuthContext = createContext(null);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

const AuthProviders = ({ children }) => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      setLoading(false);

      if (currentUser) {
        // Get user token for future API calls
        try {
          const token = await currentUser.getIdToken();
          localStorage.setItem("access-token", token);
          
          // You can implement role fetching here if you have a backend
          // For now, setting default role
          setRole("user");
        } catch (error) {
          console.error("Error getting user token:", error);
          setRole(null);
        }
      } else {
        setRole(null);
        localStorage.removeItem("access-token");
      }
    });

    return () => unsubscribe();
  }, []);

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const updateProfile = (name, photoUrl) => {
    return firebaseUpdateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photoUrl,
    });
  };

  const logIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const signInWithGoogle = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  const logOut = () => {
    setLoading(true);
    return signOut(auth)
      .then(() => {
        setRole(null);
        setUser(null);
        localStorage.removeItem("access-token");
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  };

  const authInfo = {
    user,
    role,
    loading,
    createUser,
    updateProfile,
    logIn,
    signInWithGoogle,
    logOut,
  };

  return (
    <AuthContext.Provider value={authInfo}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProviders.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthProviders;