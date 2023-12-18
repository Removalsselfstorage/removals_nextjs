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
    loadHeight,
    loadLength,
    loadWidth,
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
    email,
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

  let uploadImgUrlCP;
  let uploadImgUrlRC;
  let uploadImgUrlVI;
  let uploadImgUrlPI;
  let uploadImgUrlTI;
  let uploadImgUrlDL;
  //  Company profilePix image url for firebase storage
  if (companyProfilePixName && companyProfilePixRaw) {
    const nameCP = new Date().getTime() + companyProfilePixName;
    const imageRefCP = ref(storage, `${email}/companyProfilePix/${nameCP}`);

    const statusCP = await uploadBytes(imageRefCP, companyProfilePixRaw)
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
  if (regCertificateName && regCertificateRaw) {
    const nameRC = new Date().getTime() + regCertificateName;
    const imageRefRC = ref(storage, `${email}/regCertificate/${nameRC}`);

    const statusRC = await uploadBytes(imageRefRC, regCertificateRaw)
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
  if (vehInsuranceName && vehInsuranceRaw) {
    const nameVI = new Date().getTime() + vehInsuranceName;
    const imageRefVI = ref(storage, `${email}/vehInsurance/${nameVI}`);

    const statusVI = await uploadBytes(imageRefVI, vehInsuranceRaw)
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
  if (pubInsuranceName && pubInsuranceRaw) {
    const namePI = new Date().getTime() + pubInsuranceName;
    const imageRefPI = ref(storage, `${email}/pubInsurance/${namePI}`);

    const statusPI = await uploadBytes(imageRefPI, pubInsuranceRaw)
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
  if (tranInsuranceName && tranInsuranceRaw) {
    const nameTI = new Date().getTime() + tranInsuranceName;
    const imageRefTI = ref(storage, `${email}/tranInsurance/${nameTI}`);

    const statusTI = await uploadBytes(imageRefTI, tranInsuranceRaw)
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
  if (drivingLicenseName && drivingLicenseRaw) {
    const nameDL = new Date().getTime() + drivingLicenseName;
    const imageRefDL = ref(storage, `${email}/drivingLicense/${nameDL}`);

    const statusDL = await uploadBytes(imageRefDL, drivingLicenseRaw)
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
    companyProfilePixName && companyProfilePixRaw
      ? {
          companyProfilePixUrl: uploadImgUrlCP,
          // companyProfilePixPreviewUrl: companyProfilePixUrl,
          companyProfilePixName: companyProfilePixName,
          reviewSubmit,
          uid,
        }
      : {
          reviewSubmit,
          uid,
        };

  const data3 =
    regCertificateName && regCertificateRaw
      ? {
          regCertificateUrl: uploadImgUrlRC,
          // regCertificatePreviewUrl: regCertificateUrl,
          regCertificateName: regCertificateName,
          reviewSubmit,
          uid,
        }
      : {
          reviewSubmit,
          uid,
        };
  const data4 =
    vehInsuranceName && vehInsuranceRaw
      ? {
          vehInsuranceUrl: uploadImgUrlVI,
          // vehInsurancePreviewUrl: vehInsuranceUrl,
          vehInsuranceName: vehInsuranceName,
          reviewSubmit,
          uid,
        }
      : {
          reviewSubmit,
          uid,
        };
  const data5 =
    pubInsuranceName && pubInsuranceRaw
      ? {
          pubInsuranceUrl: uploadImgUrlPI,
          // pubInsurancePreviewUrl: pubInsuranceUrl,
          pubInsuranceName: pubInsuranceName,
          reviewSubmit,
          uid,
        }
      : {
          reviewSubmit,
          uid,
        };
  const data6 =
    tranInsuranceName && tranInsuranceRaw
      ? {
          tranInsuranceUrl: uploadImgUrlTI,
          // tranInsurancePreviewUrl: tranInsuranceUrl,
          tranInsuranceName: tranInsuranceName,
          reviewSubmit,
          uid,
        }
      : {
          reviewSubmit,
          uid,
        };
  const data7 =
    drivingLicenseName && drivingLicenseRaw
      ? {
          drivingLicenseUrl: uploadImgUrlDL,
          // drivingLicensePreviewUrl: drivingLicenseUrl,
          drivingLicenseName: drivingLicenseName,
          reviewSubmit,
          uid,
        }
      : {
          reviewSubmit,
          uid,
        };

  try {
    await setDoc(
      moversRef,
      {
        loadHeight,
        loadLength,
        loadWidth,
        companyName,
        generatedName,
        companyNumber,
        companyAddress,
        companyBio,
        reviewSubmit,
        uid,
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
