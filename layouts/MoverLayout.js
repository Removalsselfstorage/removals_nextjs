import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { textFont } from "@/utils/fonts";
import Navbar2 from "@/components/Navbar/Navbar2";
import SessionProvider from "@/utils/SessionProvider";
import { CgProfile } from "react-icons/cg";
import { LiaUserClockSolid } from "react-icons/lia";
import { BiLogOut, BiSolidBank } from "react-icons/bi";
import Navbar3 from "@/components/Navbar/Navbar3";
import { useRouter } from "next/router";
import Link from "next/link";
import { AiOutlineHome } from "react-icons/ai";
import { MdWorkOutline } from "react-icons/md";
import { FaRegCalendarAlt } from "react-icons/fa";
import { HiOutlineInboxArrowDown } from "react-icons/hi2";
import { HiDocumentDuplicate } from "react-icons/hi";
import { BsImages } from "react-icons/bs";
import { FiSettings } from "react-icons/fi";
import { TfiComments } from "react-icons/tfi";
import { useSelector } from "react-redux";
import { getAllUserDetails } from "@/store/userSlice";
import { getAllMoverDetails } from "@/store/moverSlice";
import Lottie from "lottie-react";
import movingVan from "@/lottieJsons/movingVan.json";
import { TbBrandWechat } from "react-icons/tb";

import { IoMdNotificationsOutline } from "react-icons/io";

const MoverLayout = ({ children, data }) => {
  const router = useRouter();
  const userDetails = useSelector(getAllUserDetails);
  const [clicked, setClicked] = useState(false);
  const details = useSelector(getAllMoverDetails);
  const [showloader, setShowloader] = useState(true);
  const [s1, setS1] = useState(false);
  const [s2, setS2] = useState(false);
  const [s3, setS3] = useState(false);
  const [s4, setS4] = useState(false);
  const [s4b, setS4b] = useState(false);
  const [s5, setS5] = useState(false);
  const [s6, setS6] = useState(false);
  const [s7, setS7] = useState(false);
  const [s8, setS8] = useState(false);
  const [s9, setS9] = useState(false);
  const [s10, setS10] = useState(false);

  const uid = userDetails?.userDetails?.uid;

  const showLoader = () => {
    setClicked(true);
  };

  // const activateLoader = (sn) => {
  //   setShowloader2((prevShowloader2) => ({
  //     ...prevShowloader2,
  //     [sn]: true,
  //   }));
  //   // Check if the current pathname is "/mover-profile/dashboard"
  //   if (router.pathname === "/mover-profile/dashboard") {
  //     // If true, set showloader2 to false
  //     setShowloader2((prevShowloader2) => ({
  //       ...prevShowloader2,
  //       [sn]: false,
  //     }));
  //   }
  // };

  useEffect(() => {
    if (!userDetails.userDetails) {
      setShowloader(true);
      router.push("/");
    } else if (details.justRegistered === true) {
      router.push("/onboarding/personal-details");
    } else {
      setShowloader(false);
    }
  }, []);

  // useEffect(() => {
  //   if (!userDetails.userDetails) {
  //     router.push("/");
  //   }
  // }, []);

  return (
    <div className={`${textFont.variable} font-sans `}>
      {userDetails.userDetails && details.justRegistered === false && (
        <>
          <Navbar3 />
          <div className='flex bg-base-200  pt-[50px]   lg:pt-[50px] '>
            <aside className=' hidden md:flex md:flex-[0.4] lg:flex-[0.4] border border-r-[2px] md:flex-col lg:w-[300px] '>
              <ul className='   pt-[30px] pb-[10px]  shadow-xl bg-base-100 text-[16px] px-[10px] border-b'>
                <li className=' my-[10px] px-[0px] w-full'>
                  <Link
                    href='/mover-profile/dashboard'
                    className={`${
                      router.pathname === "/mover-profile/dashboard" ||
                      s1 === true
                        ? "bg-primary/10 text-primary"
                        : ""
                    } flex items-center btn-dash py-[15px] px-[20px] rounded-[10px] w-full`}
                    onClick={() => {
                      setS1(true);
                      if (router.pathname === "/mover-profile/dashboard") {
                        setS1(false);
                      }
                    }}
                  >
                    {!s1 && (
                      <span className='text-[25px] mr-[10px]'>
                        <AiOutlineHome />
                      </span>
                    )}
                    {s1 && (
                      <span className='loading loading-spinner loading-md text-primary mr-[10px]'></span>
                    )}
                    <p className='hidden lg:flex'>Dashboard</p>
                  </Link>
                </li>

                <li className=' my-[10px] px-[0px] w-full'>
                  <Link
                    href='/mover-profile/appointments'
                    className={`${
                      router.pathname === "/mover-profile/appointments" ||
                      s2 === true
                        ? "bg-primary/10 text-primary"
                        : ""
                    } flex items-center btn-dash py-[15px] px-[20px] rounded-[10px] w-full`}
                    onClick={() => {
                      setS2(true);
                      if (router.pathname === "/mover-profile/appointments") {
                        setS2(false);
                      }
                    }}
                  >
                    {!s2 && (
                      <span className='text-[25px] mr-[10px]'>
                        <LiaUserClockSolid />
                      </span>
                    )}
                    {s2 && (
                      <span className='loading loading-spinner loading-md text-primary mr-[10px]'></span>
                    )}
                    <p className='hidden lg:flex'>Appointments</p>
                  </Link>
                </li>

                <li className=' my-[10px] px-[0px] w-full'>
                  <Link
                    href='/mover-profile/job-board'
                    className={`${
                      router.pathname === "/mover-profile/job-board" ||
                      s3 === true
                        ? "bg-primary/10 text-primary"
                        : ""
                    } flex items-center btn-dash py-[15px] px-[20px] rounded-[10px] w-full`}
                    onClick={() => {
                      setS3(true);
                      if (router.pathname === "/mover-profile/job-board") {
                        setS3(false);
                      }
                    }}
                  >
                    {/* <span className='text-[25px] mr-[10px]'>
                      <MdWorkOutline />
                    </span> */}
                    {!s3 && (
                      <span className='text-[25px] mr-[10px]'>
                        <AiOutlineHome />
                      </span>
                    )}
                    {s3 && (
                      <span className='loading loading-spinner loading-md text-primary mr-[10px]'></span>
                    )}
                    <p className='hidden lg:flex'>Job Board</p>
                  </Link>
                </li>

                <li className=' my-[10px] px-[0px] w-full'>
                  <Link
                    href='/mover-profile/notifications'
                    className={`${
                      router.pathname === "/mover-profile/notifications" ||
                      s4 === true
                        ? "bg-primary/10 text-primary"
                        : ""
                    } flex items-center btn-dash py-[15px] px-[20px] rounded-[10px] w-full`}
                    onClick={() => {
                      setS4(true);
                      if (router.pathname === "/mover-profile/notifications") {
                        setS4(false);
                      }
                    }}
                  >
                    {/* <span className='text-[25px] mr-[10px]'>
                      <HiOutlineInboxArrowDown />
                    </span> */}
                    {!s4 && (
                      <span className='text-[25px] mr-[10px]'>
                        <IoMdNotificationsOutline />
                      </span>
                    )}
                    {s4 && (
                      <span className='loading loading-spinner loading-md text-primary mr-[10px]'></span>
                    )}
                    <p className='hidden lg:flex'>Notifications</p>
                  </Link>
                </li>

                <li className=' my-[10px] px-[0px] w-full'>
                  <Link
                    href='/mover-profile/message-admin'
                    className={`${
                      router.pathname === "/mover-profile/message-admin" ||
                      s4b === true
                        ? "bg-primary/10 text-primary"
                        : ""
                    } flex items-center btn-dash py-[15px] px-[20px] rounded-[10px] w-full`}
                    onClick={() => {
                      setS4b(true);
                      if (router.pathname === "/mover-profile/message-admin") {
                        setS4b(false);
                      }
                    }}
                  >
                    {/* <span className='text-[25px] mr-[10px]'>
                      <HiOutlineInboxArrowDown />
                    </span> */}
                    {!s4b && (
                      <span className='text-[25px] mr-[10px]'>
                        <TbBrandWechat />
                      </span>
                    )}
                    {s4b && (
                      <span className='loading loading-spinner loading-md text-primary mr-[10px]'></span>
                    )}
                    <p className='hidden lg:flex'>Message Admin</p>
                  </Link>
                </li>
              </ul>

              <ul className=' py-[15px]  shadow-xl bg-base-100 grow  text-[16px] px-[10px]  pb-[200px]'>
                {/* portfolio */}
                <li className=' my-[10px] px-[0px] w-full'>
                  <Link
                    href='/mover-profile/calendar'
                    className={`${
                      router.pathname === "/mover-profile/calendar" ||
                      s5 === true
                        ? "bg-primary/10 text-primary"
                        : ""
                    } flex items-center btn-dash py-[15px] px-[20px] rounded-[10px] w-full`}
                    onClick={() => {
                      setS5(true);
                      if (router.pathname === "/mover-profile/calendar") {
                        setS5(false);
                      }
                    }}
                  >
                    {/* <span className='text-[25px] mr-[10px]'>
                      <FaRegCalendarAlt />
                    </span> */}
                    {!s5 && (
                      <span className='text-[25px] mr-[10px]'>
                        <FaRegCalendarAlt />
                      </span>
                    )}
                    {s5 && (
                      <span className='loading loading-spinner loading-md text-primary mr-[10px]'></span>
                    )}
                    <p className='hidden lg:flex'>Calendar</p>
                  </Link>
                </li>

                {/* portfolio */}
                <li className=' my-[10px] px-[0px] w-full'>
                  <Link
                    href='/mover-profile/portfolio'
                    className={`${
                      router.pathname === "/mover-profile/portfolio" ||
                      s6 === true
                        ? "bg-primary/10 text-primary"
                        : ""
                    } flex items-center btn-dash py-[15px] px-[20px] rounded-[10px] w-full`}
                    onClick={() => {
                      setS6(true);
                      if (router.pathname === "/mover-profile/portfolio") {
                        setS6(false);
                      }
                    }}
                  >
                    {/* <span className='text-[25px] mr-[10px]'>
                      <BsImages />
                    </span> */}
                    {!s6 && (
                      <span className='text-[25px] mr-[10px]'>
                        <BsImages />
                      </span>
                    )}
                    {s6 && (
                      <span className='loading loading-spinner loading-md text-primary mr-[10px]'></span>
                    )}
                    <p className='hidden lg:flex'>Portfolio</p>
                  </Link>
                </li>

                <li className=' my-[10px] px-[0px] w-full'>
                  <Link
                    href='/mover-profile/edit-profile'
                    className={`${
                      router.pathname === "/mover-profile/edit-profile" ||
                      s7 === true
                        ? "bg-primary/10 text-primary"
                        : ""
                    } flex items-center btn-dash py-[15px] px-[20px] rounded-[10px] w-full`}
                    onClick={() => {
                      setS7(true);
                      if (router.pathname === "/mover-profile/dashboard") {
                        setS7(false);
                      }
                    }}
                  >
                    {/* <span className='text-[25px] mr-[10px]'>
                      <FiSettings />
                    </span> */}
                    {!s7 && (
                      <span className='text-[25px] mr-[10px]'>
                        <FiSettings />
                      </span>
                    )}
                    {s7 && (
                      <span className='loading loading-spinner loading-md text-primary mr-[10px]'></span>
                    )}
                    <p className='hidden lg:flex'>Edit Profile</p>
                  </Link>
                </li>

                <li className=' my-[10px] px-[0px] w-full'>
                  <Link
                    href='/mover-profile/documentations'
                    className={`${
                      router.pathname === "/mover-profile/documentations" ||
                      s8 === true
                        ? "bg-primary/10 text-primary"
                        : ""
                    } flex items-center btn-dash py-[15px] px-[20px] rounded-[10px] w-full`}
                    onClick={() => {
                      setS8(true);
                      if (router.pathname === "/mover-profile/documentations") {
                        setS8(false);
                      }
                    }}
                  >
                    {/* <span className='text-[25px] mr-[10px]'>
                      <HiDocumentDuplicate />
                    </span> */}
                    {!s8 && (
                      <span className='text-[25px] mr-[10px]'>
                        <HiDocumentDuplicate />
                      </span>
                    )}
                    {s8 && (
                      <span className='loading loading-spinner loading-md text-primary mr-[10px]'></span>
                    )}
                    <p className='hidden lg:flex'>Documentation</p>
                  </Link>
                </li>

                <li className=' my-[10px] px-[0px] w-full'>
                  <Link
                    href='/mover-profile/billing'
                    className={`${
                      router.pathname === "/mover-profile/billing" ||
                      s9 === true
                        ? "bg-primary/10 text-primary"
                        : ""
                    } flex items-center btn-dash py-[15px] px-[20px] rounded-[10px] w-full`}
                    onClick={() => {
                      setS9(true);
                      if (router.pathname === "/mover-profile/billing") {
                        setS9(false);
                      }
                    }}
                  >
                    {/* <span className='text-[25px] mr-[10px]'>
                      <BiSolidBank />
                    </span> */}
                    {!s9 && (
                      <span className='text-[25px] mr-[10px]'>
                        <BiSolidBank />
                      </span>
                    )}
                    {s9 && (
                      <span className='loading loading-spinner loading-md text-primary mr-[10px]'></span>
                    )}
                    <p className='hidden lg:flex'>Billing</p>
                  </Link>
                </li>

                <li className=' my-[10px] px-[0px] w-full'>
                  <Link
                    href='/mover-profile/reviews'
                    className={`${
                      router.pathname === "/mover-profile/reviews" ||
                      s10 === true
                        ? "bg-primary/10 text-primary"
                        : ""
                    } flex items-center btn-dash py-[15px] px-[20px] rounded-[10px] w-full`}
                    onClick={() => {
                      setS10(true);
                      if (router.pathname === "/mover-profile/reviews") {
                        setS10(false);
                      }
                    }}
                  >
                    {/* <span className='text-[25px] mr-[10px]'>
                      <TfiComments />
                    </span> */}
                    {!s10 && (
                      <span className='text-[25px] mr-[10px]'>
                        <TfiComments />
                      </span>
                    )}
                    {s10 && (
                      <span className='loading loading-spinner loading-md text-primary mr-[10px]'></span>
                    )}
                    <p className='hidden lg:flex'>Reviews</p>
                  </Link>
                </li>
              </ul>
            </aside>
            <main className='md:flex-[1] lg:flex-[1]'>{children}</main>
          </div>
          <Footer />
        </>
      )}
      {showloader && (
        <div className='flex items-center justify-center h-[100vh] '>
          <div className='flex justify-center w-full'>
            <Lottie animationData={movingVan} className='w-[400px]' />
          </div>
          {/* <span className="h-full loading loading-bars text-primary w-[40px] lg:w-[60px]"></span> */}
        </div>
      )}
    </div>
  );
};

export default MoverLayout;
