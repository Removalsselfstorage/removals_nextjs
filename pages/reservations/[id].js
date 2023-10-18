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

const Reservations = ({ id, progressData, prices }) => {
  const {
    setReserveDetailsFxn,
    reserveDetails,
    router,
    reserveId,
    updateReserveIdFxn,
  } = useQuote();

  const {
    completedBookings,
    completedBookingsLoading,
    refetchCompletedBookings,
    completedBook,
  } = useBookings();

  const [completedBooking, setCompletedBooking] = useState({});
  // const [extraPrice, setExtraPrice] = useState("");

  const {
    updateQtyInBedroomFxn,
    moveItems,
    resetMoveItemsFxn,
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

  //setBedRoom

  useEffect(() => {
    setCompletedBooking(completedBook(id));
  }, [completedBookings]);

  useEffect(() => {
    if (reserveId === "") {
      router.push("/reserve-login");
    }
  }, []);

  useEffect(() => {
    completedBooking?.moveItems &&
      resetMoveItemsFxn(completedBooking?.moveItems);
    setReserveDetailsFxn({
      bookDate: completedBooking?.date,
      address1: completedBooking?.address1,
      postCode1: completedBooking?.postCode1,
      city1: completedBooking?.city1,
      country1: completedBooking?.country1,
      floor1: completedBooking?.floor1,
      liftAvailable1: completedBooking?.liftAvailable1,
      address2: completedBooking?.address2,
      postCode2: completedBooking?.postCode2,
      city2: completedBooking?.city2,
      country2: completedBooking?.country2,
      floor2: completedBooking?.floor2,
      liftAvailable2: completedBooking?.liftAvailable2,
      firstName: completedBooking?.firstName,
      lastName: completedBooking?.lastName,
      email: completedBooking?.email,
      countryCode: completedBooking?.countryCode,
      telephone: completedBooking?.telephone,
      bookingId: completedBooking?.bookingId,
      propertyType: completedBooking?.propertyType,
      numberOfMovers: completedBooking?.numberOfMovers,
      mileage: completedBooking?.mileage,
      volume: completedBooking?.volume,
      duration: completedBooking?.duration,
      moveDate: completedBooking?.moveDate,
      movePackage: completedBooking?.movePackage,
      quoteRef: completedBooking?.quoteRef,
      initialPackagePrice: completedBooking?.initialPackagePrice,
      moverName: completedBooking?.moverName,
      moverTime: completedBooking?.moverTime,
      moverPrice: completedBooking?.moverPrice,
      pickPrice: completedBooking?.pickPrice,
      moveDateFormatted: completedBooking?.moveDateFormatted,
      dateId: completedBooking?.dateId,
      paidPart: completedBooking?.paidPart,
      paidFull: completedBooking?.paidFull,
      paidPrice: completedBooking?.paidPrice,
      paymentType: completedBooking?.paymentType,
      cartItems: completedBooking?.cartItems,
      stripeCartProducts: completedBooking?.cartStripeProducts,
      stripeCartDetails: completedBooking?.cartStripeDetails,
      extraPrice: completedBooking?.extraPrice,
    });
  }, [completedBooking]);

  const currentDate = new Date();

  const givenDateString = dayjs(
    convertDateFormat(reserveDetails?.moveDate)
  ).format("dddd, MMMM D, YYYY");
  const givenDate = new Date(givenDateString);

  // Compare the two dates
  const isGivenDateGreaterThanCurrent = givenDate > currentDate;

  // const {} = reserveDetails

  // console.log({ progressData, moveItems });
  console.log({ completedBooking });

  return (
    <>
      <Head>
        <title>Removals and Selfstorage - Reservations</title>
        <meta name="description" content="Rss removal and storage website" />
        <link rel="icon" href="/rrs_favicon.svg" />
      </Head>
      {reserveId !== "" && !completedBookingsLoading ? (
        <BookingLayout>
          <main className="">
            <div className="mb-[70px] lg:mb-[100px] pt-[80px] md:pt-[80px] ">
              <div className="md:max-w-7xl mx-auto">
                {/* stepper */}
                <FeaturesScroll2 />

                {/* movers list row */}
                <div className="flex flex-col mt-[20px] space-y-[10px] lg:space-y-0 lg:flex-row lg:space-x-[10px] mx-[10px] md:mx-[20px]">
                  {/* left section */}
                  <div className="lg:flex-[1]  w-full">
                    <ReserveSide />
                  </div>
                  {/* right section */}
                  <div className="bg-white shadow-lg rounded-[30px] lg:flex-[3] px-[20px] py-[30px] md:px-[30px] w-full ">
                    {/* side drawer */}
                    <CartSideDrawer />
                    {/* heading */}
                    <div className="flex flex-col   space-y-[10px] md:flex-row md:space-y-0 md:justify-between md:items-center border-b-[2px] pb-[20px]">
                      <div className="flex items-center space-x-[15px] ">
                        <p className="text-[40px]">👋</p>
                        <div className="">
                          <h1 className="text-2xl font-bold mb-[10px] md:mb-[0px] text-secondary">
                            Welcome {reserveDetails?.firstName}{" "}
                            {reserveDetails?.lastName},
                          </h1>
                          <p className="text-gray-500 font-semibold">
                            Thank you for choosing Removals & Self Storage
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-[10px]">
                        {/* book again button */}
                        <div
                          onClick={() => {
                            router.push("/book");
                            updateReserveIdFxn("");
                            // setTimeout(() => {
                            //   resetReserveDetailsFxn();
                            // }, 2000);
                          }}
                          className="btn btn-secondary"
                        >
                          {/* <span className="">
                            <BiLogOut className="text-[20px]" />
                          </span> */}
                          <span className="">Book A New Move</span>
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
                          className="btn btn-secondary btn-outline"
                        >
                          {/* <span className="">
                            <BiLogOut className="text-[20px]" />
                          </span> */}
                          <span className="">Log Out</span>
                        </div>
                      </div>
                    </div>
                    {/* payment dashboard */}
                    <div className="flex flex-col space-y-[20px] mt-[30px] mb-[30px] ">
                      <div className="border-b-[2px] pb-[20px]">
                        <PaymentDashboard />
                      </div>
                      {reserveDetails?.moveDate &&
                        isGivenDateGreaterThanCurrent && (
                          <div className="flex flex-col space-y-[10px] lg:space-y-0 lg:flex-row lg:space-x-[20px] lg:items-center border-b-[2px] pb-[20px]">
                            <div className="flex flex-col space-y-[5px]">
                              <p className="text-2xl font-bold mb-[0px] select-none">
                                Move Day Countdown:
                              </p>
                              <p className="font-bold text-[15px] text-gray-500 ">
                                {dayjs(
                                  convertDateFormat(reserveDetails?.moveDate)
                                ).format("dddd, MMMM D, YYYY")}
                              </p>
                            </div>
                            <Countdown
                              date={reserveDetails?.moveDate}
                              // time={moverDetails?.moverTime}
                            />
                          </div>
                        )}
                    </div>

                    {/* buy items */}
                    <div className="border-b-[2px] pb-[0px] mb-[30px]">
                      <BuyItems
                        clickedModalOpen={clickedModalOpen}
                        setClickedModalOpen={setClickedModalOpen}
                      />
                    </div>

                    {/* pick items */}
                    <div className="mb-[30px] lg:mb-[40px]">
                      <PickUpItems />
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
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  const { data: prices } = await stripe.prices.list({
    active: true,
    limit: 10,
    expand: ["data.product"],
  });
  // const userData = await fetchAllMoversDetailsArray();

  const bookingRef = doc(db, "bookingData", id);
  const docSnap = await getDoc(bookingRef);

  const progressData = docSnap.data();

  // console.log({ progressData });

  return {
    props: {
      // userData,
      id: id,
      progressData,
      prices,
      // userData,
    },
  };
}
