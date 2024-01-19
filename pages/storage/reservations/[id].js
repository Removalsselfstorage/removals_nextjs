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
import { StorageData, homeMovers } from "@/dummyData/dummyData";
import {
  addWeeksToDate,
  calculateMoverPrice,
  checkBookStatus,
  checkBookStatus2,
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
// import ReserveSide from "@/components/Reservations/ReserveSide";
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
import {
  fetchAllBookings,
  fetchAllMoversDetailsArray,
  fetchAllStorage,
} from "@/lib/fetchData2";
import TimeAgo from "react-timeago";
import useLocalStorage from "use-local-storage";
import ReserveSide from "@/components/Storage/ReserveSide";
import StorageDashboard from "@/components/Storage/StorageDashboard";
import { containerOptions, storageReason } from "@/dummyData/inputData";
import { RiCustomerService2Fill } from "react-icons/ri";

const StorageReservation = ({ progressData, id, allBookings }) => {
  const router = useRouter();

  const [storageId, setStorageId] = useLocalStorage("name", "");

  const closeModal = () => {
    window.my_modal_51.close();
  };

  const calcDate = addWeeksToDate(
    progressData?.date,
    progressData?.date2,
    progressData?.durationCount
  );

  const c1 = dayjs(calcDate?.newDate).format("YYYY/MM/DD");
  const c2 = calcDate?.newFormattedValue;

  const isGivenDateGreaterThanCurrent = checkBookStatus2(progressData?.date);
  const isGivenDateGreaterThanCurrent2 = checkBookStatus2(c1);

  let targetDate = new Date(progressData?.date);
  let targetDate2 = new Date(c1);
  let targetDate3 = new Date();
  // Extract the start and end times from the timeRange

  // const currentDate = new Date().getTime();

  const givenDate = targetDate.getTime();
  const givenDate2 = targetDate2.getTime();
  const currentDate = targetDate3.getTime();

  const dateObject = targetDate2;

  const storage = StorageData?.find(
    (sd) => sd?.name2 === progressData?.containerSize
  );

  const storageStatus = () => {
    if (givenDate < givenDate2 && givenDate > currentDate) {
      return "NOT STARTED";
    } else if (currentDate > givenDate) {
      return "STARTED";
    } else if (currentDate > givenDate2) {
      return "EXPIRED";
    }
  };

  useEffect(() => {
    if (storageId === "") {
      router.push("/storage-login");
    }
    // triggerBookLoading();
  }, []);

  console.log({
    c1,
    c2,
    progressData,
    StorageData,
    storage,
    isGivenDateGreaterThanCurrent,
    isGivenDateGreaterThanCurrent2,
    targetDate,
    targetDate2,
    givenDate,
    givenDate2,
    currentDate,
    calcDate,
    storageStatus: storageStatus(),
  });

  return (
    <div>
      <Head>
        <title>Removals and Selfstorage - Storage Reservations</title>
        <meta name='description' content='Rss removal and storage website' />
        <link rel='icon' href='/rrs_favicon.svg' />
      </Head>

      <BookingLayout>
        <main className=''>
          <div className='mb-[70px] lg:mb-[100px] pt-[80px] md:pt-[80px] '>
            <div className='md:max-w-7xl mx-auto'>
              <div className='flex flex-col mt-[20px] space-y-[10px] lg:space-y-0 lg:flex-row lg:space-x-[10px] mx-[10px] md:mx-[20px]'>
                {/* left section */}
                <div className='lg:flex-[1]  w-full '>
                  <ReserveSide progressData={progressData} />
                </div>
                {/* right section */}
                <div className='bg-white shadow-lg rounded-[30px] lg:flex-[3] px-[20px] py-[30px] md:px-[30px] w-full '>
                  {/* heading */}
                  <div className='flex flex-col   space-y-[10px] md:flex-row md:space-y-0 md:justify-between md:items-center border-b-[2px] pb-[20px]'>
                    <div className='flex items-center space-x-[15px] '>
                      <p className='text-[40px]'>👋🏼</p>
                      <div className=''>
                        <h1 className='text-2xl font-bold mb-[10px] md:mb-[0px] text-secondary'>
                          Welcome {progressData?.fullName},
                        </h1>
                        <p className='text-gray-500 font-semibold'>
                          {/* Thank you for choosing Removals & Self Storage */}
                          {progressData?.email}
                        </p>
                      </div>
                    </div>
                    <div className='flex items-center space-x-[10px]'>
                      {/* book again button */}
                      <div
                        onClick={() => {
                          router.push("/storage");
                          updateReserveIdFxn("");
                        }}
                        className='btn btn-secondary'
                      >
                        <span className=''>Book A New Storage</span>
                      </div>
                      {/* logout button */}
                      <div
                        onClick={() => {
                          router.push("/storage-login");
                          setStorageId(undefined);
                          // updateReserveIdFxn("");
                          // setTimeout(() => {
                          //   resetReserveDetailsFxn();
                          // }, 2000);
                        }}
                        className='btn btn-secondary btn-outline'
                      >
                        <span className=''>Log Out</span>
                      </div>
                    </div>
                  </div>
                  {/* payment dashboard */}
                  <div className='flex flex-col space-y-[20px] mt-[30px] mb-[30px] '>
                    <div className=''>
                      <div className='flex justify-between'>
                        {/* book status */}
                        <div
                          // onClick={() => window.my_modal_51.showModal()}
                          className={`${
                            isGivenDateGreaterThanCurrent
                              ? "text-primary bg-primary/10"
                              : "text-secondary bg-secondary/10"
                          } font-semibold  px-[10px] rounded-[10px] py-[5px]`}
                        >
                          Storage Status: {storageStatus()}
                        </div>
                        {/* my booking */}
                        <div
                          className='flex space-x-[0px] items-center cursor-pointer'
                          // onClick={() => window.my_modal_61.showModal()}
                        >
                          {/* <p className='link font-semibold text-primary '>
                            My Bookings
                          </p> */}
                          <div className='md:flex text-primary items-center mr-[0px] md:mr-[0px] font-semibold space-x-[7px] hidden'>
                            <RiCustomerService2Fill size={20} className='' />
                            <a
                              href='tel:07869116203'
                              className='link link-hover'
                            >
                              Get in touch
                            </a>
                          </div>
                        </div>
                      </div>

                      {/* payment modal */}
                      <dialog
                        id='my_modal_51'
                        className='modal py-[20px] px-[10px]'
                      >
                        <form
                          method='dialog'
                          className='modal-box px-[20px] lg:px-[50px] w-11/12 max-w-5xl'
                        >
                          <div
                            onClick={closeModal}
                            className='btn btn-sm btn-circle md:h-[50px] md:w-[50px] btn-ghost absolute right-5 top-5 border border-secondary text-secondary'
                          >
                            ✕
                          </div>

                          <div className=''>
                            <h3 className='font-bold text-[24px] mt-[20px] text-center text-primary mb-[0px]'>
                              {storage?.name2}
                            </h3>

                            <div className='flex flex-col'>
                              <div className='flex flex-col lg:flex-row lg:space-x-[50px] lg:items-center space-y-[20px] lg:space-y-0 py-[30px]'>
                                {/* image */}
                                <div className='flex-[1.5]'>
                                  <img
                                    src={storage?.img}
                                    className='h-[400px] w-full object-contain'
                                    alt=''
                                  />
                                </div>
                                {/* body content */}
                                <div className='flex flex-col flex-[1]'>
                                  <p className='font-bold text-[18px] mb-[7px] text-primary'>
                                    {storage?.name1}
                                  </p>
                                  {/* <p className='font-bold text-[24px] mb-[10px] text-primary'>
                                    £{storage?.discount.toFixed(2)} / week
                                    
                                  </p> */}

                                  {/* <p className='font-semibold mb-[20px]'>( £{rate} / Week )</p> */}
                                  <p className=' mb-[20px]'>
                                    <span className='font-semibold'>
                                      Dimension:{" "}
                                    </span>
                                    <span className=''>
                                      {storage?.dimension}
                                    </span>
                                  </p>
                                  <p className=' mb-[20px] text-[15px]'>
                                    {/* <span className='font-semibold'> NB: </span> */}
                                    <span className=''>{storage?.note}</span>
                                  </p>

                                  <div
                                    onClick={closeModal}
                                    className='btn  btn-outline btn-secondary'
                                  >
                                    Close
                                  </div>
                                </div>
                              </div>
                            </div>
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
                      <StorageDashboard
                        progressData={progressData}
                        isGivenDateGreaterThanCurrent={
                          isGivenDateGreaterThanCurrent
                        }
                      />
                    </div>

                    {progressData?.date && (
                      <div className='flex flex-col space-y-[10px] lg:space-y-0 lg:flex-row lg:justify-between border-b-[2px] pb-[20px]'>
                        <div className='flex flex-col space-y-[10px] lg:space-y-0 lg:flex-row lg:space-x-[20px] lg:items-center '>
                          <div className='flex flex-col space-y-[3px]'>
                            <p className='text-2xl font-bold mb-[0px] select-none'>
                              {givenDate < givenDate2 && givenDate > currentDate
                                ? "Storage Start Countdown"
                                : currentDate > givenDate
                                ? "Storage Expiration Countdown"
                                : "Storage Expired"}
                            </p>
                            {(givenDate < givenDate2 && givenDate > currentDate) ? (
                              <div className=''>
                                <p className='font-bold text-[14px] text-gray-500 '>
                                  {progressData?.date2}
                                </p>
                              </div>
                            ) : currentDate > givenDate ? (
                              <div className=''>
                                <p className='font-bold text-[14px] text-gray-500 '>
                                  {c2}
                                </p>
                              </div>
                            ) : (
                              <TimeAgo
                                date={dateObject}
                                // formatter={formatter}
                              />
                            )}
                          </div>
                          {currentDate < givenDate2 && (
                            <Countdown
                              date={
                                (givenDate < givenDate2 &&
                                givenDate > currentDate)
                                  ? givenDate
                                  : currentDate > givenDate
                                  ? givenDate2
                                  : ""
                              }
                            />
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </BookingLayout>
    </div>
  );
};

export default StorageReservation;

export async function getServerSideProps(context) {
  const { id } = context.params; // Access the UID from the URL

  const bookingRef = doc(db, "storageData", id);
  const docSnap = await getDoc(bookingRef);

  const progressData = docSnap.data();

  const bookingsData = await fetchAllStorage();

  const allBookings = [...bookingsData?.bookings].sort((a, b) => {
    return new Date(b.date) - new Date(a.date);
  });

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
