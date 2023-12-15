import StarRating from "@/components/Rating/EditHalfStars2";
import useMover from "@/hooks/useMover";
import MoverLayout from "@/layouts/MoverLayout";
import NormalLayout from "@/layouts/NormalLayout";
import {
  fetchAllBookings,
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
import {
  checkBookStatus,
  combineInitials,
  convertUTCToLocal,
} from "@/utils/logics";
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
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/firebase";
import useMoversData from "@/hooks/useMoversData";
import useBookings from "@/hooks/useBookings";

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
    link: "policies",
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

const Dashboard = ({ allBookings }) => {
  const { personalMoverDetails, companyDetails } = useMover();

  const {
    // allBookings,
    // bookingsLoading,
    // refetchBookings,

    completedBookings,
    completedBookingsLoading,
    refetchCompletedBookings,

    completedBook,
    allBook,
  } = useBookings();

  const {
    allMoversData,
    allMoversDataLoading,
    refetchAllMoversData,
    singleMoversData,
    singleMoversDataLoading,
    refetchSingleMoversData,
    portFolioPix,
    uid,
    router,
  } = useMoversData();

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
    singleMoversData?.personalDetails?.profileImageUrl
  );

  const [completedMoves, setCompletedMoves] = useState();
  const [currentAcceptedMoves, setCurrentAcceptedMoves] = useState();
  const [currentPendingMoves, setCurrentPendingMoves] = useState();

  const [notificationData, setNotificationData] = useState([]);
  const [readData, setReadData] = useState([]);
  const [unreadData, setUnreadData] = useState([]);
  // const [moverData, setMoverData] = useState({});
  const [showTab, setShowTab] = useState("");
  const [reload, setReload] = useState(false);
  const [modalData, setModalData] = useState({});

  // const { firstName, lastName } = moverData?.singleMoversData;

  // const uid = singleMoversData?.uid;
  const condition1 = singleMoversData?.personalDetails?.profileImageUrl;
  const condition2 = singleMoversData?.personalDetails?.acceptedTerms;
  const firstName = singleMoversData?.personalDetails?.firstName;
  const lastName = singleMoversData?.personalDetails?.lastName;
  // const completedMoves = singleMoversData?.completedMoves;
  // const currentAcceptedMoves = singleMoversData?.currentAcceptedMoves;
  // const currentPendingMoves = singleMoversData?.currentPendingMoves;

  const filterSections = () => {
    const excludedTitles = [
      "Complete Documentation Process",
      "Add a Profile Picture!",
      "Accept our Terms & Policies!",
    ];

    const filteredSections = sections.filter((section) => {
      const isExcluded = excludedTitles.includes(section.title);

      if (condition1 !== "" && condition2 === false) {
        return !isExcluded;
      } else if (condition1 !== "") {
        return !isExcluded;
      } else if (condition1 !== "" && condition2 === true) {
        return !isExcluded;
      } else if (condition2 === true) {
        return !isExcluded || section.title === "Accept our Terms & Policies!";
      } else {
        return true;
      }
    });

    return filteredSections;
  };

  const sortedSections = filterSections();
  const [sectionData, setSectionData] = useState(sortedSections);

  useEffect(() => {
    const lastIndex = sectionData?.length - 1;
    if (index < 0) setIndex(lastIndex);
    if (index > lastIndex) setIndex(0);
  }, [index, sectionData]);

  const handleIndexChange = (newIndex) => {
    setIndex(newIndex);
  };

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

  useEffect(() => {
    const mb = completedBookings?.filter(
      (ab) => ab?.moverName === companyDetails?.generatedName
    );

    const completedMb = mb?.filter((bc) => bc.moveCarriedOut === true);

    setCompletedMoves(completedMb?.length);

    const currentMb = mb?.filter((ad) => {
      const isGivenDateGreaterThanCurrent = checkBookStatus(
        ad?.moveDate,
        ad?.moverTime
      );
      return isGivenDateGreaterThanCurrent === true;
    });

    const currentAcceptedMb = currentMb?.filter(
      (bc) => bc.acceptance === "accepted"
    );

    setCurrentAcceptedMoves(currentAcceptedMb?.length);

    const currentPendingMb = currentMb?.filter(
      (bc) => bc.acceptance === "pending"
    );

    setCurrentPendingMoves(currentPendingMb?.length);
  }, [completedBookings]);

  useEffect(() => {
    // const moverDat = [];
    const moverDat = singleMoversData?.personalDetails?.notifications;

    const sortMoverData =
      moverDat?.length > 0
        ? [...moverDat]?.sort((a, b) => {
            return new Date(b.date) - new Date(a.date);
          })
        : [];

    const readD = sortMoverData?.filter((sm) => sm.status === "read");
    const unreadD = sortMoverData?.filter((sm) => sm.status === "unread");

    setReadData(readD);
    setUnreadData(unreadD);
    setPreviewUrl(singleMoversData?.personalDetails?.profileImageUrl);
  }, [singleMoversData]);

  // console.log({ singleMoversData, moverData, readData, unreadData });
  console.log({ companyDetails, sortedSections, userDetails });

  return (
    <MoverLayout>
      <Head>
        <title>Mover Profile - Dashboard</title>
        <meta name='description' content='Rss removal and storage website' />
        <link rel='icon' href='/rrs_favicon.svg' />
      </Head>

      {!singleMoversDataLoading && (
        <div className='py-[50px] bg-white/80 px-[30px] w-full h-full'>
          <section className='mb-[30px]'>
            <div className='flex flex-col'>
              <p className='font-bold text-[25px] mb-[20px]'>Dashboard</p>
              <div className='flex flex-col space-y-[20px] lg:space-y-0 lg:flex-row lg:space-x-[50px] lg:justify-between'>
                <div className='flex items-center space-x-[20px] md:space-x-[30px]'>
                  <div className='w-[90px] h-[90px] rounded-full ring ring-primary ring-offset-base-100 ring-offset-2'>
                    {!singleMoversDataLoading && (
                      <img
                        src={previewUrl}
                        className='rounded-full w-[90px] h-[90px]'
                      />
                    )}
                    {singleMoversDataLoading && (
                      <img
                        src={"/userPlaceholder.png"}
                        className='rounded-full w-[90px] h-[90px]'
                      />
                    )}
                  </div>
                  {/* {previewUrl ? (
                    <div className='avatar '>
                      <div className='w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2'>
                        {!singleMoversDataLoading && <img src={previewUrl} />}
                        {singleMoversDataLoading && (
                          <img src={"/userPlaceholder.png"} />
                        )}
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
                  )} */}
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
                      {singleMoversData?.companyDetails?.generatedName}
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
            {singleMoversData?.personalDetails?.approvalStatus ===
              "UNAPPROVED" && (
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
            {singleMoversData?.personalDetails?.approvalStatus ===
              "APPROVED" && (
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

          {/* <div className='mt-[30px] flex flex-col md:flex-row rounded-[20px] md:items-center md:justify-between  px-[20px] py-[10px]'>
            <p className='font-bold text-[20px] text-primary'>Appointments</p>
            <Link
              href='/mover-profile/appointments'
              className='text-primary link flex items-center space-x-[10px]'
            >
              <p className=''>See All</p>
            </Link>
          </div> */}

          <section className='mb-[0px]'>
            <div className='flex flex-col space-y-[20px] lg:space-y-0 lg:flex-row lg:justify-between lg:items-center '>
              {/* Appointment */}
              <div className=''>
                <p className='font-bold text-[20px] text-primary px-[20px] mb-[20px]'>
                  Appointments
                </p>

                <div className='stats shadow'>
                  <div className='stat '>
                    <div className='stat-figure text-secondary hidden md:flex'>
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
                    <div className='stat-figure text-primary hidden md:flex'>
                      <span className='text-[25px]'>
                        <MdWorkHistory />
                      </span>
                    </div>
                    <div className='stat-title'>Current</div>
                    <div className='stat-value text-primary'>
                      {currentAcceptedMoves}
                    </div>
                    <div className=' text-primary text-[14px] mt-[10px]'>
                      <p className='text-primary'>Accepted</p>
                    </div>
                  </div>
                  <div className='stat '>
                    <div className='stat-figure text-primary hidden md:flex'>
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

              {/* notifications */}
              <div className=''>
                <p className='font-bold text-[20px] text-primary px-[20px] mb-[20px] w-full lg:text-end'>
                  Notifications
                </p>
                {/* bookings */}
                <div className='stats shadow'>
                  <div className='stat '>
                    <div className='stat-figure text-secondary hidden md:flex'>
                      <span className='text-[25px]'>
                        <LiaUserClockSolid />
                      </span>
                    </div>
                    <div className='stat-title'>Unread</div>
                    <div className='stat-value text-secondary text-[30px]'>
                      {unreadData?.length}
                    </div>
                    <Link
                      href='/mover-profile/notifications'
                      className=' text-[14px] mt-[10px] '
                    >
                      <p className='text-secondary link cursor-pointer'>
                        Open now!
                      </p>
                    </Link>
                  </div>

                  <div className='stat '>
                    <div className='stat-figure text-primary hidden md:flex'>
                      <span className='text-[25px]'>
                        <MdWorkHistory />
                      </span>
                    </div>
                    <div className='stat-title'>Read</div>
                    <div className='stat-value text-primary'>
                      {readData?.length}
                      {/* {allBookings?.length - completedBookings?.length} */}
                    </div>
                    <Link
                      href='/mover-profile/notifications'
                      className=' text-primary text-[14px] mt-[10px] '
                    >
                      <p className='text-primary link cursor-pointer'>
                        Already opened
                      </p>
                    </Link>
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
              {sections.length - sortedSections?.length} out of{" "}
              {sections.length} completed
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
                          {sectionIndex + 1} / {sortedSections.length}
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
      )}
      {singleMoversDataLoading && (
        <div className='flex justify-center items-center w-full h-screen'>
          <span className='loading loading-spinner loading-lg text-primary'></span>
        </div>
      )}
    </MoverLayout>
  );
};

export default Dashboard;

// export async function getServerSideProps(context) {
//   const bookingsData = await fetchAllBookings();

//   const filterCompleted = bookingsData?.bookings?.filter(
//     (bd) => bd.completedBook === true
//   );

//   const allBookings = [...filterCompleted]?.sort((a, b) => {
//     return new Date(b.date) - new Date(a.date);
//   });

//   // const moverBooks = allBookings?.filter((ab) => ab.name === "");

//   if (typeof bookingsData === "undefined") {
//     return {
//       props: {
//         // progressData: null,
//         allBookings2: null,
//       },
//     };
//   } else {
//     return {
//       props: {
//         allBookings,
//       },
//     };
//   }
// }
