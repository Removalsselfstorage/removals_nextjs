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
    profilePicture,
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

  console.log(profilePicture);

  const moversRef = doc(db, "moversData", uid);

  const data =
    profilePicture.name && profilePicture.raw
      ? {
          uid,
          firstName,
          lastName,
          generatedName,
          email,
          phone,
          address,
          personalBio,
          // profileImageRaw: profilePicture.raw,
          profileImageUrl: uploadImgUrl,
          profileImagePreviewUrl: profilePicture?.url,
          profilePictureName: profilePicture?.name,
          registerDate,
          lastLogin,
          reviewSubmit,
          acceptedTerms,
          justRegistered,
          // profilePictureRaw: profilePicture.raw,
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

          // profileImageRaw: profilePicture.raw,
          // profileImageUrl: uploadImgUrl,
          // profileImagePreviewUrl: profilePicture.url,
          // profilePictureName: profilePicture.name,
          registerDate,
          lastLogin,
          reviewSubmit,
          acceptedTerms,
          justRegistered,
          // profilePictureRaw: profilePicture.raw,
        };

  try {
    await setDoc(
      moversRef,
      // {
      //   firstName,
      //   lastName,
      //   email,
      //   phone,
      //   address,
      //   personalBio,
      //   // profileImageRaw: profilePicture.raw,
      //   profileImageUrl: uploadImgUrl,
      //   profileImagePreviewUrl: profilePicture.url,
      //   profilePictureName: profilePicture.name,
      //   reviewSubmit: reviewSubmit,
      //   // profilePictureRaw: profilePicture.raw,
      // },
      {
        uid,
        firstName,
        lastName,
        generatedName,
        email,
        phone,
        address,
        personalBio,
        // profileImageRaw: profilePicture.raw,
        profileImageUrl: "",
        profileImagePreviewUrl: profilePicture?.url,
        profilePictureName: profilePicture?.name,
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
