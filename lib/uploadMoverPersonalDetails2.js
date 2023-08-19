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
    profilePicture,
    address,
    personalBio,
    firstName,
    lastName,
    email,
    phone,
    uid,
  } = moveObj;

  console.log(profilePicture)

  const name = new Date().getTime() + profilePicture.raw?.name;
  const imageRef = ref(storage, `${email}/profileImage/${name}`);

  const status = await uploadBytes(imageRef, profilePicture.raw)
    .then((snapshot) => {
      return snapshot;
    })
    .catch((error) => {
      return false;
    });

  if (!status) return false;

  const uploadImgUrl = await getDownloadURL(status.ref).then((url) => {
    return url;
  });

  const moversRef = doc(db, "moversData", uid);

  try {
    await setDoc(
      moversRef,
      {
        firstName,
        lastName,
        email,
        phone,
        address,
        personalBio,
        profileImageUrl: uploadImgUrl,
        profileImagePreviewUrl: profilePicture.url,
        profilePictureName: profilePicture.name,
        // profilePictureRaw: profilePicture.raw,
      },
      { merge: true }
    );
  } catch (error) {
    console.log(error);
    return false;
  }

  return true;
};
