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

export const UploadMoverPortfolioPix = async (moveObj) => {
  // const details = useSelector(getAllMoverDetails);
  // const email =
  //   details.firebaseMoverDetails?.email || details.personalDetails.email;
  const {
    portfolioPixUpload1,
    portfolioPixUploadUrl1,
    portfolioPixUploadName1,
    portfolioPixUpload2,
    portfolioPixUploadUrl2,
    portfolioPixUploadName2,
    portfolioPixUpload3,
    portfolioPixUploadUrl3,
    portfolioPixUploadName3,
    portfolioPixUpload4,
    portfolioPixUploadUrl4,
    portfolioPixUploadName4,
    portfolioPixUpload5,
    portfolioPixUploadUrl5,
    portfolioPixUploadName5,
    portfolioPixUpload6,
    portfolioPixUploadUrl6,
    portfolioPixUploadName6,
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

  let uploadImgUrl1 = "";
  let uploadImgUrl2 = "";
  let uploadImgUrl3 = "";
  let uploadImgUrl4 = "";
  let uploadImgUrl5 = "";
  let uploadImgUrl6 = "";

  //  Portfolio image 1 url for firebase storage
  if (portfolioPixUpload1) {
    const name1 = new Date().getTime() + portfolioPixUploadName1;
    const imageRef1 = ref(storage, `${email}/portfolioPix/${name1}`);

    const status1 = await uploadBytes(imageRef1, portfolioPixUpload1)
      .then((snapshot) => {
        return snapshot;
      })
      .catch((error) => {
        console.log(error);
        return false;
      });

    if (!status1) return false;

    uploadImgUrl1 = await getDownloadURL(status1.ref).then((url) => {
      return url;
    });
  }
  //  Portfolio image 2 url for firebase storage
  if (portfolioPixUpload2) {
    const name2 = new Date().getTime() + portfolioPixUploadName2;
    const imageRef2 = ref(storage, `${email}/portfolioPix/${name2}`);

    const status2 = await uploadBytes(imageRef2, portfolioPixUpload2)
      .then((snapshot) => {
        return snapshot;
      })
      .catch((error) => {
        console.log(error);
        return false;
      });

    if (!status2) return false;

    uploadImgUrl2 = await getDownloadURL(status2.ref).then((url) => {
      return url;
    });
  }
  //  Portfolio image 3 url for firebase storage
  if (portfolioPixUpload3) {
    const name3 = new Date().getTime() + portfolioPixUploadName3;
    const imageRef3 = ref(storage, `${email}/portfolioPix/${name3}`);

    const status3 = await uploadBytes(imageRef3, portfolioPixUpload3)
      .then((snapshot) => {
        return snapshot;
      })
      .catch((error) => {
        console.log(error);
        return false;
      });

    if (!status3) return false;

    uploadImgUrl3 = await getDownloadURL(status3.ref).then((url) => {
      return url;
    });
  }
  //  Portfolio image 4 url for firebase storage
  if (portfolioPixUpload4) {
    const name4 = new Date().getTime() + portfolioPixUploadName4;
    const imageRef4 = ref(storage, `${email}/portfolioPix/${name4}`);

    const status4 = await uploadBytes(imageRef4, portfolioPixUpload4)
      .then((snapshot) => {
        return snapshot;
      })
      .catch((error) => {
        console.log(error);
        return false;
      });

    if (!status4) return false;

    uploadImgUrl4 = await getDownloadURL(status4.ref).then((url) => {
      return url;
    });
  }
  //  Portfolio image 5 url for firebase storage
  if (portfolioPixUpload5) {
    const name5 = new Date().getTime() + portfolioPixUploadName5;
    const imageRef5 = ref(storage, `${email}/portfolioPix/${name5}`);

    const status5 = await uploadBytes(imageRef5, portfolioPixUpload5)
      .then((snapshot) => {
        return snapshot;
      })
      .catch((error) => {
        console.log(error);
        return false;
      });

    if (!status5) return false;

    uploadImgUrl5 = await getDownloadURL(status5.ref).then((url) => {
      return url;
    });
  }
  //  Portfolio image 6 url for firebase storage
  if (portfolioPixUpload6) {
    const name6 = new Date().getTime() + portfolioPixUploadName6;
    const imageRef6 = ref(storage, `${email}/portfolioPix/${name6}`);

    const status6 = await uploadBytes(imageRef6, portfolioPixUpload6)
      .then((snapshot) => {
        return snapshot;
      })
      .catch((error) => {
        console.log(error);
        return false;
      });

    if (!status6) return false;

    uploadImgUrl6 = await getDownloadURL(status6.ref).then((url) => {
      return url;
    });
  }

  const moversRef1 = doc(db, "moversPortfolio1", uid);
  const moversRef2 = doc(db, "moversPortfolio2", uid);
  const moversRef3 = doc(db, "moversPortfolio3", uid);
  const moversRef4 = doc(db, "moversPortfolio4", uid);
  const moversRef5 = doc(db, "moversPortfolio5", uid);
  const moversRef6 = doc(db, "moversPortfolio6", uid);

  const data1 = portfolioPixUpload1
    ? {
        portfolioPixUploadUrl1: uploadImgUrl1,
        portfolioPixUploadName1,
        reviewSubmit,
        uid,
      }
    : {
        portfolioPixUploadUrl1,
        portfolioPixUploadName1,
        reviewSubmit,
        uid,
      };

  const data2 = portfolioPixUpload2
    ? {
        portfolioPixUploadUrl2: uploadImgUrl2,
        portfolioPixUploadName2,
        reviewSubmit,
        uid,
      }
    : {
        portfolioPixUploadUrl2,
        portfolioPixUploadName2,
        reviewSubmit,
        uid,
      };

  const data3 = portfolioPixUpload3
    ? {
        portfolioPixUploadUrl3: uploadImgUrl3,
        portfolioPixUploadName3,
        reviewSubmit,
        uid,
      }
    : {
        portfolioPixUploadUrl3,
        portfolioPixUploadName3,
        reviewSubmit,
        uid,
      };

  const data4 = portfolioPixUpload4
    ? {
        portfolioPixUploadUrl4: uploadImgUrl4,
        portfolioPixUploadName4,
        reviewSubmit,
        uid,
      }
    : {
        portfolioPixUploadUrl4,
        portfolioPixUploadName4,
        reviewSubmit,
        uid,
      };

  const data5 = portfolioPixUpload5
    ? {
        portfolioPixUploadUrl5: uploadImgUrl5,
        portfolioPixUploadName5,
        reviewSubmit,
        uid,
      }
    : {
        portfolioPixUploadUrl5,
        portfolioPixUploadName5,
        reviewSubmit,
        uid,
      };

  const data6 = portfolioPixUpload6
    ? {
        portfolioPixUploadUrl6: uploadImgUrl6,
        portfolioPixUploadName6,
        reviewSubmit,
        uid,
      }
    : {
        portfolioPixUploadUrl6,
        portfolioPixUploadName6,
        reviewSubmit,
        uid,
      };

  try {
    await setDoc(moversRef1, data1, { merge: true });
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

  return true;
};
