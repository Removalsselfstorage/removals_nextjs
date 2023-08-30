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


export const fetchAllMoversDetailsArray = async () => {
  const moversDataRefMD = collection(db, "moversData");
  const docSnapMD = query(moversDataRefMD);
  const querySnapshotMD = await getDocs(docSnapMD);
  const resultsMD = querySnapshotMD.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));

  const moversDataRefCD = collection(db, "moversDetails");
  const docSnapCD = query(moversDataRefCD);
  const querySnapshotCD = await getDocs(docSnapCD);
  const resultsCD = querySnapshotCD.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));

  const moversDataRefCP = collection(db, "moversCompanyPix");
  const docSnapCP = query(moversDataRefCP);
  const querySnapshotCP = await getDocs(docSnapCP);
  const resultsCP = querySnapshotCP.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));

  const moversDataRefRC = collection(db, "moversRegCertificate");
  const docSnapRC = query(moversDataRefRC);
  const querySnapshotRC = await getDocs(docSnapRC);
  const resultsRC = querySnapshotRC.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));

  const moversDataRefVI = collection(db, "moversVehInsurance");
  const docSnapVI = query(moversDataRefVI);
  const querySnapshotVI = await getDocs(docSnapVI);
  const resultsVI = querySnapshotVI.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));

  const moversDataRefPI = collection(db, "moversPubInsurance");
  const docSnapPI = query(moversDataRefPI);
  const querySnapshotPI = await getDocs(docSnapPI);
  const resultsPI = querySnapshotPI.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));

  const moversDataRefTI = collection(db, "moversTranInsurance");
  const docSnapTI = query(moversDataRefTI);
  const querySnapshotTI = await getDocs(docSnapTI);
  const resultsTI = querySnapshotTI.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));

  const moversDataRefDL = collection(db, "moversDrivingLicense");
  const docSnapDL = query(moversDataRefDL);
  const querySnapshotDL = await getDocs(docSnapDL);
  const resultsDL = querySnapshotDL.docs.map((doc) => ({
    ...doc.data(),
    // id: doc.id,
  }));

  // return docSnap.data();
  return {
    personalDetails: resultsMD,
    companyDetails: resultsCD,
    CompanyPix: resultsCP,
    RegCertificate: resultsRC,
    VehInsurance: resultsVI,
    PubInsurance: resultsPI,
    TranInsurance: resultsTI,
    DrivingLicense: resultsDL,
  };
};

export const fetchMoverDetails3 = async (uid) => {
  const moversDataRef = doc(db, "moversData", uid);
  const docSnap = await getDoc(moversDataRef);

  return docSnap.data();
};

export const fetchGeneratedNames = async () => {
  const nameRef = collection(db, "generatedMoveNames");
  const q = query(nameRef);
  const querySnapshot = await getDocs(q);
  const results = querySnapshot.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));
  return results;
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

export const fetchAllMoversDetails = async (uid) => {
  const moversDataRefMD = doc(db, "moversData", uid);
  const docSnapMD = await getDoc(moversDataRefMD);

  const moversDataRefCD = doc(db, "moversDetails", uid);
  const docSnapCD = await getDoc(moversDataRefCD);

  const moversDataRefCP = doc(db, "moversCompanyPix", uid);
  const docSnapCP = await getDoc(moversDataRefCP);

  const moversDataRefRC = doc(db, "moversRegCertificate", uid);
  const docSnapRC = await getDoc(moversDataRefRC);

  const moversDataRefVI = doc(db, "moversVehInsurance", uid);
  const docSnapVI = await getDoc(moversDataRefVI);

  const moversDataRefPI = doc(db, "moversPubInsurance", uid);
  const docSnapPI = await getDoc(moversDataRefPI);

  const moversDataRefTI = doc(db, "moversTranInsurance", uid);
  const docSnapTI = await getDoc(moversDataRefTI);

  const moversDataRefDL = doc(db, "moversDrivingLicense", uid);
  const docSnapDL = await getDoc(moversDataRefDL);

  // return docSnap.data();
  return {
    personalDetails: docSnapMD.data(),
    companyDetails: docSnapCD.data(),
    CompanyPix: docSnapCP.data(),
    RegCertificate: docSnapRC.data(),
    VehInsurance: docSnapVI.data(),
    PubInsurance: docSnapPI.data(),
    TranInsurance: docSnapTI.data(),
    DrivingLicense: docSnapDL.data(),
  };
};

// import { db, storage } from "@/firebase";
// import { collection, query, where, getDocs, doc, getDoc, onSnapshot } from "firebase/firestore";
