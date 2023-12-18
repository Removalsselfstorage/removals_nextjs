import ReviewCard2 from "@/components/HomePage/OurReviews/ReviewCard2";
import StarRating from "@/components/Rating/EditHalfStars2";
import { reviews } from "@/dummyData/dummyData";
import useQuote from "@/hooks/useQuote";
import { checkoutPageEmail, pickMoverEmail2 } from "@/lib/sendCustomEmail";
import {
  getAllDetails,
  updateMoverDetails,
  updateMoverSideDetails,
} from "@/store/quoteSlice";
import {
  changeFontWeight,
  changeFontWeight2,
  getCurrentDateFormatted,
} from "@/utils/logics";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { db } from "@/firebase";
import { FaTruckMoving } from "react-icons/fa";
import { FiCheckCircle } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";

const SideDrawer = ({
  image,
  showLoader2,
  selectedTime,
  setSelectedTime,
  clickedModalOpen,
  setClickedModalOpen,
  listOfMovers,
  currentBook,
  // timeValue,
  // setTimeValue,
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

  const [sideDetails, setSideDetails] = useState({});
  const [initialLoader, setInitialLoader] = useState(true);
  // const [selectedTime, setSelectedTime] = useState(
  //   details.moverSideDetails.selectedTime
  // );
  const [timeValue, setTimeValue] = useState("");
  const [submitError, setSubmitError] = useState(true);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    setSideDetails(moverSideDetails);
  }, [showLoader2]);

  const allTime = [
    { id: "7am - 9am", time: "7am - 9am" },
    { id: "9am - 12am", time: "9am - 12am" },
    { id: "12pm - 3pm", time: "12pm - 3pm" },
    { id: "3pm - 5pm", time: "3pm - 5pm" },
  ];

  const onTimeHandle = (id, time) => {
    setSelectedTime(null);
    setTimeValue(time);
    updateMoverSide({
      image: moverSideDetails?.image,
      name: moverSideDetails?.name,
      loadArea: moverSideDetails?.loadArea,
      rating: moverSideDetails?.rating,
      reviewCount: moverSideDetails?.reviewCount,
      price: moverSideDetails?.price,
      hiresCount: moverSideDetails?.hiresCount,
      description: moverSideDetails?.description,
      selectedTime: id,
      selectedTime2: id,
      timeValue: time,
    });
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
    moverName: moverSideDetails?.name,
    moverPrice: moverSideDetails?.price,
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
    moverName: moverSideDetails?.name,
    moverPrice: moverSideDetails?.price,
    bookLink: `https://rss-admin.vercel.app/secret-admin/users/booking/${moveDetails?.bookingId}`,
    bookingId: moveDetails?.bookingId,
    // page: "checkout page",
  };

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
    if (timeValue == "") {
      setSubmitError(false);
      toast.error(`Please pick a move time`, {
        duration: 6000,
      });
    } else {
      toast.remove();
      setSubmitLoading(true);
      sendCheckoutPageMail();
      sendPickMoverEmail();
      updateBookS("book/movers");
      updateMover({
        moverName: sideDetails?.name,
        moverTime: timeValue,
        moverPrice: sideDetails?.price,
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
            moverName: sideDetails?.name,
            moverTime: timeValue,
            moverPrice: sideDetails?.price,
            pickPrice: moverDetails?.pickPrice,
            moveDateFormatted: moverDetails?.moveDateFormatted,
            dateId: moverDetails?.dateId,
            stage: "book/movers",
            // activity: [...currentBook.activity, `Picked mover "${name}"`],
            activity: [
              ...currentBook.activity,
              {
                name: `Picked mover "${sideDetails?.name}"`,
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

  const textDescription = sideDetails?.description;
  const moverName = sideDetails?.name;

  // const modalContentRef = useRef(null);

  useEffect(() => {
    setTimeout(() => {
      setInitialLoader(true);
    }, 0);
    setTimeout(() => {
      setInitialLoader(false);
    }, 500);
  }, [showLoader2]);

  // useEffect(() => {
  //   if (modalContentRef.current) {
  //     modalContentRef.current.scrollTop = 0;
  //   }
  // }, [clickedModalOpen]);

  // console.log({ sn: sideDetails?.name, timeValue });

  return (
    <div className='drawer drawer-end'>
      <input id='my-drawer-4' type='checkbox' className='drawer-toggle' />
      <div className='drawer-side z-[99999] h-[100vh]'>
        <label htmlFor='my-drawer-4' className='drawer-overlay'></label>
        <div className='p-4 w-[80vw] md:w-[50vw]  bg-white text-base-content'>
          <div className='flex flex-col  overflow-auto-y'>
            {/* row 1 */}
            <div className='flex flex-col xl:flex-row xl:items-center xl:space-x-[10px] mb-[20px] xl:mb-[0px] xl:py-[10px]'>
              {/* image */}
              <div className='py-[10px] px-[10px]'>
                <img
                  src={sideDetails?.image}
                  alt=''
                  className='h-[150px]  w-[300px] lg:w-[200px] object-cover md:h-[180px] lg:h-[140px] rounded-[30px]'
                />
              </div>
              {/* mover details */}
              <div className='flex flex-col w-full flex-[2] mx-[10px] xl:mx-[0px]'>
                {/* mover name */}
                <div className='flex items-center justify-between w-full pr-[20px] mb-[5px] sm:mb-[7px]'>
                  <h2 className='text-primary font-semibold text-[20px] '>
                    {moverName}
                  </h2>
                </div>

                {/* registered since */}
                <div className='flex items-center space-x-[15px] md:space-x-[5px]  sm:items-start  space-y-[0px] lg:space-y-[0px] lg:flex-row lg:items-center mb-[5px] sm:mb-[7px] lg:mb-[7px] text-[15px]'>
                  <p className='text-primary font-semibold'>
                    Registered since:
                  </p>
                  <p className=''>12/06/2023</p>
                </div>

                {/* rating / reviews */}
                <div className='flex flex-col lg:flex-row lg:items-center space-y-[5px] lg:space-y-0 lg:space-x-[10px] mt-[0px] text-[15px] mb-[7px]'>
                  <div className='flex items-center space-x-[10px] mt-[0px] text-[15px]'>
                    <p className='font-semibold'>{sideDetails?.rating}</p>
                    {/* <FullRating small value={rating} color="text-secondary" /> */}
                    <StarRating
                      rating={sideDetails?.rating}
                      size='text-secondary text-[16px]'
                    />
                    <p className=''>{`- (${sideDetails?.reviewCount} Reviews)`}</p>
                  </div>
                </div>
                {/* package type */}
                <div className='flex justify-center items-center py-[3px] px-[10px] bg-secondary/20 rounded-[10px] max-w-[200px]'>
                  <p className='text-secondary font-semibold text-[15px]'>
                    {moveDetails?.movePackage} Package
                  </p>
                </div>
              </div>
            </div>
            {/* loading area */}
            <div className='flex mx-[10px] md:mx-[20px] items-center space-x-[15px] md:space-x-[5px]  sm:items-start  space-y-[0px] lg:space-y-[0px] lg:flex-row lg:items-center mb-[5px] sm:mb-[7px] lg:mb-[7px] text-[15px]'>
              <div className='flex items-center space-x-[5px]'>
                <FaTruckMoving className='text-[20px] text-primary' />
                <p className='text-primary font-semibold hidden lg:block'>
                  Load area:
                </p>
              </div>
              <p className='link link-hover '>{sideDetails?.loadArea}</p>
            </div>
            {/* row 2 */}
            <div className=' mx-[10px] md:mx-[20px]'>
              <p className={`${isExpanded ? "" : "line-clamp-3"} text-[15px] `}>
                {/* {changeFontWeight(textDescription, moverName, "bold")}{" "} */}
                {textDescription}{" "}
                <span
                  className='text-secondary hover:underline text-[15px] font-semibold cursor-pointer'
                  onClick={() => {
                    setIsExpanded(!isExpanded);
                  }}
                >
                  {isExpanded ? "Read less" : "Read more"}
                </span>
              </p>
              <span
                className={`${
                  isExpanded ? "hidden" : "flex"
                } text-secondary hover:underline text-[15px] font-semibold cursor-pointer`}
                onClick={() => {
                  setIsExpanded(!isExpanded);
                }}
              >
                {isExpanded ? "Read less" : "Read more"}
              </span>
            </div>

            {/* row 4 */}
            <div className=' mx-[10px] md:mx-[20px] mt-[20px]'>
              <p className='font-bold md:text-[20px] text-primary'>Included</p>
              <ul className=' mt-[5px] md:mt-[10px] text-start text-[14px] lg:text-[15px] w-full'>
                <li className='  py-[3px] flex items-center'>
                  <span className={`text-secondary mr-[5px] `}>
                    <FiCheckCircle />
                  </span>
                  Customers can travel with the drivers
                </li>
                <li className=' py-[3px] flex items-center'>
                  <span className={`text-secondary mr-[5px] `}>
                    <FiCheckCircle />
                  </span>
                  Transit blankets & straps
                </li>
              </ul>
            </div>

            {/* row 5 */}
            <div className=' mx-[10px] md:mx-[20px] mt-[20px] pb-[20px] border-b'>
              <p className='font-bold md:text-[20px] text-primary mb-[10px]'>
                Reviews
              </p>

              <div className='flex flex-col space-y-[20px] lg:flex-row lg:space-y-[0px]  lg:space-x-[40px]'>
                {/* overall review */}
                <div className='flex flex-col '>
                  <div className='flex flex-col  mt-[0px] text-[15px]'>
                    <p className='font-semibold text-[22px] mb-[5px]'>
                      {sideDetails?.rating} / 5.0
                    </p>
                    {/* <FullRating small value={rating} color="text-secondary" /> */}
                    <StarRating
                      rating={sideDetails?.rating}
                      size='text-secondary text-[16px]'
                    />
                    <p className='mt-[5px]'>{`(${sideDetails?.reviewCount}) Reviews`}</p>
                  </div>
                </div>
                {/* other review values */}
                <div className='flex flex-col text-[15px]'>
                  <div className='flex-col flex mb-[10px]'>
                    <p className='mb-[5px]'>Positive Feedback</p>
                    <progress
                      className='progress progress-secondary w-56'
                      value='90'
                      max='100'
                    ></progress>
                  </div>
                  <div className='flex-col flex mb-[10px]'>
                    <p className='mb-[5px]'>Neutral Feedback</p>
                    <progress
                      className='progress progress-secondary w-56'
                      value='50'
                      max='100'
                    ></progress>
                  </div>
                  <div className='flex-col flex mb-[10px]'>
                    <p className='mb-[5px]'>Negative Feedback</p>
                    <progress
                      className='progress progress-secondary w-56'
                      value='0'
                      max='100'
                    ></progress>
                  </div>
                </div>
              </div>
            </div>

            {/* reviews comments */}
            <div className=''>
              {reviews.slice(0, 3).map((review, index) => {
                return (
                  <div className='py-[10px]' key={review.id}>
                    <ReviewCard2
                      name={review.name}
                      location={review.location}
                      date={review.date}
                      rating={review.rating}
                      comment={review.comment}
                    />
                  </div>
                );
              })}
            </div>

            {/* row 6 */}
            <div
              className={`flex  flex-col space-y-[20px] lg:space-y-0 lg:flex-row lg:items-start mx-[10px] md:mx-[20px] mt-[20px] md:justify-between`}
            >
              {/* time + instruction */}
              <div className='flex flex-col'>
                {/* time */}
                <div className='grid grid-cols-2 justify-center gap-x-[10px] gap-y-[10px] xl:grid-cols-4 w-auto xl:w-[450px]'>
                  {allTime.map((tm, index) => {
                    let isActive = tm.id == moverSideDetails?.selectedTime;
                    return (
                      <div
                        key={index}
                        className='flex items-center text-[15px]'
                      >
                        <div
                          onClick={() => onTimeHandle(tm.id, tm.time)}
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
            </div>
          </div>
          {/* check out */}
          <div className='flex flex-col items-center justify-center mt-[30px] mb-[20px]'>
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
            {!submitError && (
              <p className='text-[14px] text-secondary mt-[5px]'>
                Please choose time
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideDrawer;
