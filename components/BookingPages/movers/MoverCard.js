import React, { useEffect, useRef, useState } from "react";
import {
  MdKeyboardArrowRight,
  MdPayments,
  MdFreeCancellation,
  MdCancel,
  MdWork,
  MdEmail,
} from "react-icons/md";
import { FaTruckMoving } from "react-icons/fa";
import { BiSolidPhoneCall } from "react-icons/bi";

import FullRating from "@/components/Rating/FullRating";
import Modal from "@/components/Modal/Modal";
import SideModal from "@/components/Modal/SideModal";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllDetails,
  updateBookStage,
  updateMoverDetails,
  updateMoverSideDetails,
} from "@/store/quoteSlice";
import StarRating from "@/components/Rating/EditHalfStars2";
import { useRouter } from "next/navigation";
import {
  calculateAverageRating2,
  convertToFloatOrRound,
  convertToFloatWithOneDecimal,
  formatMovePrice,
  getCurrentDateFormatted,
  getRatingGrade,
} from "@/utils/logics";
import { toast } from "react-hot-toast";
import {
  doc,
  serverTimestamp,
  setDoc,
  collection,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { db } from "@/firebase";
import useQuote from "@/hooks/useQuote";
import {
  checkoutPageEmail,
  moversPageEmail,
  pickMoverEmail,
  pickMoverEmail2,
  userNotificationEmail,
} from "@/lib/sendCustomEmail";
// import SideDrawer from "./sideDrawer";

const MoverCard = ({
  image,
  name,
  title,
  bookSmart,
  phone,
  email,
  loadArea,
  loadHeight,
  loadLength,
  loadWidth,
  rating,
  reviewCount,
  price,
  hiresCount,
  description,
  setShowLoader2,
  showLoader2,
  score,
  details,
  clickedModalOpen,
  setClickedModalOpen,
  sendMoverPageMail,
  listOfMovers,
  currentBook,
  // timeValue,
  // setTimeValue,
  selectedTime,
  setSelectedTime,
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

  const priceFirstDay = moveDetails?.initialPackagePrice;
  const priceSecondDay = (priceFirstDay * 0.559).toFixed(); //74
  const priceThirdDay = (priceFirstDay * 0.495).toFixed(); //107
  const priceSaturdays = (priceFirstDay * 0.441).toFixed(); //60
  const priceSundays = (priceFirstDay * 0.441).toFixed(); //8
  const priceOtherDays = (priceFirstDay * 0.33).toFixed();

  // const [selectedTime, setSelectedTime] = useState(null);
  const [timeValue, setTimeValue] = useState("");
  const [timeValue2, setTimeValue2] = useState("");
  const [moverName, setMoverName] = useState("");
  const [moverPrice, setMoverPrice] = useState("");
  const [showMore, setShowMore] = useState(true);
  const [showModal, setShowModal] = useState(true);
  const [error, setError] = useState(false);
  const [submitError, setSubmitError] = useState(true);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [sideBarOpened, setSideBarOpened] = useState(false);

  const [reviews2, setReviews2] = useState([]);

  const reviewRef = collection(db, "bookingData");

  const uname = name ?? "man";

  const reviewAverage = calculateAverageRating2(reviews2) ?? 0;

  const reviewGrade = reviewAverage ? getRatingGrade(reviewAverage) : "Good";

  const sideBarDispatch = () => {
    setTimeout(() => {
      setShowLoader2(true);
    }, 0);
    setTimeout(() => {
      setShowLoader2(false);
    }, 500);
    // setClickedModalOpen((prev)=>!prev);
    updateMoverSide({
      image,
      name,
      loadArea,
      rating,
      reviewCount,
      price,
      hiresCount,
      description,
      selectedTime,
      timeValue,
      details: details,
      reviews2,
      reviewAverage,
      reviewGrade,
    });
  };

  useEffect(() => {
    // const queryMessages = query(reviewRef);
    const queryMessages = query(
      reviewRef,
      where("moverName", "==", uname)
      // orderBy("createdAt", "asc")
    );
    const unsubscribe = onSnapshot(queryMessages, (snapshot) => {
      let rev = [];
      snapshot.forEach((doc) => {
        rev.push({ ...doc.data(), id: doc.id });
      });
      // const completedMb = rev?.filter((bc) => bc.completedBook === true);
      const reviewedM = rev?.filter((bc) => bc.reviewDetails != undefined);
      // const completedMb = rev?.filter((bc) => bc.moveCarriedOut === true);
      setReviews2(reviewedM);
      // console.log({ reviewedM, personalMoverDetails, reviews2 });
    });

    return () => unsubscribe();
  }, [uname]);

  const allTime = [
    { id: "7am - 9am", time: "7am - 9am", id2: "7am - 9am" + name },
    { id: "9am - 12am", time: "9am - 12am", id2: "9am - 12am" + name },
    { id: "12pm - 3pm", time: "12pm - 3pm", id2: "12pm - 3pm" + name },
    { id: "3pm - 5pm", time: "3pm - 5pm", id2: "3pm - 5pm" + name },
  ];

  const onTimeHandle = (id, time) => {
    setSelectedTime(id);
    updateMoverSide({
      image,
      name,
      loadArea,
      rating,
      reviewCount,
      price,
      hiresCount,
      description,
      selectedTime: id,
      selectedTime2: moverSideDetails?.selectedTime2,
      timeValue: time,
    });
    setTimeValue(time);
    setTimeValue2(name);
  };

  const sortedListOfMovers = listOfMovers?.filter((lm) => lm.mover !== name);

  const params = {
    firstName: personalDetails?.firstName,
    lastName: personalDetails?.lastName,
    email: personalDetails?.email,
    quoteRef: moveDetails?.quoteRef,
    progressLink: `https://removalstorage.vercel.app/book/checkout/${moveDetails?.bookingId}`,
    progressLink2: `https://removalstorage.vercel.app/book/movers/${moveDetails?.bookingId}`,
    // progressLink2: `https://removalstorage.vercel.app/book/checkout`,
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
    moverName: name,
    moverPrice: price,
    mover1Name: sortedListOfMovers[0]?.mover,
    mover1Price: sortedListOfMovers[0]?.price,
    mover2Name: sortedListOfMovers[1]?.mover,
    mover2Price: sortedListOfMovers[1]?.price,
    mover3Name: sortedListOfMovers[2]?.mover,
    mover3Price: sortedListOfMovers[2]?.price,
    mover4Name: sortedListOfMovers[3]?.mover,
    mover4Price: sortedListOfMovers[3]?.price,
  };

  const sendCheckoutPageMail = async () => {
    try {
      await checkoutPageEmail(personalDetails?.email, params);
    } catch (error) {
      console.log(error);
    }
  };

  const notificationParams = {
    firstName: personalDetails?.firstName,
    lastName: personalDetails?.lastName,
    email: personalDetails?.email,
    phone: personalDetails?.telephone,
    quoteRef: moveDetails?.quoteRef,
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
    moverName: name,
    moverPrice: price,
    bookLink: `https://rss-admin.vercel.app/secret-admin/users/booking/${moveDetails?.bookingId}`,
    bookingId: moveDetails?.bookingId,
    // page: "checkout page",
  };

  // const notificationEmail = "removalsselfstorage@gmail.com";
  const notificationEmail = [
    { email: "ifeanyi4umeh@gmail.com" },
    { email: "removalsselfstorage@gmail.com" },
  ];

  const sendPickMoverEmail = async () => {
    try {
      await pickMoverEmail2(notificationEmail, notificationParams);
    } catch (error) {
      console.log(error);
    }
  };

  const onCheckout = async () => {
    setSubmitError(true);
    if (timeValue2 != name) {
      setSubmitError(false);
      toast.error(`Please pick a move time`, {
        duration: 6000,
        // position: 'top-center',
      });
    } else {
      toast.remove();
      setSubmitLoading(true);
      // sendMoverPageMail();
      sendCheckoutPageMail();
      sendPickMoverEmail();

      updateBookS("book/movers");
      updateMover({
        moverName: name,
        moverTime: timeValue,
        moverPrice: price,
        pickPrice: moverDetails?.pickPrice,
        moveDateFormatted: moverDetails?.moveDateFormatted,
        dateId: moverDetails?.dateId,
      });

      const bookingId = moveDetails?.bookingId;

      const bookingRef = doc(db, "bookingData", bookingId);

      try {
        await setDoc(
          bookingRef,

          {
            date: getCurrentDateFormatted(),
            moverName: name,
            moverTime: timeValue,
            moverPrice: price,
            acceptance: "pending",
            pickPrice: moverDetails?.pickPrice,
            moveDateFormatted: moverDetails?.moveDateFormatted,
            dateId: moverDetails?.dateId,
            stage: "book/movers",
            // activity: [...currentBook.activity, `Picked mover "${name}"`],
            activity: [
              ...currentBook.activity,
              {
                name: `Picked mover "${name}"`,
                date: getCurrentDateFormatted(),
              },
            ],
            // createdAt: serverTimestamp(),
          },
          { merge: true }
        );
        // return true;
        console.log("booking update was successful @ movers");
      } catch (error) {
        console.log(error);
        // return false;
        console.log("booking update was unsuccessful @ movers");
      }
      router.push("/book/checkout");
    }
  };

  useEffect(() => {
    updateMoverSide({
      image: moverSideDetails?.image,
      name: moverSideDetails?.name,
      loadArea: moverSideDetails?.loadArea,
      rating: moverSideDetails?.rating,
      reviewCount: moverSideDetails?.reviewCount,
      price: moverSideDetails?.price,
      hiresCount: moverSideDetails?.hiresCount,
      description: moverSideDetails?.description,
      selectedTime: null,
      selectedTime2: null,
      timeValue: null,
    });
  }, []);

  const reviewAvg = isNaN(reviewAverage) ? 0 : Number(reviewAverage).toFixed(1);

  // console.log({ currentBook });
  console.log({ reviews2, uname, reviewAverage, reviewAvg });

  return (
    <>
      <div className='flex border-[2px] rounded-[30px] my-[20px] shadow-xl overflow-hidden  pb-[20px] w-full'>
        <div className='flex flex-col w-full'>
          {/* side drawer */}

          {/* row 1 */}
          <div
            className={`${
              !bookSmart
                ? "flex flex-col xl:flex-row xl:items-center xl:space-x-[0px] mb-[20px] xl:mb-[0px] xl:py-[10px]"
                : "flex flex-col xl:flex-row xl:items-center xl:space-x-[0px] py-[20px] mb-[0px] xl:mb-[0px] xl:py-[30px]"
            } `}
          >
            {/* image + details */}
            {!bookSmart && (
              <div className='flex flex-col mt-[10px] md:flex-row md:items-center px-[20px] md:flex-[3] md:space-x-[30px] lg:space-x-[15px] mb-[20px] sm:mb-[10px] md:mb-[0px]'>
                {/* image */}
                {image && (
                  <div className='drawer-content' onClick={sideBarDispatch}>
                    <label
                      htmlFor='my-drawer-4'
                      className='drawer-button py-[20px] cursor-pointer'
                    >
                      <img
                        src={image}
                        alt=''
                        className='h-[150px]  w-[300px] lg:w-[200px] object-cover md:h-[180px] lg:h-[140px] rounded-[30px]'
                      />
                    </label>
                  </div>
                )}
                {/* mover details */}
                <div className='flex flex-col w-full flex-[2]'>
                  {/* mover name */}
                  <div className='flex items-center justify-between w-full pr-[20px] mb-[5px] sm:mb-[7px]'>
                    {name && (
                      <h2 className='text-primary font-semibold text-[20px] '>
                        {name} <span className='text-[12px]'>{score}</span>
                      </h2>
                    )}
                  </div>

                  {/* loading area */}
                  {loadHeight && loadLength && loadWidth && (
                    <div className='flex items-center space-x-[15px] md:space-x-[5px]  sm:items-start  space-y-[0px] lg:space-y-[0px] lg:flex-row lg:items-center mb-[5px] sm:mb-[7px] lg:mb-[7px] text-[15px]'>
                      <div className='flex items-center space-x-[5px]'>
                        <FaTruckMoving className='text-[20px] text-primary' />
                        <p className='text-primary font-semibold hidden md:block'>
                          Load area:
                        </p>
                      </div>
                      <p className='link link-hover font-semibold'>
                        H - {loadHeight}m, L - {loadLength}m, W - {loadWidth}m
                      </p>
                    </div>
                  )}
                  {/* rating / reviews */}
                  <div className='flex flex-col lg:flex-row lg:items-center space-y-[5px] lg:space-y-0 lg:space-x-[10px] mt-[0px] text-[15px] mb-[7px]'>
                    <div className='flex items-center space-x-[10px] mt-[0px] text-[15px]'>
                      <p className='font-semibold'>{reviewAvg}</p>
                      {/* <FullRating small value={rating} color="text-secondary" /> */}
                      <StarRating
                        rating={reviewAvg}
                        size='text-secondary text-[16px]'
                      />
                      <p className=''>{`- (${
                        reviews2?.length ?? 0
                      } Review(s))`}</p>
                    </div>
                    {/* <div className="flex items-center space-x-[10px] mt-[0px] text-[15px]">
                  <p className="link link-hover text-primary font-semibold mt-[5px] md:mt-[0px] ">
                    See All Reviews
                  </p>
                </div> */}
                  </div>
                  {/* package type */}
                  <div className='flex justify-center items-center py-[3px] px-[10px] bg-secondary/20 rounded-[10px] max-w-[200px]'>
                    <p className='text-secondary font-semibold text-[15px]'>
                      {moveDetails?.movePackage} Package
                    </p>
                  </div>
                </div>
              </div>
            )}
            {bookSmart && (
              <div className='flex flex-col md:flex-row md:items-center px-[20px] md:flex-[3] md:space-x-[30px] lg:space-x-[15px] mb-[20px] sm:mb-[10px] md:mb-[0px]'>
                <div className='flex flex-col w-full'>
                  <h2 className='text-primary font-bold text-[22px] md:text-[25px] mb-[10px]'>
                    <span className='text-secondary'>Move smart</span> & save
                    money!
                  </h2>
                  <p className='lg:text-[17px] xl:mr-[30px]'>
                    Book your{" "}
                    <span className='font-bold'>fixed-price move</span> with our{" "}
                    <span className='font-bold'>Smart Moving feature</span> and
                    we will find you the best mover according to your needs.
                  </p>
                </div>
              </div>
            )}
            {/* mover price */}
            <div className='flex md:flex-[1] mt-[10px] md:mt-[20px] xl:mt-[0px]'>
              <div
                className={`${
                  !bookSmart
                    ? "flex  space-x-[20px] md:space-x-0 justify-between w-full xl:flex-col border border-primary rounded-[20px] xl:items-center xl:justify-center md:flex-[1] py-[10px] xl:py-[20px] mx-[20px] md:mx-[30px] xl:mx-[0px] xl:mr-[30px] px-[10px] sm:px-[20px] xl:px-[0px]"
                    : "flex  space-x-[20px] md:space-x-0 justify-between w-full xl:flex-col border border-primary rounded-[20px] xl:items-center xl:justify-center md:flex-[1] py-[10px] xl:py-[30px] mx-[20px] md:mx-[30px] xl:mx-[0px] xl:mr-[30px] px-[10px] sm:px-[20px] xl:px-[0px] "
                }`}
              >
                <div className='flex flex-col items-center justify-center xl:items-center'>
                  <p className='font-bold text-primary text-[24px] whitespace-nowrap'>
                    {/* {`₤ ${price}`} */}
                    {formatMovePrice(price)}
                  </p>
                  {/* <p className="text-[12px] text-gray-500">
                    Final price VAT included
                  </p> */}
                </div>
                {!bookSmart && (
                  <div className='flex  flex-col items-center justify-center space-y-[3px] lg:space-y-0 lg:flex-row md:space-x-[10px] md:items-center md:justify-center bg-primary/10 py-[5px] px-[10px] md:px-[30px] xl:px-[20px] rounded-[10px] xl:mt-[10px]'>
                    <MdWork className='text-[20px] text-primary' />
                    <p className='text-primary text-[14px] leading-[16px]'>
                      {hiresCount ?? 0} hire(s)
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* row 2 */}
          <div
            onClick={() => setShowMore((prev) => !prev)}
            className='flex justify-center mb-[30px] mx-[20px] md:mx-[30px] lg:hidden'
          >
            <div className='btn btn-primary btn-outline btn-block'>
              {showMore ? "See More Details" : "See Less Details"}
            </div>
          </div>

          {/* row 3 */}
          {!bookSmart && (
            <div className='relative'>
              <p
                className={`${
                  showMore ? "hidden" : "block"
                } lg:block mx-[20px] md:mx-[30px] text-[15px] overflow-auto scrollbar-thin scrollbar-track-gray-200/50 scrollbar-thumb-gray-500/20 scrollbar-default h-[120px] md:h-[95px] w-auto`}
              >
                {description}
              </p>
              <div className='absolute inset-x-0 bottom-0 h-[30px] bg-gradient-to-t from-white via-white to-transparent bg-opacity-50'></div>
            </div>
          )}

          {/* row 4 */}
          <div
            className={`${
              showMore ? "hidden" : "flex"
            } lg:flex flex-col space-y-[20px] lg:space-y-0 lg:flex-row lg:items-start mx-[20px] md:mx-[30px] mt-[20px] md:justify-between`}
          >
            {/* time + instruction */}
            <div className='flex flex-col'>
              {/* time */}
              <div className='grid grid-cols-2 justify-center gap-x-[10px] gap-y-[10px] sm:grid-cols-4 w-auto md:w-[450px]'>
                {allTime.map((tm, index) => {
                  // let isActive;
                  let isActive = tm.id2 == selectedTime;

                  // const ids = tm.id + name;
                  // if (name == details.moverSideDetails.name) {
                  //   isActive = tm.id == details.moverSideDetails.selectedTime2;
                  // } else {
                  //   isActive = tm.id == selectedTime;
                  // }
                  //  let isActive = tm.id == details.moverSideDetails.selectedTime;
                  return (
                    <div key={index} className='flex items-center text-[15px]'>
                      <div
                        onClick={() => onTimeHandle(tm.id2, tm.time)}
                        className={`${
                          isActive
                            ? "bg-secondary text-white border-secondary"
                            : "text-primary hover:border-secondary border-primary"
                        } flex py-[5px] px-[0px] hover:cursor-pointer  rounded-[10px] items-center justify-center border-[2px] group  duration-150 whitespace-nowrap mr-[0px] w-full md:w-[200px]`}
                      >
                        {tm.time}
                      </div>
                    </div>
                  );
                })}
              </div>
              {/* instruction */}
              <div className='flex w-full justify-center md:justify-start'>
                <p className='mt-[7px] text-gray-500 text-[14px]'>
                  Choose convenient pick-up time
                </p>
              </div>
            </div>
            {/* check out */}
            <div className='flex flex-col items-center justify-center'>
              <button
                disabled={submitLoading}
                onClick={onCheckout}
                className='btn btn-primary w-full lg:w-[150px]'
              >
                {!submitLoading && <span className=''>Check Out</span>}
                {submitLoading && (
                  <span className='loading loading-spinner loading-md text-white'></span>
                )}
              </button>
              {/* {!submitError && (
                <p className="text-[14px] text-secondary mt-[5px]">
                  Please choose time
                </p>
              )} */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MoverCard;
