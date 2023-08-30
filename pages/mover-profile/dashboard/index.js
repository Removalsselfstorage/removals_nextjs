import StarRating from "@/components/Rating/EditHalfStars2";
import MoverLayout from "@/layouts/MoverLayout";
import NormalLayout from "@/layouts/NormalLayout";
import {
  fetchAllMoversDetails,
  fetchMoverDetails3,
  fetchMoversCompanyPix,
  fetchMoversDetails,
  fetchMoversDrivingLicense,
  fetchMoversPubInsurance,
  fetchMoversRegCertificate,
  fetchMoversTranInsurance,
  fetchMoversVehInsurance,
} from "@/lib/fetchData2";
import { getAllMoverDetails } from "@/store/moverSlice";
import { getAllUserDetails, getAllpersonalDetails } from "@/store/userSlice";
import { combineInitials, convertUTCToLocal } from "@/utils/logics";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import {
  BiChevronLeft,
  BiChevronRight,
  BiLogOut,
  BiSolidBank,
} from "react-icons/bi";
import { BsImages, BsTools } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";
import { FaRegEdit, FaTruckMoving } from "react-icons/fa";
import { HiDocumentDuplicate } from "react-icons/hi";
import { IoMdNotificationsOutline } from "react-icons/io";
import { TfiComments } from "react-icons/tfi";
import { useDispatch, useSelector } from "react-redux";

const sections = [
  {
    id: 0,
    title: "Add a Profile Picture!",
    subText:
      "Add a professional profile picture that makes you appear approachable and personable.",
    icon: <CgProfile className="text-white text-[30px]" />,
    buttonTitle: "Add Picture",
    navNumber: 1,
    link: "edit-profile",
    required: true,
  },
  {
    id: 1,
    title: "Complete Documentation Process",
    subText:
      "By completing the documentation process you boast your profile integrity and activation process.",
    icon: <HiDocumentDuplicate className="text-white text-[30px]" />,
    buttonTitle: "Upload Documents",
    navNumber: 2,
    link: "documentations",
    required: true,
  },
  {
    id: 2,
    title: "Accept our Terms & Policies!",
    subText:
      "By accepting our Terms & Policies you have the legal right to use our website. You will also understand how your information will be used.",
    icon: <FaRegEdit className="text-white text-[30px]" />,
    buttonTitle: "Read Terms & Policies",
    navNumber: 2,
    link: "terms-and-policies",
    required: true,
  },
  {
    id: 3,
    title: "Attract more Customers!",
    subText:
      "Add reviews from your previous jobs. They appear on your profile as reviews and get you more customers.",
    icon: <TfiComments className="text-white text-[30px]" />,
    buttonTitle: "Add Reviews",
    navNumber: 3,
    link: "reviews",
    required: false,
  },
  {
    id: 4,
    title: "Show off your work!",
    subText:
      "Upload a portfolio of work samples and other imagery that provide an overview of your abilities and qualifications.",
    icon: <BsImages className="text-white text-[30px]" />,
    buttonTitle: "Upload Portfolio",
    navNumber: 4,
    link: "portfolio",
    required: false,
  },
  {
    id: 5,
    title: "Enter Bank Account Details",
    subText:
      "Your payment will be deposited directly into your Bank Account every Monday at 6pm, and subject to the job being completed.",
    icon: <BiSolidBank className="text-white text-[30px]" />,
    buttonTitle: "Add Bank Account",
    navNumber: 5,
    link: "billing",
    required: false,
  },
];

const Dashboard = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const userDetails = useSelector(getAllUserDetails);
  const details = useSelector(getAllMoverDetails);

  const condition1 = details?.personalDetails?.profilePictureUrl;
  const condition2 = details.personalDetails.acceptedTerms;
  // const condition3 = details.companyDetails.companyProfilePixUrl;

  const filterSections = () => {
    if (condition1 !== "" && condition2 === false) {
      const newSections = sections.filter((section) => {
        return (
          section.title !== "Complete Documentation Process" &&
          section.title !== "Add a Profile Picture!"
          // section.title !== "Accept our Terms & Policies!"
        );
      });
      return newSections;
    } else if (condition1 !== "") {
      const newSections = sections.filter((section) => {
        return (
          section.title !== "Complete Documentation Process" &&
          section.title !== "Add a Profile Picture!"
          // section.title !== "Accept our Terms & Policies!"
        );
      });
      return newSections;
    } else if (condition1 !== "" && condition2 === true) {
      const newSections = sections.filter((section) => {
        return (
          section.title !== "Complete Documentation Process" &&
          section.title !== "Add a Profile Picture!" &&
          section.title !== "Accept our Terms & Policies!"
        );
      });
      return newSections;
    } else if (condition2 === true) {
      const newSections = sections.filter((section) => {
        return (
          // section.title !== "Complete Documentation Process" &&
          // section.title !== "Add a Profile Picture!"
          section.title !== "Accept our Terms & Policies!"
        );
      });
      return newSections;
    } else {
      return sections;
    }
  };

  const sortedSections = filterSections();

  const firstName = details.personalDetails.firstName;
  const lastName = details.personalDetails.lastName;

  // const registeredDate = Date.parse(
  //   userDetails?.userDetails?.metadata?.creationTime
  // );
  // const lastSignIn = Date.parse(
  //   userDetails?.userDetails?.metadata?.lastSignInTime
  // );

  // const localRegisteredDate = convertUTCToLocal(registeredDate);
  // const localLastSignIn = convertUTCToLocal(lastSignIn);

  const [index, setIndex] = useState(0);
  const [sectionData, setSectionData] = useState(sortedSections);

  const [previewUrl, setPreviewUrl] = useState(
    details.personalDetails.profilePictureUrl
  );

  useEffect(() => {
    const lastIndex = sectionData?.length - 1;
    if (index < 0) {
      setIndex(lastIndex);
    }
    if (index > lastIndex) {
      setIndex(0);
    }
  }, [index, sectionData]);

  // useEffect(() => {
  //   let slider = setInterval(() => {
  //     setIndex(index + 1);
  //   }, 5000);
  //   return () => {
  //     clearInterval(slider);
  //   };
  // }, [index]);
  console.log(userDetails);

  return (
    <MoverLayout>
      <Head>
        <title>Mover Profile - Dashboard</title>
        <meta name="description" content="Rss removal and storage website" />
        <link rel="icon" href="/rrs_favicon.svg" />
      </Head>

      <div className="py-[50px] bg-white/80 px-[30px] w-full h-full">
        <section className="mb-[30px]">
          <div className="flex flex-col">
            <p className="font-bold text-[25px] mb-[20px]">Dashboard</p>
            <div className="flex flex-col space-y-[20px] lg:space-y-0 lg:flex-row lg:space-x-[50px] lg:justify-between">
              <div className="flex items-center space-x-[20px] md:space-x-[30px]">
                {previewUrl ? (
                  <div className="avatar ">
                    <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                      <img src={previewUrl} />
                    </div>
                  </div>
                ) : (
                  <div className="avatar placeholder">
                    <div className="bg-gray-200 rounded-full w-[120px]">
                      <span className="text-5xl font-bold">
                        {combineInitials(firstName, lastName)}
                      </span>
                    </div>
                  </div>
                )}
                <div className="flex flex-col md:space-y-[5px] justify-center">
                  <div className="flex items-stretch space-x-[10px]">
                    <p className="flex items-center text-[17px]">Welcome,</p>
                    <p className="font-bold text-[25px] flex items-end">
                      {firstName} {lastName}
                    </p>
                  </div>
                  <p className=" text-gray-400 text-[13px] md:text-[14px]">
                    <span className="font-bold ">Registered:</span>{" "}
                    {userDetails?.userDetails?.metadata?.creationTime}
                  </p>
                  <p className=" text-gray-400 text-[13px] md:text-[14px]">
                    <span className="font-bold">Last Login:</span>{" "}
                    {userDetails?.userDetails?.metadata?.lastSignInTime}
                  </p>
                </div>
              </div>
              {/* mover details */}
              <div className="flex flex-col">
                {/* mover name */}
                <div className="flex items-center border border-primary px-[10px] py-[5px] rounded-[10px] space-x-[15px] md:space-x-[5px]  space-y-[0px] lg:space-y-[0px] lg:flex-row lg:items-center mb-[5px] sm:mb-[7px] lg:mb-[7px] text-[15px]">
                  <p className="text-primary font-semibold  md:text-[18px] md:font-extrabold">
                    Mover Username:
                  </p>
                  <p className=" font-semibold">
                    {details.personalDetails.generatedName}
                  </p>
                </div>
                {/* mover rating */}
                <div className="flex items-center border border-primary px-[10px] py-[5px] rounded-[10px] space-x-[15px] md:space-x-[5px]  space-y-[0px] lg:space-y-[0px] lg:flex-row lg:items-center mb-[5px] sm:mb-[7px] lg:mb-[7px] text-[15px]">
                  <p className="text-primary font-semibold  md:text-[18px] md:font-extrabold">
                    Mover Rating:
                  </p>
                  <div className="flex items-center  space-x-[10px] mt-[0px] text-[15px]">
                    <p className="font-semibold">0 / 5.0</p>
                    {/* <FullRating small value={rating} color="text-secondary" /> */}
                    <StarRating rating={0} size="text-secondary text-[16px]" />
                    {/* <p className="">{`- (0 Reviews)`}</p> */}
                  </div>
                </div>

                {/* mover name */}
                <div className="flex items-center border border-primary px-[10px] py-[5px] rounded-[10px] space-x-[15px] md:space-x-[5px]  sm:items-start  space-y-[0px] lg:space-y-[0px] lg:flex-row lg:items-center mb-[5px] sm:mb-[7px] lg:mb-[7px] text-[15px]">
                  <div className="flex items-center space-x-[5px]">
                    <p className="text-primary font-semibold  md:text-[18px] md:font-extrabold">
                      Mover Hires:
                    </p>
                  </div>
                  <p className=" font-semibold">0 Hires</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-[30px]">
          {details.personalDetails.approvalStatus === "UNAPPROVED" && (
            <div className="flex items-center bg-secondary/10 rounded-[10px] px-[20px] py-[15px] space-x-[20px]">
              <IoMdNotificationsOutline className="text-secondary text-[40px]" />
              <div className="flex flex-col">
                <p className="font-bold text-secondary">
                  Your profile is pending activation!
                </p>
                <p className="text-[13px] text-secondary">
                  Make sure to complete all the required steps (in red) in the
                  "Set up your profile" section below.
                </p>
              </div>
            </div>
          )}
          {details.personalDetails.approvalStatus === "APPROVED" && (
            <div className="flex items-center bg-primary/10 rounded-[10px] px-[20px] py-[15px] space-x-[20px]">
              <IoMdNotificationsOutline className="text-primary text-[40px]" />
              <div className="flex flex-col">
                <p className="font-bold text-primary">
                  Your profile is activated!
                </p>
                <p className="text-[13px] text-primary">
                  You're now live in the Removal & Self Storage movers list
                  page.
                </p>
              </div>
            </div>
          )}
        </section>
        {/* sections completed */}
        <div className="flex flex-col md:flex-row border border-primary rounded-[20px] md:items-center md:justify-between bg-white px-[20px] py-[20px]">
          <p className="font-bold text-[20px]">Set up your profile</p>
          <p className="">
            {sections.length + 1 - (sortedSections?.length + 1)} out of{" "}
            {sections.length + 1} completed
          </p>
        </div>

        {/* scroll section */}
        <div className="w-[100%] h-[55vh] sm:h-[45vh]  lg:h-[35vh]  relative flex overflow-x-hidden overflow-auto scrollbar-thin scrollbar-track-gray-200 scrollbar-thumb-gray-400 scrollbar-default">
          {sectionData?.map((section, sectionIndex) => {
            let position = "translate-x-[100%]";
            if (sectionIndex === index) {
              position = "opacity-100 translate-x-[0]";
            }
            if (
              sectionIndex === index - 1 ||
              (index === 0 && sectionIndex === sections.length - 1)
            ) {
              position = "translate-x-[-100%]";
            }
            return (
              <section
                className={`${position} mb-[30px]  bg-gray-100/80  rounded-[10px] border pt-[10px] absolute top-0 left-0 w-[100%] h-[100%] opacity-0 transition-all flex flex-col `}
                key={sectionIndex}
              >
                <div className="flex flex-col space-y-[20px] md:space-y-[0px] md:flex-row md:justify-between md:space-x-[50px] py-[20px] px-[20px]">
                  {/* left */}
                  <div className="flex space-x-[20px] ">
                    <div className="flex items-center justify-center bg-primary border rounded-[10px] w-[50px] h-[50px] px-[10px]">
                      {/* <BsTools className="text-[25px] text-primary" /> */}
                      {section.icon}
                    </div>
                    <div className="flex flex-col">
                      <p className="font-bold">
                        {section.title}{" "}
                        {section.required && (
                          <span className="text-secondary">(Required!)</span>
                        )}
                      </p>
                      <p className="mt-[5px] ">{section.subText}</p>
                    </div>
                  </div>
                  {/* right */}
                  <div className="flex justify-between flex-row md:flex-col md:items-end md:space-y-[20px]">
                    <div className="flex items-center ">
                      <div
                        className="cursor-pointer bg-secondary/20 rounded-full"
                        onClick={() => setIndex(index - 1)}
                      >
                        <BiChevronLeft className="text-[25px]" />
                      </div>
                      <p className="mx-[10px]">
                        {sectionIndex + 1} / {sortedSections.length + 1}
                      </p>
                      <div
                        className="cursor-pointer bg-secondary/20 rounded-full"
                        onClick={() => setIndex(index + 1)}
                      >
                        <BiChevronRight className="text-[25px]" />
                      </div>
                    </div>
                    <Link
                      href={`/mover-profile/${section.link}`}
                      className="btn btn-secondary whitespace-nowrap"
                    >
                      {section.buttonTitle}
                    </Link>
                  </div>
                </div>
              </section>
            );
          })}
        </div>
      </div>
    </MoverLayout>
  );
};

export default Dashboard;

// export async function getServerSideProps(context) {
//   const { uid } = context.params; // Access the UID from the URL
//   // let userData = {};

//   // const res = await fetchMoverDetails3(uid);
//   // const res1 = await fetchMoversDetails(uid);
//   // const res2 = await fetchMoversCompanyPix(uid);
//   // const res3 = await fetchMoversRegCertificate(uid);
//   // const res4 = await fetchMoversVehInsurance(uid);
//   // const res5 = await fetchMoversPubInsurance(uid);
//   // const res6 = await fetchMoversTranInsurance(uid);
//   // const res7 = await fetchMoversDrivingLicense(uid);
//   // if (res1 && res2 && res3 && res4 && res5 && res6 && res7) {
//   //   userData = {
//   //     personalDetails: res,
//   //     companyDetails: res1,
//   //     CompanyPix: res2,
//   //     RegCertificate: res3,
//   //     VehInsurance: res4,
//   //     PubInsurance: res5,
//   //     TranInsurance: res6,
//   //     DrivingLicense: res7,
//   //   };
//   // } else {
//   //   console.log("No data");
//   // }
//   const userData = await fetchAllMoversDetails(uid);

//   return {
//     props: {
//       userData,
//     },
//   };
// }
