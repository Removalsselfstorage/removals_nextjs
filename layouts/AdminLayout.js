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
import { AiFillHome, AiOutlineHome } from "react-icons/ai";
import { MdNotificationsActive, MdWorkOutline } from "react-icons/md";
import { FaRegCalendarAlt, FaUsers } from "react-icons/fa";
import { HiOutlineInboxArrowDown } from "react-icons/hi2";
import { HiDocumentDuplicate } from "react-icons/hi";
import { BsImages } from "react-icons/bs";
import { FiSettings } from "react-icons/fi";
import { TfiComments } from "react-icons/tfi";
import { useSelector } from "react-redux";
import { getAllUserDetails } from "@/store/userSlice";
import { getAllMoverDetails } from "@/store/moverSlice";
import { FaTruckFront } from "react-icons/fa6";
import Lottie from "lottie-react";
import movingVan from "@/lottieJsons/movingVan.json";

const AdminLayout = ({ children, data }) => {
  const router = useRouter();
  const userDetails = useSelector(getAllUserDetails);
  const [clicked, setClicked] = useState(false);
  const details = useSelector(getAllMoverDetails);
  const [showloader, setShowloader] = useState(true);

  const uid = userDetails?.userDetails?.uid;

  const showLoader = () => {
    setClicked(true);
  };

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
          <div className="flex bg-base-200  pt-[50px]   lg:pt-[50px] ">
            <aside className=" hidden md:flex md:flex-[0.4] lg:flex-[0.4] border border-r-[2px] md:flex-col lg:w-[300px] ">
              <ul className="   pt-[30px] pb-[10px]  shadow-xl bg-base-100 text-[16px] px-[10px] border-b">
                <li className=" my-[10px] px-[0px] w-full">
                  <Link
                    href="/secret-admin/dashboard"
                    className={`${
                      router.pathname === "/secret-admin/dashboard"
                        ? "bg-primary/10 text-primary"
                        : ""
                    } flex items-center btn-dash py-[15px] px-[20px] rounded-[10px] w-full`}
                  >
                    {/* <Link
                    href={`/mover-profile/dashboard/${uid}`}
                    className={`${
                      router.pathname === `/mover-profile/dashboard/[uid]`
                        ? "bg-primary/10 text-primary"
                        : ""
                    } flex items-center btn-dash py-[15px] px-[20px] rounded-[10px] w-full`}
                    // onClick={()=> {setClicked(true)}}
                  > */}
                    <span className="text-[25px] mr-[10px]">
                      <AiFillHome />
                    </span>
                    <p className="hidden lg:flex">Dashboard</p>
                    {/* {clicked &&
                      router.pathname !== `/mover-profile/dashboard/[uid]` && (
                        <span className="loading loading-spinner text-primary"></span>
                      )} */}
                  </Link>
                </li>

                <li className=" my-[10px] px-[0px] w-full">
                  <Link
                    href="/secret-admin/users"
                    className={`${
                      router.pathname === "/secret-admin/users"
                        ? "bg-primary/10 text-primary"
                        : ""
                    } flex items-center btn-dash py-[15px] px-[20px] rounded-[10px] w-full`}
                  >
                    <span className="text-[25px] mr-[10px]">
                      <FaUsers />
                    </span>
                    <p className="hidden lg:flex">Users</p>
                  </Link>
                </li>

                <li className=" my-[10px] px-[0px] w-full">
                  <Link
                    href="/secret-admin/movers"
                    className={`${
                      router.pathname === "/secret-admin/movers"
                        ? "bg-primary/10 text-primary"
                        : ""
                    } flex items-center btn-dash py-[15px] px-[20px] rounded-[10px] w-full`}
                  >
                    <span className="text-[25px] mr-[10px]">
                      <FaTruckFront />
                    </span>
                    <p className="hidden lg:flex">Movers</p>
                  </Link>
                </li>

                <li className=" my-[10px] px-[0px] w-full">
                  <Link
                    href="/secret-admin/notifications"
                    className={`${
                      router.pathname === "/secret-admin/notifications"
                        ? "bg-primary/10 text-primary"
                        : ""
                    } flex items-center btn-dash py-[15px] px-[20px] rounded-[10px] w-full`}
                  >
                    <span className="text-[25px] mr-[10px]">
                      <MdNotificationsActive />
                    </span>
                    <p className="hidden lg:flex">Notifications</p>
                  </Link>
                </li>
              </ul>
            </aside>
            <main className="md:flex-[1] lg:flex-[1]">{children}</main>
          </div>
          <Footer />
        </>
      )}
      {showloader && (
        <div className="flex items-center justify-center h-[100vh] ">
          <div className="flex justify-center w-full">
            <Lottie animationData={movingVan} className="w-[400px]" />
          </div>
          {/* <span className="h-full loading loading-bars text-primary w-[40px] lg:w-[60px]"></span> */}
        </div>
      )}
    </div>
  );
};

export default AdminLayout;
