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
  combineProfiles,
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
import useBookings from "@/hooks/useBookings";
import useMoversData from "@/hooks/useMoversData";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "@/firebase";

const Movers = () => {
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

  // const {
  //   allMoversData,
  //   allMoversDataLoading,
  //   refetchAllMoversData,
  //   // singleMoversData,
  //   // singleMoversDataLoading,
  //   // refetchSingleMoversData,
  //   // portFolioPix,
  //   // uid,
  //   // router,
  // } = useMoversData();

  // console.log({ allMoversData });

  const {
    completedBook,
    completedBookLoading,
    refetchCompletedBook,
    allBookings,
    allBookingsLoading,
    refetchAllBookings,
  } = useBookings();

  const [allPersonalDetails, setAllPersonalDetails] = useState([]);
  const [allCompanyDetails, setAllCompanyDetails] = useState([]);
  const [allCompanyPix, setAllCompanyPix] = useState([]);
  const [newMovers, setNewMovers] = useState([]);
  const [newMovers2, setNewMovers2] = useState([]);
  const [newMoversList1, setNewMoversList1] = useState([]);
  const [newMoversList2, setNewMoversList2] = useState([]);
  const [newMoversList3, setNewMoversList3] = useState([]);
  const [newMoversList4, setNewMoversList4] = useState([]);
  const [newMoversList5, setNewMoversList5] = useState([]);
  const [newMoversList6, setNewMoversList6] = useState([]);
  const [newMoversList7, setNewMoversList7] = useState([]);
  const [newMoversList8, setNewMoversList8] = useState([]);
  const [newMoversList9, setNewMoversList9] = useState([]);
  const [currentBook, setCurrentBook] = useState({});

  const moversRef1 = collection(db, "moversData");
  const moversRef2 = collection(db, "moversDetails");
  const moversRef3 = collection(db, "moversCompanyPix");
  const moversRef4 = collection(db, "moversPortfolio1");
  const moversRef5 = collection(db, "moversPortfolio2");
  const moversRef6 = collection(db, "moversPortfolio3");
  const moversRef7 = collection(db, "moversPortfolio4");
  const moversRef8 = collection(db, "moversPortfolio5");
  const moversRef9 = collection(db, "moversPortfolio6");

  useEffect(() => {
    const queryMovers1 = query(moversRef1);
    const queryMovers2 = query(moversRef2);
    const queryMovers3 = query(moversRef3);
    const queryMovers4 = query(moversRef4);
    const queryMovers5 = query(moversRef5);
    const queryMovers6 = query(moversRef6);
    const queryMovers7 = query(moversRef7);
    const queryMovers8 = query(moversRef8);
    const queryMovers9 = query(moversRef9);
    const unsubscribe1 = onSnapshot(queryMovers1, (snapshot) => {
      let rev = [];
      snapshot.forEach((doc) => {
        rev.push({ ...doc.data(), id: doc.id });
      });
      setNewMoversList1(rev);
    });

    const unsubscribe2 = onSnapshot(queryMovers2, (snapshot) => {
      let rev = [];
      snapshot.forEach((doc) => {
        rev.push({ ...doc.data(), id: doc.id });
      });
      setNewMoversList2(rev);
    });

    const unsubscribe3 = onSnapshot(queryMovers3, (snapshot) => {
      let rev = [];
      snapshot.forEach((doc) => {
        rev.push({ ...doc.data(), id: doc.id });
      });
      // const approvedM = rev?.filter((bc) => bc.reviewDetails != undefined);
      setNewMoversList3(rev);
    });

    const unsubscribe4 = onSnapshot(queryMovers4, (snapshot) => {
      let rev = [];
      snapshot.forEach((doc) => {
        rev.push({ ...doc.data(), id: doc.id });
      });
      // const approvedM = rev?.filter((bc) => bc.reviewDetails != undefined);
      setNewMoversList4(rev);
    });

    const unsubscribe5 = onSnapshot(queryMovers5, (snapshot) => {
      let rev = [];
      snapshot.forEach((doc) => {
        rev.push({ ...doc.data(), id: doc.id });
      });
      // const approvedM = rev?.filter((bc) => bc.reviewDetails != undefined);
      setNewMoversList5(rev);
    });

    const unsubscribe6 = onSnapshot(queryMovers6, (snapshot) => {
      let rev = [];
      snapshot.forEach((doc) => {
        rev.push({ ...doc.data(), id: doc.id });
      });
      // const approvedM = rev?.filter((bc) => bc.reviewDetails != undefined);
      setNewMoversList6(rev);
    });

    const unsubscribe7 = onSnapshot(queryMovers7, (snapshot) => {
      let rev = [];
      snapshot.forEach((doc) => {
        rev.push({ ...doc.data(), id: doc.id });
      });
      // const approvedM = rev?.filter((bc) => bc.reviewDetails != undefined);
      setNewMoversList7(rev);
    });

    const unsubscribe8 = onSnapshot(queryMovers8, (snapshot) => {
      let rev = [];
      snapshot.forEach((doc) => {
        rev.push({ ...doc.data(), id: doc.id });
      });
      // const approvedM = rev?.filter((bc) => bc.reviewDetails != undefined);
      setNewMoversList8(rev);
    });

    const unsubscribe9 = onSnapshot(queryMovers9, (snapshot) => {
      let rev = [];
      snapshot.forEach((doc) => {
        rev.push({ ...doc.data(), id: doc.id });
      });
      // const approvedM = rev?.filter((bc) => bc.reviewDetails != undefined);
      setNewMoversList9(rev);
    });

    return () => {
      unsubscribe1();
      unsubscribe2();
      unsubscribe3();
      unsubscribe4();
      unsubscribe5();
      unsubscribe6();
      unsubscribe7();
      unsubscribe8();
      unsubscribe9();
    };
  }, []);

  useEffect(() => {
    const all = combineProfiles(
      newMoversList1,
      newMoversList2,
      newMoversList3,
      newMoversList4,
      newMoversList5,
      newMoversList6,
      newMoversList7,
      newMoversList8,
      newMoversList9
    );
    setNewMovers2(all);
  }, [newMoversList1, newMoversList2, newMoversList3]);

  useEffect(() => {
    const cb = allBookings?.find(
      (ab) => ab.bookingId === moveDetails.bookingId
    );
    // setQuoteDetailsFxn(cb);

    setCurrentBook(cb);
  }, [allBookings]);

  useEffect(() => {
    const priceFirstDay = moveDetails?.initialPackagePrice;
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

    // const allPersonalDetails = newMoversList1?.allPersonalDetails;
    // const allCompanyDetails = newMoversList2?.allCompanyDetails;
    // const allCompanyPix = newMoversList3?.allCompanyPix;

    const allPersonalDetails = allMoverData?.allPersonalDetails;
    const allCompanyDetails = allMoverData?.allCompanyDetails;
    const allCompanyPix = allMoverData?.allCompanyPix;

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

    setAllPersonalDetails(allMoverData?.allPersonalDetails);
    setAllCompanyDetails(allMoverData?.allCompanyDetails);
    setAllCompanyPix(allMoverData?.allCompanyPix);
    setNewMovers(filteredNewMov);
  }, []);

  const [scriptLoaded, setScriptLoaded] = useState(false);
  // const addPaypalScript = () => {
  //   if (window.paypal) {
  //     setScriptLoaded(true);
  //     return;
  //   }
  //   const script = document.createElement("script");
  //   script.src =
  //     "https://www.paypal.com/sdk/js?client-id=AUjKA9gFxV187adUYdXSmLX-XQkhTp4mb9pHwovh-ICBlBFpqlbmwFH920CRsQncHmB1CObNRic2scql";

  //   script.type = "text/javascript";
  //   script.async = true;
  //   script.onload = () => {
  //     setScriptLoaded(true);
  //   };
  //   document.body.appendChild(script);
  // };

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

  // const

  // const firstCard = getFirstSortedHomeMover(newMoversList1);
  const firstCard = newMovers2.filter(
    (nm) => nm.position === "first" && nm.approvalStatus === "APPROVED"
  );
  const otherCards = newMovers2
    .filter(
      (nm) => nm.position === "others" && nm.approvalStatus === "APPROVED"
    )
    .sort((a, b) => {
      return b.score - a.score;
    });

  // const otherCards = sortHomeMoversAndExcludeHighest(newMoversList1);

  const handleEmailChange = (e) => {
    // const inputValue = e.target.value;
    setEmail(e.target.value);

    // Regular expression to validate email format
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // setIsValid(emailPattern.test(inputValue));
    setEmailError(emailPattern.test(e.target.value));
  };

  useEffect(() => {
    // addPaypalScript();

    const today2 = getFormattedTodayDate();

    const date2 = dayjs(moveDetails?.moveDateRaw).format("ddd MMM D");
    if (today2 === date2) {
      setTodayPick(true);
    } else {
      setTodayPick(false);
    }
    // console.log(today2 == date2);
  }, []);

  useEffect(() => {
    if (!moveDetails?.initialPackagePrice) {
      router.push("/");
    }
  }, []);

  // const PP = moverDetails?.pickPrice;

  let movPrice = Number(moverDetails?.pickPrice);

  const otherMovers = otherCards.map((om, index) => {
    let percentageIncrement = 15;
    let price = 0;
    price = (movPrice + (movPrice * percentageIncrement) / 100).toFixed(2);
    // Increment the percentage for the next iteration
    if (index > 0) {
      percentageIncrement += 5;
      price = (movPrice + (movPrice * percentageIncrement) / 100).toFixed(2);
    }

    // const key = `mover${3 + index}`;
    return {
      mover: om?.generatedName,
      price: price.toString(),
      // price: calculateMoverPrice(
      //   movPrice,
      //   om?.score,
      //   0.052
      // ).toFixed(),
    };
  });

  const otherMovers2 = otherCards.map((om, index) => {
    let percentageIncrement = 15;
    let price = 0;
    price = (movPrice + (movPrice * percentageIncrement) / 100).toFixed(2);
    // Increment the percentage for the next iteration
    if (index > 0) {
      percentageIncrement += 5;
      price = (movPrice + (movPrice * percentageIncrement) / 100).toFixed(2);
    }

    // const key = `mover${3 + index}`;
    return {
      ...om,
      price,
      // price: calculateMoverPrice(
      //   movPrice,
      //   om?.score,
      //   0.052
      // ).toFixed(),
    };
  });

  const listOfMovers = [
    {
      mover: firstCard[0]?.generatedName,
      // ...firstCard[0],
      price: moverDetails?.pickPrice,
    },
    {
      mover: "Smart Booking",
      price: (moverDetails?.pickPrice * 0.79).toFixed(),
    },
    ...otherMovers,
  ];

  const listOfMovers2 = [
    {
      ...firstCard[0],
      price: moverDetails?.pickPrice,
    },
    {
      generatedName: "Smart Booking",
      price: (moverDetails?.pickPrice * 0.79).toFixed(),
    },
    ...otherMovers2,
  ];

  const params2 = {
    firstName: personalDetails?.firstName,
    lastName: personalDetails?.lastName,
    email: personalDetails?.email,
    quoteRef: moveDetails?.quoteRef,
    progressLink: `https://removalstorage.vercel.app/book/movers/${moveDetails?.bookingId}`,
    address1: serviceLocation?.locationFrom?.name,
    address2: serviceLocation?.locationTo?.name,
    initialPackagePrice: moveDetails?.initialPackagePrice,
    pickPrice: moverDetails?.pickPrice,
    propertyType: moveDetails?.propertyType,
    numberOfMovers: moveDetails?.numberOfMovers,
    mileage: moveDetails?.mileage,
    volume: moveDetails?.volume,
    duration: moveDetails?.duration,
    moveDate: moveDetails?.moveDate,
    movePackage: moveDetails?.movePackage,
    mover1Name: listOfMovers[0]?.generatedName,
    mover1Price: listOfMovers[0]?.price,
    mover2Name: listOfMovers[1]?.generatedName,
    mover2Price: listOfMovers[1]?.price,
    mover3Name: listOfMovers[2]?.generatedName,
    mover3Price: listOfMovers[2]?.price,
    mover4Name: listOfMovers[3]?.generatedName,
    mover4Price: listOfMovers[3]?.price,
  };

  const params = {
    firstName: personalDetails?.firstName,
    lastName: personalDetails?.lastName,
    email: email,
    quoteRef: moveDetails?.quoteRef,
    progressLink: `https://removalstorage.vercel.app/book/movers/${moveDetails?.bookingId}`,
    address1: serviceLocation?.locationFrom?.name,
    address2: serviceLocation?.locationTo?.name,
  };

  const sendProgressMail = async () => {
    setActivateError(true);
    setSubmitError(false);

    if (!email || !emailError) {
      setSubmitError(true);
      setEmailError(false);
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

  const sendMoverPageMail = async () => {
    try {
      await moversPageEmail(personalDetails?.email, params2);
    } catch (error) {
      console.log(error);
    }
  };

  // const listOfMovers = newMovers.map((nm, index)=> {
  //   return {
  //     mover1: firstCard?.name
  //   }
  // })

  const closeModal = () => {
    window.my_modal_1.close();
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

  useEffect(() => {
    // setTimeout(() => {
    // }, 10000);
    if (newMovers2.length > 0) {
      sendMoverPageMail();
    }
  }, [newMovers2]);

  console.log({
    newMovers2,
    firstCard,
    otherCards,
    otherMovers,
    otherMovers2,
    mp: moverDetails?.pickPrice,
    listOfMovers,
    // newMoversList1,
    // newMoversList2,
    // newMoversList3,
    // newMoversList4,
    // newMoversList5,
    // newMoversList6,
    // newMoversList7,
    // newMoversList8,
    // newMoversList9,
  });

  // console.log({ listOfMovers, params2 });

  return (
    <>
      <Head>
        <title>Movers - Removals and Selfstorage</title>
        <meta name='description' content='Rss removal and storage website' />
        <link rel='icon' href='/rrs_favicon.svg' />
      </Head>

      {moveDetails?.initialPackagePrice ? (
        <BookingLayout>
          <main className=''>
            <div className='mb-[70px] lg:mb-[100px] pt-[80px] md:pt-[80px] '>
              <SideDrawer
                showLoader2={showLoader2}
                selectedTime={selectedTime}
                setSelectedTime={setSelectedTime}
                timeValue={timeValue}
                setTimeValue={setTimeValue}
                clickedModalOpen={clickedModalOpen}
                setClickedModalOpen={setClickedModalOpen}
                listOfMovers={listOfMovers2}
                currentBook={currentBook}
              />
              {showLoader && <Loader1 />}
              {/* {showLoader2 && <Loader1 />} */}
              <div className='md:max-w-7xl mx-auto'>
                {/* stepper */}
                <div className='w-full flex justify-center mb-[20px]'>
                  <ul className='steps'>
                    <li
                      onClick={() => {
                        router.push(`/book/${moveUrl()}`);
                      }}
                      className='step step-primary px-[50px] font-bold text-[14px] md:text-[16px] leading-[20px] cursor-pointer'
                    >
                      Move Details
                    </li>
                    <li
                      onClick={() => {
                        router.push(`/book/move-package`);
                      }}
                      className='step step-primary font-bold text-[14px] md:text-[16px] leading-[25px] cursor-pointer'
                    >
                      Move Package
                    </li>
                    <li className='step step-primary font-bold text-[14px] md:text-[16px] leading-[25px] '>
                      Choose Mover
                    </li>
                    <li className='step  font-bold text-[14px] md:text-[16px] leading-[25px] text-gray-300'>
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
                <div className='flex flex-col space-y-[10px] lg:space-y-0 lg:flex-row lg:space-x-[10px] mx-[10px] md:mx-[20px]'>
                  {/* left section */}
                  <div className='lg:flex-[1]  w-full'>
                    <MoveDetails />
                  </div>
                  {/* right section */}
                  <div className='bg-white shadow-lg rounded-[30px] lg:flex-[3] py-[30px] md:px-[30px] w-full'>
                    {!showLoader ? (
                      <div className='flex flex-col space-y-[10px]  md:space-y-0 md:flex-row md:items-center md:justify-between mb-[40px] px-[20px]'>
                        <h1 className='text-2xl font-bold mb-[0px] '>
                          <span className='text-primary'>
                            {todayPick
                              ? "Movers are unavailable for hire today"
                              : `You've been matched with ${
                                  firstCard?.length + otherCards?.length
                                } verified movers`}
                            .{/* {homeMovers.length} verified movers. */}
                          </span>
                        </h1>

                        <div
                          onClick={() => window.my_modal_1.showModal()}
                          className='flex justify-center items-center space-x-[10px] border rounded-[10px] border-primary px-[10px] py-[10px] text-primary font-bold cursor-pointer'
                        >
                          <BiSave className='text-[24px]' />
                          <p className='whitespace-nowrap'>Save Quote</p>
                        </div>

                        {/* <button onClick={notify} className="btn btn-primary">
                          Notify !
                        </button> */}

                        {/* modal */}
                        <dialog
                          id='my_modal_1'
                          className='modal py-[20px] px-[10px]'
                        >
                          <form method='dialog' className='modal-box px-[20px]'>
                            <div
                              onClick={closeModal}
                              className='btn btn-sm btn-circle btn-ghost absolute right-2 top-2 border border-primary text-primary'
                            >
                              ✕
                            </div>

                            {!showProgressMessage && (
                              <div className=''>
                                <div className='w-full flex justify-center mb-[20px]'>
                                  <div className='text-secondary bg-secondary/10 flex justify-center items-center w-[60px] h-[60px] rounded-full'>
                                    <BiSave className='text-[30px] ' />
                                  </div>
                                </div>

                                <h3 className='font-bold text-[24px] text-primary text-center'>
                                  Save your quote!
                                </h3>

                                <p className='py-4 text-center text-primary px-[30px]'>
                                  Need more time to decide? Save your progress
                                  and continue booking right where you left off.
                                </p>
                                <div className='px-[30px] '>
                                  <input
                                    type='email'
                                    placeholder='Email address'
                                    className={` input input-primary w-full h-[43px] `}
                                    onChange={handleEmailChange}
                                    value={email}
                                  />
                                  <div className='w-full text-center'>
                                    {!emailError && activateError && (
                                      <div className='text-[14px] text-secondary mt-[10px] bg-secondary/20 rounded-[10px] py-[10px] px-[20px]'>
                                        Please enter a valid email
                                      </div>
                                    )}
                                  </div>
                                </div>
                                <div className='flex w-full justify-center my-[20px]'>
                                  <div
                                    onClick={sendProgressMail}
                                    type='submit'
                                    className='btn btn-secondary flex items-center space-x-[5px]'
                                    disabled={progressLoading}
                                  >
                                    {!progressLoading && (
                                      <span className=''>Send Progress</span>
                                    )}
                                    {progressLoading && (
                                      <>
                                        <span className=''>
                                          Sending Progress
                                        </span>
                                        <span className='loading loading-spinner loading-md text-white'></span>
                                      </>
                                    )}
                                  </div>
                                </div>
                              </div>
                            )}

                            {showProgressMessage && showSent && (
                              <div className='py-[50px]'>
                                <div className='flex justify-center w-full'>
                                  <Lottie
                                    animationData={EmailSent}
                                    className='w-[200px]'
                                  />
                                </div>
                                <h3
                                  onClick={() => window.my_modal_1.close()}
                                  className='font-bold text-[24px] mt-[10px] text-primary text-center'
                                >
                                  Progress Link sent
                                </h3>
                                <p className='py-4 text-center text-primary px-[30px]'>
                                  Continue booking with link sent to the email
                                  provided.
                                </p>
                                {/* button */}
                                <div className='flex w-full justify-center my-[20px]'>
                                  <div
                                    onClick={closeModal}
                                    type='submit'
                                    className='btn btn-secondary btn-wide flex items-center space-x-[5px]'
                                    // disabled={progressLoading}
                                  >
                                    Close
                                  </div>
                                </div>
                              </div>
                            )}
                          </form>
                          <form method='dialog'>
                            {/* <button>close</button> */}
                          </form>
                          {/* <form method="dialog" className="modal-backdrop">
                            <button>close</button>
                          </form> */}
                        </dialog>
                      </div>
                    ) : (
                      <h1 className='text-2xl font-bold mb-[30px] px-[20px]'>
                        Matching Movers ...
                      </h1>
                    )}
                    {!showLoader &&
                      !todayPick &&
                      newMovers.map((mv, index) => {
                        if (index === 0) {
                          return (
                            <div
                              className='mx-[10px] flex-col space-y-[20px]'
                              key={index}
                            >
                              {/* mover 1 */}
                              <MoverCard
                                image={firstCard[0]?.companyProfilePixUrl}
                                name={firstCard[0]?.generatedName}
                                phone={firstCard[0]?.phone}
                                email={firstCard[0]?.email}
                                // loadArea={firstCard[0]?.loadArea}
                                loadHeight={firstCard[0]?.loadHeight}
                                loadLength={firstCard[0]?.loadLength}
                                loadWidth={firstCard[0]?.loadWidth}
                                rating={firstCard[0]?.reviewAverage ?? 0}
                                reviewCount={firstCard[0]?.reviews?.length}
                                price={moverDetails?.pickPrice}
                                // price={priceThirdDay}
                                hiresCount={firstCard[0]?.completedMoves}
                                description={firstCard[0]?.companyBio}
                                score={firstCard[0]?.score}
                                setShowLoader2={setShowLoader2}
                                showLoader2={showLoader2}
                                clickedModalOpen={clickedModalOpen}
                                setClickedModalOpen={setClickedModalOpen}
                                sendMoverPageMail={sendMoverPageMail}
                                listOfMovers={listOfMovers}
                                currentBook={currentBook}
                                // timeValue={timeValue}
                                // setTimeValue={setTimeValue}
                                // pickPrice={pickPrice} setPickPrice={setPickPrice}
                              />
                            </div>
                          );
                        }
                      })}
                    {!showLoader && !todayPick && (
                      <div className='mx-[10px] flex-col space-y-[20px]'>
                        <MoverCard
                          bookSmart
                          image=''
                          name='Smart Booking'
                          phone={firstCard?.phone}
                          email={firstCard?.email}
                          loadArea={firstCard?.loadArea}
                          rating={firstCard?.rating}
                          reviewCount={firstCard?.reviewCount}
                          price={(moverDetails?.pickPrice * 0.79).toFixed()}
                          hiresCount={firstCard?.hireCount}
                          description={firstCard?.companyDescription}
                          score={firstCard?.score}
                          setShowLoader2={setShowLoader2}
                          showLoader2={showLoader2}
                          sendMoverPageMail={sendMoverPageMail}
                          listOfMovers={listOfMovers}
                          currentBook={currentBook}
                          // pickPrice={pickPrice} setPickPrice={setPickPrice}
                        />
                      </div>
                    )}
                    {!showLoader &&
                      !todayPick &&
                      otherCards.map((mv, index) => {
                        return (
                          <div
                            className='mx-[10px] flex-col space-y-[20px]'
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
                                moverDetails?.pickPrice,
                                mv?.score,
                                0.052
                              ).toFixed()}
                              hiresCount={mv?.hireCount}
                              description={mv?.companyDescription}
                              score={mv?.score}
                              setShowLoader2={setShowLoader2}
                              showLoader2={showLoader2}
                              sendMoverPageMail={sendMoverPageMail}
                              listOfMovers={listOfMovers}
                              currentBook={currentBook}
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
        <div className='flex items-center justify-center h-[100vh] '>
          <div className='flex justify-center w-full'>
            <Lottie animationData={movingVan} className='w-[400px]' />
          </div>
          {/* <span className="h-full loading loading-bars text-primary w-[40px] lg:w-[60px]"></span> */}
        </div>
      )}
    </>
  );
};

export default Movers;
