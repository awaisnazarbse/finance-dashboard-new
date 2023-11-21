import { db } from "../config/firebase";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";

// Add New COG
const addOfferCOG = async (data) => {
  const cogRef = collection(db, "offers-cog");
  const q = query(cogRef, where("offer_id", "==", data?.offer_id));
  const res = await getDocs(q);
  if (res?.docs.length > 0) {
    // let cog = 0;
    // res.docs.forEach((doc) => {
    //   cog += doc.data()?.cog;
    // });

    // cog += data?.cog;

    const ref = doc(db, "offers-cog", res?.docs[0]?.id);
    await setDoc(ref, { ...data, cog: data?.cog }, { merge: true });
  } else {
    const ref = doc(db, "offers-cog", uuidv4());
    await setDoc(ref, data, { merge: true });
  }
  return data;
};

const changeCogType = async (offer_id, cogType) => {
  const cogRef = collection(db, "offers-cog");
  const q = query(cogRef, where("offer_id", "==", offer_id));
  const res = await getDocs(q);
  if (res?.docs.length > 0) {
    // let cog = 0;
    // res.docs.forEach((doc) => {
    //   cog += doc.data()?.cog;
    // });

    // cog += data?.cog;

    const ref = doc(db, "offers-cog", res?.docs[0]?.id);
    await setDoc(ref, { cogType }, { merge: true });
  } else {
    const ref = doc(db, "offers-cog", uuidv4());
    await setDoc(ref, { cogType }, { merge: true });
  }
  return offer_id;
};

const getAllOffersCOG = async () => {
  const ref = collection(db, "offers-cog");
  const q = query(ref, where("cogType", "==", "By period batch"))
  const res = await getDocs(q);
  const data = res.docs.map((e) => {
    return {
      ...e.data(),
      id: e.id,
    };
  });

  return data;
};

// Get Offer COG
const getOfferCOG = async (offer_id) => {
  // console.log("offer_id",offer_id);
  const ref = collection(db, "offers-cog");
  const q = query(ref, where("offer_id", "==", offer_id));
  const res = await getDocs(q);
  // let cog = 0;
  // res.docs.forEach((doc) => {
  //   if (doc.data()?.cog) cog += doc.data()?.cog;
  // });
  return res.docs[0]?.data()?.cog ? res.docs[0]?.data()?.cog : 0;
};
const getOfferCOGWithType = async (offer_id) => {
  // console.log("offer_id",offer_id);
  const ref = collection(db, "offers-cog");
  const q = query(ref, where("offer_id", "==", offer_id));
  const res = await getDocs(q);
  // let cog = 0;
  // res.docs.forEach((doc) => {
  //   if (doc.data()?.cog) cog += doc.data()?.cog;
  // });
  return res.docs[0]?.data() ? { ...res.docs[0]?.data() } : { cog: 0 };
};

const getOfferCOGByTitle = async (title) => {
  // console.log("offer_id",offer_id);
  const ref = collection(db, "offers-cog");
  const q = query(ref, where("title", "==", title));
  const res = await getDocs(q);
  let cog = 0;
  res.docs.forEach((doc) => {
    if (doc.data()?.cog) cog += doc.data()?.cog;
  });
  return cog;
};
const getOfferCOGByOfferId = async (offerId) => {
  // console.log("offer_id",offer_id);
  const ref = collection(db, "offers-cog");
  const q = query(ref, where("offer_id", "==", offerId));
  const res = await getDocs(q);
  let cog = 0;
  res.docs.forEach((doc) => {
    if (doc.data()?.cog) cog += doc.data()?.cog;
  });
  return cog;
};

const getOfferCOGs = async () => {
  const ref = collection(db, "offers-cog");
  const res = await getDocs(ref);
  let cog = 0;
  res.docs.forEach((doc) => {
    // console.log("cog in map", doc.data()?.cog);
    if (doc.data()?.cog) {
      cog += Number(doc.data()?.cog);
    }
  });
  console.log("cogs in function", cog);
  return cog;
};

const getOfferCOGsByOfferIds = async (offerIds) => {
  const ref = collection(db, "offers-cog");
  const q = query(ref, where("offer_id", "in", offerIds));
  const res = await getDocs(q);
  let cog = 0;
  res.docs.forEach((doc) => {
    // console.log("cog in map", doc.data()?.cog);
    if (doc.data()?.cog) {
      cog += Number(doc.data()?.cog);
    }
  });
  // console.log("cogs in function", cog);
  return cog;
};

const updateSupplierOrderSettings = async (data) => {
  console.log("data in update api", data);
  if (data?.applyToAll) {
    const applyToAllRef = collection(db, "supplier-order-settings");
    const applyToAllQuery = query(
      applyToAllRef,
      where("applyToAll", "==", true)
    );
    const applyToAllRes = await getDocs(applyToAllQuery);
    if (applyToAllRes.empty) {
      const getRef = collection(db, "supplier-order-settings");
      const getRes = await getDocs(getRef);
      //Deleting all existing docs because applyToAll is true, so this data will applied on all offers automatically, so no need of individual offers data
      await Promise.all(
        getRes.docs.map(async (e) => {
          const delRefAll = doc(db, "supplier-order-settings", e.id);
          await deleteDoc(delRefAll);
        })
      );

      //create new
      const createRef = doc(db, "supplier-order-settings", uuidv4());
      await setDoc(
        createRef,
        {
          daysAfterNewOrder: data?.daysAfterNewOrder,
          buffer: data?.buffer,
          supplierSku: data?.supplierSku,
          applyToAll: data?.applyToAll,
        },
        { merge: true }
      );
    } else {
      const getRef = collection(db, "supplier-order-settings");
      const getRes = await getDocs(getRef);
      //Deleting all existing docs because applyToAll is true, so this data will applied on all offers automatically, so no need of individual offers data
      await Promise.all(
        getRes.docs.map(async (e) => {
          const delRefAll = doc(db, "supplier-order-settings", e.id);
          await deleteDoc(delRefAll);
        })
      );

      //create new doc with applyToAll true
      const createRef = doc(db, "supplier-order-settings", uuidv4());
      await setDoc(
        createRef,
        {
          daysAfterNewOrder: data?.daysAfterNewOrder,
          buffer: data?.buffer,
          supplierSku: data?.supplierSku,
          applyToAll: data?.applyToAll,
        },
        { merge: true }
      );
    }
  } else {
    //Create individual record for offer
    const ref = collection(db, "supplier-order-settings");
    const q = query(ref, where("offer_id", "==", data?.offer_id));
    const res = await getDocs(q);
    if (res.empty) {
      //create new
      const createRef = doc(db, "supplier-order-settings", uuidv4());
      await setDoc(createRef, data, { merge: true });
    } else {
      //update here
      const updateRef = doc(db, "supplier-order-settings", data?.id);
      await setDoc(updateRef, data, { merge: true });
    }
  }

  return data;
};

const updateManufacturingAndLogisticsSettings = async (data) => {
  console.log("data in update api", data);
  if (data?.applyToAll) {
    const applyToAllRef = collection(db, "manufacturing-settings");
    const applyToAllQuery = query(
      applyToAllRef,
      where("applyToAll", "==", true)
    );
    const applyToAllRes = await getDocs(applyToAllQuery);
    if (applyToAllRes.empty) {
      const getRef = collection(db, "manufacturing-settings");
      const getRes = await getDocs(getRef);
      //Deleting all existing docs because applyToAll is true, so this data will applied on all offers automatically, so no need of individual offers data
      await Promise.all(
        getRes.docs.map(async (e) => {
          const delRefAll = doc(db, "manufacturing-settings", e.id);
          await deleteDoc(delRefAll);
        })
      );

      //create new
      const createRef = doc(db, "manufacturing-settings", uuidv4());
      await setDoc(
        createRef,
        {
          manufacturingTime: data?.manufacturingTime,
          shippingToPrepCenter: data?.shippingToPrepCenter,
          shippingToFba: data?.shippingToFba,
          applyToAll: data?.applyToAll,
        },
        { merge: true }
      );
    } else {
      const getRef = collection(db, "manufacturing-settings");
      const getRes = await getDocs(getRef);
      //Deleting all existing docs because applyToAll is true, so this data will applied on all offers automatically, so no need of individual offers data
      await Promise.all(
        getRes.docs.map(async (e) => {
          const delRefAll = doc(db, "manufacturing-settings", e.id);
          await deleteDoc(delRefAll);
        })
      );

      //create new doc with applyToAll true
      const createRef = doc(db, "manufacturing-settings", uuidv4());
      await setDoc(
        createRef,
        {
          manufacturingTime: data?.manufacturingTime,
          shippingToPrepCenter: data?.shippingToPrepCenter,
          shippingToFba: data?.shippingToFba,
          applyToAll: data?.applyToAll,
        },
        { merge: true }
      );
    }
  } else {
    //Create individual record for offer
    const ref = collection(db, "manufacturing-settings");
    const q = query(ref, where("offer_id", "==", data?.offer_id));
    const res = await getDocs(q);
    if (res.empty) {
      //create new
      const createRef = doc(db, "manufacturing-settings", uuidv4());
      await setDoc(createRef, data, { merge: true });
    } else {
      //update here
      const updateRef = doc(db, "manufacturing-settings", data?.id);
      await setDoc(updateRef, data, { merge: true });
    }
  }

  return data;
};

const updateDimensionsSettings = async (data) => {
  console.log("data in update api", data);
  if (data?.applyToAll) {
    const applyToAllRef = collection(db, "dimensions-settings");
    const applyToAllQuery = query(
      applyToAllRef,
      where("applyToAll", "==", true)
    );
    const applyToAllRes = await getDocs(applyToAllQuery);
    if (applyToAllRes.empty) {
      const getRef = collection(db, "dimensions-settings");
      const getRes = await getDocs(getRef);
      //Deleting all existing docs because applyToAll is true, so this data will applied on all offers automatically, so no need of individual offers data
      await Promise.all(
        getRes.docs.map(async (e) => {
          const delRefAll = doc(db, "dimensions-settings", e.id);
          await deleteDoc(delRefAll);
        })
      );

      //create new
      const createRef = doc(db, "dimensions-settings", uuidv4());
      await setDoc(
        createRef,
        {
          unitsPerBox: data?.unitsPerBox,
          boxLength: data?.boxLength,
          boxWidth: data?.boxWidth,
          boxHeight: data?.boxHeight,
          color: data?.color,
          size: data?.size,
          applyToAll: data?.applyToAll,
        },
        { merge: true }
      );
    } else {
      const getRef = collection(db, "dimensions-settings");
      const getRes = await getDocs(getRef);
      //Deleting all existing docs because applyToAll is true, so this data will applied on all offers automatically, so no need of individual offers data
      await Promise.all(
        getRes.docs.map(async (e) => {
          const delRefAll = doc(db, "dimensions-settings", e.id);
          await deleteDoc(delRefAll);
        })
      );

      //create new doc with applyToAll true
      const createRef = doc(db, "dimensions-settings", uuidv4());
      await setDoc(
        createRef,
        {
          unitsPerBox: data?.unitsPerBox,
          boxLength: data?.boxLength,
          boxWidth: data?.boxWidth,
          boxHeight: data?.boxHeight,
          color: data?.color,
          size: data?.size,
          applyToAll: data?.applyToAll,
        },
        { merge: true }
      );
    }
  } else {
    //Create individual record for offer
    const ref = collection(db, "dimensions-settings");
    const q = query(ref, where("offer_id", "==", data?.offer_id));
    const res = await getDocs(q);
    if (res.empty) {
      //create new
      const createRef = doc(db, "dimensions-settings", uuidv4());
      await setDoc(createRef, data, { merge: true });
    } else {
      //update here
      const updateRef = doc(db, "dimensions-settings", data?.id);
      await setDoc(updateRef, data, { merge: true });
    }
  }

  return data;
};

const getProductSettings = async (offer_id) => {
  const data = {
    supplierOrderData: null,
    manufacturingAndLogistics: null,
    dimensions: null,
  };

  //Getting supplier order settings
  const supplierOrderRef = collection(db, "supplier-order-settings");
  const supplierOrderQuery = query(
    supplierOrderRef,
    where("offer_id", "==", offer_id)
  );
  const supplierOrderRes = await getDocs(supplierOrderQuery);
  if (!supplierOrderRes.empty) {
    data.supplierOrderData = {
      ...supplierOrderRes.docs[0]?.data(),
      id: supplierOrderRes.docs[0]?.id,
    };
  } else {
    const applyToAllRef = collection(db, "supplier-order-settings");
    const applyToAllQuery = query(
      applyToAllRef,
      where("applyToAll", "==", true)
    );
    const applyToAllRes = await getDocs(applyToAllQuery);
    if (!applyToAllRes.empty) {
      data.supplierOrderData = {
        ...applyToAllRes.docs[0]?.data(),
        id: applyToAllRes.docs[0]?.id,
      };
    }
  }

  //Getting manufacturing and logistics settings
  const manufacturingAndLogisticsRef = collection(db, "manufacturing-settings");
  const manufacturingAndLogisticsQuery = query(
    manufacturingAndLogisticsRef,
    where("offer_id", "==", offer_id)
  );
  const manufacturingAndLogisticsRes = await getDocs(
    manufacturingAndLogisticsQuery
  );
  if (!manufacturingAndLogisticsRes.empty) {
    data.manufacturingAndLogistics = {
      ...manufacturingAndLogisticsRes.docs[0]?.data(),
      id: manufacturingAndLogisticsRes.docs[0]?.id,
    };
  } else {
    const applyToAllRef = collection(db, "manufacturing-settings");
    const applyToAllQuery = query(
      applyToAllRef,
      where("applyToAll", "==", true)
    );
    const applyToAllRes = await getDocs(applyToAllQuery);
    if (!applyToAllRes.empty) {
      data.manufacturingAndLogistics = {
        ...applyToAllRes.docs[0]?.data(),
        id: applyToAllRes.docs[0]?.id,
      };
    }
  }

  //Getting dimensions settings
  const dimensionsRef = collection(db, "dimensions-settings");
  const dimensionsQuery = query(
    dimensionsRef,
    where("offer_id", "==", offer_id)
  );
  const dimensionsRes = await getDocs(dimensionsQuery);
  if (!dimensionsRes.empty) {
    data.dimensions = {
      ...dimensionsRes.docs[0]?.data(),
      id: dimensionsRes.docs[0]?.id,
    };
  } else {
    const applyToAllRef = collection(db, "dimensions-settings");
    const applyToAllQuery = query(
      applyToAllRef,
      where("applyToAll", "==", true)
    );
    const applyToAllRes = await getDocs(applyToAllQuery);
    if (!applyToAllRes.empty) {
      data.dimensions = {
        ...applyToAllRes.docs[0]?.data(),
        id: applyToAllRes.docs[0]?.id,
      };
    }
  }

  return data;
};

const getManufacturingAndLogistics = async () => {
  const ref = collection(db, "manufacturing-settings");
  const res = await getDocs(ref);

  let data = [];
  res.docs.forEach((doc) => {
    data.push({
      ...doc.data(),
      id: doc.id,
    });
  });

  return data;
};

const getSupplierOrderSettings = async () => {
  const ref = collection(db, "supplier-order-settings");
  const res = await getDocs(ref);

  let data = [];
  res.docs.forEach((doc) => {
    data.push({
      ...doc.data(),
      id: doc.id,
    });
  });

  return data;
};

const offersApi = {
  addOfferCOG,
  getOfferCOG,
  getOfferCOGs,
  updateSupplierOrderSettings,
  updateManufacturingAndLogisticsSettings,
  updateDimensionsSettings,
  getOfferCOGWithType,
  getProductSettings,
  getAllOffersCOG,
  getManufacturingAndLogistics,
  getSupplierOrderSettings,
  getOfferCOGByTitle,
  getOfferCOGsByOfferIds,
  changeCogType,
  getOfferCOGByOfferId,
};

export default offersApi;
