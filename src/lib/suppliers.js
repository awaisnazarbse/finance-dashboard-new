import { db } from "../config/firebase";
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";

// Add New Supplier
const addSupplier = async (data) => {
  const ref = doc(db, "suppliers", uuidv4());
  await setDoc(ref, data, { merge: true });
  return data;
};

// Get All Suppliers
const getSuppliers = async (user) => {
  const ref = collection(db, "suppliers");
  const q = query(ref, where("user", "==", user))
  const res = await getDocs(q);
  console.log("response in api", res.docs);
  let docs = [];
  if (res.docs.length <= 0) {
    return [];
  } else {
    res.docs.forEach((doc) => {
      docs.push({
        ...doc.data(),
        id: doc.id,
      });
    });
    console.log("docs", docs);
    return docs;
  }
};

// Get All Suppliers by date
const getSuppliersByDate = async (date) => {
  const ref = collection(db, "suppliers");
  const q = query(ref, where("date", "==", date));
  const res = await getDocs(q);
  let docs = [];
  if (res.docs.length <= 0) {
    return [];
  } else {
    res.forEach((doc) => {
      docs.push({ ...doc.data(), id: doc.id });
    });
    return docs;
  }
};

// Get All Suppliers by date range
const getSuppliersByDateRange = async (range) => {
  const ref = collection(db, "suppliers");
  const res = await getDocs(ref);
  let docs = [];
  res.docs.forEach((doc) => {
    if (
      new Date(doc.data().date) >= new Date(range?.start) &&
      new Date(doc.data().date) <= new Date(range?.end)
    ) {
      docs.push({
        ...doc.data(),
        id: doc.id,
      });
    }
  });
  return docs;
};

// Update Supplier
const updateSupplier = async (id, supplier) => {
  const ref = doc(db, "suppliers", id);
  await setDoc(ref, supplier, { merge: true });
  return {
    ...supplier,
    id,
  };
};

// Delete Supplier
const deleteSupplier = async (id) => {
  const ref = doc(db, "suppliers", id);
  await deleteDoc(ref);
  return id;
};

const suppliersApi = {
  addSupplier,
  getSuppliers,
  updateSupplier,
  deleteSupplier,
  getSuppliersByDate,
  getSuppliersByDateRange,
};

export default suppliersApi;
