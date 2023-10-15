import Link from "next/link";
import React, { useState } from "react";
import {
  getAllDetails,
  updateBookStage,
  updateLocationDetails,
  updateMoveDetails,
  updatePersonalDetails,
} from "@/store/quoteSlice";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import {
  convertToSentenceCase,
  formatMovePrice,
  formatPrice,
  generateRandomValues,
  getCurrentDateFormatted,
} from "@/utils/logics";
import { moveRate, priceCalc, priceCalc2 } from "@/utils/moversLogic";
import { FaBusAlt, FaTruckMoving } from "react-icons/fa";
import { IoMdMan } from "react-icons/io";
import { FiCheckCircle } from "react-icons/fi";
import { fetchAllMoversDetailsArray } from "@/lib/fetchData2";
import { updateAllMoverData } from "@/store/moverSlice";
import emailjs from "@emailjs/browser";
import { fetchWelcomedEmails } from "@/lib/fetchData2";
import { db } from "@/firebase";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import {
  UploadBookingProgress,
  UploadBookingProgress1,
} from "@/lib/uploadBookingProgress";
import useQuote from "@/hooks/useQuote";
import useMover from "@/hooks/useMover";

const PackageCard = ({
  image,
  title,
  subTitle,
  price,
  f1,
  f2,
  f3,
  f4,
  f5,
  f6,
  f7,
  f8,
  f9,
  f10,
  f11,
  f12,
  link,
  preferred,
}) => {
  const {
    serviceLocation,
    personalDetails,
    moveDetails,
    moverSideDetails,
    moverDetails,
    paymentDetails,
    bookStage,
    updateLocationFrom,
    resetLocationFrom,
    updateLocationTo,
    resetLocationTo,
    updatePersonal,
    resetPersonal,
    updateMove,
    resetMove,
    updateMover,
    resetMover,
    updatePayment,
    resetPayment,
    updatePickP,
    updateMoverSide,
    resetMoverSide,
    updateBookS,
    resetBookS,
    router,
  } = useQuote();

  const {
    justRegistered,
    personalMoverDetails,
    companyDetails,
    companyDocs,
    allMoverData,
    updateJustR,
    resetJustR,
    updatePersonalMover,
    resetPersonalMover,
    updateCompanyDe,
    resetCompanyDe,
    updateCompanyDo,
    resetCompanyDo,
    updateAllMoverD,
    resetAllMoverD,
  } = useMover();

  const [submitLoading, setSubmitLoading] = useState(false);

  const randomRefValue = generateRandomValues();

  const moveMen = () => {
    switch (moveDetails?.numberOfMovers) {
      case "1 Man":
        return 1;
        break;
      case "2 Men":
        return 2;
        break;
      case "3 Men":
        return 3;
        break;

      default:
        break;
    }
  };

  const imageArray = new Array(moveMen()).fill(null);

  const checkPropertyType = () => {
    switch (moveDetails?.propertyType) {
      case "Man and van":
        return true;
        break;
      case "Office removals":
        return true;
        break;
      case "Studio flat":
        return true;
        break;
      case "Furniture & Appliances":
        return true;
        break;
      case "1 bed property":
        return false;
        break;
      case "2 bed property":
        return false;
        break;
      case "3 bed property":
        return false;
        break;
      case "4 bed property":
        return false;
        break;

      default:
        break;
    }
  };

  const mileageValueCalc = (mileage) => {
    switch (mileage) {
      case "0 - 25":
        return 0.99 * 25;
        break;
      case "26 - 75":
        return 0.99 * 75;
        break;
      case "76 - 150":
        return 0.99 * 150;
        break;
      case "151 - 200":
        return 0.99 * 200;
        break;
      case "201 - 250":
        return 0.99 * 250;
        break;
      case "251 - 300":
        return 0.99 * 300;
        break;
      case "301 - 350":
        return 0.99 * 350;
        break;
      case "351 - 400":
        return 0.99 * 400;
        break;
      case "401 - 450":
        return 0.99 * 450;
        break;
      case "451 - 500":
        return 0.99 * 500;
        break;
      case "501 - 550":
        return 0.99 * 550;
        break;
      case "551 - 600":
        return 0.99 * 600;
        break;

      default:
        break;
    }
  };

  const totalMileage = mileageValueCalc(moveDetails?.mileage);
  const totalPrice = (totalMileage) => {
    switch (moveDetails?.propertyType) {
      case "Man and van":
        return priceCalc(
          title,
          moveDetails?.duration,
          moveDetails?.numberOfMovers
        );
        break;
      case "Office removals":
        return priceCalc(
          title,
          moveDetails?.duration,
          moveDetails?.numberOfMovers
        );
        break;
      case "Studio flat":
        return priceCalc(
          title,
          moveDetails?.duration,
          moveDetails?.numberOfMovers
        );
        break;
      case "Furniture & Appliances":
        return priceCalc(
          title,
          moveDetails?.duration,
          moveDetails?.numberOfMovers
        );
        break;

      default:
        return priceCalc2(
          title,
          totalMileage,
          moveDetails?.numberOfMovers,
          moveDetails?.propertyType
        );
        break;
    }
  };

  const onBookNow = async () => {
    setSubmitLoading(true);
    const userData = await fetchAllMoversDetailsArray();

    updateBookS("book/move-package");
    updateAllMoverD({
      allPersonalDetails: userData?.personalDetails,
      allCompanyDetails: userData?.companyDetails,
      allCompanyPix: userData?.CompanyPix,
      allCompanyDocs: {
        regCertificates: userData?.RegCertificate,
        vehInsurances: userData?.VehInsurance,
        pubInsurances: userData?.PubInsurance,
        tranInsurances: userData?.TranInsurance,
        drivingLicenses: userData?.DrivingLicense,
      },
    });
    updateMove({
      movePackage: convertToSentenceCase(title),
      initialPackagePrice: totalPrice(totalMileage),
    });

    const bookingId = moveDetails?.bookingId;

    const bookingRef = doc(db, "bookingData", bookingId);

    try {
      await setDoc(
        bookingRef,

        {
          date: getCurrentDateFormatted(),
          movePackage: convertToSentenceCase(title),
          initialPackagePrice: totalPrice(totalMileage),
          stage: "book/move-package",
          // createdAt: serverTimestamp(),
        },
        { merge: true }
      );
      // return true;
      console.log("booking update was successful @ movePackage");
    } catch (error) {
      console.log(error);
      // return false;
      console.log("booking update was unsuccessful @ movePackage");
    }

    router.push(`/book/movers`);
  };

  // console.log(details)

  return (
    <div
      className={`card min-w-[300px] border-2 ${
        preferred ? "border-secondary" : "border-black/10"
      } justify-center items-center  bg-base-100 shadow-lg hover:shadow-2xl hover:scale-[1.02] duration-200`}
    >
      {/* title */}
      <div
        className={`${
          preferred ? "bg-secondary" : "bg-primary"
        }   w-[200px] mt-[-20px] rounded-[10px]`}
      >
        <h2 className="card-title justify-center text-white py-[20px]">
          {title}
        </h2>
      </div>

      <div className="card-body text-center w-[320px]">
        <div className="flex flex-col items-center w-full">
          {/* price */}
          <p
            className={`card-title ${
              preferred ? "text-secondary" : "text-primary"
            }  text-[30px] mb-[10px] font-extrabold`}
          >
            {/* ₤  */}
            {formatMovePrice(totalPrice(totalMileage))}
          </p>
          {/* <p className="">₤{price}</p> */}
          <div className="flex flex-col space-y-[5px] ">
            <p className="font-bold">*{moveDetails?.propertyType}*</p>
            <div className="flex items-center justify-center text-gray-500 ">
              {imageArray.map((_, index) => (
                <IoMdMan
                  className={`${
                    preferred ? "text-secondary" : "text-primary"
                  } text-primary text-[30px] mx-[-8px]`}
                  key={index}
                />
              ))}

              {/* <FaBusAlt className="text-primary text-[35px] ml-[5px]" /> */}
              <FaTruckMoving
                className={`${
                  preferred ? "text-secondary" : "text-primary"
                } text-primary text-[40px] ml-[5px]`}
              />
            </div>
            <p className="font-semibold text-[15px] text-gray-500 pt-[7px]">
              {moveDetails?.numberOfMovers} and Jumbo Van
            </p>
            {checkPropertyType() && (
              <p className="font-semibold text-[15px] text-gray-500">
                For a {moveDetails?.duration} hours move
              </p>
            )}
            {checkPropertyType() && (
              <p className="font-bold">
                {moveRate(title, moveDetails?.numberOfMovers)}
              </p>
            )}
          </div>
          <ul className="text-gray-500 mt-[15px] md:mt-[20px] text-start text-[13px] w-full">
            <li className="border-b  py-[5px] flex items-center">
              <span
                className={`${
                  preferred ? "text-secondary" : "text-primary"
                } mr-[5px] `}
              >
                <FiCheckCircle />
              </span>
              {f1}
            </li>
            <li className="border-b py-[5px] flex items-center">
              <span
                className={`${
                  preferred ? "text-secondary" : "text-primary"
                } mr-[5px] `}
              >
                <FiCheckCircle />
              </span>
              {f2}
            </li>
            <li className="border-b py-[5px] flex items-center">
              <span
                className={`${
                  preferred ? "text-secondary" : "text-primary"
                } mr-[5px] `}
              >
                <FiCheckCircle />
              </span>
              {f3}
            </li>
            <li className="border-b py-[5px] flex items-center">
              <span
                className={`${
                  preferred ? "text-secondary" : "text-primary"
                } mr-[5px] `}
              >
                <FiCheckCircle />
              </span>
              {f4}
            </li>
            <li className="border-b py-[5px] flex items-center">
              <span
                className={`${
                  preferred ? "text-secondary" : "text-primary"
                } mr-[5px] `}
              >
                <FiCheckCircle />
              </span>
              {f5}
            </li>
            <li className="border-b py-[5px] flex items-center">
              <span
                className={`${
                  preferred ? "text-secondary" : "text-primary"
                } mr-[5px] `}
              >
                <FiCheckCircle />
              </span>
              {f6}
            </li>
            {f7 && (
              <li className="border-b py-[5px] flex items-center">
                <span
                  className={`${
                    preferred ? "text-secondary" : "text-primary"
                  } mr-[5px] `}
                >
                  <FiCheckCircle />
                </span>
                {f7}
              </li>
            )}
            {f8 && (
              <li className="border-b py-[5px] flex items-center">
                <span
                  className={`${
                    preferred ? "text-secondary" : "text-primary"
                  } mr-[5px] `}
                >
                  <FiCheckCircle />
                </span>
                {f8}
              </li>
            )}
            {f9 && (
              <li className="border-b py-[5px] flex items-center">
                <span
                  className={`${
                    preferred ? "text-secondary" : "text-primary"
                  } mr-[5px] `}
                >
                  <FiCheckCircle />
                </span>
                {f9}
              </li>
            )}
            {f10 && (
              <li className="border-b py-[5px] flex items-center">
                <span
                  className={`${
                    preferred ? "text-secondary" : "text-primary"
                  } mr-[5px] `}
                >
                  <FiCheckCircle />
                </span>
                {f10}
              </li>
            )}
            {f11 && (
              <li className="border-b py-[5px] flex items-center">
                <span
                  className={`${
                    preferred ? "text-secondary" : "text-primary"
                  } mr-[5px] `}
                >
                  <FiCheckCircle />
                </span>
                {f11}
              </li>
            )}
            {f12 && (
              <li className="border-b py-[5px] flex items-center">
                <span
                  className={`${
                    preferred ? "text-secondary" : "text-primary"
                  } mr-[5px] `}
                >
                  <FiCheckCircle />
                </span>
                {f12}
              </li>
            )}
          </ul>
        </div>
      </div>
      <button
        onClick={onBookNow}
        disabled={submitLoading}
        className={`btn ${
          preferred ? "btn-secondary " : "btn-primary btn-outline"
        }  px-[30px] mb-[50px] group focus:text-white active:text-white`}
      >
        {!submitLoading && <span className=""> Book Now</span>}
        {submitLoading && (
          <>
            <span>Booking</span>
            <span
              className={`loading loading-dots loading-md ${
                submitLoading && "text-white"
              } ${
                preferred && !submitLoading
                  ? "text-white "
                  : "text-primary  group-hover:text-white"
              } `}
            ></span>
          </>
        )}
      </button>
    </div>
  );
};

export default PackageCard;
