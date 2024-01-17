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

const StorageReservation = ({ progressData, id, allBookings }) => {

  const router = useRouter();

  const [storageId, setStorageId] = useLocalStorage("name", "");

  useEffect(() => {
    if (storageId === "") {
      router.push("/storage-login");
    }
    // triggerBookLoading();
  }, []);

  console.log({progressData})

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
                <div className='lg:flex-[1]  w-full'>
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
                            setStorageId(undefined)
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
