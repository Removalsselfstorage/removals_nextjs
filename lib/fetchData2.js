// import { db, storage } from "@/firebase";
// import { collection, query, where, getDocs } from "firebase/firestore";

// export const FetchMoverDetail2 = async () => {
//   const moverDetailsRef = collection(db, "movers");
//   const q = query(moverDetailsRef);
//   const querySnapshot = await getDocs(q);

//   const results = querySnapshot.docs.map((doc) => ({
//     ...doc.data(),
//     id: doc.id,
//   }));

//   return results;
// };

import { db, storage } from "@/firebase";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  getDoc,
} from "firebase/firestore";

export const fetchMoverDetails3 = async (uid) => {
  const moversDataRef = doc(db, "moversData", uid);

  const docSnap = await getDoc(moversDataRef);

  return docSnap.data();
};

export const fetchMoversDetails = async (uid) => {
  const moversDataRef = doc(db, "moversDetails", uid);

  const docSnap = await getDoc(moversDataRef);

  return docSnap.data();
};
export const fetchMoversCompanyPix = async (uid) => {
  const moversDataRef = doc(db, "moversCompanyPix", uid);

  const docSnap = await getDoc(moversDataRef);

  return docSnap.data();
};
export const fetchMoversRegCertificate = async (uid) => {
  const moversDataRef = doc(db, "moversRegCertificate", uid);

  const docSnap = await getDoc(moversDataRef);

  return docSnap.data();
};
export const fetchMoversVehInsurance = async (uid) => {
  const moversDataRef = doc(db, "moversVehInsurance", uid);

  const docSnap = await getDoc(moversDataRef);

  return docSnap.data();
};
export const fetchMoversPubInsurance = async (uid) => {
  const moversDataRef = doc(db, "moversPubInsurance", uid);

  const docSnap = await getDoc(moversDataRef);

  return docSnap.data();
};
export const fetchMoversTranInsurance = async (uid) => {
  const moversDataRef = doc(db, "moversTranInsurance", uid);

  const docSnap = await getDoc(moversDataRef);

  return docSnap.data();
};
export const fetchMoversDrivingLicense = async (uid) => {
  const moversDataRef = doc(db, "moversDrivingLicense", uid);

  const docSnap = await getDoc(moversDataRef);

  return docSnap.data();
};

// import { db, storage } from "@/firebase";
// import { collection, query, where, getDocs, doc, getDoc, onSnapshot } from "firebase/firestore";
