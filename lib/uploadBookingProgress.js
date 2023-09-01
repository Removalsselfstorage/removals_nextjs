import { db, storage } from "@/firebase";
import { getAllUserDetails } from "@/store/userSlice";
import { generateSecureId } from "@/utils/logics";
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

export const UploadBookingProgress1 = async (moveObj) => {
  // const userDetails = useSelector(getAllUserDetails);
  const { serviceLocation, personalDetails, moveDetails, stage } = moveObj;

  const { locationFrom, locationTo } = serviceLocation;
  const { firstName, lastName, email, countryCode, telephone } =
    personalDetails;
  const {
    propertyType,
    numberOfMovers,
    mileage,
    volume,
    duration,
    moveDate,
    quoteRef,
    bookingId,
    // moveDateRaw,
  } = moveDetails;

  // console.log(moveObj);

  // Create a new Date object
  const currentDate = new Date();

  // Get the current date and time components
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth() + 1; // Months are zero-based, so we add 1
  const day = currentDate.getDate();
  const hours = currentDate.getHours();
  const minutes = currentDate.getMinutes();
  const seconds = currentDate.getSeconds();

  // Create the ID variable using the components
  // const dateTime = `${year}-${month}-${day}_${hours}:${minutes}:${seconds}`;
  // const bookingId = email + "_" + quoteRef;
  // const bookingId = generateSecureId();

  // console.log(profilePicture);

  const bookingRef = doc(db, "bookingData", bookingId);

  const data = {
    address1: locationFrom.name,
    postCode1: locationFrom.postCode,
    city1: locationFrom.city,
    country1: locationFrom.country,
    floor1: locationFrom.floor,
    liftAvailable1: locationFrom.liftAvailable,
    address2: locationTo.name,
    postCode2: locationTo.postCode,
    city2: locationTo.city,
    country2: locationTo.country,
    floor2: locationTo.floor,
    liftAvailable2: locationTo.liftAvailable,
    firstName,
    lastName,
    email,
    countryCode,
    telephone,
    propertyType,
    numberOfMovers,
    mileage,
    volume,
    duration,
    moveDate,
    // moveDateRaw,
    stage,
    bookingId,
    quoteRef,
  };

  try {
    await setDoc(
      bookingRef,

      data,
      { merge: true }
    );
  } catch (error) {
    console.log(error);
    return false;
  }

  return true;
};

export const UploadBookingProgress2 = async (moveObj) => {
  // const userDetails = useSelector(getAllUserDetails);
  const { serviceLocation, personalDetails, moveDetails, stage } = moveObj;

  const { locationFrom, locationTo } = serviceLocation;
  const { firstName, lastName, email, countryCode, telephone } =
    personalDetails;
  const {
    propertyType,
    numberOfMovers,
    mileage,
    volume,
    duration,
    moveDate,
    quoteRef,
    // moveDateRaw,
  } = moveDetails;

  const currentDate = new Date();

  // Get the current date and time components
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth() + 1; // Months are zero-based, so we add 1
  const day = currentDate.getDate();
  const hours = currentDate.getHours();
  const minutes = currentDate.getMinutes();
  const seconds = currentDate.getSeconds();

  // Create the ID variable using the components
  // const dateTime = `${year}-${month}-${day}_${hours}:${minutes}:${seconds}`;
  const bookingId = email + "_" + quoteRef;

  const bookingRef = doc(db, "bookingData", bookingId);

  const data = {
    address1: locationFrom.name,
    postCode1: locationFrom.postCode,
    city1: locationFrom.city,
    country1: locationFrom.country,
    floor1: locationFrom.floor,
    liftAvailable1: locationFrom.liftAvailable,
    address2: locationTo.name,
    postCode2: locationTo.postCode,
    city2: locationTo.city,
    country2: locationTo.country,
    floor2: locationTo.floor,
    liftAvailable2: locationTo.liftAvailable,
    firstName,
    lastName,
    email,
    countryCode,
    telephone,
    propertyType,
    numberOfMovers,
    mileage,
    volume,
    duration,
    moveDate,
    // moveDateRaw,
    stage,
    bookingId,
    quoteRef,
  };

  try {
    await setDoc(
      bookingRef,

      data,
      { merge: true }
    );
  } catch (error) {
    console.log(error);
    return false;
  }

  return true;
};
