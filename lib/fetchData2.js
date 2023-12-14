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
    id: doc.id,
  }));

  const moversPortfolio1 = collection(db, "moversPortfolio1");
  const docSnap1 = query(moversPortfolio1);
  const querySnapshot1 = await getDocs(docSnap1);
  const results1 = querySnapshot1.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));

  const moversPortfolio2 = collection(db, "moversPortfolio2");
  const docSnap2 = query(moversPortfolio2);
  const querySnapshot2 = await getDocs(docSnap2);
  const results2 = querySnapshot2.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));

  const moversPortfolio3 = collection(db, "moversPortfolio3");
  const docSnap3 = query(moversPortfolio3);
  const querySnapshot3 = await getDocs(docSnap3);
  const results3 = querySnapshot3.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));

  const moversPortfolio4 = collection(db, "moversPortfolio4");
  const docSnap4 = query(moversPortfolio4);
  const querySnapshot4 = await getDocs(docSnap4);
  const results4 = querySnapshot4.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));

  const moversPortfolio5 = collection(db, "moversPortfolio5");
  const docSnap5 = query(moversPortfolio5);
  const querySnapshot5 = await getDocs(docSnap5);
  const results5 = querySnapshot5.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));

  const moversPortfolio6 = collection(db, "moversPortfolio6");
  const docSnap6 = query(moversPortfolio6);
  const querySnapshot6 = await getDocs(docSnap6);
  const results6 = querySnapshot6.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
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
    Portfolio1: results1,
    Portfolio2: results2,
    Portfolio3: results3,
    Portfolio4: results4,
    Portfolio5: results5,
    Portfolio6: results6,
  };
};

export const fetchAllBookings = async () => {
  const bookingsRef = collection(db, "bookingData");
  // const docSnap = query(bookingsRef, orderBy("createdAt", "asc"));
  const docSnap = query(bookingsRef);

  const querySnapshot = await getDocs(docSnap);

  const results = querySnapshot.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));

  // return docSnap.data();
  return {
    bookings: results,
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
export const fetchWelcomedEmails = async () => {
  const emailRef = collection(db, "welcomedEmails");
  const q = query(emailRef);
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

  const moversPortfolio1 = doc(db, "moversPortfolio1", uid);
  const docPortFolio1 = await getDoc(moversPortfolio1);

  const moversPortfolio2 = doc(db, "moversPortfolio2", uid);
  const docPortFolio2 = await getDoc(moversPortfolio2);

  const moversPortfolio3 = doc(db, "moversPortfolio3", uid);
  const docPortFolio3 = await getDoc(moversPortfolio3);
  
  const moversPortfolio4 = doc(db, "moversPortfolio4", uid);
  const docPortFolio4 = await getDoc(moversPortfolio4);

  const moversPortfolio5 = doc(db, "moversPortfolio5", uid);
  const docPortFolio5 = await getDoc(moversPortfolio5);

  const moversPortfolio6 = doc(db, "moversPortfolio6", uid);
  const docPortFolio6 = await getDoc(moversPortfolio6);



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
    portFolio1: docPortFolio1.data(),
    portFolio2: docPortFolio2.data(),
    portFolio3: docPortFolio3.data(),
    portFolio4: docPortFolio4.data(),
    portFolio5: docPortFolio5.data(),
    portFolio6: docPortFolio6.data(),
  };
};
export const fetchAllMoversDetails2 = async (uid) => {
  const moversDataRefMD = doc(db, "moversData", uid);
  const docSnapMD = await getDoc(moversDataRefMD);

  const moversDataRefCD = doc(db, "moversDetails", uid);
  const docSnapCD = await getDoc(moversDataRefCD);

 



  // return docSnap.data();
  return {
    personalDetails: docSnapMD.data(),
    companyDetails: docSnapCD.data(),
 
   
  };
};

// import { db, storage } from "@/firebase";
// import { collection, query, where, getDocs, doc, getDoc, onSnapshot } from "firebase/firestore";
