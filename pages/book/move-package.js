import QuoteType from "@/components/BookingPages/QuoteType";
import BasicDatePicker from "@/components/DatePicker/DatePicker";
import SelectSearch from "@/components/Inputs/SelectSearch";
import { citiesOptions } from "@/dummyData/inputData";
import BookingLayout from "@/layouts/BookingLayout";
import { titleFont } from "@/utils/fonts";
import Head from "next/head";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FiEdit } from "react-icons/fi";
import { MdKeyboardArrowRight } from "react-icons/md";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import { getAllDetails } from "@/store/quoteSlice";
import { useDispatch, useSelector } from "react-redux";
import Lottie from "lottie-react";
import movingVan from "@/lottieJsons/movingVan.json";
import PackageCard from "@/components/BookingPages/PackageCard";
import { moveDesciptionsCalc } from "@/utils/moversLogic";
import { useRouter } from "next/navigation";
import useBookings from "@/hooks/useBookings";
import useQuote from "@/hooks/useQuote";

const MovePackage = () => {
  // const router = useRouter();
  const dispatch = useDispatch();
  const details = useSelector(getAllDetails);

  const {
    setReserveDetailsFxn,
    reserveDetails,
    router,
    reserveId,
    updateReserveIdFxn,
    quoteDetails,
    setQuoteDetailsFxn,
    moveDetails,
  } = useQuote();

  const {
    completedBook,
    completedBookLoading,
    refetchCompletedBook,
    allBookings,
    allBookingsLoading,
    refetchAllBookings,
  } = useBookings();

  const moveUrl = () => {
    switch (details.moveDetails.propertyType) {
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

  const [currentBook, setCurrentBook] = useState({});

  // const onPackageClick = async () => {

  // }

  useEffect(() => {
    if (!details.moveDetails.moveDate) {
      router.push("/");
    }
  }, []);

  useEffect(() => {
    const cb = allBookings?.find(
      (ab) => ab.bookingId === moveDetails.bookingId
    );
    // setQuoteDetailsFxn(cb);

    setCurrentBook(cb);
  }, [allBookings]);

  console.log({ currentBook, allBookings});

  return (
    <>
      <Head>
        <title>Move Package - Removal and Self Storage</title>
        <meta name="description" content="Rss removal and storage website" />
        <link rel="icon" href="/rrs_favicon.svg" />
      </Head>

      {details.moveDetails.moveDate ? (
        <BookingLayout>
          <main>
            <div className="mb-[70px] lg:mb-[100px] pt-[70px]">
              <div className="md:max-w-7xl mx-auto">
                {/* stepper */}
                <div className="w-full flex justify-center mt-[20px] mb-[80px]">
                  <ul className="steps">
                    <li
                      onClick={() => {
                        router.push(`/book/${moveUrl()}`);
                      }}
                      className="step step-primary px-[10px] md:px-[40px] font-bold text-[16px] leading-[20px] cursor-pointer"
                    >
                      Move Details
                    </li>
                    <li className="step step-primary font-bold text-[16px] leading-[25px]">
                      Move Package
                    </li>
                    <li className="step  font-bold text-[16px] leading-[25px] text-gray-300">
                      Choose Mover
                    </li>
                    <li className="step  font-bold text-[16px] leading-[25px] text-gray-300">
                      Checkout
                    </li>
                  </ul>
                </div>

                {/* move packages */}
                <div className="py-[0px] px-[20px] lg:px-[100px] xl:px-[20px] grid md:grid-cols-2  lg:grid-cols-2 xl:grid-cols-4 justify-center lg:gap-x-[20px] lg:gap-y-[50px] gap-x-[20px] gap-y-[50px]">
                  <PackageCard
                    image="/svg/hand_packing.svg"
                    title="STANDARD"
                    subTitle=""
                    price="369"
                    currentBook={currentBook}
                    f1={
                      moveDesciptionsCalc(
                        "STANDARD",
                        details.moveDetails.propertyType
                      ).f1
                    }
                    f2={
                      moveDesciptionsCalc(
                        "STANDARD",
                        details.moveDetails.propertyType
                      ).f2
                    }
                    f3={
                      moveDesciptionsCalc(
                        "STANDARD",
                        details.moveDetails.propertyType
                      ).f3
                    }
                    f4={
                      moveDesciptionsCalc(
                        "STANDARD",
                        details.moveDetails.propertyType
                      ).f4
                    }
                    f5={
                      moveDesciptionsCalc(
                        "STANDARD",
                        details.moveDetails.propertyType
                      ).f5
                    }
                    f6={
                      moveDesciptionsCalc(
                        "STANDARD",
                        details.moveDetails.propertyType
                      ).f6
                    }
                    f7={
                      moveDesciptionsCalc(
                        "STANDARD",
                        details.moveDetails.propertyType
                      ).f7
                    }
                    f8={
                      moveDesciptionsCalc(
                        "STANDARD",
                        details.moveDetails.propertyType
                      ).f8
                    }
                    link="/movers"
                  />
                  <PackageCard
                    image="/svg/man_van.svg"
                    title="GOLD"
                    subTitle="Price per hour"
                    price="386"
                    currentBook={currentBook}
                    f1={
                      moveDesciptionsCalc(
                        "GOLD",
                        details.moveDetails.propertyType
                      ).f1
                    }
                    f2={
                      moveDesciptionsCalc(
                        "GOLD",
                        details.moveDetails.propertyType
                      ).f2
                    }
                    f3={
                      moveDesciptionsCalc(
                        "GOLD",
                        details.moveDetails.propertyType
                      ).f3
                    }
                    f4={
                      moveDesciptionsCalc(
                        "GOLD",
                        details.moveDetails.propertyType
                      ).f4
                    }
                    f5={
                      moveDesciptionsCalc(
                        "GOLD",
                        details.moveDetails.propertyType
                      ).f5
                    }
                    f6={
                      moveDesciptionsCalc(
                        "GOLD",
                        details.moveDetails.propertyType
                      ).f6
                    }
                    f7={
                      moveDesciptionsCalc(
                        "GOLD",
                        details.moveDetails.propertyType
                      ).f7
                    }
                    f8={
                      moveDesciptionsCalc(
                        "GOLD",
                        details.moveDetails.propertyType
                      ).f8
                    }
                    f9={
                      moveDesciptionsCalc(
                        "GOLD",
                        details.moveDetails.propertyType
                      ).f9
                    }
                    preferred
                    link="/movers"
                  />
                  <PackageCard
                    image="/svg/store.svg"
                    title="PREMIUM"
                    subTitle="Prices per hour"
                    price="397"
                    currentBook={currentBook}
                    f1={
                      moveDesciptionsCalc(
                        "PREMIUM",
                        details.moveDetails.propertyType
                      ).f1
                    }
                    f2={
                      moveDesciptionsCalc(
                        "PREMIUM",
                        details.moveDetails.propertyType
                      ).f2
                    }
                    f3={
                      moveDesciptionsCalc(
                        "PREMIUM",
                        details.moveDetails.propertyType
                      ).f3
                    }
                    f4={
                      moveDesciptionsCalc(
                        "PREMIUM",
                        details.moveDetails.propertyType
                      ).f4
                    }
                    f5={
                      moveDesciptionsCalc(
                        "PREMIUM",
                        details.moveDetails.propertyType
                      ).f5
                    }
                    f6={
                      moveDesciptionsCalc(
                        "PREMIUM",
                        details.moveDetails.propertyType
                      ).f6
                    }
                    f7={
                      moveDesciptionsCalc(
                        "PREMIUM",
                        details.moveDetails.propertyType
                      ).f7
                    }
                    f8={
                      moveDesciptionsCalc(
                        "PREMIUM",
                        details.moveDetails.propertyType
                      ).f8
                    }
                    f9={
                      moveDesciptionsCalc(
                        "PREMIUM",
                        details.moveDetails.propertyType
                      ).f9
                    }
                    f10={
                      moveDesciptionsCalc(
                        "PREMIUM",
                        details.moveDetails.propertyType
                      ).f10
                    }
                    f11={
                      moveDesciptionsCalc(
                        "PREMIUM",
                        details.moveDetails.propertyType
                      ).f11
                    }
                    f12={
                      moveDesciptionsCalc(
                        "PREMIUM",
                        details.moveDetails.propertyType
                      ).f12
                    }
                    link="/movers"
                  />
                  <PackageCard
                    image="/svg/hand_packing.svg"
                    title="PREMIUM PLUS"
                    subTitle=""
                    price="466"
                    currentBook={currentBook}
                    f1={
                      moveDesciptionsCalc(
                        "PREMIUM PLUS",
                        details.moveDetails.propertyType
                      ).f1
                    }
                    f2={
                      moveDesciptionsCalc(
                        "PREMIUM PLUS",
                        details.moveDetails.propertyType
                      ).f2
                    }
                    f3={
                      moveDesciptionsCalc(
                        "PREMIUM PLUS",
                        details.moveDetails.propertyType
                      ).f3
                    }
                    f4={
                      moveDesciptionsCalc(
                        "PREMIUM PLUS",
                        details.moveDetails.propertyType
                      ).f4
                    }
                    f5={
                      moveDesciptionsCalc(
                        "PREMIUM PLUS",
                        details.moveDetails.propertyType
                      ).f5
                    }
                    f6={
                      moveDesciptionsCalc(
                        "PREMIUM PLUS",
                        details.moveDetails.propertyType
                      ).f6
                    }
                    f7={
                      moveDesciptionsCalc(
                        "PREMIUM PLUS",
                        details.moveDetails.propertyType
                      ).f7
                    }
                    f8={
                      moveDesciptionsCalc(
                        "PREMIUM PLUS",
                        details.moveDetails.propertyType
                      ).f8
                    }
                    f9={
                      moveDesciptionsCalc(
                        "PREMIUM PLUS",
                        details.moveDetails.propertyType
                      ).f9
                    }
                    f10={
                      moveDesciptionsCalc(
                        "PREMIUM PLUS",
                        details.moveDetails.propertyType
                      ).f10
                    }
                    f11={
                      moveDesciptionsCalc(
                        "PREMIUM PLUS",
                        details.moveDetails.propertyType
                      ).f11
                    }
                    f12={
                      moveDesciptionsCalc(
                        "PREMIUM PLUS",
                        details.moveDetails.propertyType
                      ).f12
                    }
                    link="/movers"
                  />
                </div>
              </div>
            </div>
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

export default MovePackage;
