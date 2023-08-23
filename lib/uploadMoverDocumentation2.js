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
    companyProfilePix,
    regCertificate,
    vehInsurance,
    pubInsurance,
    tranInsurance,
    drivingLicense,
    reviewSubmit,
    uid,
  } = moveObj;

  console.log(
    companyProfilePix,
    regCertificate,
    vehInsurance,
    pubInsurance,
    tranInsurance,
    drivingLicense
  );

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
        companyProfilePixPreviewUrl: companyProfilePix.url,
        companyProfilePixName: companyProfilePix.name,
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
        regCertificatePreviewUrl: regCertificate.url,
        regCertificateName: regCertificate.name,
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
        vehInsurancePreviewUrl: vehInsurance.url,
        vehInsuranceName: vehInsurance.name,
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
        pubInsurancePreviewUrl: pubInsurance.url,
        pubInsuranceName: pubInsurance.name,
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
        tranInsurancePreviewUrl: tranInsurance.url,
        tranInsuranceName: tranInsurance.name,
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
        drivingLicensePreviewUrl: drivingLicense.url,
        drivingLicenseName: drivingLicense.name,
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
