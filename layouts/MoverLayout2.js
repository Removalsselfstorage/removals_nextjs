import React, { useEffect } from "react";
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
import { BsImages } from "react-icons/bs";
import { FiSettings } from "react-icons/fi";
import { TfiComments } from "react-icons/tfi";
import { useSelector } from "react-redux";
import { getAllUserDetails } from "@/store/userSlice";

const MoverLayout2 = ({ children }) => {
  const router = useRouter();
  const userDetails = useSelector(getAllUserDetails);

  useEffect(() => {
    if (!userDetails.userDetails) {
      router.push("/");
    }
  }, []);

  return (
    <div className={`${textFont.variable} font-sans `}>
      {userDetails.userDetails ? (
        <>
          <Navbar3 />
          <div className="flex bg-base-200  pt-[50px]   lg:pt-[50px] ">
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

export default MoverLayout2;
