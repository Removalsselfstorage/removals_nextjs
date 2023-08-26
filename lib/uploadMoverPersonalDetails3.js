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

export const UploadMoverPersonalDetails3 = async (moveObj) => {
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
    lastLogin,
    reviewSubmit,
    acceptedTerms,
    justRegistered,
    uid,
  } = moveObj;

  // console.log(profilePicture);

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
          lastLogin,
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
          lastLogin,
          reviewSubmit,
          acceptedTerms,
          justRegistered,
        };

  try {
    await setDoc(
      moversRef,
      {
        uid,
        firstName,
        lastName,
        generatedName,
        email,
        phone,
        address,
        personalBio,
        profileImageUrl: "",
        profileImagePreviewUrl: profilePictureUrl,
        profilePictureName: profilePictureName,
        registerDate,
        lastLogin,
        reviewSubmit,
        acceptedTerms,
        justRegistered,
      },
      { merge: true }
    );
  } catch (error) {
    console.log(error);
    return false;
  }

  return true;
};
