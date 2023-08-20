import BookingLayout from "@/layouts/BookingLayout";
import { titleFont } from "@/utils/fonts";
import Head from "next/head";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";

import PriceDatePick from "@/components/BookingPages/movers/PriceDatePick";
import FeaturesScroll from "@/components/BookingPages/movers/FeaturesScroll";
import FullRating from "@/components/Rating/FullRating";
import MoverCard from "@/components/BookingPages/movers/MoverCard";
import { BiSolidPhoneCall } from "react-icons/bi";
import MoveDetails from "@/components/BookingPages/movers/MoveDetails";
import SummaryDetails from "@/components/BookingPages/Checkout/SummaryDetails";
import CheckoutForm from "@/components/BookingPages/Checkout/CheckoutForm";
import { getAllDetails } from "@/store/quoteSlice";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";

const Checkout = () => {
  const [showModal, setShowModal] = useState(false);
  const details = useSelector(getAllDetails);

  const router = useRouter();

  const [payType, setPayType] = useState("");
  const [depositPart, setDepositPart] = useState(false);
  const [depositFull, setDepositFull] = useState(false);
  const [payMethod, setPayMethod] = useState("");
  const [card, setCard] = useState(false);
  const [paypal, setPaypal] = useState(false);

  // console.log(depositPart);
  // console.log(depositFull);

  const cardOnchange = (e) => {
    setCard(e.target.checked);
    setPaypal(false);
  };
  const paypalOnchange = (e) => {
    setPaypal(e.target.checked);
    setCard(false);
  };

  useEffect(() => {
    if (!details.moverDetails.moverName) {
      router.push("/");
    }
  }, []);

  return (
    <>
      <Head>
        <title>Checkout - Removals and Selfstorage</title>
        <meta name="description" content="Rss removal and storage website" />
        <link rel="icon" href="/rrs_favicon.svg" />
      </Head>

      {details.moverDetails.moverName ? (
        <BookingLayout >
          <main className="">
            <div className="mb-[70px] lg:mb-[100px] pt-[80px] md:pt-[100px] ">
              <div className="md:max-w-7xl mx-auto">
                {/* features links */}
                <FeaturesScroll />
                {/* Title */}
                <div className="w-full flex justify-center py-[30px] md:py-[40px]">
                  {/* <h3 className="text-4xl font-extrabold">Our Services</h3> */}
                  <h3
                    className={`${titleFont.variable} font-sans2 text-2xl md:text-4xl font-extrabold flex-col items-center justify-center`}
                  >
                    <p className="">Check-out</p>{" "}
                    <div className="w-full bg-primary/20 h-[20px] mt-[-12px] "></div>
                  </h3>
                </div>
                {/* checkout section*/}
                <div className="flex flex-col-reverse   lg:space-y-0 lg:flex-row lg:space-x-[10px] mx-[10px] md:mx-[20px]">
                  {/* left section - pament form */}
                  <div className="lg:flex-[1.3] w-full">
                    <CheckoutForm
                      cardOnchange={cardOnchange}
                      paypalOnchange={paypalOnchange}
                      depositFull={depositFull}
                      depositPart={depositPart}
                      setDepositFull={setDepositFull}
                      setDepositPart={setDepositPart}
                      // scriptLoaded={scriptLoaded}
                    />
                  </div>
                  {/* right section - Move summary */}
                  <div className="lg:flex-[1] w-full mb-[30px] lg:mb-[0px]">
                    <SummaryDetails
                      card={card}
                      paypal={paypal}
                      depositFull={depositFull}
                      depositPart={depositPart}
                      setDepositFull={setDepositFull}
                      setDepositPart={setDepositPart}
                    />
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

export default Checkout;
