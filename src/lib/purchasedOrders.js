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

const getTotalCost = (products) => {
  let totalCost = 0;
  products?.forEach((e) => {
    let thisCost = Number(e?.unitsOrdered) * Number(e?.totalCostPerUnit);
    totalCost += Number(thisCost);
  });
  return totalCost;
};

const getTotalUnits = (products) => {
  let totalUnits = 0;
  products?.forEach((e) => {
    totalUnits += Number(e?.unitsOrdered);
  });
  return totalUnits;
};

// Add New Purchased Order
const addPurchasedOrder = async (data) => {
  const ref = doc(db, "purchased-orders", uuidv4());
  await setDoc(ref, data, { merge: true });
  return data;
};

// Get All PurchasedOrders
const getPurchasedOrders = async (user, filters) => {
  const ref = collection(db, "purchased-orders");
  const status = filters?.status === "All statuses" ? null : filters?.status;
  const marketplace =
    filters?.marketplace === "All marketplaces" ? null : filters?.marketplace;
  const supplier =
    filters?.supplier === "All suppliers" ? null : filters?.supplier;
  let q = query(ref, where("user", "==", user));
  if (status) {
    q = query(q, where("status", "==", status));
  }
  if (marketplace) {
    q = query(q, where("marketplace", "==", marketplace));
  }
  if (supplier) {
    q = query(q, where("supplier", "==", supplier));
  }

  const res = await getDocs(q);
  console.log("response in api", res.docs);
  let docs = [];
  if (res.docs.length <= 0) {
    return [];
  } else {
    let draftData = {
      poCount: 0,
      totalUnits: 0,
      totalCost: 0,
    };
    let orderedData = {
      poCount: 0,
      totalUnits: 0,
      totalCost: 0,
    };
    let shippedData = {
      poCount: 0,
      totalUnits: 0,
      totalCost: 0,
    };
    res.docs.forEach((doc) => {
      if (doc.data()?.status === "Draft") {
        draftData.poCount += 1;
        draftData.totalUnits += getTotalUnits(doc.data()?.products);
        draftData.totalCost += getTotalCost(doc.data()?.products);
      } else if (doc.data()?.status === "Ordered") {
        orderedData.poCount += 1;
        orderedData.totalUnits += getTotalUnits(doc.data()?.products);
        orderedData.totalCost += getTotalCost(doc.data()?.products);
      } else if (doc.data()?.status === "Shipped") {
        shippedData.poCount += 1;
        shippedData.totalUnits += getTotalUnits(doc.data()?.products);
        shippedData.totalCost += getTotalCost(doc.data()?.products);
      }
      docs.push({
        ...doc.data(),
        date: doc.data()?.date?.toDate(),
        estimatedArrivalDate: doc.data()?.estimatedArrivalDate?.toDate(),
        id: doc.id,
      });
    });
    console.log("docs", docs);
    return { docs, orderedData, shippedData, draftData };
  }
};

// Get All PurchasedOrders by date
const getPurchasedOrdersByDate = async (date) => {
  const ref = collection(db, "purchased-orders");
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

// Get All PurchasedOrders by date range
const getPurchasedOrdersByDateRange = async (range) => {
  const ref = collection(db, "purchased-orders");
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
};

const getPurchasedOrder = async (id) => {
  const ref = doc(db, "purchased-orders", id);
  const res = await getDoc(ref);
  return { ...res.data(), id: res.id };
};

const getPurchasedOrderByStatus = async (status) => {
  const ref = collection(db, "purchased-orders");
  const q = query(ref, where("status", "==", status));
  const res = await getDocs(q);
  const data = [];
  res.docs?.forEach((doc) => {
    data.push({
      ...doc.data(),
      id: doc.id,
    });
  });
  return data;
};

// Update PurchasedOrder
const updatePurchasedOrder = async (id, purchasedOrder) => {
  console.log("data in api", { id, purchasedOrder });
  const ref = doc(db, "purchased-orders", id);
  await setDoc(ref, purchasedOrder, { merge: true });
  return {
    ...purchasedOrder,
    id,
  };
};

// Delete PurchasedOrder
const deletePurchasedOrder = async (id) => {
  const ref = doc(db, "purchased-orders", id);
  await deleteDoc(ref);
  return id;
};

const purchasedOrdersApi = {
  addPurchasedOrder,
  getPurchasedOrders,
  updatePurchasedOrder,
  deletePurchasedOrder,
  getPurchasedOrdersByDate,
  getPurchasedOrdersByDateRange,
  getPurchasedOrder,
  getPurchasedOrderByStatus
};

export default purchasedOrdersApi;
