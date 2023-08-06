import { BiLogOut, BiSolidPhoneCall } from "react-icons/bi";
import { BiMenu } from "react-icons/bi";
import { IoClose } from "react-icons/io5";
import { BsChevronDown } from "react-icons/bs";
import { RiCustomerService2Fill } from "react-icons/ri";
import { useEffect, useState } from "react";
import Link from "next/link";
import ScrollUpMenuNav from "../ScrollUpMenuNav";
import useAuth from "@/hooks/useAuth";
import { getAllUserDetails } from "@/store/userSlice";
import { useSelector } from "react-redux";
import { trimToFirstLetter } from "@/utils/logics";
import { CgProfile } from "react-icons/cg";
import { FiSettings } from "react-icons/fi";
import { useRouter } from "next/router";

const Navbar3 = () => {
  const router = useRouter();
  const { user, logout, loading } = useAuth();
  const users = useSelector(getAllUserDetails);
  return (
    <>
      <div
        className={`fixed left-0 right-0 top-0 z-[5000] border-b-[1.8px] flex flex-col items-center`}
      >
        {/* Main Nav */}
        <div className={`bg-white w-full `}>
          <div className="mx-[20px] ">
            <div className="drawer z-[9000] ">
              <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
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
                      <div className="flex items-center mr-[10px] md:mr-[30px] font-semibold space-x-[7px]">
                        <RiCustomerService2Fill size={20} className="" />
                        <a href="tel:07869116203" className="link link-hover">
                          07869116203{" "}
                        </a>
                      </div>
                      <ul className="  px-1 text-[16px] hidden lg:flex ">
                      <li className="dropdown  dropdown-end">
                        <label
                          tabIndex={0}
                          className="flex items-center justify-center bg-primary h-[40px] w-[40px] hover:bg-primary/60 rounded-full"
                        >
                          <p className="text-white font-bold">
                            {trimToFirstLetter(users.userDetails?.email)}
                          </p>
                        </label>
                        
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
                                <a className="">Edit Profile</a>
                              </div>
                            </Link>
                          </li>
                          <li>
                            <Link
                              href="/services/man-and-van"
                              className={`${
                                router.pathname === "/services/man-and-van"
                                  ? " text-primary"
                                  : ""
                              } font-semibold hover:text-primary`}
                            >
                              <div className="flex">
                                <span className="text-[20px] mr-[10px]">
                                  <BiLogOut />
                                </span>
                                <a className="">Log Out</a>
                              </div>
                            </Link>
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
                  <ul className="menu p-4 w-[250px] md:w-[400px]  bg-base-100 md:text-[16px] flex flex-col space-y-[10px] md:space-y-[15px]  h-auto pb-[300px] pt-[30px] lg:pb-[500px] lg:pt-[50px]">
                    <li>
                      <a className="btn-nav">Home</a>
                    </li>
                    <li>
                      <a className="btn-nav">Home Removals</a>
                    </li>
                    <li>
                      <a className="btn-nav">Man and Van</a>
                    </li>
                    <li>
                      <a className="btn-nav">Storage & Self Storage</a>
                    </li>
                    <li className="border-b-[2px] pb-[10px]">
                      <a className="btn-nav">Handy Man / Packing</a>
                    </li>
                    <li>
                      <a className="btn-nav">Locations</a>
                    </li>
                    <li>
                      <a className="btn-nav">Moving Tips</a>
                    </li>
                    <li>
                      <a className="btn-nav">About Us</a>
                    </li>
                    <li>
                      <a className="btn-nav">Contact Us</a>
                    </li>
                    {/* <li className="border-b-[2px] pb-[10px]">
                      <a className="btn-nav">Blog</a>
                    </li> */}
                    {!users.userDetails && (
                      <li>
                        <Link href="/join-us" className="btn-nav">
                          Become a Mover
                        </Link>
                      </li>
                    )}
                    {!users.userDetails && (
                      <li>
                        <Link href="/mover-login" className="btn-nav">
                          Mover Login
                        </Link>
                      </li>
                    )}
                    {users.userDetails && (
                      <li>
                        <a className="btn-nav">My Profile</a>
                      </li>
                    )}
                    {users.userDetails && (
                      <li
                        onClick={() => {
                          logout();
                        }}
                      >
                        <a className="btn-nav">Log Out</a>
                      </li>
                    )}
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
