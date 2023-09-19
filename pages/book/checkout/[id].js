import BookingLayout from "@/layouts/BookingLayout";
import { titleFont } from "@/utils/fonts";
import Head from "next/head";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";

import PriceDatePick from "@/components/BookingPages/movers/PriceDatePick";
import FeaturesScroll from "@/components/BookingPages/movers/FeaturesScroll";
import FullRating from "@/components/Rating/FullRating";
import MoverCard from "@/components/BookingPages/movers/MoverCard";
import { BiSolidPhoneCall } from "react-icons/bi";
import MoveDetails from "@/components/BookingPages/movers/MoveDetails";
import SummaryDetails from "@/components/BookingPages/Checkout/SummaryDetails";
import CheckoutForm from "@/components/BookingPages/Checkout/CheckoutForm";
import { getAllDetails } from "@/store/quoteSlice";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import Lottie from "lottie-react";
import movingVan from "@/lottieJsons/movingVan.json";
import { fetchAllMoversDetailsArray } from "@/lib/fetchData2";
import useQuote from "@/hooks/useQuote";
import useMover from "@/hooks/useMover";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/firebase";

const Checkout = ({ progressUrl, progressData, userData }) => {
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

  const [allPersonalDetails, setAllPersonalDetails] = useState([]);
  const [allCompanyDetails, setAllCompanyDetails] = useState([]);
  const [allCompanyPix, setAllCompanyPix] = useState([]);
  const [newMovers, setNewMovers] = useState([]);

  const [showModal, setShowModal] = useState(false);
  // const details = useSelector(getAllDetails);

  // const router = useRouter();

  const [payType, setPayType] = useState("");
  const [depositPart, setDepositPart] = useState(false);
  const [depositFull, setDepositFull] = useState(false);
  const [payMethod, setPayMethod] = useState("");
  const [card, setCard] = useState(false);
  const [paypal, setPaypal] = useState(false);

  // console.log(depositPart);
  // console.log(depositFull);

  const moveUrl = () => {
    switch (moveDetails.propertyType) {
      case "Office removals":
        return "man-and-van";

        break;
      case "Man and van":
        return "man-and-van";

        break;
      case "Studio flat":
        return "man-and-van";

        break;
      case "Furniture & Appliances":
        return "man-and-van";

        break;
      case "Storage":
        return "man-and-van";

        break;
      case "Home removals":
        return "home-removals";

        break;
      case "1 Bed property":
        return "home-removals";

        break;
      case "2 Bed property":
        return "home-removals";

        break;
      case "3 Bed property":
        return "home-removals";

        break;
      case "4 Bed property":
        return "home-removals";

        break;

      default:
        // router.push("/book");
        break;
    }
  };

  const cardOnchange = (e) => {
    setCard(e.target.checked);
    setPaypal(false);
  };
  const paypalOnchange = (e) => {
    setPaypal(e.target.checked);
    setCard(false);
  };

  useEffect(() => {
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

    updateLocationFrom({
      name: progressData?.address1,
      postCode: progressData?.postCode1,
      city: progressData?.city1,
      country: progressData?.country1,
      floor: progressData?.floor1,
      liftAvailable: progressData?.liftAvailable1,
    });

    updateLocationTo({
      name: progressData?.address2,
      postCode: progressData?.postCode2,
      city: progressData?.city2,
      country: progressData?.country2,
      floor: progressData?.floor2,
      liftAvailable: progressData?.liftAvailable2,
    });

    updatePersonal({
      firstName: progressData?.firstName,
      lastName: progressData?.lastName,
      email: progressData?.email,
      countryCode: progressData?.countryCode,
      telephone: progressData?.telephone,
    });

    updateMove({
      bookingId: progressData?.bookingId,
      propertyType: progressData?.propertyType,
      numberOfMovers: progressData?.numberOfMovers,
      mileage: progressData?.mileage,
      volume: progressData?.volume,
      duration: progressData?.duration,
      moveDate: progressData?.moveDate,
      moveDateRaw: null,
      movePackage: progressData?.movePackage,
      quoteRef: progressData?.quoteRef,
      initialPackagePrice: progressData?.initialPackagePrice,
    });
    updateMover({
      moverName: progressData?.moverName,
      moverTime: progressData?.moverTime,
      moverPrice: progressData?.moverPrice,
      priceSecondDay: progressData?.moverName,
      priceThirdDay: progressData?.moverName,
      priceOtherDays: progressData?.moverName,
      priceSundays: progressData?.moverName,
      pickPrice: progressData?.pickPrice,
      moveDateFormatted: progressData?.moveDateFormatted,
      dateId: progressData?.dateId,
    });
    updatePayment({
      paidPart: progressData?.paidPart,
      paidFull: progressData?.paidFull,
      paidPrice: progressData?.paidPrice,
    });
  }, []);

  useEffect(() => {
    if (!moverDetails.moverName) {
      router.push("/");
    }
  }, []);

  return (
    <>
      <Head>
        <title>Checkout - Removals and Selfstorage</title>
        <meta name="description" content="Rss removal and storage website" />
        <link rel="icon" href="/rrs_favicon.svg" />
      </Head>

      {moverDetails?.moverName ? (
        <BookingLayout>
          <main className="">
            <div className="mb-[70px] lg:mb-[100px] pt-[80px] md:pt-[100px] ">
              <div className="md:max-w-7xl mx-auto">
                {/* stepper */}
                <div className="w-full flex justify-center mb-[40px]">
                  <ul className="steps">
                    <li
                      onClick={() => {
                        router.push(`/book/${moveUrl()}`);
                      }}
                      className="step step-primary px-[10px] md:px-[40px] font-bold text-[14px] md:text-[16px] leading-[20px] cursor-pointer"
                    >
                      Move Details
                    </li>
                    <li
                      onClick={() => {
                        router.push(`/book/move-package`);
                      }}
                      className="step step-primary  font-bold text-[14px] md:text-[16px] leading-[25px] cursor-pointer"
                    >
                      Move Package
                    </li>
                    <li
                      onClick={() => {
                        router.push(`/book/movers`);
                      }}
                      className="step step-primary font-bold text-[14px] md:text-[16px] leading-[25px] cursor-pointer"
                    >
                      Choose Mover
                    </li>
                    <li className="step step-primary font-bold text-[14px] md:text-[16px] leading-[25px] ">
                      Checkout
                    </li>
                  </ul>
                </div>

                {/* features links */}
                <FeaturesScroll />
                {/* Title */}
                {/* <div className="w-full flex justify-center py-[30px] md:py-[40px]">
                  <h3
                    className={`${titleFont.variable} font-sans2 text-2xl md:text-4xl font-extrabold flex-col items-center justify-center`}
                  >
                    <p className="">Check-out</p>{" "}
                    <div className="w-full bg-primary/20 h-[20px] mt-[-12px] "></div>
                  </h3>
                </div> */}
                {/* checkout section*/}
                <div className="flex flex-col-reverse mt-[30px]  lg:space-y-0 lg:flex-row lg:space-x-[10px] mx-[10px] md:mx-[20px]">
                  {/* left section - pament form */}
                  <div className="lg:flex-[1.3] w-full">
                    <CheckoutForm
                    // cardOnchange={cardOnchange}
                    // paypalOnchange={paypalOnchange}
                    // depositFull={depositFull}
                    // depositPart={depositPart}
                    // setDepositFull={setDepositFull}
                    // setDepositPart={setDepositPart}
                    // scriptLoaded={scriptLoaded}
                    />
                  </div>
                  {/* right section - Move summary */}
                  <div className="lg:flex-[1] w-full mb-[30px] lg:mb-[0px]">
                    <SummaryDetails
                    // card={card}
                    // paypal={paypal}
                    // depositFull={depositFull}
                    // depositPart={depositPart}
                    // setDepositFull={setDepositFull}
                    // setDepositPart={setDepositPart}
                    />
                  </div>
                </div>
              </div>
            </div>
            {/* <div className="w-[20vw] h-[100%] z-[2000] absolute top-0 right-0 bg-white">
              <p className="text-3xl font-bold">Side bar</p>
          </div> */}
          </main>
        </BookingLayout>
      ) : (
        <div className="flex items-center justify-center h-[100vh] ">
          <div className="flex justify-center w-full">
            <Lottie animationData={movingVan} className="w-[400px]" />
          </div>
          {/* <span className="h-full loading loading-bars text-primary w-[40px] lg:w-[60px]"></span> */}
        </div>
      )}
    </>
  );
};

export default Checkout;

export async function getServerSideProps(context) {
  const { id } = context.params; // Access the UID from the URL
  const userData = await fetchAllMoversDetailsArray();

  const bookingRef = doc(db, "bookingData", id);
  const docSnap = await getDoc(bookingRef);

  const progressData = docSnap.data();

  console.log({ progressData });

  return {
    props: {
      // userData,
      progressUrl: id,
      progressData,
      userData,
    },
  };
}
