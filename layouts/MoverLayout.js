import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { textFont } from "@/utils/fonts";
import Navbar2 from "@/components/Navbar/Navbar2";
import SessionProvider from "@/utils/SessionProvider";
import { CgProfile } from "react-icons/cg";
import { LiaUserClockSolid } from "react-icons/lia";
import { BiLogOut } from "react-icons/bi";
import Navbar3 from "@/components/Navbar/Navbar3";
import { useRouter } from "next/router";
import Link from "next/link";
import { AiOutlineHome } from "react-icons/ai";
import { MdWorkOutline } from "react-icons/md";
import { FaRegCalendarAlt } from "react-icons/fa";
import { HiOutlineInboxArrowDown } from "react-icons/hi2";
import { BsImages } from "react-icons/bs";
import { FiSettings } from "react-icons/fi";
import { TfiComments } from "react-icons/tfi";
import { useSelector } from "react-redux";
import { getAllUserDetails } from "@/store/userSlice";

const MoverLayout = ({ children }) => {
  const router = useRouter();
  const userDetails = useSelector(getAllUserDetails);

  useEffect(() => {
    if (!userDetails.userDetails) {
      router.push("/");
    }
  }, []);

  return (
    <div className={`${textFont.variable} font-sans `}>
      <Navbar3 />
      
      {userDetails.userDetails ? (
        <div className="flex bg-base-200/  pt-[50px]   lg:pt-[50px]">
          <aside className="flex-[0.4] border border-r-[2px]">
            <ul className=" z-[1]  pt-[30px] pb-[10px]  shadow-xl bg-base-100  text-[16px] px-[10px] w-[300px] border-b">
              <li className=" my-[10px] px-[0px] w-full">
                <Link
                  href="/mover-profile"
                  className={`${
                    router.pathname === "/mover-profile"
                      ? "bg-primary/10 text-primary"
                      : ""
                  } flex items-center btn-dash py-[15px] px-[20px] rounded-[10px] w-full`}
                >
                  <span className="text-[25px] mr-[10px]">
                    <AiOutlineHome />
                  </span>
                  <a className="">Dashboard</a>
                </Link>
              </li>
              <li className=" my-[10px] px-[0px] w-full">
                <Link
                  href="/mover-profile/appointments"
                  className={`${
                    router.pathname === "/mover-profile/appointments"
                      ? "bg-primary/10 text-primary"
                      : ""
                  } flex items-center btn-dash py-[15px] px-[20px] rounded-[10px] w-full`}
                >
                  <span className="text-[25px] mr-[10px]">
                    <LiaUserClockSolid />
                  </span>
                  <a className="">Appointments</a>
                </Link>
              </li>

              <li className=" my-[10px] px-[0px] w-full">
                <Link
                  href="/mover-profile/job-board"
                  className={`${
                    router.pathname === "/mover-profile/job-board"
                      ? "bg-primary/10 text-primary"
                      : ""
                  } flex items-center btn-dash py-[15px] px-[20px] rounded-[10px] w-full`}
                >
                  <span className="text-[25px] mr-[10px]">
                    <MdWorkOutline />
                  </span>
                  <a className="">Job Board</a>
                </Link>
              </li>

              <li className=" my-[10px] px-[0px] w-full">
                <Link
                  href="/mover-profile/inbox"
                  className={`${
                    router.pathname === "/mover-profile/inbox"
                      ? "bg-primary/10 text-primary"
                      : ""
                  } flex items-center btn-dash py-[15px] px-[20px] rounded-[10px] w-full`}
                >
                  <span className="text-[25px] mr-[10px]">
                    <HiOutlineInboxArrowDown />
                  </span>
                  <a className="">Inbox</a>
                </Link>
              </li>
            </ul>
            <ul className=" z-[1]  py-[15px]  shadow-xl bg-base-100  text-[16px] px-[10px] w-[300px]">
              {/* portfolio */}
              <li className=" my-[10px] px-[0px] w-full">
                <Link
                  href="/mover-profile/calendar"
                  className={`${
                    router.pathname === "/mover-profile/calendar"
                      ? "bg-primary/10 text-primary"
                      : ""
                  } flex items-center btn-dash py-[15px] px-[20px] rounded-[10px] w-full`}
                >
                  <span className="text-[25px] mr-[10px]">
                    <FaRegCalendarAlt />
                  </span>
                  <a className="">Calendar</a>
                </Link>
              </li>
              {/* portfolio */}
              <li className=" my-[10px] px-[0px] w-full">
                <Link
                  href="/mover-profile/portfolio"
                  className={`${
                    router.pathname === "/mover-profile/portfolio"
                      ? "bg-primary/10 text-primary"
                      : ""
                  } flex items-center btn-dash py-[15px] px-[20px] rounded-[10px] w-full`}
                >
                  <span className="text-[25px] mr-[10px]">
                    <BsImages />
                  </span>
                  <a className="">Portfolio</a>
                </Link>
              </li>
              <li className=" my-[10px] px-[0px] w-full">
                <Link
                  href="/mover-profile/edit-profile"
                  className={`${
                    router.pathname === "/mover-profile/edit-profile"
                      ? "bg-primary/10 text-primary"
                      : ""
                  } flex items-center btn-dash py-[15px] px-[20px] rounded-[10px] w-full`}
                >
                  <span className="text-[25px] mr-[10px]">
                    <FiSettings />
                  </span>
                  <a className="">Edit Profile</a>
                </Link>
              </li>
              <li className=" my-[10px] px-[0px] w-full">
                <Link
                  href="/mover-profile/reviews"
                  className={`${
                    router.pathname === "/mover-profile/reviews"
                      ? "bg-primary/10 text-primary"
                      : ""
                  } flex items-center btn-dash py-[15px] px-[20px] rounded-[10px] w-full`}
                >
                  <span className="text-[25px] mr-[10px]">
                    <TfiComments />
                  </span>
                  <a className="">Reviews</a>
                </Link>
              </li>
            </ul>
          </aside>
          <main className="flex-[1]">{children}</main>
        </div>
      ) : (
        <div className="flex items-center justify-center h-[100vh] ">
          <span className="h-full loading loading-bars text-primary w-[40px] lg:w-[60px]"></span>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default MoverLayout;
