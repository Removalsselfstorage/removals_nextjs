import { db, storage } from "@/firebase";
import { getAllMoverDetails } from "@/store/moverSlice";
import { getAllUserDetails } from "@/store/userSlice";
import {
  collection,
  deleteDoc,
  doc,
  DocumentData,
  onSnapshot,
  setDoc,
  addDoc,
} from "firebase/firestore";
import { uploadBytes, ref, getDownloadURL } from "firebase/storage";
import { useSelector } from "react-redux";

export const UploadMoverDocumentation2 = async (moveObj) => {
  // const details = useSelector(getAllMoverDetails);
  // const email =
  //   details.firebaseMoverDetails?.email || details.personalDetails.email;
  const {
    companyName,
    generatedName,
    companyNumber,
    companyAddress,
    companyBio,
    companyProfilePixRaw,
    companyProfilePixUrl,
    companyProfilePixName,
    regCertificateRaw,
    regCertificateUrl,
    regCertificateName,
    vehInsuranceRaw,
    vehInsuranceUrl,
    vehInsuranceName,
    pubInsuranceRaw,
    pubInsuranceUrl,
    pubInsuranceName,
    tranInsuranceRaw,
    tranInsuranceUrl,
    tranInsuranceName,
    drivingLicenseRaw,
    drivingLicenseUrl,
    drivingLicenseName,
    reviewSubmit,
    uid,
  } = moveObj;

  // console.log(
  //   companyProfilePix,
  //   regCertificate,
  //   vehInsurance,
  //   pubInsurance,
  //   tranInsurance,
  //   drivingLicense
  // );

  const moversRef = doc(db, "moversDetails", uid);
  const moversRef2 = doc(db, "moversCompanyPix", uid);
  const moversRef3 = doc(db, "moversRegCertificate", uid);
  const moversRef4 = doc(db, "moversVehInsurance", uid);
  const moversRef5 = doc(db, "moversPubInsurance", uid);
  const moversRef6 = doc(db, "moversTranInsurance", uid);
  const moversRef7 = doc(db, "moversDrivingLicense", uid);

  try {
    await setDoc(
      moversRef,
      {
        companyName,
        generatedName,
        companyNumber,
        companyAddress,
        companyBio,
        reviewSubmit,
      },
      { merge: true }
    );
  } catch (error) {
    console.log(error);
    return false;
  }

  try {
    await setDoc(
      moversRef2,
      {
        companyProfilePixUrl: "",
        companyProfilePixPreviewUrl: companyProfilePixUrl,
        companyProfilePixName: companyProfilePixName,
        reviewSubmit,
      },
      { merge: true }
    );
  } catch (error) {
    console.log(error);
    return false;
  }

  try {
    await setDoc(
      moversRef3,
      {
        regCertificateUrl: "",
        regCertificatePreviewUrl: regCertificateUrl,
        regCertificateName: regCertificateName,
        reviewSubmit,
      },
      { merge: true }
    );
  } catch (error) {
    console.log(error);
    return false;
  }
  try {
    await setDoc(
      moversRef4,
      {
        vehInsuranceUrl: "",
        vehInsurancePreviewUrl: vehInsuranceUrl,
        vehInsuranceName: vehInsuranceName,
        reviewSubmit,
      },
      { merge: true }
    );
  } catch (error) {
    console.log(error);
    return false;
  }
  try {
    await setDoc(
      moversRef5,
      {
        pubInsuranceUrl: "",
        pubInsurancePreviewUrl: pubInsuranceUrl,
        pubInsuranceName: pubInsuranceName,
        reviewSubmit,
      },
      { merge: true }
    );
  } catch (error) {
    console.log(error);
    return false;
  }
  try {
    await setDoc(
      moversRef6,
      {
        tranInsuranceUrl: "",
        tranInsurancePreviewUrl: tranInsuranceUrl,
        tranInsuranceName: tranInsuranceName,
        reviewSubmit,
      },
      { merge: true }
    );
  } catch (error) {
    console.log(error);
    return false;
  }
  try {
    await setDoc(
      moversRef7,
      {
        drivingLicenseUrl: "",
        drivingLicensePreviewUrl: drivingLicenseUrl,
        drivingLicenseName: drivingLicenseName,
        reviewSubmit,
      },
      { merge: true }
    );
  } catch (error) {
    console.log(error);
    return false;
  }

  return true;
};
