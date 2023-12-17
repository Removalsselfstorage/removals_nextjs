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
import { LuHistory } from "react-icons/lu";
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
  checkBookStatus,
  convertDateFormat,
  decreaseByPercentage,
  formatMovePrice,
  getFirstSortedHomeMover,
  getFormattedTodayDate,
  increaseByPercentage,
  sortHomeMoversAndExcludeHighest,
  trimDate,
} from "@/utils/logics";
import Loader1 from "@/components/loaders/loader1";
import dayjs from "dayjs";
// import { useRouter } from "next/navigation";
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
import NumberInput from "@/components/Reservations/numberInput";
import { FaHouseLaptop } from "react-icons/fa6";
import { FaBed } from "react-icons/fa";
import PickUpItems from "@/components/Reservations/pickUpItems";
import BuyItems from "@/components/Reservations/BuyItems";
import useMoveItems from "@/hooks/useMoveItems";
import CartSideDrawer from "@/components/Reservations/CartSideDrawer";
import Stripe from "stripe";
import PaymentDashboard from "@/components/Reservations/PaymentDashboard";
import useBookings from "@/hooks/useBookings";
import { BsFillCalendarXFill } from "react-icons/bs";
import { convertTimeTo24HourFormat } from "@/utils/logics";
import { useRouter } from "next/router";
import { fetchAllBookings, fetchAllMoversDetailsArray } from "@/lib/fetchData2";
import TimeAgo from "react-timeago";

const Reservations = ({ progressData, id, allBookings,  }) => {
  const {
    setReserveDetailsFxn,
    reserveDetails,
    router,
    reserveId,
    updateReserveIdFxn,
    moveDetails,
  } = useQuote();

  const router2 = useRouter();

  const {
    // allBookings,
    bookingsLoading,
    refetchBookings,

    completedBookings,
    completedBookingsLoading,
    refetchCompletedBookings,

    completedBook,
    allBook,
  } = useBookings();

  const {
    updateQtyInBedroomFxn,
    moveItems,
    resetMoveItemsFxn,
    resetMoveItemsFxn2,
    //
  } = useMoveItems();

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

  const [clickedModalOpen, setClickedModalOpen] = useState(false);
  const [bookLoading, setBookLoading] = useState(false);
  const [showReview, setShowReview] = useState(false);
  const [completedBooking, setCompletedBooking] = useState({});

  const allPayments = () => {
    let ap;
    if (reserveDetails?.extraStripePayment?.length > 0) {
      ap = [
        reserveDetails?.moveStripePayment,
        reserveDetails?.outStripePayment,
        ...reserveDetails?.extraStripePayment,
      ].sort((a, b) => {
        return new Date(b.date) - new Date(a.date);
      });
    }
    return {
      ap,
      total: ap?.reduce((acc, payment) => {
        if (payment && typeof payment.amount === "number") {
          return acc + payment.amount;
        }
        return acc;
      }, 0),
    };

    // return totalAmount;
  };

  const triggerBookLoading = () => {
    setBookLoading(true);
    setTimeout(() => {
      setBookLoading(false);
    }, 2000);
  };
  // const allPayments = [{ amount: 10 }, { amount: 20 }, { amount: 30 }];

  useEffect(() => {
    progressData?.moveItems
      ? resetMoveItemsFxn(progressData?.moveItems)
      : resetMoveItemsFxn2();
    if (progressData)
      setReserveDetailsFxn({
        ...progressData,
      });
  }, []);

  // useEffect(() => {
  //   if (progressData) {
  //     const findBookingId = progressData.find((bk) => {
  //       return bk.bookingId === id;

  //       // console.log({ bq: bk.quoteRef, vr: values.login_ref });
  //     });
  //     if (findBookingId) {
  //       findBookingId?.moveItems && resetMoveItemsFxn(findBookingId?.moveItems);
  //       setReserveDetailsFxn(findBookingId);
  //     }
  //   }
  // }, []);

  // useEffect(() => {
  //   completedBook(id)?.moveItems &&
  //     resetMoveItemsFxn(completedBook(id)?.moveItems);
  //   if (completedBook(id)) {
  //     setReserveDetailsFxn(completedBook(id));
  //   }
  // }, [completedBookings]);

  const myBookings = allBookings?.filter(
    (pd) => pd?.email === reserveDetails?.email
  );

  let targetDate = new Date(reserveDetails?.moveDate);
  // Extract the start and end times from the timeRange

  if (reserveDetails?.moverTime) {
    const [startTime, endTime] = reserveDetails?.moverTime?.split(" - ") || [];
    const ct = convertTimeTo24HourFormat(startTime);
    targetDate.setHours(ct);
  }

  // const currentDate = new Date().getTime();

  const givenDate = targetDate.getTime();

  // Compare the two dates
  // const isGivenDateGreaterThanCurrent = givenDate > currentDate;

  // const isGivenDateGreaterThanCurrent = false;
  const isGivenDateGreaterThanCurrent = checkBookStatus(
    reserveDetails?.moveDate,
    reserveDetails?.moverTime
  );

  const dateObject = targetDate;

  const closeModal = () => {
    window.my_modal_51.close();
  };

  const closeModal2 = () => {
    window.my_modal_61.close();
  };

  const bookingHandler = (bookingId) => {
    triggerBookLoading();
    updateReserveIdFxn(bookingId);
    // refetchCompletedBookings();

    const findBookingId = allBookings?.find((bk) => {
      return bk.bookingId === bookingId;

      // console.log({ bq: bk.quoteRef, vr: values.login_ref });
    });

    // router2.reload();
    if (findBookingId) {
      router.push(`/reservations/${findBookingId?.bookingId}`);
      findBookingId?.moveItems
        ? resetMoveItemsFxn(findBookingId?.moveItems)
        : resetMoveItemsFxn2();
      setReserveDetailsFxn(findBookingId);
    }

    // setReserveDetailsFxn(completedBook(bookingId));

    closeModal2();

    // window.location.reload();
  };

  useEffect(() => {
    if (reserveId === "") {
      router.push("/reserve-login");
    }
    // triggerBookLoading();
  }, []);

  // useEffect(() => {
  //   completedBook?.moveItems && resetMoveItemsFxn(completedBook?.moveItems);
  //   setReserveDetailsFxn({
  //     ...completedBook,
  //   });
  // }, [completedBook]);

  const allLoading = completedBookingsLoading || bookLoading;

  // console.log({
  //   progressData,
  //   allBookings,
  //   reserveDetails,
  //   moveDetails,
  //   // cb: completedBook(id),
  //   id,
  //   // allBookings,
  //   // completedBookings,
  // });
  console.log({ showReview });

  return (
    <>
      <Head>
        <title>Removals and Selfstorage - Reservations</title>
        <meta name='description' content='Rss removal and storage website' />
        <link rel='icon' href='/rrs_favicon.svg' />
      </Head>
      {/* {reserveId !== "" && !completedBookLoading ? ( */}
      {reserveId !== "" && !allLoading && (
        <BookingLayout>
          <main className=''>
            <div className='mb-[70px] lg:mb-[100px] pt-[80px] md:pt-[80px] '>
              <div className='md:max-w-7xl mx-auto'>
                {/* stepper */}
                <FeaturesScroll2 />

                {/* movers list row */}
                <div className='flex flex-col mt-[20px] space-y-[10px] lg:space-y-0 lg:flex-row lg:space-x-[10px] mx-[10px] md:mx-[20px]'>
                  {/* left section */}
                  <div className='lg:flex-[1]  w-full'>
                    <ReserveSide />
                  </div>
                  {/* right section */}
                  <div className='bg-white shadow-lg rounded-[30px] lg:flex-[3] px-[20px] py-[30px] md:px-[30px] w-full '>
                    {/* side drawer */}
                    <CartSideDrawer
                      isGivenDateGreaterThanCurrent={
                        isGivenDateGreaterThanCurrent
                      }
                      showReview={showReview}
                      // approvedMovers={approvedMovers}
                    />
                    {/* heading */}
                    <div className='flex flex-col   space-y-[10px] md:flex-row md:space-y-0 md:justify-between md:items-center border-b-[2px] pb-[20px]'>
                      <div className='flex items-center space-x-[15px] '>
                        <p className='text-[40px]'>👋</p>
                        <div className=''>
                          <h1 className='text-2xl font-bold mb-[10px] md:mb-[0px] text-secondary'>
                            Welcome {reserveDetails?.firstName}{" "}
                            {reserveDetails?.lastName},
                          </h1>
                          <p className='text-gray-500 font-semibold'>
                            {/* Thank you for choosing Removals & Self Storage */}
                            {reserveDetails?.email}
                          </p>
                        </div>
                      </div>
                      <div className='flex items-center space-x-[10px]'>
                        {/* book again button */}
                        <div
                          onClick={() => {
                            router.push("/book");
                            updateReserveIdFxn("");
                            // setTimeout(() => {
                            //   resetReserveDetailsFxn();
                            // }, 2000);
                          }}
                          className='btn btn-secondary'
                        >
                          {/* <span className="">
                            <BiLogOut className="text-[20px]" />
                          </span> */}
                          <span className=''>Book A New Move</span>
                        </div>
                        {/* logout button */}
                        <div
                          onClick={() => {
                            router.push("/reserve-login");
                            updateReserveIdFxn("");
                            // setTimeout(() => {
                            //   resetReserveDetailsFxn();
                            // }, 2000);
                          }}
                          className='btn btn-secondary btn-outline'
                        >
                          {/* <span className="">
                            <BiLogOut className="text-[20px]" />
                          </span> */}
                          <span className=''>Log Out</span>
                        </div>
                      </div>
                    </div>
                    {/* payment dashboard */}
                    <div className='flex flex-col space-y-[20px] mt-[30px] mb-[30px] '>
                      <div className=''>
                        <div className='flex justify-between'>
                          <div
                            // onClick={() => window.my_modal_51.showModal()}
                            className={`${
                              isGivenDateGreaterThanCurrent
                                ? "text-primary bg-primary/10"
                                : "text-secondary bg-secondary/10"
                            } font-semibold  px-[10px] rounded-[10px] py-[5px]`}
                          >
                            Book Status:{" "}
                            {`${
                              isGivenDateGreaterThanCurrent
                                ? "ONGOING"
                                : "EXPIRED"
                            }`}
                          </div>
                          <div
                            className='flex space-x-[10px] items-center cursor-pointer'
                            onClick={() => window.my_modal_61.showModal()}
                          >
                            <p className='link font-semibold text-primary '>
                              My Bookings
                            </p>
                            <div className=' bg-primary rounded-full flex justify-center items-center p-[0px] text-white w-[25px] h-[25px] text-[14px]'>
                              {myBookings?.length}
                            </div>
                          </div>
                        </div>
                        {/* payment modal */}
                        <dialog
                          id='my_modal_51'
                          className='modal py-[20px] px-[10px]'
                        >
                          <form method='dialog' className='modal-box px-[20px]'>
                            <div
                              onClick={closeModal}
                              className='btn btn-sm btn-circle btn-ghost absolute right-2 top-2 border border-secondary text-secondary'
                            >
                              ✕
                            </div>

                            <div className=''>
                              <div className='w-full flex justify-center mb-[20px]'>
                                <div className='text-secondary bg-secondary/10 flex justify-center items-center w-[60px] h-[60px] rounded-full'>
                                  <LuHistory className='text-[30px] text-secondary' />
                                </div>
                              </div>

                              <h3 className='font-bold text-[24px] text-center text-secondary mb-[20px]'>
                                Payment History
                              </h3>

                              {allPayments()?.ap?.map((ap, index) => {
                                return (
                                  <div className='' key={index}>
                                    {ap?.amount !== 0 && (
                                      <div className='flex items-start justify-between mt-[0px] border-b border-t py-[15px] px-[10px]'>
                                        <div className='flex items-center space-x-[10px] flex-[1]'>
                                          <div className='flex flex-col space-y-[0px]'>
                                            <p className='line-clamp-2 font-bold text-[20px] '>
                                              {formatMovePrice(ap?.amount)}
                                            </p>
                                            <p className='line-clamp-2 text-[14px] text-gray-500'>
                                              {ap?.date}
                                            </p>
                                          </div>
                                        </div>
                                        <div className='flex items-center space-x-[20px]'>
                                          {/* <p className="line-clamp-2 font-bold text-[20px] text-primary">
                                                        Total Price:
                                                      </p> */}
                                          <p className='font-bold '>
                                            {ap?.description}
                                          </p>
                                        </div>
                                      </div>
                                    )}
                                  </div>
                                );
                              })}
                            </div>
                          </form>
                          <form method='dialog'>
                            {/* <button>close</button> */}
                          </form>
                          {/* <form method="dialog" className="modal-backdrop">
                            <button>close</button>
                          </form> */}
                        </dialog>

                        {/* bookings modal */}
                        <dialog
                          id='my_modal_61'
                          className='modal py-[20px] px-[10px]'
                        >
                          <form method='dialog' className='modal-box px-[20px]'>
                            <div
                              onClick={closeModal2}
                              className='btn btn-sm btn-circle btn-ghost absolute right-2 top-2 border border-primary text-primary'
                            >
                              ✕
                            </div>

                            <div className=''>
                              <div className='w-full flex justify-center mb-[20px]'>
                                <div className='text-primary bg-primary/10 flex justify-center items-center w-[60px] h-[60px] rounded-full'>
                                  <LuHistory className='text-[30px] text-primary' />
                                </div>
                              </div>

                              <h3 className='font-bold text-[24px] text-center text-primary mb-[20px]'>
                                All My Bookings
                              </h3>

                              {myBookings?.map((ap, index) => {
                                const isGivenDateGreaterThanCurrent =
                                  checkBookStatus(ap?.moveDate, ap?.moverTime);
                                return (
                                  <div className='' key={index}>
                                    {ap?.amount !== 0 && (
                                      <div className='flex items-start justify-between mt-[0px] border-b border-t py-[15px] px-[10px]'>
                                        <div className='flex items-center space-x-[10px] flex-[1]'>
                                          <div className='flex flex-col space-y-[0px]'>
                                            <p className='line-clamp-1 font-bold text-[16px] '>
                                              {ap?.propertyType} (
                                              {ap?.movePackage} Move)
                                            </p>
                                            <p className='line-clamp-1 font-semibold text-[15px] '>
                                              with Mover - {ap?.moverName}{" "}
                                            </p>
                                            <div className='flex items-center space-x-[5px]'>
                                              <p className='line-clamp-2 text-[14px] text-gray-500'>
                                                {ap?.date}
                                              </p>
                                              {ap?.completedBook === true && (
                                                <div
                                                  // onClick={() => window.my_modal_51.showModal()}
                                                  className={`${
                                                    isGivenDateGreaterThanCurrent
                                                      ? "text-primary bg-primary/10"
                                                      : "text-secondary bg-secondary/10"
                                                  } font-semibold  px-[5px] rounded-[4px] py-[3px] text-[12px]`}
                                                >
                                                  {`${
                                                    isGivenDateGreaterThanCurrent
                                                      ? "ONGOING"
                                                      : "EXPIRED"
                                                  }`}
                                                </div>
                                              )}
                                            </div>
                                          </div>
                                        </div>
                                        <div className='flex items-center space-x-[20px]'>
                                          {/* <p className="line-clamp-2 font-bold text-[20px] text-primary">
                                                        Total Price:
                                                      </p> */}
                                          {ap?.completedBook === true && (
                                            <button
                                              className='btn btn-primary '
                                              onClick={() =>
                                                bookingHandler(ap?.bookingId)
                                              }
                                              disabled={bookLoading}
                                            >
                                              {!bookLoading && (
                                                <span className=''>View</span>
                                              )}
                                              {bookLoading && (
                                                <span className='loading loading-spinner loading-md text-white'></span>
                                              )}
                                            </button>
                                          )}
                                        </div>
                                      </div>
                                    )}
                                  </div>
                                );
                              })}
                            </div>
                          </form>
                          <form method='dialog'>
                            {/* <button>close</button> */}
                          </form>
                          {/* <form method="dialog" className="modal-backdrop">
                            <button>close</button>
                          </form> */}
                        </dialog>
                      </div>
                      <div className='border-b-[2px] pb-[10px]'>
                        <PaymentDashboard
                          allPayments={allPayments}
                          isGivenDateGreaterThanCurrent={
                            isGivenDateGreaterThanCurrent
                          }
                        />
                      </div>
                      {reserveDetails?.moveDate && (
                        <div className='flex flex-col space-y-[10px] lg:space-y-0 lg:flex-row lg:justify-between border-b-[2px] pb-[20px]'>
                          <div className='flex flex-col space-y-[10px] lg:space-y-0 lg:flex-row lg:space-x-[20px] lg:items-center '>
                            <div className='flex flex-col space-y-[3px]'>
                              <p className='text-2xl font-bold mb-[0px] select-none'>
                                {isGivenDateGreaterThanCurrent
                                  ? "Move Countdown:"
                                  : "Move Completed"}
                              </p>
                              {isGivenDateGreaterThanCurrent ? (
                                <div className=''>
                                  <p className='font-bold text-[14px] text-gray-500 '>
                                    {dayjs(
                                      convertDateFormat(
                                        reserveDetails?.moveDate
                                      )
                                    ).format("dddd, MMMM D, YYYY")}
                                  </p>
                                  <p className='font-bold text-[14px] text-gray-500 '>
                                    ({reserveDetails?.moverTime})
                                  </p>
                                </div>
                              ) : (
                                <TimeAgo
                                  date={dateObject}
                                  // formatter={formatter}
                                />
                              )}
                            </div>
                            {isGivenDateGreaterThanCurrent && (
                              <Countdown date={givenDate} />
                            )}
                          </div>
                          <div className='flex flex-col space-y-[5px]'>
                            <label
                              htmlFor='my_drawer_44'
                              className='btn btn-secondary drawer-button'
                              onClick={() => {
                                setShowReview(true);
                              }}
                            >
                              Review Mover
                            </label>
                            {isGivenDateGreaterThanCurrent && (
                              <p className='text-[14px] text-gray-500 font-semibold'>
                                Once move is completed
                              </p>
                            )}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* buy items */}
                    {true && (
                      <div className='border-b-[2px] pb-[0px] mb-[30px]'>
                        <BuyItems
                          clickedModalOpen={clickedModalOpen}
                          setClickedModalOpen={setClickedModalOpen}
                          isGivenDateGreaterThanCurrent={
                            isGivenDateGreaterThanCurrent
                          }
                          setShowReview={setShowReview}
                        />
                      </div>
                    )}

                    {/* pick items */}
                    {true && (
                      <div className='mb-[30px] lg:mb-[40px]'>
                        <PickUpItems
                          isGivenDateGreaterThanCurrent={
                            isGivenDateGreaterThanCurrent
                          }
                        />
                      </div>
                    )}

                    {!isGivenDateGreaterThanCurrent && (
                      <div className='flex justify-center items-center w-full py-[50px] text-secondary'>
                        <div className='flex flex-col items-center'>
                          <BsFillCalendarXFill className='text-secondary text-[50px]' />
                          <p className='font-bold mt-[10px]'>Book Expired:</p>
                          <p className='text-secondary '>
                            {!reserveDetails?.moveDateFormatted
                              ? dayjs(
                                  convertDateFormat(reserveDetails?.moveDate)
                                ).format("dddd, MMMM D, YYYY")
                              : reserveDetails?.moveDateFormatted}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/*<div className="w-[20vw] h-[100%] z-[2000] absolute top-0 right-0 bg-white">
              <p className="text-3xl font-bold">Side bar</p>
            </div>*/}
          </main>
        </BookingLayout>
      )}
      {(reserveId === "" || allLoading) && (
        <div className='flex justify-center items-center w-full h-screen'>
          <span className='loading loading-spinner loading-lg text-primary'></span>
        </div>
      )}
    </>
  );
};

export default Reservations;

export async function getServerSideProps(context) {
  const { id } = context.params; // Access the UID from the URL
  // const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  // const { data: prices } = await stripe.prices.list({
  //   active: true,
  //   limit: 10,
  //   expand: ["data.product"],
  // });
  // const userData = await fetchAllMoversDetailsArray();

  const bookingRef = doc(db, "bookingData", id);
  const docSnap = await getDoc(bookingRef);

  const progressData = docSnap.data();

  const bookingsData = await fetchAllBookings();

  const allBookings = [...bookingsData?.bookings].sort((a, b) => {
    return new Date(b.date) - new Date(a.date);
  });

  // const userData = await fetchAllMoversDetailsArray();

  // const completedBookings = bookingsData?.bookings?.filter(
  //   (bk) => bk.completedBook === true
  // );

  // const movers = userData?.personalDetails;

  // const approvedMovers = movers?.filter(
  //   (item) => item.approvalStatus === "APPROVED"
  // );


  // const completedBookings = bookingsData?.bookings?.filter(
  //   (bk) => bk.completedBook === true
  // );

  // let progressData;

  // if (!!pd) {
  //   progressData = pd?.bookings?.filter((bk) => bk.completedBook === true);
  // }

  // console.log({ pd });

  if (typeof bookingsData === "undefined") {
    return {
      props: {
        progressData: progressData,
        allBookings: null,
        // userData,
        id,
        // approvedMovers: null,

        // prices,
        // userData,
      },
    };
  } else if (typeof progressData === "undefined") {
    return {
      props: {
        progressData: null,
        allBookings,
        // userData,
        id,
        // approvedMovers,

        // prices,
        // userData,
      },
    };
  } else {
    return {
      props: {
        progressData: progressData,
        allBookings,

        // userData,
        id,
        // approvedMovers,

        // prices,
        // userData,
      },
    };
  }
}
