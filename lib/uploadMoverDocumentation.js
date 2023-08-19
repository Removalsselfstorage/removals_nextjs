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

export const UploadMoverDocumentation = async (moveObj) => {
  // const details = useSelector(getAllMoverDetails);
  // const email =
  //   details.firebaseMoverDetails?.email || details.personalDetails.email;
  const {
    companyName,
    companyNumber,
    companyAddress,
    companyBio,
    companyProfilePix,
    regCertificate,
    vehInsurance,
    pubInsurance,
    tranInsurance,
    drivingLicense,
    email,
    uid,
  } = moveObj;

  console.log(companyProfilePix, regCertificate, vehInsurance, pubInsurance, tranInsurance, drivingLicense)

  //  Company profilePix image url for firebase storage
  const nameCP = new Date().getTime() + companyProfilePix.raw?.name;
  const imageRefCP = ref(storage, `${email}/companyProfilePix/${nameCP}`);

  const statusCP = await uploadBytes(imageRefCP, companyProfilePix.raw)
    .then((snapshot) => {
      return snapshot;
    })
    .catch((error) => {
      console.log(error);
      return false;
    });

  if (!statusCP) return false;

  const uploadImgUrlCP = await getDownloadURL(statusCP.ref).then((url) => {
    return url;
  });

  //  Company Reg Certificate image url for firebase storage
  const nameRC = new Date().getTime() + regCertificate.raw?.name;
  const imageRefRC = ref(storage, `${email}/regCertificate/${nameRC}`);

  const statusRC = await uploadBytes(imageRefRC, regCertificate.raw)
    .then((snapshot) => {
      return snapshot;
    })
    .catch((error) => {
      console.log(error);
      return false;
    });

  if (!statusRC) return false;

  const uploadImgUrlRC = await getDownloadURL(statusRC.ref).then((url) => {
    return url;
  });

  //  Company vehicle insurance image url for firebase storage
  const nameVI = new Date().getTime() + vehInsurance.raw?.name;
  const imageRefVI = ref(storage, `${email}/vehInsurance/${nameVI}`);

  const statusVI = await uploadBytes(imageRefVI, regCertificate.raw)
    .then((snapshot) => {
      return snapshot;
    })
    .catch((error) => {
      console.log(error);
      return false;
    });

  if (!statusVI) return false;

  const uploadImgUrlVI = await getDownloadURL(statusVI.ref).then((url) => {
    return url;
  });

  //  Company public insurance image url for firebase storage
  const namePI = new Date().getTime() + pubInsurance.raw?.name;
  const imageRefPI = ref(storage, `${email}/pubInsurance/${namePI}`);

  const statusPI = await uploadBytes(imageRefPI, pubInsurance.raw)
    .then((snapshot) => {
      return snapshot;
    })
    .catch((error) => {
      console.log(error);
      return false;
    });

  if (!statusPI) return false;

  const uploadImgUrlPI = await getDownloadURL(statusPI.ref).then((url) => {
    return url;
  });

  //  Company transport insurance image url for firebase storage
  const nameTI = new Date().getTime() + tranInsurance.raw?.name;
  const imageRefTI = ref(storage, `${email}/tranInsurance/${nameTI}`);

  const statusTI = await uploadBytes(imageRefTI, tranInsurance.raw)
    .then((snapshot) => {
      return snapshot;
    })
    .catch((error) => {
      console.log(error);
      return false;
    });

  if (!statusTI) return false;

  const uploadImgUrlTI = await getDownloadURL(statusTI.ref).then((url) => {
    return url;
  });

  //  Company transport insurance image url for firebase storage
  const nameDL = new Date().getTime() + drivingLicense.raw?.name;
  const imageRefDL = ref(storage, `${email}/drivingLicense/${nameDL}`);

  const statusDL = await uploadBytes(imageRefDL, drivingLicense.raw)
    .then((snapshot) => {
      return snapshot;
    })
    .catch((error) => {
      console.log(error);
      return false;
    });

  if (!statusDL) return false;

  const uploadImgUrlDL = await getDownloadURL(statusDL.ref).then((url) => {
    return url;
  });

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
        companyNumber,
        companyAddress,
        companyBio,
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
        //
        companyProfilePixUrl: uploadImgUrlCP,
        companyProfilePixPreviewUrl: companyProfilePix.url,
        companyProfilePixName: companyProfilePix.name,
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
        regCertificateUrl: uploadImgUrlRC,
        regCertificatePreviewUrl: regCertificate.url,
        regCertificateName: regCertificate.name,
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
        vehInsuranceUrl: uploadImgUrlVI,
        vehInsurancePreviewUrl: vehInsurance.url,
        vehInsuranceName: vehInsurance.name,
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
        pubInsuranceUrl: uploadImgUrlPI,
        pubInsurancePreviewUrl: pubInsurance.url,
        pubInsuranceName: pubInsurance.name,
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
        //
        tranInsuranceUrl: uploadImgUrlTI,
        tranInsurancePreviewUrl: tranInsurance.url,
        tranInsuranceName: tranInsurance.name,
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
        drivingLicenseUrl: uploadImgUrlDL,
        drivingLicensePreviewUrl: drivingLicense.url,
        drivingLicenseName: drivingLicense.name,
      },
      { merge: true }
    );
  } catch (error) {
    console.log(error);
    return false;
  }

  return true;
};
