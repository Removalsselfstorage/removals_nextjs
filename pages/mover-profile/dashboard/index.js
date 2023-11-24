import StarRating from "@/components/Rating/EditHalfStars2";
import useMover from "@/hooks/useMover";
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
import { FaRegEdit, FaTruckMoving, FaUsers } from "react-icons/fa";
import { HiDocumentDuplicate } from "react-icons/hi";
import { IoMdNotificationsOutline } from "react-icons/io";
import { TfiComments } from "react-icons/tfi";
import { useDispatch, useSelector } from "react-redux";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { MdWork, MdWorkHistory } from "react-icons/md";
import { IoReceiptSharp } from "react-icons/io5";
import { LiaUserClockSolid } from "react-icons/lia";

const sections = [
  {
    id: 0,
    title: "Add a Profile Picture!",
    subText:
      "Add a professional profile picture that makes you appear approachable and personable.",
    icon: <CgProfile className='text-white text-[30px]' />,
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
    icon: <HiDocumentDuplicate className='text-white text-[30px]' />,
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
    icon: <FaRegEdit className='text-white text-[30px]' />,
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
    icon: <TfiComments className='text-white text-[30px]' />,
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
    icon: <BsImages className='text-white text-[30px]' />,
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
    icon: <BiSolidBank className='text-white text-[30px]' />,
    buttonTitle: "Add Bank Account",
    navNumber: 5,
    link: "billing",
    required: false,
  },
];

const Dashboard = ({  }) => {
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
    router,
  } = useMover();

  // const router = useRouter();
  // const dispatch = useDispatch();
  const userDetails = useSelector(getAllUserDetails);
  // const details = useSelector(getAllMoverDetails);

  // const condition3 = details.companyDetails.companyProfilePixUrl;

  // const registeredDate = Date.parse(
  //   userDetails?.userDetails?.metadata?.creationTime
  // );
  // const lastSignIn = Date.parse(
  //   userDetails?.userDetails?.metadata?.lastSignInTime
  // );

  // const localRegisteredDate = convertUTCToLocal(registeredDate);
  // const localLastSignIn = convertUTCToLocal(lastSignIn);

  const [index, setIndex] = useState(0);

  const [moverData, setMoverData] = useState([]);

  const [previewUrl, setPreviewUrl] = useState(
    personalMoverDetails?.profilePictureUrl
  );

  const [currentMoverBooks, setCurrentMoverBooks] = useState([]);
  const [completedMoverBooks, setCompletedMoverBooks] = useState([]);

  // const { firstName, lastName } = moverData?.personalMoverDetails;

  const uid = personalMoverDetails?.uid;
  const condition1 = personalMoverDetails?.profilePictureUrl;
  const condition2 = personalMoverDetails?.acceptedTerms;
  const firstName = personalMoverDetails?.firstName;
  const lastName = personalMoverDetails?.lastName;
  const completedMoves = personalMoverDetails?.completedMoves;
  const currentAcceptedMoves = personalMoverDetails?.currentAcceptedMoves;
  const currentPendingMoves = personalMoverDetails?.currentPendingMoves;

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

  const [sectionData, setSectionData] = useState(sortedSections);

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
  // console.log(userDetails);

  const auth = getAuth();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        const uid = user.uid;
        // ...
      } else {
        // User is signed out
        // ...
        router.push("/mover-login");
      }
    });
  }, [auth]);

  // useEffect(() => {
  //   const fetchMoverDetails = async () => {
  //     const moverD = await fetchAllMoversDetails(uid);
  //     setMoverData([{ ...moverD }]);
  //   };

  //   if (uid) {
  //     fetchMoverDetails();
  //   }
  // }, []);

  console.log({ personalMoverDetails, moverData,  });

  return (
    <MoverLayout>
      <Head>
        <title>Mover Profile - Dashboard</title>
        <meta name='description' content='Rss removal and storage website' />
        <link rel='icon' href='/rrs_favicon.svg' />
      </Head>

      {
        <div className='py-[50px] bg-white/80 px-[30px] w-full h-full'>
          <section className='mb-[30px]'>
            <div className='flex flex-col'>
              <p className='font-bold text-[25px] mb-[20px]'>Dashboard</p>
              <div className='flex flex-col space-y-[20px] lg:space-y-0 lg:flex-row lg:space-x-[50px] lg:justify-between'>
                <div className='flex items-center space-x-[20px] md:space-x-[30px]'>
                  {previewUrl ? (
                    <div className='avatar '>
                      <div className='w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2'>
                        <img src={previewUrl} />
                      </div>
                    </div>
                  ) : (
                    <div className='avatar placeholder'>
                      <div className='bg-gray-200 rounded-full w-[120px]'>
                        <span className='text-5xl font-bold'>
                          {combineInitials(firstName, lastName)}
                        </span>
                      </div>
                    </div>
                  )}
                  <div className='flex flex-col md:space-y-[5px] justify-center'>
                    <div className='flex items-stretch space-x-[10px]'>
                      <p className='flex items-center text-[17px]'>Welcome,</p>
                      <p className='font-bold text-[25px] flex items-end'>
                        {firstName} {lastName}
                      </p>
                    </div>
                    <p className=' text-gray-400 text-[13px] md:text-[14px]'>
                      <span className='font-bold '>Registered:</span>{" "}
                      {userDetails?.userDetails?.metadata?.creationTime}
                    </p>
                    <p className=' text-gray-400 text-[13px] md:text-[14px]'>
                      <span className='font-bold'>Last Login:</span>{" "}
                      {userDetails?.userDetails?.metadata?.lastSignInTime}
                    </p>
                  </div>
                </div>
                {/* mover details */}
                <div className='flex flex-col'>
                  {/* mover name */}
                  <div className='flex items-center border border-primary px-[10px] py-[5px] rounded-[10px] space-x-[15px] md:space-x-[5px]  space-y-[0px] lg:space-y-[0px] lg:flex-row lg:items-center mb-[5px] sm:mb-[7px] lg:mb-[7px] text-[15px]'>
                    <p className='text-primary font-semibold  md:text-[18px] md:font-extrabold'>
                      Mover Username:
                    </p>
                    <p className=' font-semibold'>
                      {personalMoverDetails?.generatedName}
                    </p>
                  </div>
                  {/* mover rating */}
                  <div className='flex items-center border border-primary px-[10px] py-[5px] rounded-[10px] space-x-[15px] md:space-x-[5px]  space-y-[0px] lg:space-y-[0px] lg:flex-row lg:items-center mb-[5px] sm:mb-[7px] lg:mb-[7px] text-[15px]'>
                    <p className='text-primary font-semibold  md:text-[18px] md:font-extrabold'>
                      Mover Rating:
                    </p>
                    <div className='flex items-center  space-x-[10px] mt-[0px] text-[15px]'>
                      <p className='font-semibold'>0 / 5.0</p>
                      {/* <FullRating small value={rating} color="text-secondary" /> */}
                      <StarRating
                        rating={0}
                        size='text-secondary text-[16px]'
                      />
                      {/* <p className="">{`- (0 Reviews)`}</p> */}
                    </div>
                  </div>

                  {/* mover name */}
                  <div className='flex items-center border border-primary px-[10px] py-[5px] rounded-[10px] space-x-[15px] md:space-x-[5px]  sm:items-start  space-y-[0px] lg:space-y-[0px] lg:flex-row lg:items-center mb-[5px] sm:mb-[7px] lg:mb-[7px] text-[15px]'>
                    <div className='flex items-center space-x-[5px]'>
                      <p className='text-primary font-semibold  md:text-[18px] md:font-extrabold'>
                        Mover Hires:
                      </p>
                    </div>
                    <p className=' font-semibold'>{completedMoves} Hire(s)</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className='mb-[30px]'>
            {personalMoverDetails?.approvalStatus === "UNAPPROVED" && (
              <div className='flex items-center bg-secondary/10 rounded-[10px] px-[20px] py-[15px] space-x-[20px]'>
                <IoMdNotificationsOutline className='text-secondary text-[40px]' />
                <div className='flex flex-col'>
                  <p className='font-bold text-secondary'>
                    Your profile is pending activation!
                  </p>
                  <p className='text-[13px] text-secondary'>
                    Make sure to complete all the required steps (in red) in the
                    "Set up your profile" section below.
                  </p>
                </div>
              </div>
            )}
            {personalMoverDetails?.approvalStatus === "APPROVED" && (
              <div className='flex items-center bg-primary/10 rounded-[10px] px-[20px] py-[15px] space-x-[20px]'>
                <IoMdNotificationsOutline className='text-primary text-[40px]' />
                <div className='flex flex-col'>
                  <p className='font-bold text-primary'>
                    Your profile is activated!
                  </p>
                  <p className='text-[13px] text-primary'>
                    You're now live in the Removal & Self Storage movers list
                    page.
                  </p>
                </div>
              </div>
            )}
          </section>

          <div className='mt-[30px] flex flex-col md:flex-row rounded-[20px] md:items-center md:justify-between  px-[20px] py-[10px]'>
            <p className='font-bold text-[20px] text-primary'>Appointments</p>
            <Link
              href='/mover-profile/appointments'
              className='text-primary link flex items-center space-x-[10px]'
            >
              <p className=''>See All</p>
            </Link>
          </div>

          <section assName='mb-[0px]'>
            <div className='flex flex-col space-y-[10px] lg:space-y-0 lg:flex-row lg:space-x-[20px]'>
              {/* bookings */}
              <div className='stats shadow'>
                <div className='stat '>
                  <div className='stat-figure text-secondary'>
                    <span className='text-[25px]'>
                      <LiaUserClockSolid />
                    </span>
                  </div>
                  <div className='stat-title'>Current</div>
                  <div className='stat-value text-secondary text-[30px]'>
                    {currentPendingMoves}
                  </div>
                  <div className=' text-[14px] mt-[10px]'>
                    <p className='text-secondary'>Pending</p>
                  </div>
                </div>

                <div className='stat '>
                  <div className='stat-figure text-primary'>
                    <span className='text-[25px]'>
                      <MdWorkHistory />
                    </span>
                  </div>
                  <div className='stat-title'>Current</div>
                  <div className='stat-value text-primary'>
                    {currentAcceptedMoves}
                    {/* {allBookings?.length - completedBookings?.length} */}
                  </div>
                  <div className=' text-primary text-[14px] mt-[10px]'>
                    <p className='text-primary'>Accepted</p>
                  </div>
                </div>

                <div className='stat '>
                  <div className='stat-figure text-primary'>
                    <span className='text-[25px]'>
                      <MdWork />
                    </span>
                  </div>
                  <div className='stat-title'>Completed</div>
                  <div className='stat-value text-primary text-[30px]'>
                    {completedMoves}
                  </div>
                  <div className=' text-primary text-[14px] mt-[10px]'>
                    <p className='text-white'>See All</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* sections completed */}
          <div className='mt-[30px] flex flex-col md:flex-row rounded-[20px] md:items-center md:justify-between px-[20px] py-[10px]'>
            <p className='font-bold text-[20px] text-primary'>
              Set up your profile
            </p>
            <p className=''>
              {sections.length + 1 - (sortedSections?.length + 1)} out of{" "}
              {sections.length + 1} completed
            </p>
          </div>

          {/* scroll section */}
          <div className='w-[100%] h-[55vh] sm:h-[45vh]  lg:h-[35vh]  relative flex overflow-x-hidden overflow-auto scrollbar-thin scrollbar-track-gray-200 scrollbar-thumb-gray-400 scrollbar-default'>
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
                  <div className='flex flex-col space-y-[20px] md:space-y-[0px] md:flex-row md:justify-between md:space-x-[50px] py-[20px] px-[20px]'>
                    {/* left */}
                    <div className='flex space-x-[20px] '>
                      <div className='flex items-center justify-center bg-primary border rounded-[10px] w-[50px] h-[50px] px-[10px]'>
                        {/* <BsTools className="text-[25px] text-primary" /> */}
                        {section.icon}
                      </div>
                      <div className='flex flex-col'>
                        <p className='font-bold'>
                          {section.title}{" "}
                          {section.required && (
                            <span className='text-secondary'>(Required!)</span>
                          )}
                        </p>
                        <p className='mt-[5px] '>{section.subText}</p>
                      </div>
                    </div>
                    {/* right */}
                    <div className='flex justify-between flex-row md:flex-col md:items-end md:space-y-[20px]'>
                      <div className='flex items-center '>
                        <div
                          className='cursor-pointer bg-secondary/20 rounded-full'
                          onClick={() => setIndex(index - 1)}
                        >
                          <BiChevronLeft className='text-[25px]' />
                        </div>
                        <p className='mx-[10px]'>
                          {sectionIndex + 1} / {sortedSections.length + 1}
                        </p>
                        <div
                          className='cursor-pointer bg-secondary/20 rounded-full'
                          onClick={() => setIndex(index + 1)}
                        >
                          <BiChevronRight className='text-[25px]' />
                        </div>
                      </div>
                      <Link
                        href={`/mover-profile/${section.link}`}
                        className='btn btn-secondary whitespace-nowrap'
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
      }
      {/* {moverData?.length > 0 && (
        <div className='flex justify-center items-center w-full h-screen'>
          <span className='loading loading-spinner loading-lg text-primary'></span>
        </div>
      )} */}
    </MoverLayout>
  );
};

export default Dashboard;

// export async function getServerSideProps(context) {
//   // const bookingsData = await fetchAllBookings();
//   // const userData = await fetchAllMoversDetails(userCredential.user.uid);

//   let uid = "";

//   console.log({ context });
//   // const moverD = await fetchAllMoversDetails(uid);
//   // // const docSnap = await getDoc(bookingRef);
//   // // const progressData = docSnap.data();

//   if (uid) {
//     return {
//       props: {
//         moverD: uid,
//       },
//     };
//   } else {
//     return {
//       props: {
//         moverD: {},
//       },
//     };
//   }
// }
