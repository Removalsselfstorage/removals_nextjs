import { db, storage } from "@/firebase";
import { collection, addDoc } from "firebase/firestore";
import { uploadBytes, ref, getDownloadURL } from "firebase/storage";

export const uploadMoverDetails = async ({
  imageUpload,
  address,
  personalBio,
  firstName,
  lastName,
  email,
  phone,
}) => {

    const name = new Date().getTime() + imageUpload.name;
  const imageRef = ref(storage, `${email}/profileImage/${name}`);

  const status = await uploadBytes(imageRef, imageUpload)
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

  const moverDetailsRef = collection(db, "moverDetails");

  try {
    await addDoc(moverDetailsRef, {
      firstName,
      lastName,
      email,
      phone,
      address,
      personalBio,
      url: uploadImgUrl,
    });
  } catch (error) {
    return false;
  }

  return true;
};
