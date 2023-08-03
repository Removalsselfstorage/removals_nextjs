import { BiSolidPhoneCall } from "react-icons/bi";
import { BiMenu } from "react-icons/bi";
import { IoClose } from "react-icons/io5";
import { BsChevronDown } from "react-icons/bs";
import { RiCustomerService2Fill } from "react-icons/ri";
import { useEffect, useState } from "react";
import Link from "next/link";
import ScrollUpMenuNav from "../ScrollUpMenuNav";
import useAuth from "@/hooks/useAuth";
import { useSelector } from "react-redux";
import { getAllUserDetails } from "@/store/userSlice";
import { trimToFirstLetter } from "@/utils/logics";
// import ScrollUpMenuNav from '../ScrollUpMenuNav';

const Navbar = () => {
  const [shadow, setShadow] = useState(false);
  const [showNav, setShowNav] = useState(true);
  const { user, logout, loading } = useAuth();

  const users = useSelector(getAllUserDetails);

  console.log(user);
  // console.log(users.userDetails?.email);

  useEffect(() => {
    const handleShadow = () => {
      if (window.scrollY >= 90) {
        setShadow(true);
      } else {
        setShadow(false);
      }
    };
    window.addEventListener("scroll", handleShadow);
  }, [shadow]);

  useEffect(() => {
    let oldScrollY = window.scrollY;
    const showNavbar = (e) => {
      if (window.scrollY == 0 || oldScrollY > window.scrollY) {
        setShowNav(true);
      } else {
        setShowNav(false);
      }
      oldScrollY = window.scrollY;
    };
    window.addEventListener("scroll", showNavbar);
  }, [showNav]);

  return (
    <>
      <div
        className={`${
          shadow
            ? "shadow-lg fixed left-0 right-0 top-0 z-50 border-b-[1.8px]"
            : "fixed left-0 right-0 top-0 z-50 border-b-[1.8px]"
        } flex flex-col items-center`}
      >
        {/* Top Nav */}
        {showNav && (
          <div className="bg-primary w-full">
            <div className="flex lg:flex-row flex-col w-full md:max-w-7xl mx-auto px-[0px] items-center  py-[10px] text-[13px] h-[40px] text-white lg:justify-between ">
              <div className="flex  items-center">
                <div className="flex md:hidden">
                  <p className="hidden lg:flex">Need help?</p>
                  <div className="flex items-center ml-[10px] space-x-[7px]">
                    <RiCustomerService2Fill size={20} className="" />
                    <a href="tel:07869116203" className="link link-hover">
                      07869116203{" "}
                    </a>
                    <p className="">|</p>
                  </div>
                </div>

                <div className="flex items-center ml-[10px] space-x-[7px]">
                  <BiSolidPhoneCall size={20} className="" />
                  <a href="tel:(800)-995-5003" className="link link-hover">
                    (800) 995-5003{" "}
                  </a>
                </div>
              </div>
              <div className="lg:flex items-center  space-x-[10px] hidden pr-[10px]">
                <p className="link link-hover ">Moving Tips</p>
                <p className="">|</p>
                <p className="link link-hover ">About Us</p>
                <p className="">|</p>
                <p className="link link-hover ">Contact Us</p>
                {/* <p className="">|</p>
                <p className="link link-hover"> Blog</p> */}
              </div>
            </div>
          </div>
        )}
        {/* Main Nav */}
        <div className={`${shadow ? "bg-white/90" : "bg-white"} w-full`}>
          <div className="drawer z-[900]">
            <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col">
              {/* Navbar */}
              <div className="w-full navbar  md:max-w-7xl mx-auto items-center ">
                {/* nav-start */}
                <div className="navbar-start flex flex-[1] items-center">
                  <Link href="/">
                    <img
                      src="/rss_logo2.svg"
                      alt=""
                      className="h-[30px] md:h-[40px]"
                    />
                  </Link>
                </div>

                {/* nav-center */}
                <div className="navbar-center hidden lg:flex flex-[2]">
                  <ul className="menu menu-horizontal  px-1 text-[16px]">
                    <li>
                      <Link href="/" className="btn-nav ">
                        Home
                      </Link>
                    </li>
                    <li className="dropdown dropdown-hover dropdown-end group">
                      <label tabIndex={0} className="flex items-center btn-nav">
                        <p className="">Our Services</p>
                        <span className="group-hover:rotate-180 duration-100">
                          <BsChevronDown />
                        </span>
                      </label>
                      <ul
                        tabIndex={0}
                        className="dropdown-content z-[1] menu py-[20px] px-[10px] shadow-xl bg-base-100 rounded-box w-[250px] text-[16px]"
                      >
                        <li>
                          <a className="btn-nav">Home Removals</a>
                        </li>
                        <li>
                          <a className="btn-nav">Man and Van</a>
                        </li>
                        <li>
                          <a className="btn-nav">Storage & Self Storage</a>
                        </li>
                        <li>
                          <a className="btn-nav">Handy Man / Packing</a>
                        </li>
                        {/* <li>
                          <a className="btn-nav">Moving Your Business</a>
                        </li> */}
                      </ul>
                    </li>
                    <li>
                      <a className="btn-nav">Locations</a>
                    </li>
                    <li>
                      {!users.userDetails && (
                        <Link href="/reserve-login" className="btn-nav">
                          My Reservation
                        </Link>
                      )}
                      {users.userDetails && (
                        <Link href="/mover-dashboard" className="btn-nav">
                          My Dashboard
                        </Link>
                      )}
                    </li>
                  </ul>
                </div>

                {/* nav right */}
                <div className="navbar-end flex flex-[1] space-x-[10px]">
                  {!users.userDetails && (
                    <div className=" lg:space-x-[10px] hidden lg:flex">
                      <Link
                        href="/join-us"
                        className="btn btn-outline btn-primary"
                      >
                        Become a Mover
                      </Link>
                      <Link href="/mover-login" className="btn  btn-primary">
                        Mover Login
                      </Link>
                      {/* <a className="btn btn-primary">Mover Login</a> */}
                    </div>
                  )}
                  {users.userDetails && (
                    <ul className="menu menu-horizontal  px-1 text-[16px] hidden lg:flex">
                      <li className="dropdown dropdown-hover dropdown-end">
                        <label
                          tabIndex={0}
                          className="flex items-center justify-center bg-primary h-[40px] w-[40px] hover:bg-primary/50 rounded-full"
                        >
                          <p className="text-white font-bold">
                            {trimToFirstLetter(users.userDetails?.email)}
                          </p>
                        </label>
                        <ul
                          tabIndex={0}
                          className="dropdown-content z-[1] menu py-[20px] px-[10px]  bg-base-100 rounded-box w-[250px] text-[16px] shadow-xl"
                        >
                          <li>
                            <a className="btn-nav">My Profile</a>
                          </li>
                          <li
                            onClick={() => {
                              logout();
                            }}
                          >
                            <a className="btn-nav">Log Out</a>
                          </li>

                          {/* <li>
                          <a className="btn-nav">Moving Your Business</a>
                        </li> */}
                        </ul>
                      </li>
                    </ul>
                  )}

                  <div className="flex-none lg:hidden">
                    <label
                      htmlFor="my-drawer-3"
                      className="btn btn-square btn-ghost"
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

            <div className="drawer-side lg:hidden">
              <label htmlFor="my-drawer-3" className="drawer-overlay"></label>

              <div className="overflow-auto scrollbar-thin scrollbar-track-gray-200/50 scrollbar-thumb-gray-500/20 scrollbar-default h-[100%]">
                <ul className="menu p-4 w-[250px] md:w-[400px] h-full bg-base-100 md:text-[16px] flex flex-col space-y-[10px] md:space-y-[15px]">
                  <li>
                    <Link href="/" className="btn-nav">
                      Home
                    </Link>
                  </li>
                  <li>
                    {/* <a className="btn-nav">Home Removals</a> */}
                    <Link href="/book/home-removals" className="btn-nav">
                      Home Removals
                    </Link>
                  </li>
                  <li>
                    {/* <a className="btn-nav">Man and Van</a> */}
                    <Link href="/book/man-and-van" className="btn-nav">
                      Man and Van
                    </Link>
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
                  <li className="border-b-[2px] pb-[10px]">
                    <a className="btn-nav">Blog</a>
                  </li>
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
      {/* scrollup */}
      <ScrollUpMenuNav />
    </>
  );
};

export default Navbar;
