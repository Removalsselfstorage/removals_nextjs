import BookingLayout from "@/layouts/BookingLayout";
import { titleFont } from "@/utils/fonts";
import Head from "next/head";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import PriceDatePick from "@/components/BookingPages/movers/PriceDatePick";
import FeaturesScroll from "@/components/BookingPages/movers/FeaturesScroll";
import FullRating from "@/components/Rating/FullRating";
import MoverCard from "@/components/BookingPages/movers/MoverCard";
import { BiLogOut, BiSave, BiSolidPhoneCall } from "react-icons/bi";
import MoveDetails from "@/components/BookingPages/movers/MoveDetails";
import {
  getAllDetails,
  updatePickPrice,
  updateMoverSideDetails,
} from "@/store/quoteSlice";
import { useDispatch, useSelector } from "react-redux";
import { homeMovers } from "@/dummyData/dummyData";
import {
  calculateMoverPrice,
  convertDateFormat,
  decreaseByPercentage,
  getFirstSortedHomeMover,
  getFormattedTodayDate,
  increaseByPercentage,
  sortHomeMoversAndExcludeHighest,
  trimDate,
} from "@/utils/logics";
import Loader1 from "@/components/loaders/loader1";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import SideDrawer from "@/components/BookingPages/movers/SideDrawer";
import { getAllMoverDetails } from "@/store/moverSlice";
import emailjs from "@emailjs/browser";
import { moversPageEmail, progressEmail } from "@/lib/sendCustomEmail";
import Lottie from "lottie-react";
import EmailSent from "@/lottieJsons/EmailSent2.json";
import movingVan from "@/lottieJsons/movingVan.json";
import useQuote from "@/hooks/useQuote";
import useMover from "@/hooks/useMover";
import ReserveSide from "@/components/Reservations/ReserveSide";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/firebase";
import CountDown from "@/components/Reservations/countDown";
import Countdown from "@/components/Reservations/countDown";
import FeaturesScroll2 from "@/components/Reservations/FeaturesScroll2";
import { FiEdit } from "react-icons/fi";

const Reservations = ({ progressUrl, progressData }) => {
  const {
    setReserveDetailsFxn,
    updateReserveDetailsFxn,
    resetReserveDetailsFxn,
    reserveDetails,
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
    reserveId,
    updateReserveIdFxn,
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

  useEffect(() => {
    setReserveDetailsFxn({
      bookDate: progressData?.date,
      address1: progressData?.address1,
      postCode1: progressData?.postCode1,
      city1: progressData?.city1,
      country1: progressData?.country1,
      floor1: progressData?.floor1,
      liftAvailable1: progressData?.liftAvailable1,
      address2: progressData?.address2,
      postCode2: progressData?.postCode2,
      city2: progressData?.city2,
      country2: progressData?.country2,
      floor2: progressData?.floor2,
      liftAvailable2: progressData?.liftAvailable2,
      firstName: progressData?.firstName,
      lastName: progressData?.lastName,
      email: progressData?.email,
      countryCode: progressData?.countryCode,
      telephone: progressData?.telephone,
      bookingId: progressData?.bookingId,
      propertyType: progressData?.propertyType,
      numberOfMovers: progressData?.numberOfMovers,
      mileage: progressData?.mileage,
      volume: progressData?.volume,
      duration: progressData?.duration,
      moveDate: progressData?.moveDate,
      movePackage: progressData?.movePackage,
      quoteRef: progressData?.quoteRef,
      initialPackagePrice: progressData?.initialPackagePrice,
      moverName: progressData?.moverName,
      moverTime: progressData?.moverTime,
      moverPrice: progressData?.moverPrice,
      pickPrice: progressData?.pickPrice,
      moveDateFormatted: progressData?.moveDateFormatted,
      dateId: progressData?.dateId,
      paidPart: progressData?.paidPart,
      paidFull: progressData?.paidFull,
      paidPrice: progressData?.paidPrice,
      paymentType: progressData?.paymentType,
    });

    // updateLocationFrom({
    //   name: progressData?.address1,
    //   postCode: progressData?.postCode1,
    //   city: progressData?.city1,
    //   country: progressData?.country1,
    //   floor: progressData?.floor1,
    //   liftAvailable: progressData?.liftAvailable1,
    // });

    // updateLocationTo({
    //   name: progressData?.address2,
    //   postCode: progressData?.postCode2,
    //   city: progressData?.city2,
    //   country: progressData?.country2,
    //   floor: progressData?.floor2,
    //   liftAvailable: progressData?.liftAvailable2,
    // });

    // updatePersonal({
    //   firstName: progressData?.firstName,
    //   lastName: progressData?.lastName,
    //   email: progressData?.email,
    //   countryCode: progressData?.countryCode,
    //   telephone: progressData?.telephone,
    // });

    // updateMove({
    //   bookingId: progressData?.bookingId,
    //   propertyType: progressData?.propertyType,
    //   numberOfMovers: progressData?.numberOfMovers,
    //   mileage: progressData?.mileage,
    //   volume: progressData?.volume,
    //   duration: progressData?.duration,
    //   moveDate: progressData?.moveDate,
    //   moveDateRaw: null,
    //   movePackage: progressData?.movePackage,
    //   quoteRef: progressData?.quoteRef,
    //   initialPackagePrice: progressData?.initialPackagePrice,
    // });
    // updateMover({
    //   moverName: progressData?.moverName,
    //   moverTime: progressData?.moverTime,
    //   moverPrice: progressData?.moverPrice,
    //   //   priceSecondDay: progressData?.moverName,
    //   //   priceThirdDay: progressData?.moverName,
    //   //   priceOtherDays: progressData?.moverName,
    //   //   priceSundays: progressData?.moverName,
    //   pickPrice: progressData?.pickPrice,
    //   moveDateFormatted: progressData?.moveDateFormatted,
    //   dateId: progressData?.dateId,
    // });
    // updatePayment({
    //   paidPart: progressData?.paidPart,
    //   paidFull: progressData?.paidFull,
    //   paidPrice: progressData?.paidPrice,
    //   paymentType: progressData?.paymentType,
    // });
  }, []);

  console.log({ reserveDetails });

  return (
    <>
      <Head>
        <title>Removals and Selfstorage - Reservations</title>
        <meta name="description" content="Rss removal and storage website" />
        <link rel="icon" href="/rrs_favicon.svg" />
      </Head>
      {reserveDetails ? (
        <BookingLayout>
          <main className="">
            <div className="mb-[70px] lg:mb-[100px] pt-[80px] md:pt-[80px] ">
              <div className="md:max-w-7xl mx-auto">
                {/* stepper */}
                <FeaturesScroll2 />
                {/* features links */}
                {/* <FeaturesScroll /> */}

                {/* price date pick */}
                {/* <PriceDatePick
                  setShowLoader={setShowLoader}
                  setTodayPick={setTodayPick}
                /> */}
                {/* movers list row */}
                <div className="flex flex-col mt-[20px] space-y-[10px] lg:space-y-0 lg:flex-row lg:space-x-[10px] mx-[10px] md:mx-[20px]">
                  {/* left section */}
                  <div className="lg:flex-[1]  w-full">
                    <ReserveSide />
                  </div>
                  {/* right section */}
                  <div className="bg-white shadow-lg rounded-[30px] lg:flex-[3] px-[20px] py-[30px] md:px-[30px] w-full">
                    {/* heading */}
                    <div className="flex flex-col space-y-[10px] md:flex-row md:space-y-0 md:justify-between md:items-center">
                      <div className="flex items-center space-x-[15px]">
                        <p className="text-[40px]">👋</p>
                        <div className="">
                          <h1 className="text-2xl font-bold mb-[10px] md:mb-[0px] text-secondary">
                            Welcome {reserveDetails.firstName}{" "}
                            {reserveDetails.lastName},
                          </h1>
                          <p className="text-gray-500 font-semibold">
                            Thank you for choosing Removals & Self Storage
                          </p>
                        </div>
                      </div>
                      <div
                        onClick={() => {
                          router.push("/reserve-login");
                          updateReserveIdFxn("");
                          // setTimeout(() => {
                          //   resetReserveDetailsFxn();
                          // }, 2000);
                        }}
                        className="btn btn-secondary"
                      >
                        <span className="">
                          <BiLogOut className="text-[20px]" />
                        </span>
                        <span className="">Log Out</span>
                      </div>
                    </div>
                    <div className="flex flex-col space-y-[20px] lg:space-y-0 lg:flex-row lg:space-x-[40px]  mt-[30px]">
                      <div className="stats bg-primary text-white ">
                        <div className="stat">
                          <div className="stat-title text-white">
                            Payment made
                          </div>
                          <div className="stat-value">
                            ₤{reserveDetails?.paidPrice}
                          </div>
                          <div className="stat-actions">
                            <div className="text-white font-semibold">
                              ({reserveDetails?.paymentType} Deposit)
                            </div>
                          </div>
                        </div>
                        {/* payment stat */}
                        <div className="stat ">
                          <div className="stat-title text-white">
                            Outstanding Payment
                          </div>
                          <div className="stat-value">
                            ₤
                            {reserveDetails?.moverPrice -
                              reserveDetails?.paidPrice}
                          </div>
                          <div className="stat-actions space-x-[10px]">
                            <button className="btn btn-sm">
                              Pay Outstanding
                            </button>
                          </div>
                        </div>
                      </div>
                      {reserveDetails?.moveDate && (
                        <div className="flex flex-col space-y-[10px]">
                          <p className="font-bold text-[20px]">
                            Move Day Countdown
                          </p>
                          <Countdown
                            date={reserveDetails?.moveDate}
                            // time={moverDetails?.moverTime}
                          />
                          <p className="font-bold text-[15px] text-gray-500">
                            {dayjs(
                              convertDateFormat(reserveDetails.moveDate)
                            ).format("dddd, MMMM D, YYYY")}
                          </p>
                        </div>
                      )}
                    </div>
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

export default Reservations;

export async function getServerSideProps(context) {
  const { id } = context.params; // Access the UID from the URL
  // const userData = await fetchAllMoversDetailsArray();

  const bookingRef = doc(db, "bookingData", id);
  const docSnap = await getDoc(bookingRef);

  const progressData = docSnap.data();

  // console.log({ progressData });

  return {
    props: {
      // userData,
      progressUrl: id,
      progressData,
      // userData,
    },
  };
}
