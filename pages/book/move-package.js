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
import {
  getAllDetails,
  updateLocationDetails,
  updateMoveDetails,
  updatePersonalDetails,
} from "@/store/quoteSlice";
import { useDispatch, useSelector } from "react-redux";

import PackageCard from "@/components/BookingPages/PackageCard";
import { moveDesciptionsCalc } from "@/utils/moversLogic";
import { useRouter } from "next/navigation";

const MovePackage = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const details = useSelector(getAllDetails);

  useEffect(() => {
    if (!details.moveDetails.moveDate) {
      router.push("/");
    }
  }, []);

  return (
    <BookingLayout>
      <Head>
        <title>Move Package - Removal and Self Storage</title>
        <meta name="description" content="Rss removal and storage website" />
        <link rel="icon" href="/rrs_favicon.svg" />
      </Head>

      {details.moveDetails.moveDate ? (
        <main>
          <div className="mb-[70px] lg:mb-[100px] pt-[70px]">
            <div className="md:max-w-7xl mx-auto">
              {/* Title */}
              <div className="w-full flex justify-center py-[30px] md:py-[40px] mb-[30px]">
                {/* <h3 className="text-4xl font-extrabold">Our Services</h3> */}
                <h3
                  className={`${titleFont.variable} font-sans2 text-2xl lg:text-4xl font-extrabold flex-col items-center justify-center`}
                >
                  <p className="">Choose a Move Package</p>{" "}
                  <div className="w-full bg-primary/20 h-[20px] mt-[-12px] "></div>
                </h3>
              </div>

              {/* move packages */}
              <div className="py-[0px] px-[20px] lg:px-[100px] xl:px-[20px] grid md:grid-cols-2  lg:grid-cols-2 xl:grid-cols-4 justify-center lg:gap-x-[20px] lg:gap-y-[50px] gap-x-[20px] gap-y-[50px]">
                <PackageCard
                  image="/svg/hand_packing.svg"
                  title="STANDARD"
                  subTitle=""
                  price="369"
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
      ) : (
        <div className="flex items-center justify-center h-[100vh] ">
          <span className="h-full loading loading-bars text-primary w-[40px] lg:w-[60px]"></span>
        </div>
      )}
    </BookingLayout>
  );
};

export default MovePackage;
