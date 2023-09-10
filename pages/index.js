import Image from "next/image";
import Head from "next/head";
import { titleFont } from "@/utils/fonts";
import Hero from "@/components/HomePage/Hero";
import OurServices from "@/components/HomePage/OurServices";
import WhyChooseUs from "@/components/HomePage/WhyChooseUs";
import AboutUs from "@/components/HomePage/AboutUs";
import OurReviews from "@/components/HomePage/OurReviews";
import FAQ from "@/components/HomePage/FAQ";
import FeaturedCompanies from "@/components/HomePage/FeatureCompanies";
import InputSearch from "@/components/Inputs/InputSearch";
import Features from "@/components/HomePage/Features";
import HowItWorks from "@/components/HomePage/HowItWorks";
import NormalLayout from "@/layouts/NormalLayout";
import { getAllUserDetails } from "@/store/userSlice";
import { useDispatch, useSelector } from "react-redux";
import MuiModal from "@/components/Modal/MuiModal";
import { useEffect, useState } from "react";
import { getAllMoverDetails } from "@/store/moverSlice";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { getAllDetails } from "@/store/quoteSlice";
import Link from "next/link";
import Lottie from "lottie-react";
import EmailSent from "@/lottieJsons/EmailSent2.json";
import movingVan from "@/lottieJsons/movingVan.json";

export default function Home() {
  const dispatch = useDispatch();

  const users = useSelector(getAllUserDetails);
  const moverDetails = useSelector(getAllMoverDetails);
  const details = useSelector(getAllDetails);

  const bookStageBoolean = () => {
    switch (details?.bookStage) {
      case "book/home-removals":
        return true;
        break;
      case "book/man-van":
        return true;
        break;
      case "book/move-package":
        return true;
        break;
      case "book/movers":
        return true;
        break;

      default:
        return false;
        break;
    }
  };
  const bookStageBoolean2 = () => {
    switch (details.bookStage) {
      case "book/home-removals":
        return false;
        break;
      case "book/man-van":
        return false;
        break;
      case "book/move-package":
        return true;
        break;

      case "book/movers":
        return true;
        break;

      default:
        return false;
        break;
    }
  };

  const bookStageLink = () => {
    switch (details.bookStage) {
      case "book/home-removals":
        return "book/move-package";
        break;
      case "book/man-van":
        return "book/move-package";
        break;
      case "book/move-package":
        return "book/movers";
        break;
      case "book/movers":
        return "book/checkout";
        break;
    }
  };

  const [initialLoading, setInitialLoading] = useState(true);
  const [showProgressMenu, setShowProgressMenu] = useState(bookStageBoolean());

  useEffect(() => {
    setTimeout(() => {
      setInitialLoading(false);
    }, 2000);
  }, []);

  return (
    <>
      {/* {initialLoading ? "" : ""} */}
      <Head>
        <title>
          Removals and Selfstorage - Book Movers & Moving Help Online
        </title>
        <meta name="description" content="Rss removal and storage website" />
        <link rel="icon" href="/rrs_favicon.svg" />
      </Head>
      {!initialLoading ? (
        <NormalLayout>
          <main className="">
            {showProgressMenu && (
              <div className="w-full bg-secondary/10 border-t-[2px] py-[20px]  mt-[100px]  md:mt-[100px] lg:mt-[100px]">
                <div className="w-full md:max-w-7xl mx-auto px-[20px] flex flex-col space-y-[10px] lg:space-y-[0px] lg:flex-row lg:justify-between">
                  <div className="flex flex-col">
                    <p className="font-bold line-clamp-1">
                      {details.moveDetails.propertyType}{" "}
                      {details.moveDetails.movePackage} Package with{" "}
                      {details.moveDetails.numberOfMovers} and Jumbo Van
                    </p>
                    <p className="line-clamp-1">
                      Delivery from {details.serviceLocation.locationFrom.name}{" "}
                      to {details.serviceLocation.locationTo.name}
                    </p>
                  </div>
                  <div className="flex items-center justify-between">
                    {bookStageBoolean2() && (
                      <p className="font-bold text-[20px] mr-[30px]">
                        from{" "}
                        <span className="font-extrabold text-[24px]">
                          ₤{details.moveDetails.initialPackagePrice}
                        </span>
                      </p>
                    )}
                    <div className="flex items">
                      <Link
                        href={`/${bookStageLink()}`}
                        className="btn btn-secondary  mr-[10px]"
                      >
                        Continue Quote
                      </Link>
                      <div
                        className="cursor-pointer"
                        onClick={() => setShowProgressMenu(false)}
                      >
                        <AiOutlineCloseCircle
                          size={30}
                          className="text-secondary"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {!showProgressMenu && (
              <div className="w-full  border-t-[2px]   border-black mt-[100px]  md:mt-[70px] lg:mt-[100px]"></div>
            )}
            <Hero />
            <Features />
            {/* <MuiModal open={open} setOpen={setOpen}>
          <p className="text-2xl font-bold text-black">Hello World</p>
        </MuiModal>
        <button onClick={()=> setOpen(true)}>Open Modal</button> */}
            <OurServices />
            <HowItWorks />
            <WhyChooseUs />
            <AboutUs />
            <OurReviews />
            <FeaturedCompanies />
            <FAQ />
          </main>
        </NormalLayout>
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
}
