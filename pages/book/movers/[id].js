import BookingLayout from "@/layouts/BookingLayout";
import { titleFont } from "@/utils/fonts";
import Head from "next/head";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";

import PriceDatePick from "@/components/BookingPages/movers/PriceDatePick";
import FeaturesScroll from "@/components/BookingPages/movers/FeaturesScroll";
import FullRating from "@/components/Rating/FullRating";
import MoverCard from "@/components/BookingPages/movers/MoverCard";
import { BiSave, BiSolidPhoneCall } from "react-icons/bi";
import MoveDetails from "@/components/BookingPages/movers/MoveDetails";
import {
  getAllDetails,
  updatePickPrice,
  updateMoverSideDetails,
  updateLocationDetails,
  updatePersonalDetails,
  updateMoveDetails,
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
import { getAllMoverDetails, updateAllMoverData } from "@/store/moverSlice";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/firebase";
import { fetchAllMoversDetailsArray } from "@/lib/fetchData2";
import { progressEmail } from "@/lib/sendCustomEmail";
import EmailSent from "@/lottieJsons/EmailSent2.json";
import Lottie from "lottie-react";
import movingVan from "@/lottieJsons/movingVan.json";
import useQuote from "@/hooks/useQuote";
import useMover from "@/hooks/useMover";

const Movers = ({ progressUrl, progressData, userData }) => {
  const [progressData2, setProgressdata2] = useState([]);
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

  // const fetchUserData = async () => {
  //   try {
  //     await fetchAllMoversDetailsArray();
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  // const fetchProgressData = async () => {
  //   try {
  //     const bookingRef = doc(db, "bookingData", progressUrl);
  //     const docSnap = await getDoc(bookingRef);

  //     return docSnap.data();
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  useEffect(() => {
   

    const priceFirstDay = progressData.initialPackagePrice;
    const priceFridays = priceFirstDay;
    const priceSaturdays = priceFirstDay;
    const priceSundays = increaseByPercentage(priceFirstDay, 4).toFixed();
    const priceOtherDays = decreaseByPercentage(priceFirstDay, 3).toFixed();
    const priceFridaysAfter3Weeks = decreaseByPercentage(
      priceFirstDay,
      2.5
    ).toFixed();
    const priceSaturdaysAfter3Weeks = decreaseByPercentage(
      priceFirstDay,
      2.5
    ).toFixed();
    const priceSundaysAfter3Weeks = increaseByPercentage(
      priceFirstDay,
      3.5
    ).toFixed();
    const priceOtherDaysAfter3Weeks = decreaseByPercentage(
      priceFirstDay,
      3
    ).toFixed();

    updatePickP(priceFirstDay);

    const allPersonalDetails = userData?.personalDetails;
    const allCompanyDetails = userData?.companyDetails;
    const allCompanyPix = userData?.CompanyPix;

    const newMov = allPersonalDetails?.map((pd, index) => ({
      name: pd.generatedName,
      phone: pd.phone,
      email: pd.email,
      loadArea: "H-2.1m, L-3.2m, W-2.1m",
      rating: pd.rating,
      reviewCount: pd.reviewCount,
      hireCount: pd.hireCount,
      score: pd.score,
      companyDescription: allCompanyDetails[index].companyBio,
      imageUrl: allCompanyPix[index].companyProfilePixUrl,
      approved: pd.approvalStatus,
    }));

    const filteredNewMov = newMov?.filter(
      (item) => item.approved === "APPROVED"
    );

    // console.log({ userData });

    setAllPersonalDetails(userData?.personalDetails);
    setAllCompanyDetails(userData?.companyDetails);
    setAllCompanyPix(userData?.CompanyPix);
    setNewMovers(filteredNewMov);

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
  }, []);

  const [scriptLoaded, setScriptLoaded] = useState(false);
  const addPaypalScript = () => {
    if (window.paypal) {
      setScriptLoaded(true);
      return;
    }
    const script = document.createElement("script");
    script.src =
      "https://www.paypal.com/sdk/js?client-id=AUjKA9gFxV187adUYdXSmLX-XQkhTp4mb9pHwovh-ICBlBFpqlbmwFH920CRsQncHmB1CObNRic2scql";

    script.type = "text/javascript";
    script.async = true;
    script.onload = () => {
      setScriptLoaded(true);
    };
    document.body.appendChild(script);
  };

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
  const [activateError, setActivateError] = useState(false);
  const [showSent, setShowSent] = useState(false);

  const firstCard = getFirstSortedHomeMover(newMovers);

  const otherCards = sortHomeMoversAndExcludeHighest(newMovers);

  const handleEmailChange = (e) => {
    // const inputValue = e.target.value;
    setEmail(e.target.value);

    // Regular expression to validate email format
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // setIsValid(emailPattern.test(inputValue));
    setEmailError(emailPattern.test(e.target.value));
  };

  useEffect(() => {
    addPaypalScript();

    const today2 = getFormattedTodayDate();

    const date2 = dayjs(moveDetails?.moveDateRaw).format("ddd MMM D");
    if (today2 === date2) {
      setTodayPick(true);
    } else {
      setTodayPick(false);
    }
    // console.log(today2 == date2);
  }, []);

  // useEffect(() => {
  //   if (!progressData2) {
  //     router.push("/");
  //   }
  // }, []);

  const params = {
    firstName: personalDetails.firstName,
    lastName: personalDetails.lastName,
    email: email,
    quoteRef: moveDetails.quoteRef,
    progressLink: `https://removalstorage.vercel.app/book/movers/${moveDetails.bookingId}`,
    address1: serviceLocation.locationFrom.name,
    address2: serviceLocation.locationTo.name,
  };

  const sendProgressMail = async () => {
    setActivateError(true);
    setSubmitError(false);

    if (!email || !emailError) {
      setSubmitError(true);
      setEmailError(false);
      // toast.error(`Please enter a valid email`, {
      //   duration: 4000,
      // });
    } else {
      setProgressLoading(true);
      setEmailError(true);

      // emailjs.send(
      //   "service_oz8gmaw",
      //   "template_krdi5hs",
      //   templateParams,
      //   "bpJZGidQYxKuIrEhN"
      // );
      let variable1 = email;
      let variable2 = variable1;

      try {
        await progressEmail(email, params);
        setEmail("");
        setActivateError(false);
        setProgressLoading(false);
        setShowProgressMessage(true);
        setShowSent(true);
        // toast.success(`Progress link has been sent`, {
        //   duration: 8000,
        // });

        // toast.success(`Progress link has been sent to ${email}`);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const closeModal = () => {
    window.my_modal_11.close();
    setTimeout(() => {
      setShowProgressMessage(false);
      setShowSent(false);
      // setEmail("");
    }, 500);
  };

  const moveUrl = () => {
    switch (moveDetails?.propertyType) {
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
  // console.log({ moveDetails });

  return (
    <>
      <Head>
        <title>Movers - Removals and Selfstorage</title>
        <meta name="description" content="Rss removal and storage website" />
        <link rel="icon" href="/rrs_favicon.svg" />
      </Head>

      {moveDetails?.initialPackagePrice ? (
        <BookingLayout>
          <main className="">
            <div className="mb-[70px] lg:mb-[100px] pt-[80px] md:pt-[80px] ">
              <SideDrawer
                showLoader2={showLoader2}
                selectedTime={selectedTime}
                setSelectedTime={setSelectedTime}
                timeValue={timeValue}
                setTimeValue={setTimeValue}
                clickedModalOpen={clickedModalOpen}
                setClickedModalOpen={setClickedModalOpen}
              />
              {showLoader && <Loader1 />}
              {/* {showLoader2 && <Loader1 />} */}
              <div className="md:max-w-7xl mx-auto">
                {/* stepper */}
                <div className="w-full flex justify-center mb-[20px]">
                  <ul className="steps">
                    <li
                      onClick={() => {
                        router.push(`/book/${moveUrl()}`);
                      }}
                      className="step step-primary px-[50px] font-bold text-[14px] md:text-[16px] leading-[20px] cursor-pointer"
                    >
                      Move Details
                    </li>
                    <li
                      onClick={() => {
                        router.push(`/book/move-package`);
                      }}
                      className="step step-primary font-bold text-[14px] md:text-[16px] leading-[25px] cursor-pointer"
                    >
                      Move Package
                    </li>
                    <li className="step step-primary font-bold text-[14px] md:text-[16px] leading-[25px] ">
                      Choose Mover
                    </li>
                    <li className="step  font-bold text-[14px] md:text-[16px] leading-[25px] text-gray-300">
                      Checkout
                    </li>
                  </ul>
                </div>
                {/* features links */}
                {/* <FeaturesScroll /> */}

                {/* price date pick */}
                <PriceDatePick
                  setShowLoader={setShowLoader}
                  setTodayPick={setTodayPick}
                />
                {/* movers list row */}
                <div className="flex flex-col space-y-[10px] lg:space-y-0 lg:flex-row lg:space-x-[10px] mx-[10px] md:mx-[20px]">
                  {/* left section */}
                  <div className="lg:flex-[1]  w-full">
                    <MoveDetails />
                  </div>
                  {/* right section */}
                  <div className="bg-white shadow-lg rounded-[30px] lg:flex-[3] py-[30px] md:px-[30px] w-full">
                    {!showLoader ? (
                      <div className="flex flex-col space-y-[10px]  md:space-y-0 md:flex-row md:items-center md:justify-between mb-[40px] px-[20px]">
                        <h1 className="text-2xl font-bold mb-[0px] ">
                          <span className="text-primary">
                            {todayPick
                              ? "Movers are unavailable for hire today"
                              : `You've been matched with ${newMovers.length} verified movers`}
                            .{/* {homeMovers.length} verified movers. */}
                          </span>
                        </h1>

                        <div
                          onClick={() => window.my_modal_11.showModal()}
                          className="flex justify-center items-center space-x-[10px] border rounded-[10px] border-primary px-[10px] py-[10px] text-primary font-bold cursor-pointer"
                        >
                          <BiSave className="text-[24px]" />
                          <p className="whitespace-nowrap">Save Quote</p>
                        </div>

                        {/* modal */}
                        <dialog
                          id="my_modal_11"
                          className="modal py-[20px] px-[10px]"
                        >
                          <form method="dialog" className="modal-box px-[20px]">
                            <div
                              onClick={closeModal}
                              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 border border-primary text-primary"
                            >
                              ✕
                            </div>

                            {!showProgressMessage && (
                              <div className="">
                                <div className="w-full flex justify-center mb-[20px]">
                                  <div className="text-secondary bg-secondary/10 flex justify-center items-center w-[60px] h-[60px] rounded-full">
                                    <BiSave className="text-[30px] " />
                                  </div>
                                </div>

                                <h3 className="font-bold text-[24px] text-primary text-center">
                                  Save your quote!
                                </h3>

                                <p className="py-4 text-center text-primary px-[30px]">
                                  Need more time to decide? Save your progress
                                  and continue booking right where you left off.
                                </p>
                                <div className="px-[30px] ">
                                  <input
                                    type="email"
                                    placeholder="Email address"
                                    className={` input input-primary w-full h-[43px] `}
                                    onChange={handleEmailChange}
                                    value={email}
                                  />
                                  <div className="w-full text-center">
                                    {!emailError && activateError && (
                                      <div className="text-[14px] text-secondary mt-[10px] bg-secondary/20 rounded-[10px] py-[10px] px-[20px]">
                                        Please enter a valid email
                                      </div>
                                    )}
                                  </div>
                                </div>
                                <div className="flex w-full justify-center my-[20px]">
                                  <div
                                    onClick={sendProgressMail}
                                    type="submit"
                                    className="btn btn-secondary flex items-center space-x-[5px]"
                                    disabled={progressLoading}
                                  >
                                    {!progressLoading && (
                                      <span className="">Send Progress</span>
                                    )}
                                    {progressLoading && (
                                      <>
                                        <span className="">
                                          Sending Progress
                                        </span>
                                        <span className="loading loading-spinner loading-md text-white"></span>
                                      </>
                                    )}
                                  </div>
                                </div>
                              </div>
                            )}

                            {showProgressMessage && showSent && (
                              <div className="py-[50px]">
                                <div className="flex justify-center w-full">
                                  <Lottie
                                    animationData={EmailSent}
                                    className="w-[200px]"
                                  />
                                </div>
                                <h3
                                  onClick={() => window.my_modal_1.close()}
                                  className="font-bold text-[24px] mt-[10px] text-primary text-center"
                                >
                                  Progress Link sent
                                </h3>
                                <p className="py-4 text-center text-primary px-[30px]">
                                  Continue booking with link sent to the email
                                  provided.
                                </p>
                                {/* button */}
                                <div className="flex w-full justify-center my-[20px]">
                                  <div
                                    onClick={closeModal}
                                    type="submit"
                                    className="btn btn-secondary btn-wide flex items-center space-x-[5px]"
                                    // disabled={progressLoading}
                                  >
                                    Close
                                  </div>
                                </div>
                              </div>
                            )}
                          </form>
                          <form method="dialog">
                            <button>close</button>
                          </form>
                        </dialog>
                      </div>
                    ) : (
                      <h1 className="text-2xl font-bold mb-[30px] px-[20px]">
                        Matching Movers ...
                      </h1>
                    )}
                    {!showLoader &&
                      !todayPick &&
                      newMovers.map((mv, index) => {
                        if (index === 0) {
                          return (
                            <div
                              className="mx-[10px] flex-col space-y-[20px]"
                              key={index}
                            >
                              {/* mover 1 */}
                              <MoverCard
                                image={firstCard?.imageUrl}
                                name={firstCard?.name}
                                phone={firstCard?.phone}
                                email={firstCard?.email}
                                loadArea={firstCard?.loadArea}
                                rating={firstCard?.rating}
                                reviewCount={firstCard?.reviewCount}
                                price={moverDetails.pickPrice}
                                // price={priceThirdDay}
                                hiresCount={firstCard?.hireCount}
                                description={firstCard?.companyDescription}
                                score={firstCard?.score}
                                setShowLoader2={setShowLoader2}
                                showLoader2={showLoader2}
                                clickedModalOpen={clickedModalOpen}
                                setClickedModalOpen={setClickedModalOpen}
                                // timeValue={timeValue}
                                // setTimeValue={setTimeValue}
                                // pickPrice={pickPrice} setPickPrice={setPickPrice}
                              />
                            </div>
                          );
                        }
                      })}
                    {!showLoader && !todayPick && (
                      <div className="mx-[10px] flex-col space-y-[20px]">
                        <MoverCard
                          bookSmart
                          image=""
                          name="Smart Booking"
                          phone={firstCard?.phone}
                          email={firstCard?.email}
                          loadArea={firstCard?.loadArea}
                          rating={firstCard?.rating}
                          reviewCount={firstCard?.reviewCount}
                          price={(moverDetails.pickPrice * 0.79).toFixed()}
                          hiresCount={firstCard?.hireCount}
                          description={firstCard?.companyDescription}
                          score={firstCard?.score}
                          setShowLoader2={setShowLoader2}
                          showLoader2={showLoader2}
                          // pickPrice={pickPrice} setPickPrice={setPickPrice}
                        />
                      </div>
                    )}
                    {!showLoader &&
                      !todayPick &&
                      otherCards.map((mv, index) => {
                        return (
                          <div
                            className="mx-[10px] flex-col space-y-[20px]"
                            key={index}
                          >
                            {/* mover 2 */}
                            <MoverCard
                              image={mv?.imageUrl}
                              name={mv?.name}
                              phone={mv?.phone}
                              email={mv?.email}
                              loadArea={mv?.loadArea}
                              rating={mv?.rating}
                              reviewCount={mv?.reviewCount}
                              price={calculateMoverPrice(
                                moverDetails.pickPrice,
                                mv?.score,
                                0.052
                              ).toFixed()}
                              hiresCount={mv?.hireCount}
                              description={mv?.companyDescription}
                              score={mv?.score}
                              setShowLoader2={setShowLoader2}
                              showLoader2={showLoader2}
                              // pickPrice={pickPrice} setPickPrice={setPickPrice}
                            />
                          </div>
                        );
                      })}
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

export default Movers;

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
