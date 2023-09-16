import { BiLogOut, BiLogOutCircle, BiSolidPhoneCall } from "react-icons/bi";
import { BiMenu } from "react-icons/bi";
import { IoClose } from "react-icons/io5";
import { BsChevronDown } from "react-icons/bs";
import { RiCustomerService2Fill } from "react-icons/ri";
import { useEffect, useState } from "react";
import Link from "next/link";
import ScrollUpMenuNav from "../ScrollUpMenuNav";
import useAuth from "@/hooks/useAuth";
import { useDispatch, useSelector } from "react-redux";
import { getAllUserDetails } from "@/store/userSlice";
import { combineInitials, trimToFirstLetter } from "@/utils/logics";
import { CgProfile } from "react-icons/cg";
import { useRouter } from "next/router";
import { FiSettings } from "react-icons/fi";
import {
  getAllMoverDetails,
  updateFirebaseMoverDetails,
} from "@/store/moverSlice";
import { fetchMoverDetails3 } from "@/lib/fetchData2";
// import ScrollUpMenuNav from '../ScrollUpMenuNav';

const Navbar = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const users = useSelector(getAllUserDetails);
  const moverDetails = useSelector(getAllMoverDetails);

  const firstName = moverDetails?.personalMoverDetails?.firstName;
  const lastName = moverDetails?.personalMoverDetails?.lastName;
  const previewUrl = moverDetails?.personalMoverDetails?.profilePictureUrl;

  const [shadow, setShadow] = useState(false);
  const [showNav, setShowNav] = useState(true);
  const { user, logout, loading } = useAuth();

  const uid = users?.userDetails?.uid;
  // const readMoversData = async () => {
  //   const res = await fetchMoverDetails3(uid);
  //   dispatch(updateFirebaseMoverDetails(res));
  // };
  // useEffect(() => {
  //   readMoversData();
  // }, []);

  // console.log(users);
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
        } flex flex-col items-center `}
      >
        {/* Top Nav */}
        {showNav && (
          <div className="bg-primary w-full">
            <div className="flex lg:flex-row flex-col w-full md:max-w-7xl mx-auto px-[0px] items-center  py-[10px] text-[13px] h-[40px] text-white lg:justify-between ">
              <div className="flex  items-center">
                <div className="flex">
                  <p className="hidden">Need help?</p>
                  <div className=" md:items-center ml-[10px] space-x-[7px] hidden md:flex">
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
              <div className="w-full navbar h-[30px] md:max-w-7xl mx-auto items-center ">
                {/* nav-start */}
                <div className="navbar-start lg:w-[20%] flex  items-center">
                  <Link href="/">
                    <img
                      src="/rss_logo2.svg"
                      alt=""
                      className="h-[30px] md:h-[40px]"
                    />
                  </Link>
                </div>

                {/* nav-center */}
                <div className="navbar-center  hidden lg:flex ">
                  <ul className="flex items-center lg:justify-between space-x-[10px]  xl:space-x-[30px] text-[16px]">
                    <li className="">
                      <Link
                        href="/"
                        className={`${
                          router.pathname === "/"
                            ? "border-b-[5px] border-primary text-primary"
                            : ""
                        } btn-navs `}
                      >
                        Home
                      </Link>
                    </li>
                    <li className="dropdown dropdown-hover dropdown-end group">
                      <label
                        tabIndex={0}
                        className="flex items-center font-semibold hover:text-primary"
                      >
                        <p className="">Our Services</p>
                        <span className="group-hover:rotate-180 duration-100 ml-[5px]">
                          <BsChevronDown />
                        </span>
                      </label>
                      <ul
                        tabIndex={0}
                        className="dropdown-content border-t-[5px] border-primary z-[1] flex flex-col space-y-[15px] py-[20px] shadow-xl bg-base-100 rounded-box w-[250px] text-[16px] px-[20px]"
                      >
                        <li className="w-full">
                          <Link
                            href="/services/home-removals"
                            className={`${
                              router.pathname === "/services/home-removals"
                                ? " text-primary"
                                : ""
                            } font-semibold hover:text-primary w-full`}
                          >
                            <p className="w-full">Home Removals</p>
                          </Link>
                        </li>
                        {/* <li>
                          <a className="btn-nav">Man and Van</a>
                        </li> */}
                        <li>
                          <Link
                            href="/services/man-and-van"
                            className={`${
                              router.pathname === "/services/man-and-van"
                                ? " text-primary"
                                : ""
                            } font-semibold hover:text-primary`}
                          >
                            <p className="w-full">Man and Van</p>
                          </Link>
                        </li>
                        {/* <li>
                          <a className="btn-nav">Storage & Self Storage</a>
                        </li> */}
                        <li>
                          <Link
                            href="/services/storage"
                            className={`${
                              router.pathname === "/services/storage"
                                ? " text-primary"
                                : ""
                            } font-semibold hover:text-primary`}
                          >
                            <p className="w-full">Storage & Self Storage</p>
                          </Link>
                        </li>

                        {/* <li>
                          <a className="btn-nav">Handy Man / Packing</a>
                        </li> */}
                        <li>
                          <Link
                            href="/services/packing"
                            className={`${
                              router.pathname === "/services/packing"
                                ? " text-primary"
                                : ""
                            } font-semibold hover:text-primary`}
                          >
                            <p className="w-full">Handy Man / Packing</p>
                          </Link>
                        </li>
                        {/* <li>
                          <a className="btn-nav">Moving Your Business</a>
                        </li> */}
                      </ul>
                    </li>
                    <li className="">
                      <Link
                        href="/locations"
                        className={`${
                          router.pathname === "/locations"
                            ? "border-b-[5px] border-primary text-primary"
                            : ""
                        } btn-navs`}
                      >
                        Locations
                      </Link>
                    </li>
                    <li>
                      {!users?.userDetails?.emailVerified && (
                        // <Link href="/reserve-login" className="btn-nav">
                        //   My Reservation
                        // </Link>
                        <Link
                          href="/reserve-login"
                          className={`${
                            router.pathname === "/reserve-login"
                              ? "border-b-[5px] border-primary text-primary"
                              : ""
                          } btn-navs`}
                        >
                          My Reservation
                        </Link>
                      )}
                      {users?.userDetails?.emailVerified && (
                        // <Link href="/mover-profile" className="btn-nav">
                        //   My Dashboard
                        // </Link>
                        <Link
                          // href={`/mover-profile/dashboard/${uid}`}
                          href={`/mover-profile/dashboard`}
                          className={`${
                            router.pathname === "/mover-profile/dashboard"
                              ? "border-b-[5px] border-primary text-primary"
                              : ""
                          } btn-navs`}
                        >
                          My Dashboard
                        </Link>
                      )}
                    </li>
                  </ul>
                </div>

                {/* nav right */}
                <div className="navbar-end  lg:w-[40%] flex  space-x-[10px]">
                  {!users?.userDetails?.emailVerified && (
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
                  {users?.userDetails?.emailVerified && (
                    <ul className="  px-1 text-[16px] hidden lg:flex ">
                      <li className="dropdown  dropdown-end">
                        {previewUrl ? (
                          <label className="avatar cursor-pointer" tabIndex={0}>
                            <div className="w-[40px] rounded-full  border-primary border-[3px]">
                              <img src={previewUrl || "/userPlaceholder.png"} />
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
                            className={` font-semibold hover:text-primary cursor-pointer`}
                            onClick={() => logout()}
                          >
                            <div className="flex">
                              <span className="text-[20px] mr-[10px]">
                                <BiLogOut />
                              </span>
                              <p className="">Log Out</p>
                            </div>
                          </li>
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
                    <p className="btn-nav">Storage & Self Storage</p>
                  </li>
                  <li className="border-b-[2px] pb-[10px]">
                    <p className="btn-nav">Handy Man / Packing</p>
                  </li>
                  <li>
                    <p className="btn-nav">Locations</p>
                  </li>
                  <li>
                    <p className="btn-nav">Moving Tips</p>
                  </li>
                  <li>
                    <p className="btn-nav">About Us</p>
                  </li>
                  <li>
                    <p className="btn-nav">Contact Us</p>
                  </li>
                  {/* <li className="border-b-[2px] pb-[10px]">
                    <a className="btn-nav">Blog</a>
                  </li> */}
                  {!users?.userDetails && (
                    <li>
                      <Link href="/join-us" className="btn-nav">
                        Become a Mover
                      </Link>
                    </li>
                  )}
                  {!users?.userDetails && (
                    <li>
                      <Link href="/mover-login" className="btn-nav">
                        Mover Login
                      </Link>
                    </li>
                  )}
                  {users?.userDetails && (
                    <li>
                      <p className="btn-nav">My Profile</p>
                    </li>
                  )}
                  {users?.userDetails && (
                    <li
                      onClick={() => {
                        logout();
                      }}
                    >
                      <p className="btn-nav">Log Out</p>
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
