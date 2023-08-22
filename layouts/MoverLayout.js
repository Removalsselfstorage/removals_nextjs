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

const MoverLayout = ({ children, data }) => {
  const router = useRouter();
  const userDetails = useSelector(getAllUserDetails);
  const [clicked, setClicked] = useState(false);

  const uid = userDetails?.userDetails?.uid;

  const showLoader = () => {
    setClicked(true);
  };

  useEffect(() => {
    if (!userDetails.userDetails) {
      router.push("/");
    }
  }, []);

  return (
    <div className={`${textFont.variable} font-sans `}>
      {userDetails.userDetails ? (
        <>
          <Navbar3 data={data} />
          <div className="flex bg-base-200  pt-[50px]   lg:pt-[50px] ">
            <aside className=" hidden md:flex md:flex-[0.4] lg:flex-[0.4] border border-r-[2px] md:flex-col lg:w-[300px] ">
              <ul className="   pt-[30px] pb-[10px]  shadow-xl bg-base-100 text-[16px] px-[10px] border-b">
                <li className=" my-[10px] px-[0px] w-full">
                  {/* <Link
                    href="/mover-profile"
                    className={`${
                      router.pathname === "/mover-profile"
                        ? "bg-primary/10 text-primary"
                        : ""
                    } flex items-center btn-dash py-[15px] px-[20px] rounded-[10px] w-full`}
                  > */}
                  <Link
                    href={`/mover-profile/dashboard/${uid}`}
                    className={`${
                      router.pathname === `/mover-profile/dashboard/[uid]`
                        ? "bg-primary/10 text-primary"
                        : ""
                    } flex items-center btn-dash py-[15px] px-[20px] rounded-[10px] w-full`}
                    // onClick={()=> {setClicked(true)}}
                  >
                    <span className="text-[25px] mr-[10px]">
                      <AiOutlineHome />
                    </span>
                    <p className="hidden lg:flex">Dashboard</p>
                    {/* {clicked &&
                      router.pathname !== `/mover-profile/dashboard/[uid]` && (
                        <span className="loading loading-spinner text-primary"></span>
                      )} */}
                  </Link>
                </li>

                <li className=" my-[10px] px-[0px] w-full">
                  {/* <Link
                    href="/mover-profile/appointments"
                    className={`${
                      router.pathname === "/mover-profile/appointments"
                        ? "bg-primary/10 text-primary"
                        : ""
                    } flex items-center btn-dash py-[15px] px-[20px] rounded-[10px] w-full`}
                  > */}
                  <Link
                    href={`/mover-profile/appointments/${uid}`}
                    className={`${
                      router.pathname === `/mover-profile/appointments/[uid]`
                        ? "bg-primary/10 text-primary"
                        : ""
                    } flex items-center btn-dash py-[15px] px-[20px] rounded-[10px] w-full`}
                  >
                    <span className="text-[25px] mr-[10px]">
                      <LiaUserClockSolid />
                    </span>
                    <p className="hidden lg:flex">Appointments</p>
                  </Link>
                </li>

                <li className=" my-[10px] px-[0px] w-full">
                  {/* <Link
                    href="/mover-profile/job-board"
                    className={`${
                      router.pathname === "/mover-profile/job-board"
                        ? "bg-primary/10 text-primary"
                        : ""
                    } flex items-center btn-dash py-[15px] px-[20px] rounded-[10px] w-full`}
                  > */}
                  <Link
                    href={`/mover-profile/job-board/${uid}`}
                    className={`${
                      router.pathname === `/mover-profile/job-board/[uid]`
                        ? "bg-primary/10 text-primary"
                        : ""
                    } flex items-center btn-dash py-[15px] px-[20px] rounded-[10px] w-full`}
                  >
                    <span className="text-[25px] mr-[10px]">
                      <MdWorkOutline />
                    </span>
                    <p className="hidden lg:flex">Job Board</p>
                  </Link>
                </li>

                <li className=" my-[10px] px-[0px] w-full">
                  {/* <Link
                    href="/mover-profile/inbox"
                    className={`${
                      router.pathname === "/mover-profile/inbox"
                        ? "bg-primary/10 text-primary"
                        : ""
                    } flex items-center btn-dash py-[15px] px-[20px] rounded-[10px] w-full`}
                  > */}
                  <Link
                    href={`/mover-profile/inbox/${uid}`}
                    className={`${
                      router.pathname === `/mover-profile/inbox/[uid]`
                        ? "bg-primary/10 text-primary"
                        : ""
                    } flex items-center btn-dash py-[15px] px-[20px] rounded-[10px] w-full`}
                  >
                    <span className="text-[25px] mr-[10px]">
                      <HiOutlineInboxArrowDown />
                    </span>
                    <p className="hidden lg:flex">Inbox</p>
                  </Link>
                </li>
              </ul>

              <ul className=" py-[15px]  shadow-xl bg-base-100 grow  text-[16px] px-[10px]  pb-[200px]">
                {/* portfolio */}
                <li className=" my-[10px] px-[0px] w-full">
                  {/* <Link
                    href="/mover-profile/calendar"
                    className={`${
                      router.pathname === "/mover-profile/calendar"
                        ? "bg-primary/10 text-primary"
                        : ""
                    } flex items-center btn-dash py-[15px] px-[20px] rounded-[10px] w-full`}
                  > */}
                  <Link
                    href={`/mover-profile/calendar/${uid}`}
                    className={`${
                      router.pathname === `/mover-profile/calendar/[uid]`
                        ? "bg-primary/10 text-primary"
                        : ""
                    } flex items-center btn-dash py-[15px] px-[20px] rounded-[10px] w-full`}
                  >
                    <span className="text-[25px] mr-[10px]">
                      <FaRegCalendarAlt />
                    </span>
                    <p className="hidden lg:flex">Calendar</p>
                  </Link>
                </li>

                {/* portfolio */}
                <li className=" my-[10px] px-[0px] w-full">
                  {/* <Link
                    href="/mover-profile/portfolio"
                    className={`${
                      router.pathname === "/mover-profile/portfolio"
                        ? "bg-primary/10 text-primary"
                        : ""
                    } flex items-center btn-dash py-[15px] px-[20px] rounded-[10px] w-full`}
                  > */}
                  <Link
                    href={`/mover-profile/portfolio/${uid}`}
                    className={`${
                      router.pathname === `/mover-profile/portfolio/[uid]`
                        ? "bg-primary/10 text-primary"
                        : ""
                    } flex items-center btn-dash py-[15px] px-[20px] rounded-[10px] w-full`}
                  >
                    <span className="text-[25px] mr-[10px]">
                      <BsImages />
                    </span>
                    <p className="hidden lg:flex">Portfolio</p>
                  </Link>
                </li>

                <li className=" my-[10px] px-[0px] w-full">
                  {/* <Link
                    href="/mover-profile/edit-profile"
                    className={`${
                      router.pathname === "/mover-profile/edit-profile"
                        ? "bg-primary/10 text-primary"
                        : ""
                    } flex items-center btn-dash py-[15px] px-[20px] rounded-[10px] w-full`}
                  > */}
                  <Link
                    href={`/mover-profile/edit-profile/${uid}`}
                    className={`${
                      router.pathname === `/mover-profile/edit-profile/[uid]`
                        ? "bg-primary/10 text-primary"
                        : ""
                    } flex items-center btn-dash py-[15px] px-[20px] rounded-[10px] w-full`}
                  >
                    <span className="text-[25px] mr-[10px]">
                      <FiSettings />
                    </span>
                    <p className="hidden lg:flex">Edit Profile</p>
                  </Link>
                </li>

                <li className=" my-[10px] px-[0px] w-full">
                  {/* <Link
                    href="/mover-profile/documentation"
                    className={`${
                      router.pathname === "/mover-profile/documentation"
                        ? "bg-primary/10 text-primary"
                        : ""
                    } flex items-center btn-dash py-[15px] px-[20px] rounded-[10px] w-full`}
                  > */}
                  <Link
                    href={`/mover-profile/documentations/${uid}`}
                    className={`${
                      router.pathname === `/mover-profile/documentations/[uid]`
                        ? "bg-primary/10 text-primary"
                        : ""
                    } flex items-center btn-dash py-[15px] px-[20px] rounded-[10px] w-full`}
                  >
                    <span className="text-[25px] mr-[10px]">
                      <HiDocumentDuplicate />
                    </span>
                    <p className="hidden lg:flex">Documentation</p>
                  </Link>
                </li>

                <li className=" my-[10px] px-[0px] w-full">
                  <Link
                    href={`/mover-profile/billing/${uid}`}
                    className={`${
                      router.pathname === `/mover-profile/billing/[uid]`
                        ? "bg-primary/10 text-primary"
                        : ""
                    } flex items-center btn-dash py-[15px] px-[20px] rounded-[10px] w-full`}
                  >
                    <span className="text-[25px] mr-[10px]">
                      <BiSolidBank />
                    </span>
                    <p className="hidden lg:flex">Billing</p>
                  </Link>
                </li>

                <li className=" my-[10px] px-[0px] w-full">
                  {/* <Link
                    href="/mover-profile/reviews"
                    className={`${
                      router.pathname === "/mover-profile/reviews"
                        ? "bg-primary/10 text-primary"
                        : ""
                    } flex items-center btn-dash py-[15px] px-[20px] rounded-[10px] w-full`}
                  > */}
                  <Link
                    href={`/mover-profile/reviews/${uid}`}
                    className={`${
                      router.pathname === `/mover-profile/reviews/[uid]`
                        ? "bg-primary/10 text-primary"
                        : ""
                    } flex items-center btn-dash py-[15px] px-[20px] rounded-[10px] w-full`}
                  >
                    <span className="text-[25px] mr-[10px]">
                      <TfiComments />
                    </span>
                    <p className="hidden lg:flex">Reviews</p>
                  </Link>
                </li>
              </ul>
            </aside>
            <main className="md:flex-[1] lg:flex-[1]">{children}</main>
          </div>
          <Footer />
        </>
      ) : (
        <div className="flex items-center justify-center h-[100vh] ">
          <span className="h-full loading loading-bars text-primary w-[40px] lg:w-[60px]"></span>
        </div>
      )}
    </div>
  );
};

export default MoverLayout;
