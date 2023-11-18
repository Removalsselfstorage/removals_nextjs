import useQuote from "@/hooks/useQuote";
import AdminLayout from "@/layouts/AdminLayout";
import {
  convertDateFormat,
  formatMovePrice,
  formatMovePrice2,
  getCurrentDateFormatted,
  trimDateFormat,
  trimDateFormats,
} from "@/utils/logics";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { AiOutlineLeft } from "react-icons/ai";
import { BsSendFill } from "react-icons/bs";
import { FiEdit } from "react-icons/fi";
import { IoIosSend } from "react-icons/io";
// import ReactDOMServer from "react-dom/server";
// import { useReactToPrint } from "react-to-print";
import { useRef } from "react";
import html2canvas from "html2canvas";
import { invoiceEmail, quoteEmail } from "@/lib/sendCustomEmail";
import { quoteTemplate } from "./htmlTemplate1";
import { db, storage } from "@/firebase";
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
import { BiSave } from "react-icons/bi";
import CustomFileInput from "../Inputs/CustomFileInput";
// import * as htmlToImage from "html-to-image";
// import htmlToImage from "html-to-image";

// import { toPng, toJpeg, toBlob, toPixelData, toSvg } from "html-to-image";
import { useCallback } from "react";
// import { useToPng } from "@hugocxl/react-to-image";
// import { render } from "@react-email/render";
import QuoteDetails from "./quoteDetails";
// import { renderToString } from "react-dom/server";
import QuoteDetails2 from "./invoiceDetails";
import InvoiceDetails from "./invoiceDetails";
import Link from "next/link";

const Invoice = ({ progressData, quoteFeatures, quoteFeatures2 }) => {
  const {
    resetAllQuotesFxn,
    // quoteFeatures,
    setQuoteFeaturesFxn,
    addNewQuoteFeaturesFxn,
    updateQuoteFeatureNameFxn,
    removeQuoteFeatureFxn,
    //
    // quoteFeatures2,
    removeQuoteFeatureFxn2,
    addNewQuoteFeaturesFxn2,
    //
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

  const checkPropertyType = () => {
    switch (progressData?.propertyType) {
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
      case "1 Bed property":
        return false;
        break;
      case "2 Bed property":
        return false;
        break;
      case "3 Bed property":
        return false;
        break;
      case "4 Bed property":
        return false;
        break;

      default:
        break;
    }
  };

  // const [_, convert, ref] = useToPng({
  //   quality: 0.8,
  //   onSuccess: (data) => {
  //     const link = document.createElement("a");
  //     link.download = "my-image-name.jpeg";
  //     link.href = dataUrl;
  //     link.click();
  //   },
  // });

  // const { ref, isLoading, getSvg, getPng } = useToImage()

  const [showLoader, setShowLoader] = useState(false);
  const [showLoader2, setShowLoader2] = useState(false);
  const [todayPick, setTodayPick] = useState(false);
  const [selectedTime, setSelectedTime] = useState(null);
  const [timeValue, setTimeValue] = useState("");
  const [clickedModalOpen, setClickedModalOpen] = useState(false);
  const [progressLoading, setProgressLoading] = useState(false);
  const [showProgressMessage, setShowProgressMessage] = useState(false);
  const [email, setEmail] = useState("");
  const [submitError, setSubmitError] = useState(false);
  const [emailError, setEmailError] = useState(true);
  const [showSent, setShowSent] = useState(false);

  const [imageUpload, setImageUpload] = useState(null);
  // const [previewUrl, setPreviewUrl] = useState("");
  const [imageName, setImageName] = useState("");
  const [activateError, setActivateError] = useState(false);
  const [fileUploadError, setFileUploadError] = useState("");

  const [submitLoading, setSubmitLoading] = useState(false);
  const [submitLoading2, setSubmitLoading2] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [showError, setShowError] = useState(false);

  const [imageData, setImageData] = useState("");
  const [previewUrl, setPreviewUrl] = useState("");

  const componentRef = useRef(null);

  const date = getCurrentDateFormatted();

  const [udate] = useState(() => trimDateFormat(date));
  const [uname] = useState(
    () => progressData?.firstName + " " + progressData?.lastName
  );
  const [uemail] = useState(() => progressData?.email);
  const [ubookref] = useState(() => progressData?.quoteRef);
  const [uphone] = useState(() => `${progressData?.telephone}`);
  // const [uphone] = useState(
  //   () => `${personalDetails?.countryCode} ${personalDetails?.telephone}`
  // );
  const [uaddress1] = useState(() => ` ${progressData?.address1}`);
  const [uaddressFloor1] = useState(
    () =>
      `Floor (${progressData?.floor1}) --- Lift: ${
        progressData?.liftAvailable1 ? "Available" : "Not Available"
      }`
  );
  const [uaddress2] = useState(() => `${progressData?.address2}`);
  const [uaddressFloor2] = useState(
    () =>
      `Floor (${progressData?.floor2}) --- Lift: ${
        progressData?.liftAvailable2 ? "Available" : "Not Available"
      }`
  );
  const [uproperty] = useState(() => progressData?.propertyType);
  const [umovers] = useState(() => progressData?.numberOfMovers);
  const [umileage] = useState(
    () =>
      (progressData?.mileage === "Select"
        ? "---"
        : `${progressData?.mileage} miles`) ?? "---"
  );
  const [uvolume] = useState(() => `${progressData?.volume} cuft` ?? "---");
  const [uduration] = useState(() =>
    checkPropertyType() ? `${progressData?.duration} hours` : "---"
  );
  const [umoveDate] = useState(() =>
    trimDateFormats(progressData?.moveDateFormatted)
  );
  // const [umoveDate] = useState(() => moverDetails?.moveDateFormatted);
  const [upackage] = useState(() => progressData?.movePackage);
  const [utime] = useState(() => progressData?.moverTime);
  const [uincludes] = useState(() => progressData?.quoteIncludes);

  const uincludes1 = uincludes?.[0]?.name ?? "---";
  const uincludes2 = uincludes?.[1]?.name ?? "---";
  const uincludes3 = uincludes?.[2]?.name ?? "---";
  const uincludes4 = uincludes?.[3]?.name ?? "---";
  const uincludes5 = uincludes?.[4]?.name ?? "---";

  const [uexcludes] = useState(() => progressData?.quoteExcludes);

  const uexcludes1 = uexcludes?.[0]?.name ?? "---";
  const uexcludes2 = uexcludes?.[1]?.name ?? "---";
  const uexcludes3 = uexcludes?.[2]?.name ?? "---";
  const uexcludes4 = uexcludes?.[3]?.name ?? "---";
  const uexcludes5 = uexcludes?.[4]?.name ?? "---";
  const [ucharge] = useState(
    () => `${formatMovePrice2(Number(progressData?.moverPrice))}`
  );
  const [uvat] = useState(() => `${formatMovePrice2(0)}`);
  const [utotal] = useState(
    () => `${formatMovePrice2(Number(progressData?.moverPrice))}`
  );
  const [ulink] = useState(
    () => `/book/checkout/quote/${progressData?.bookingId}`
  );

  // console.log({
  //   udate,
  //   uemail,
  //   ubookref,
  //   uname,
  //   uphone,
  //   uaddress1,
  //   uaddress2,
  //   uproperty,
  //   umovers,
  //   umileage,
  //   uduration,
  //   umoveDate,
  //   upackage,
  //   utime,
  //   uincludes,
  //   uexcludes,
  //   ucharge,
  //   uvat,
  //   utotal,
  //   ulink,
  // });

  console.log({ uincludes1, moverDetails });

  const uploadImg = async () => {
    let uploadImgUrl;

    if (imageName && imageUpload) {
      const name = ubookref + new Date().getTime();
      const imageRef = ref(storage, `quotesUpload/${name}`);

      const status = await uploadBytes(imageRef, imageUpload)
        .then((snapshot) => {
          return snapshot;
        })
        .catch((error) => {
          console.log(error);
          return false;
        });

      if (!status) return false;

      uploadImgUrl = await getDownloadURL(status.ref).then((url) => {
        return url;
      });
    }
    // setPreviewUrl(uploadImgUrl);
    setImageData(uploadImgUrl);
  };

  const sendQuoteHandle = async () => {
    setSubmitLoading(true);
  };

  const captureImage = async () => {
    setSubmitLoading2(true);
    const canvas = await html2canvas(componentRef.current);
    // setDataUrl(canvas.toDataURL());
    const imgData = canvas.toDataURL("image/png", 1.0);
    // const img = new Image();
    const link = document.createElement("a");
    link.href = imgData;
    // link.download = `Quote-${getCurrentDateFormatted()}`;
    link.download = `Invoice-${ubookref} ${getCurrentDateFormatted()}`;

    link.click();

    setImageData(imgData);
    setSubmitLoading2(false);
    // console.log({ imgData, linkname: link.name, link, imageData });
    // setImageData(canvas.toDataURL());
  };

  console.log({
    udate,
    uemail,
    ubookref,
    uname,
    uphone,
    uaddress1,
    uaddress2,
    uproperty,
    umovers,
    umileage,
    uvolume,
    uduration,
    umoveDate,
    upackage,
    utime,
    uincludes1,
    uincludes2,
    uincludes3,
    uincludes4,
    uincludes5,
    uexcludes1,
    uexcludes2,
    uexcludes3,
    uexcludes4,
    uexcludes5,
    ucharge,
    uvat,
    utotal,
    ulink,
  });

  const tp =
    Number(moverDetails?.moverPrice) + Number(moverDetails?.extraPrice);

  return (
    <div className="">
      <div className="" ref={componentRef}>
        <InvoiceDetails
          udate={udate}
          uemail={uemail}
          ubookref={ubookref}
          uname={uname}
          uphone={uphone}
          uaddress1={uaddress1}
          uaddressFloor1={uaddressFloor1}
          uaddress2={uaddress2}
          uaddressFloor2={uaddressFloor2}
          uproperty={uproperty}
          umovers={umovers}
          umileage={umileage}
          uvolume={uvolume}
          uduration={uduration}
          umoveDate={umoveDate}
          upackage={upackage}
          utime={utime}
          uincludes={uincludes}
          uexcludes={uexcludes}
          uincludes1={uincludes1}
          uincludes2={uincludes2}
          uincludes3={uincludes3}
          uincludes4={uincludes4}
          uincludes5={uincludes5}
          uexcludes1={uexcludes1}
          uexcludes2={uexcludes2}
          uexcludes3={uexcludes3}
          uexcludes4={uexcludes4}
          uexcludes5={uexcludes5}
          ucharge={ucharge}
          uvat={uvat}
          utotal={utotal}
          ulink={ulink}
          checkPropertyType={checkPropertyType}
        />
      </div>

      {/* submit button2 */}
      <div className=" w-full px-[20px] lg:px-[30px] mt-[50px] mb-[50px]">
        <div className="flex  w-full justify-center my-[20px]">
          {/* <Link
            href={ulink}
            onClick={sendQuoteHandle}
            className="btn btn-secondary btn-wide flex items-center space-x-[5px] h-[60px]"
            disabled={submitLoading || submitLoading2}
          >
            {!submitLoading && <span className="">Pay Now</span>}
            {submitLoading && (
              <span className="loading loading-spinner loading-md text-white"></span>
            )}
            {!submitLoading && (
              <span className="">
                <IoIosSend className="text-[27px]" />
              </span>
            )}
          </Link> */}
          <button
            // onClick={removalFormSubmit}
            onClick={captureImage}
            // onClick={convert}
            // disabled={submitLoading || submitLoading2}
            className="btn btn-secondary btn-wide flex items-center space-x-[5px] h-[60px]"
          >
            {!submitLoading2 && <span className="">Download Invoice</span>}
            {submitLoading2 && (
              <span className="loading loading-spinner loading-md text-white"></span>
            )}
            {!submitLoading2 && (
              <span className="">
                <BiSave className="text-[27px]" />
              </span>
            )}
          </button>
        </div>
      </div>

      {/* <div className="px-[20px] md:px-[0px] text-[16px] justify-center mt-[20px] flex flex-col space-y-[10px] md:space-y-0 md:flex-row md:items-center md:space-x-[10px] mb-[10px]">
        <p className="font-bold text-secondary">Payment Link:</p>
        <p className="font-bold link ">{ulink}</p>
      </div> */}

      {showMessage && (
        <div className="text-[14px] mt-[15px] text-center text-primary bg-primary/20 rounded-[10px] py-[10px] px-[30px]">
          Quote has been successfully sent
        </div>
      )}
      {showError && (
        <div className="text-[14px] mt-[15px] text-center text-secondary bg-secondary/20 rounded-[10px] py-[10px] px-[30px]">
          Quote sending was unsuccessful
        </div>
      )}
    </div>
  );
};

export default Invoice;
