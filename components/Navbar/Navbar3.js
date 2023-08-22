import { BiLogOut, BiSolidPhoneCall } from "react-icons/bi";
import { BiMenu } from "react-icons/bi";
import { IoClose } from "react-icons/io5";
import { BsChevronDown, BsImages } from "react-icons/bs";
import { RiCustomerService2Fill } from "react-icons/ri";
import { useEffect, useState } from "react";
import Link from "next/link";
import ScrollUpMenuNav from "../ScrollUpMenuNav";
import useAuth from "@/hooks/useAuth";
import { getAllUserDetails } from "@/store/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { combineInitials, trimToFirstLetter } from "@/utils/logics";
import { CgProfile } from "react-icons/cg";
import { FiSettings } from "react-icons/fi";
import { useRouter } from "next/router";
import { AiOutlineHome } from "react-icons/ai";
import { LiaUserClockSolid } from "react-icons/lia";
import { MdWorkOutline } from "react-icons/md";
import { HiOutlineInboxArrowDown } from "react-icons/hi2";
import { FaRegCalendarAlt } from "react-icons/fa";
import { TfiComments } from "react-icons/tfi";
import {
  getAllMoverDetails,
  updateFirebaseMoverDetails,
} from "@/store/moverSlice";
import { fetchMoverDetails3 } from "@/lib/fetchData2";

const Navbar3 = ({ data }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { user, logout, loading } = useAuth();
  const users = useSelector(getAllUserDetails);
  const moverDetails = useSelector(getAllMoverDetails);

  // const firstName =
  //   moverDetails?.firebaseMoverDetails?.firstName ||
  //   moverDetails?.personalDetails.firstName;
  // const lastName =
  //   moverDetails?.firebaseMoverDetails?.lastName ||
  //   moverDetails?.personalDetails.lastName;
  const firstName = moverDetails.personalDetails.firstName;
  const lastName = moverDetails.personalDetails.lastName;
  const previewUrl = moverDetails.personalDetails.profilePicture.url

  // const uid = users.userDetails?.uid;
  // const readMoversData = async () => {
  //   const res = await fetchMoverDetails3(uid);
  //   dispatch(updateFirebaseMoverDetails(res));
  // };
  // useEffect(() => {
  //   readMoversData();
  // }, []);

  return (
    <>
      <div
        className={`fixed left-0 right-0 top-0 z-[5000] border-b-[1.8px] flex flex-col items-center`}
      >
        {/* Main Nav */}
        <div className={`bg-white w-full `}>
          <div className="mx-[20px] ">
            <div className="drawer z-[9000] ">
              <input
                id="my-drawer-3"
                type="checkbox"
                className="drawer-toggle"
              />
              <div className="drawer-content flex flex-col">
                {/* Navbar */}
                <div className="w-full navbar  items-center ">
                  {/* left side */}
                  <div className="navbar-start flex items-center">
                    <Link href="/">
                      <img
                        src="/rss_logo2.svg"
                        alt=""
                        className="h-[30px] md:h-[40px]"
                      />
                    </Link>
                  </div>
                  {/* right side */}
                  <div className="navbar-end flex space-x-[10px]">
                    <div className="flex items-center">
                      <div className="md:flex items-center mr-[10px] md:mr-[30px] font-semibold space-x-[7px] hidden">
                        <RiCustomerService2Fill size={20} className="" />
                        <a href="tel:07869116203" className="link link-hover">
                          07869116203{" "}
                        </a>
                      </div>
                      <ul className="  px-1 text-[16px] hidden lg:flex ">
                        <li className="dropdown  dropdown-end">
                          {previewUrl ? (
                            <label
                              className="avatar cursor-pointer"
                              tabIndex={0}
                            >
                              <div className="w-[40px] rounded-full  border-primary border-[3px]">
                                <img
                                  src={
                                    previewUrl ||
                                    "/userPlaceholder.png"
                                  }
                                />
                              </div>
                            </label>
                          ) : (
                            <label
                              tabIndex={0}
                              className="flex items-center cursor-pointer justify-center bg-primary h-[40px] w-[40px] hover:bg-primary/60 rounded-full"
                            >
                              <p className="text-white font-bold ">
                                {/* {trimToFirstLetter(users.userDetails?.email)} */}
                                {combineInitials(firstName, lastName)}
                              </p>
                            </label>
                          )}

                          <ul
                            tabIndex={0}
                            className="dropdown-content z-[1] border-t-[5px] border-primary flex flex-col space-y-[15px] py-[20px] shadow-xl bg-base-100 rounded-box w-[250px] text-[16px] px-[20px]"
                          >
                            <li className="w-full">
                              <Link
                                href="/mover-profile/edit-profile"
                                className={`${
                                  router.pathname === "/service/home-removals"
                                    ? " text-primary"
                                    : ""
                                } font-semibold hover:text-primary w-full`}
                              >
                                <div className="flex">
                                  <span className="text-[20px] mr-[10px]">
                                    <FiSettings />
                                  </span>
                                  <p className="">Edit Profile</p>
                                </div>
                              </Link>
                            </li>
                            <li
                              onClick={() => logout()}
                              className={`font-semibold hover:text-primary cursor-pointer`}
                            >
                              <div className="flex ">
                                <span className="text-[20px] mr-[10px]">
                                  <BiLogOut />
                                </span>
                                <p className="">Log Out</p>
                              </div>
                            </li>
                          </ul>
                        </li>
                      </ul>
                      <label
                        htmlFor="my-drawer-3"
                        className="btn btn-square btn-ghost lg:hidden"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          className="inline-block w-8 h-8 stroke-current"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M4 6h16M4 12h16M4 18h16"
                          ></path>
                        </svg>
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              <div className="drawer-side">
                <label htmlFor="my-drawer-3" className="drawer-overlay"></label>
                <div className="overflow-auto scrollbar-thin scrollbar-track-gray-200/50 scrollbar-thumb-gray-500/20 scrollbar-default h-[100%]">
                  <ul className="menu p-4 w-[250px] md:w-[400px]  bg-base-100 md:text-[16px] flex flex-col h-auto pb-[300px] pt-[30px] lg:pb-[500px] lg:pt-[50px]">
                    <li className=" my-[10px] px-[0px] w-full">
                      <Link
                        href="/mover-profile"
                        className={`${
                          router.pathname === "/mover-profile"
                            ? "bg-primary/10 text-primary"
                            : ""
                        } flex items-center btn-dash py-[5px] px-[20px] rounded-[10px] w-full`}
                      >
                        <span className="text-[25px] mr-[10px]">
                          <AiOutlineHome />
                        </span>
                        <p className="">Dashboard</p>
                      </Link>
                    </li>
                    <li className=" my-[10px] px-[0px] w-full">
                      <Link
                        href="/mover-profile/appointments"
                        className={`${
                          router.pathname === "/mover-profile/appointments"
                            ? "bg-primary/10 text-primary"
                            : ""
                        } flex items-center btn-dash py-[5px] px-[20px] rounded-[10px] w-full`}
                      >
                        <span className="text-[25px] mr-[10px]">
                          <LiaUserClockSolid />
                        </span>
                        <p className="">Appointments</p>
                      </Link>
                    </li>

                    <li className=" my-[10px] px-[0px] w-full">
                      <Link
                        href="/mover-profile/job-board"
                        className={`${
                          router.pathname === "/mover-profile/job-board"
                            ? "bg-primary/10 text-primary"
                            : ""
                        } flex items-center btn-dash py-[5px] px-[20px] rounded-[10px] w-full`}
                      >
                        <span className="text-[25px] mr-[10px]">
                          <MdWorkOutline />
                        </span>
                        <p className="">Job Board</p>
                      </Link>
                    </li>
                    <li className=" my-[10px] px-[0px] w-full">
                      <Link
                        href="/mover-profile/inbox"
                        className={`${
                          router.pathname === "/mover-profile/inbox"
                            ? "bg-primary/10 text-primary"
                            : ""
                        } flex items-center btn-dash py-[5px] px-[20px] rounded-[10px] w-full`}
                      >
                        <span className="text-[25px] mr-[10px]">
                          <HiOutlineInboxArrowDown />
                        </span>
                        <p className="">Inbox</p>
                      </Link>
                    </li>
                    <li className=" my-[10px] px-[0px] w-full">
                      <Link
                        href="/mover-profile/calendar"
                        className={`${
                          router.pathname === "/mover-profile/calendar"
                            ? "bg-primary/10 text-primary"
                            : ""
                        } flex items-center btn-dash py-[5px] px-[20px] rounded-[10px] w-full`}
                      >
                        <span className="text-[25px] mr-[10px]">
                          <FaRegCalendarAlt />
                        </span>
                        <p className="">Calendar</p>
                      </Link>
                    </li>
                    <li className=" my-[10px] px-[0px] w-full">
                      <Link
                        href="/mover-profile/portfolio"
                        className={`${
                          router.pathname === "/mover-profile/portfolio"
                            ? "bg-primary/10 text-primary"
                            : ""
                        } flex items-center btn-dash py-[5px] px-[20px] rounded-[10px] w-full`}
                      >
                        <span className="text-[25px] mr-[10px]">
                          <BsImages />
                        </span>
                        <p className="">Portfolio</p>
                      </Link>
                    </li>
                    <li className=" my-[10px] px-[0px] w-full">
                      <Link
                        href="/mover-profile/edit-profile"
                        className={`${
                          router.pathname === "/mover-profile/edit-profile"
                            ? "bg-primary/10 text-primary"
                            : ""
                        } flex items-center btn-dash py-[5px] px-[20px] rounded-[10px] w-full`}
                      >
                        <span className="text-[25px] mr-[10px]">
                          <FiSettings />
                        </span>
                        <p className="">Edit Profile</p>
                      </Link>
                    </li>
                    <li className=" my-[10px] px-[0px] w-full">
                      <Link
                        href="/mover-profile/reviews"
                        className={`${
                          router.pathname === "/mover-profile/reviews"
                            ? "bg-primary/10 text-primary"
                            : ""
                        } flex items-center btn-dash py-[5px] px-[20px] rounded-[10px] w-full`}
                      >
                        <span className="text-[25px] mr-[10px]">
                          <TfiComments />
                        </span>
                        <p className="">Reviews</p>
                      </Link>
                    </li>
                    <li
                      className=" my-[10px] px-[0px] w-full cursor-pointer"
                      onClick={() => logout()}
                    >
                      <div
                        // href="/mover-profile/reviews"
                        className={` flex items-center btn-dash py-[5px] px-[20px] rounded-[10px] w-full`}
                      >
                        <span className="text-[25px] mr-[10px]">
                          <BiLogOut />
                        </span>
                        <p className="">Log Out</p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* scrollup */}
      <ScrollUpMenuNav />
    </>
  );
};

export default Navbar3;
