import { db, storage } from "@/firebase";
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

export const UploadMoverPersonalDetails2 = async (moveObj) => {
  // const userDetails = useSelector(getAllUserDetails);
  const {
    profilePictureRaw,
    profilePictureUrl,
    profilePictureName,
    address,
    personalBio,
    firstName,
    lastName,
    generatedName,
    email,
    phone,
    registerDate,
    reviewSubmit,
    acceptedTerms,
    justRegistered,
    uid,
  } = moveObj;

  // console.log(profilePicture);

  let uploadImgUrl;

  if (profilePictureName && profilePictureRaw) {
    const name = new Date().getTime() + profilePictureName;
    const imageRef = ref(storage, `${email}/profileImage/${name}`);

    const status = await uploadBytes(imageRef, profilePictureRaw)
      .then((snapshot) => {
        return snapshot;
      })
      .catch((error) => {
        return false;
      });

    if (!status) return false;

    uploadImgUrl = await getDownloadURL(status.ref).then((url) => {
      return url;
    });
  }

  const moversRef = doc(db, "moversData", uid);

  const data =
    profilePictureName && profilePictureRaw
      ? {
          uid,
          firstName,
          lastName,
          generatedName,
          email,
          phone,
          address,
          personalBio,
          profileImageUrl: uploadImgUrl,
          profileImagePreviewUrl: profilePictureUrl,
          profilePictureName: profilePictureName,
          registerDate,
          reviewSubmit,
          acceptedTerms,
          justRegistered,
        }
      : {
          uid,
          firstName,
          lastName,
          generatedName,
          email,
          phone,
          address,
          personalBio,
          registerDate,
          reviewSubmit,
          acceptedTerms,
          justRegistered,
        };

  try {
    await setDoc(
      moversRef,

      data,
      { merge: true }
    );
  } catch (error) {
    console.log(error);
    return false;
  }

  return true;
};
