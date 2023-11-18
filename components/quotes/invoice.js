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
import ReactDOMServer from "react-dom/server";
import { useReactToPrint } from "react-to-print";
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
import htmlToImage from "html-to-image";

import { toPng, toJpeg, toBlob, toPixelData, toSvg } from "html-to-image";
import { useCallback } from "react";
// import { useToPng } from "@hugocxl/react-to-image";
import { render } from "@react-email/render";
import QuoteDetails from "./quoteDetails";
import { renderToString } from "react-dom/server";
import QuoteDetails2 from "./invoiceDetails";
import InvoiceDetails from "./invoiceDetails";

const Invoice = () => {
  const {
    resetAllQuotesFxn,
    updateCreateTypeFxn,
    createType,
    quoteFeatures,
    setQuoteFeaturesFxn,
    addNewQuoteFeaturesFxn,
    updateQuoteFeatureNameFxn,
    removeQuoteFeatureFxn,
    //
    quoteFeatures2,
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

  const [imageUpload, setImageUpload] = useState(null);
  // const [previewUrl, setPreviewUrl] = useState("");
  const [imageName, setImageName] = useState("");

  const [submitLoading, setSubmitLoading] = useState(false);
  const [submitLoading2, setSubmitLoading2] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [showError, setShowError] = useState(false);

  const componentRef = useRef(null);

  const date = getCurrentDateFormatted();

  const [udate] = useState(() => trimDateFormat(date));
  const [uname] = useState(
    () => personalDetails?.firstName + " " + personalDetails?.lastName
  );
  const [uemail] = useState(() => personalDetails?.email);
  const [ubookref] = useState(() => moveDetails?.quoteRef);
  const [uphone] = useState(() => `${personalDetails?.telephone}`);
  const [uaddress1] = useState(() => ` ${serviceLocation?.locationFrom?.name}`);
  const [uaddressFloor1] = useState(
    () =>
      `Floor (${serviceLocation?.locationFrom?.floor}) --- Lift: ${
        serviceLocation?.locationFrom?.liftAvailable
          ? "Available"
          : "Not Available"
      }`
  );
  const [uaddress2] = useState(() => `${serviceLocation?.locationTo?.name}`);
  const [uaddressFloor2] = useState(
    () =>
      `Floor (${serviceLocation?.locationTo?.floor}) --- Lift: ${
        serviceLocation?.locationTo?.liftAvailable
          ? "Available"
          : "Not Available"
      }`
  );
  const [uproperty] = useState(() => moveDetails?.propertyType);
  const [umovers] = useState(() => moveDetails?.numberOfMovers);
  const [umileage] = useState(
    () =>
      (moveDetails?.mileage === "Select"
        ? "---"
        : `${moveDetails?.mileage} miles`) ?? "---"
  );
  const [uvolume] = useState(() => `${moveDetails?.volume} cuft` ?? "---");
  const [uduration] = useState(() =>
    checkPropertyType() ? `${moveDetails?.duration} hours` : "---"
  );
  const [umoveDate] = useState(() =>
    trimDateFormats(moverDetails?.moveDateFormatted)
  );
  const [upackage] = useState(() => moveDetails?.movePackage);
  const [utime] = useState(() => moverDetails?.moverTime);
  const [uincludes] = useState(() => quoteFeatures);

  const uincludes1 = uincludes[0]?.name ?? "---";
  const uincludes2 = uincludes[1]?.name ?? "---";
  const uincludes3 = uincludes[2]?.name ?? "---";
  const uincludes4 = uincludes[3]?.name ?? "---";
  const uincludes5 = uincludes[4]?.name ?? "---";

  const [uexcludes] = useState(() => quoteFeatures2);

  const uexcludes1 = uexcludes[0]?.name ?? "---";
  const uexcludes2 = uexcludes[1]?.name ?? "---";
  const uexcludes3 = uexcludes[2]?.name ?? "---";
  const uexcludes4 = uexcludes[3]?.name ?? "---";
  const uexcludes5 = uexcludes[4]?.name ?? "---";
  const [ucharge] = useState(
    () => `${formatMovePrice2(Number(moverDetails?.moverPrice))}`
  );
  const [uvat] = useState(() => `${formatMovePrice2(0)}`);
  const [utotal] = useState(
    () => `${formatMovePrice2(Number(moverDetails?.moverPrice))}`
  );
  const [ulink] = useState(
    () =>
      `https://removalstorage.vercel.app/book/checkout/invoice/${moveDetails?.bookingId}`
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

  // console.log({ uincludes1 });

  const params = {
    udate,
    uemail,
    ubookref,
    uname,
    uphone,
    uaddress1,
    uaddressFloor1,
    uaddress2,
    uaddressFloor2,
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
  };

  const sendQuoteHandle = async () => {
    setSubmitLoading(true);
    setShowError(false);
    setShowMessage(false);

    try {
      await invoiceEmail(uemail, params);
      setSubmitLoading(false);
      setShowMessage(true);
      // resetAllQuotesFxn();

      // setTimeout(() => {
      //   router.push("/secret-admin/create");
      // }, 3000);
    } catch (error) {
      setSubmitLoading(false);
      setShowError(true);
    }
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

    // setImageData(imgData);
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
      <div className=" w-full px-[20px] lg:px-[30px] border-t-[2px] pt-[30px] mt-[50px] mb-[50px]">
        <div className="flex flex-col md:flex-row space-y-[20px] md:space-y-0 w-full md:justify-center my-[20px] md:space-x-[20px]">
          <button
            // onClick={removalFormSubmit}
            onClick={captureImage}
            // onClick={convert}
            disabled={submitLoading || submitLoading2}
            className="btn btn-secondary btn-wide flex items-center space-x-[5px] h-[60px]"
          >
            {!submitLoading2 && <span className="">Save</span>}
            {submitLoading2 && (
              <span className="loading loading-spinner loading-md text-white"></span>
            )}
            {!submitLoading2 && (
              <span className="">
                <BiSave className="text-[27px]" />
              </span>
            )}
          </button>

          <div
            onClick={sendQuoteHandle}
            className="btn btn-primary btn-wide flex items-center space-x-[5px] h-[60px]"
            disabled={submitLoading || submitLoading2}
          >
            {!submitLoading && <span className="">Send Invoice</span>}
            {submitLoading && (
              <span className="loading loading-spinner loading-md text-white"></span>
            )}
            {!submitLoading && (
              <span className="">
                <IoIosSend className="text-[27px]" />
              </span>
            )}
          </div>
        </div>
      </div>

      {/* <div className="px-[20px] md:px-[0px] text-[16px] justify-center mt-[20px] flex flex-col space-y-[10px] md:space-y-0 md:flex-row md:items-center md:space-x-[10px] mb-[10px]">
        <p className="font-bold text-secondary">Payment Link:</p>
        <p className="font-bold link ">{ulink}</p>
      </div> */}

      {showMessage && (
        <div className="text-[14px] mt-[15px] text-center text-primary bg-primary/20 rounded-[10px] py-[10px] px-[30px]">
          Invoice has been successfully sent
        </div>
      )}
      {showError && (
        <div className="text-[14px] mt-[15px] text-center text-secondary bg-secondary/20 rounded-[10px] py-[10px] px-[30px]">
          Invoice sending was unsuccessful
        </div>
      )}
    </div>
  );
};

export default Invoice;
