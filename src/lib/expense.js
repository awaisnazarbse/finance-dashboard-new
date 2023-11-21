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

// Add New Expense
const addExpense = async (data) => {
  const ref = doc(db, "expenses", uuidv4());
  await setDoc(ref, data, { merge: true });
  const getRef = doc(db, "expenses", ref.id);
  const res = await getDoc(getRef);
  return res.data();
};

// Get All Expenses
const getExpenses = async () => {
  const ref = collection(db, "expenses");
  const res = await getDocs(ref);
  let docs = [];
  if (res.docs.length <= 0) {
    return [];
  } else {
    res.forEach((doc) => {
      docs.push({
        ...doc.data(),
        id: doc.id,
      });
    });
    // console.log("docs", docs);
    return docs;
  }
};

// Get All Expenses by date
const getExpensesByDate = async (date) => {
  const ref = collection(db, "expenses");
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

// Get All Expenses by date range
const getExpensesByDateRange = async (range) => {
  const ref = collection(db, "expenses");
  const res = await getDocs(ref);
  let docs = [];
  console.log("range....", range)
  res.docs.forEach((doc) => {
    if (
      new Date(doc.data().date) <= new Date(range?.start) &&
      new Date(doc.data().date) <= new Date(range?.end) &&
      new Date(doc.data().endDate) >= new Date(range?.start)
    ) {
      docs.push({
        ...doc.data(),
        id: doc.id,
      });
    }
  });
  return docs;
};

const getExpensesByDateRangeWithByCategories = async (range) => {
  const ref = collection(db, "expenses");
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

  const groupedExpenses = {};
  let otherExpenses = 0;

  // Iterate through the expense objects
  docs?.forEach((expense) => {
    const { totalExpense, category } = expense;
    if (category) {
      // Iterate through the categories of the expense
      category?.forEach((category) => {
        if (groupedExpenses[category]) {
          groupedExpenses[category] += totalExpense;
        } else {
          groupedExpenses[category] = totalExpense;
        }
      });
    } else {
      otherExpenses += totalExpense;
    }
  });
  groupedExpenses["Other"] = otherExpenses;

  return { data: docs, categoriesExpenses: groupedExpenses };
};

// Update Expense
const updateExpense = async (id, expense) => {
  const ref = doc(db, "expenses", id);
  await setDoc(ref, expense, { merge: true });
  return {
    ...expense,
    id,
  };
};

// Delete Expense
const deleteExpense = async (id) => {
  const ref = doc(db, "expenses", id);
  await deleteDoc(ref);
  return id;
};

const expensesApi = {
  addExpense,
  getExpenses,
  updateExpense,
  deleteExpense,
  getExpensesByDate,
  getExpensesByDateRange,
  getExpensesByDateRangeWithByCategories,
};

export default expensesApi;
