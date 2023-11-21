import Loader from "@/components/utils/Loader";
import { auth, db } from "@/config/firebase";
import {
  GoogleAuthProvider,
  OAuthProvider,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useRouter } from "next/router";

const { createContext, useContext, useEffect, useState } = require("react");

const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext);

export const AuthContextProvider = ({ children }) => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const ref = doc(db, "users", user.uid);
        const res = await getDoc(ref);
        setUser({
          uid: user.uid,
          ...res.data(),
        });
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = async (email, password) => {
    const data = await signInWithEmailAndPassword(auth, email, password);
    const ref = doc(db, "users", data?.user?.uid);
    const res = await getDoc(ref);
    return { ...res.data(), id: data?.user?.uid };
  };

  const signUp = async (values) => {
    await createUserWithEmailAndPassword(auth, values.email, values.password)
      .then(async (userCredential) => {
        const user = userCredential.user;
        const userRef = doc(db, "users", user.uid);
        const data = {
          firstName: values?.firstName,
          lastName: values?.lastName,
          email: values?.email,
          apiKey: values?.apiKey,
        };
        await setDoc(userRef, data, { merge: true });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  };

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const userRef = doc(db, "users", user.uid);
      await setDoc(
        userRef,
        {
          email: user?.email,
          name: user?.displayName,
          img: user?.photoURL,
        },
        { merge: true }
      );
    } catch (error) {
      console.error(error);
    }
  };

  const signInWithYahoo = async () => {
    const provider = new OAuthProvider("yahoo.com");
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const userRef = doc(db, "users", user.uid);
      await setDoc(
        userRef,
        {
          email: user?.email,
          name: user?.displayName,
          img: user?.photoURL,
        },
        { merge: true }
      );
    } catch (error) {
      console.error(error);
    }
  };

  const logout = async () => {
    setUser(null);
    await signOut(auth);
  };

  return (
    <AuthContext.Provider
      value={{ user, login, signUp, logout, signInWithGoogle, signInWithYahoo }}
    >
      {loading ? <Loader /> : children}
    </AuthContext.Provider>
  );
};
