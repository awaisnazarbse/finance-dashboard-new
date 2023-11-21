import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA89c389Niv0lChfhnhwUNadwBfpm0CMuU",
  authDomain: "finance-dashboard-93cc2.firebaseapp.com",
  projectId: "finance-dashboard-93cc2",
  storageBucket: "finance-dashboard-93cc2.appspot.com",
  messagingSenderId: "133977177653",
  appId: "1:133977177653:web:316f26aa5204e011643b7c",
  // apiKey: "AIzaSyCClOyd_BpTwTL32YK5LBd9t7sHSGskBzU",
  // authDomain: "finance-new-6472d.firebaseapp.com",
  // projectId: "finance-new-6472d",
  // storageBucket: "finance-new-6472d.appspot.com",
  // messagingSenderId: "798327369869",
  // appId: "1:798327369869:web:7954acdab7a1a257c0b2c4"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);
