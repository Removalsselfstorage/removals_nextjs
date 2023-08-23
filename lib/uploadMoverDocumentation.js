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
    email,
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

  let uploadImgUrlCP;
  let uploadImgUrlRC;
  let uploadImgUrlVI;
  let uploadImgUrlPI;
  let uploadImgUrlTI;
  let uploadImgUrlDL;
  //  Company profilePix image url for firebase storage
  if (companyProfilePix.name && companyProfilePix.raw) {
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

    uploadImgUrlCP = await getDownloadURL(statusCP.ref).then((url) => {
      return url;
    });
  }

  //  Company Reg Certificate image url for firebase storage
  if (regCertificate.name && regCertificate.raw) {
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

    uploadImgUrlRC = await getDownloadURL(statusRC.ref).then((url) => {
      return url;
    });
  }

  //  Company vehicle insurance image url for firebase storage
  if (vehInsurance.name && vehInsurance.raw) {
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

    uploadImgUrlVI = await getDownloadURL(statusVI.ref).then((url) => {
      return url;
    });
  }

  //  Company public insurance image url for firebase storage
  if (pubInsurance.name && pubInsurance.raw) {
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

    uploadImgUrlPI = await getDownloadURL(statusPI.ref).then((url) => {
      return url;
    });
  }

  //  Company transport insurance image url for firebase storage
  if (tranInsurance.name && tranInsurance.raw) {
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

    uploadImgUrlTI = await getDownloadURL(statusTI.ref).then((url) => {
      return url;
    });
  }

  //  Company transport insurance image url for firebase storage
  if (drivingLicense.name && drivingLicense.raw) {
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

    uploadImgUrlDL = await getDownloadURL(statusDL.ref).then((url) => {
      return url;
    });
  }

  const moversRef = doc(db, "moversDetails", uid);
  const moversRef2 = doc(db, "moversCompanyPix", uid);
  const moversRef3 = doc(db, "moversRegCertificate", uid);
  const moversRef4 = doc(db, "moversVehInsurance", uid);
  const moversRef5 = doc(db, "moversPubInsurance", uid);
  const moversRef6 = doc(db, "moversTranInsurance", uid);
  const moversRef7 = doc(db, "moversDrivingLicense", uid);

  const data2 =
    companyProfilePix.name && companyProfilePix.raw
      ? {
          companyProfilePixUrl: uploadImgUrlCP,
          companyProfilePixPreviewUrl: companyProfilePix.url,
          companyProfilePixName: companyProfilePix.name,
          reviewSubmit,
        }
      : {
          reviewSubmit,
        };

  const data3 =
    regCertificate.name && regCertificate.raw
      ? {
          regCertificateUrl: uploadImgUrlRC,
          regCertificatePreviewUrl: regCertificate.url,
          regCertificateName: regCertificate.name,
          reviewSubmit,
        }
      : {
          reviewSubmit,
        };
  const data4 =
    vehInsurance.name && vehInsurance.raw
      ? {
          vehInsuranceUrl: uploadImgUrlVI,
          vehInsurancePreviewUrl: vehInsurance.url,
          vehInsuranceName: vehInsurance.name,
          reviewSubmit,
        }
      : {
          reviewSubmit,
        };
  const data5 =
    pubInsurance.name && pubInsurance.raw
      ? {
          pubInsuranceUrl: uploadImgUrlPI,
          pubInsurancePreviewUrl: pubInsurance.url,
          pubInsuranceName: pubInsurance.name,
          reviewSubmit,
        }
      : {
          reviewSubmit,
        };
  const data6 =
    tranInsurance.name && tranInsurance.raw
      ? {
          tranInsuranceUrl: uploadImgUrlTI,
          tranInsurancePreviewUrl: tranInsurance.url,
          tranInsuranceName: tranInsurance.name,
          reviewSubmit,
        }
      : {
          reviewSubmit,
        };
  const data7 =
    drivingLicense.name && drivingLicense.raw
      ? {
          drivingLicenseUrl: uploadImgUrlDL,
          drivingLicensePreviewUrl: drivingLicense.url,
          drivingLicenseName: drivingLicense.name,
          reviewSubmit,
        }
      : {
          reviewSubmit,
        };

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
    await setDoc(moversRef2, data2, { merge: true });
  } catch (error) {
    console.log(error);
    return false;
  }

  try {
    await setDoc(moversRef3, data3, { merge: true });
  } catch (error) {
    console.log(error);
    return false;
  }
  try {
    await setDoc(moversRef4, data4, { merge: true });
  } catch (error) {
    console.log(error);
    return false;
  }
  try {
    await setDoc(moversRef5, data5, { merge: true });
  } catch (error) {
    console.log(error);
    return false;
  }
  try {
    await setDoc(moversRef6, data6, { merge: true });
  } catch (error) {
    console.log(error);
    return false;
  }
  try {
    await setDoc(moversRef7, data7, { merge: true });
  } catch (error) {
    console.log(error);
    return false;
  }

  return true;
};
