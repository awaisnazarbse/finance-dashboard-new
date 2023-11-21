import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../config/firebase";
import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";

// Update User
const updateUser = async (id, data) => {
  const ref = doc(db, "users", id);
  await setDoc(ref, data, { merge: true });
  return {
    ...data,
    id,
  };
};

// Update User Avatar
const updateUserAvatar = async (id, url) => {
  const ref = doc(db, "users", id);
  await setDoc(ref, { img: url }, { merge: true });
  return {
    ...url,
    id,
  };
};

// Switch User API Status
const switchAPIStatus = async (data) => {
  const ref = doc(db, "takealot-apis", data?.id);
  await setDoc(ref, { active: data?.active }, { merge: true });
  return data;
};

// Get User API Keys
const getUserAPIKeys = async (uid) => {
  const ref = collection(db, "takealot-apis");
  const q = query(ref, where("user", "==", uid));
  const res = await getDocs(q);
  let keys = [];
  res?.docs.forEach((doc) => {
    keys.push({ id: doc.id, ...doc?.data() });
  });
  return keys;
};

// Get User API Keys Active
const getActiveUserAPIKeys = async (uid) => {
  const ref = collection(db, "takealot-apis");
  const q = query(ref, where("user", "==", uid), where("active", "==", true));
  const res = await getDocs(q);
  let keys = [];
  res?.docs.forEach((doc) => {
    keys.push({ id: doc.id, ...doc?.data() });
  });
  return keys;
};

const userApi = {
  updateUser,
  updateUserAvatar,
  getUserAPIKeys,
  switchAPIStatus,
  getActiveUserAPIKeys,
};

export default userApi;
