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

const Movers = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const details = useSelector(getAllDetails);
  const moverDetails = useSelector(getAllMoverDetails);
  const { allMoverData } = moverDetails;

  const [allPersonalDetails, setAllPersonalDetails] = useState([]);
  const [allCompanyDetails, setAllCompanyDetails] = useState([]);
  const [allCompanyPix, setAllCompanyPix] = useState([]);
  const [newMovers, setNewMovers] = useState([]);

  useEffect(() => {
    const priceFirstDay = details.moveDetails.initialPackagePrice;
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

    dispatch(updatePickPrice(priceFirstDay));

    const allPersonalDetails = allMoverData?.allPersonalDetails;
    const allCompanyDetails = allMoverData?.allCompanyDetails;
    const allCompanyPix = allMoverData?.allCompanyPix;

    const newMov = allPersonalDetails.map((pd, index) => ({
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

    const filteredNewMov = newMov.filter(
      (item) => item.approved === "APPROVED"
    );

    setAllPersonalDetails(allMoverData?.allPersonalDetails);
    setAllCompanyDetails(allMoverData?.allCompanyDetails);
    setAllCompanyPix(allMoverData?.allCompanyPix);
    setNewMovers(filteredNewMov);
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

  const firstCard = getFirstSortedHomeMover(newMovers);

  const otherCards = sortHomeMoversAndExcludeHighest(newMovers);

  useEffect(() => {
    addPaypalScript();

    const today2 = getFormattedTodayDate();

    const date2 = dayjs(details.moveDetails.moveDateRaw).format("ddd MMM D");
    if (today2 === date2) {
      setTodayPick(true);
    } else {
      setTodayPick(false);
    }
    // console.log(today2 == date2);
  }, []);

  useEffect(() => {
    if (!details.moveDetails.initialPackagePrice) {
      router.push("/");
    }
  }, []);

  const templateParams = {
    firstName: details.personalDetails.firstName,
    lastName: details.personalDetails.lastName,
    email: details.personalDetails.email,
    quoteRef: details.moveDetails.quoteRef,
    progressLink: `http://localhost:3000/book/movers/${details.moveDetails.bookingId}`,
    address1: details.serviceLocation.locationFrom.name,
    address2: details.serviceLocation.locationTo.name,
  };

  const sendProgressMail = async () => {
    setProgressLoading(true);
    emailjs
      .send(
        "service_oz8gmaw",
        "template_krdi5hs",
        templateParams,
        "bpJZGidQYxKuIrEhN"
      )
      .then(
        (response) => {
          console.log("SUCCESS!", response.status, response.text);
          setProgressLoading(false);
          setShowProgressMessage(true);
        },
        (err) => {
          console.log("FAILED...", err);
        }
      );
  };

  // const [pickPrice, setPickPrice] = useState(priceThirdDay)

  // console.log(allPersonalDetails);
  // console.log(allCompanyDetails);
  // console.log(allCompanyPix);
  // console.log(newMovers);
  // console.log(firstCard);
  // console.log(otherCards);
  console.log({ details });

  return (
    <>
      <Head>
        <title>Movers - Removals and Selfstorage</title>
        <meta name="description" content="Rss removal and storage website" />
        <link rel="icon" href="/rrs_favicon.svg" />
      </Head>

      {details.moveDetails.initialPackagePrice ? (
        <BookingLayout>
          <main className="">
            <div className="mb-[70px] lg:mb-[100px] pt-[80px] md:pt-[100px] ">
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
                {/* features links */}
                <FeaturesScroll />
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
                            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 border border-primary text-primary">
                              ✕
                            </button>

                            <div className="w-full flex justify-center mb-[20px]">
                              <div className="text-secondary bg-secondary/10 flex justify-center items-center w-[60px] h-[60px] rounded-full">
                                <BiSave className="text-[30px] " />
                              </div>
                            </div>
                            <h3 className="font-bold text-[24px] text-primary text-center">
                              Save your progress!
                            </h3>
                            <p className="py-4 text-center text-primary px-[30px]">
                              Need more time to decide? Save your progress and
                              continue booking right where you left off.
                            </p>
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
                                    <span className="">Sending Progress</span>
                                    <span className="loading loading-spinner loading-md text-white"></span>
                                  </>
                                )}
                              </div>
                            </div>
                            {showProgressMessage && (
                              <p className="text-center text-[13px] text-secondary">
                                Progress link has been sent to{" "}
                                {details.personalDetails.email}
                              </p>
                            )}
                          </form>
                          <form method="dialog" className="modal-backdrop">
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
                                price={details.moverDetails.pickPrice}
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
                          price={(
                            details.moverDetails.pickPrice * 0.79
                          ).toFixed()}
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
                                details.moverDetails.pickPrice,
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
          <span className="h-full loading loading-bars text-primary w-[40px] lg:w-[60px]"></span>
        </div>
      )}
    </>
  );
};

export default Movers;
