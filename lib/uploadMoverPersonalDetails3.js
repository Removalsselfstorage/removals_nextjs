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
        // profileImagePreviewUrl: profilePictureUrl,
        profilePictureName: profilePictureName,
        registerDate,
        lastLogin,
        reviewSubmit,
        acceptedTerms,
        justRegistered,
        approvalStatus: "UNAPPROVED",
        rating: 0,
        reviewAverage: 0,
        reviewCount: 0,
        hireCount: 0,
        score: 0,
        position: "others",
      },
      { merge: true }
    );
  } catch (error) {
    console.log(error);
    return false;
  }

  return true;
};
