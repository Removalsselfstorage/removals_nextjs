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
import { getAuth, onAuthStateChanged } from "firebase/auth";
import useQuote from "@/hooks/useQuote";
import useMover from "@/hooks/useMover";
import useMoversData from "@/hooks/useMoversData";
import useLocalStorage from "use-local-storage";
// import ScrollUpMenuNav from '../ScrollUpMenuNav';

const Navbar = () => {
  const { updateReserveIdFxn, reserveId } = useQuote();

  const [storageId, setStorageId] = useLocalStorage("name", "");

  const router = useRouter();

  const {
    // justRegistered,
    personalMoverDetails,
    companyDetails,
    companyDocs,
    allMoverData,
    updateJustR,
    resetJustR,
    updatePersonalMover,
    resetPersonalMover,
    updateCompanyDe,
    resetCompanyDe,
    updateCompanyDo,
    resetCompanyDo,
    updateAllMoverD,
    resetAllMoverD,
    // router,
  } = useMover();

  const {
    allMoversData,
    allMoversDataLoading,
    refetchAllMoversData,
    singleMoversData,
    singleMoversDataLoading,
    refetchSingleMoversData,
    portFolioPix,
    // uid,
    // router,
  } = useMoversData();
  // const router = useRouter();
  const dispatch = useDispatch();
  const users = useSelector(getAllUserDetails);
  const moverDetails = useSelector(getAllMoverDetails);
  const [previewUrl, setPreviewUrl] = useState(
    singleMoversData?.personalDetails?.profileImageUrl
  );

  const firstName = singleMoversData?.personalDetails?.firstName;
  const lastName = singleMoversData?.personalDetails?.lastName;
  // const previewUrl2 = singleMoversData?.personalMoverDetails?.profilePictureUrl;

  const [shadow, setShadow] = useState(false);
  const [showNav, setShowNav] = useState(true);
  const { user, logout, loading } = useAuth();

  const uid = users?.userDetails?.uid;

  const photoUrl =
    personalMoverDetails?.profilePictureUrl || "/userPlaceholder.png";

  // const readMoversData = async () => {
  //   const res = await fetchMoverDetails3(uid);
  //   dispatch(updateFirebaseMoverDetails(res));
  // };
  // useEffect(() => {
  //   readMoversData();
  // }, []);

  // console.log({ moverDetails, personalMoverDetails });
  // console.log(users.userDetails?.email);
  useEffect(() => {
    setPreviewUrl(singleMoversData?.personalDetails?.profileImageUrl);
  }, [singleMoversData]);

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

  console.log({ storageId });

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
          <div className='bg-primary w-full'>
            <div className='flex lg:flex-row flex-col w-full md:max-w-7xl mx-auto px-[0px] items-center  py-[10px] text-[13px] h-[40px] text-white lg:justify-between '>
              <div className='flex  items-center'>
                <div className='flex'>
                  <p className='hidden'>Need help?</p>
                  <div className=' md:items-center ml-[10px] space-x-[7px] hidden md:flex'>
                    <RiCustomerService2Fill size={20} className='' />
                    <a href='tel:07869116203' className='link link-hover'>
                      07869116203{" "}
                    </a>
                    <p className=''>|</p>
                  </div>
                </div>

                <div className='flex items-center ml-[10px] space-x-[7px]'>
                  <BiSolidPhoneCall size={20} className='' />
                  <a href='tel:(800)-995-5003' className='link link-hover'>
                    (800) 995-5003{" "}
                  </a>
                </div>
              </div>
              <div className='lg:flex items-center  space-x-[10px] hidden pr-[10px]'>
                {/* <p className='link link-hover '>Moving Tips</p>
                <p className=''>|</p> */}
                <Link href='/about-us' className='link link-hover '>
                  About Us
                </Link>
                <p className=''>|</p>
                <Link href='/contact-us' className='link link-hover '>
                  Contact Us
                </Link>
                <p className=''>|</p>
                <Link href='/reviews' className='link link-hover '>
                  Reviews
                </Link>
                {/* <p className="">|</p>
                <p className="link link-hover"> Blog</p> */}
              </div>
            </div>
          </div>
        )}
        {/* Main Nav */}
        <div className={`${shadow ? "bg-white/90" : "bg-white"} w-full`}>
          <div className='drawer z-[900]'>
            <input id='my-drawer-3' type='checkbox' className='drawer-toggle' />
            <div className='drawer-content flex flex-col'>
              {/* Navbar */}
              <div className='w-full navbar h-[30px] md:max-w-7xl mx-auto items-center '>
                {/* nav-start */}
                <div className='navbar-start lg:w-[20%] flex  items-center'>
                  <Link href='/'>
                    <img
                      src='/rss_logo2.svg'
                      alt=''
                      className='h-[30px] md:h-[40px]'
                    />
                  </Link>
                </div>

                {/* nav-center */}
                <div className='navbar-center  hidden lg:flex '>
                  <ul className='flex items-center lg:justify-between space-x-[10px]  xl:space-x-[30px] text-[16px]'>
                    <li className=''>
                      <Link
                        href='/'
                        className={`${
                          router.pathname === "/"
                            ? "border-b-[5px] border-primary text-primary"
                            : ""
                        } btn-navs `}
                      >
                        Home
                      </Link>
                    </li>
                    <li className='dropdown dropdown-hover dropdown-end group'>
                      <label
                        tabIndex={0}
                        className='flex items-center font-semibold hover:text-primary'
                      >
                        <p className=''>Our Services</p>
                        <span className='group-hover:rotate-180 duration-100 ml-[5px]'>
                          <BsChevronDown />
                        </span>
                      </label>
                      <ul
                        tabIndex={0}
                        className='dropdown-content border-t-[5px] border-primary z-[1] flex flex-col space-y-[15px] py-[20px] shadow-xl bg-base-100 rounded-box w-[250px] text-[16px] px-[20px]'
                      >
                        <li className='w-full'>
                          <Link
                            href='/services/home-removals'
                            className={`${
                              router.pathname === "/services/home-removals"
                                ? " text-primary"
                                : ""
                            } font-semibold hover:text-primary w-full`}
                          >
                            <p className='w-full'>Home Removals</p>
                          </Link>
                        </li>
                        {/* <li>
                          <a className="btn-nav">Man and Van</a>
                        </li> */}
                        <li>
                          <Link
                            href='/services/man-and-van'
                            className={`${
                              router.pathname === "/services/man-and-van"
                                ? " text-primary"
                                : ""
                            } font-semibold hover:text-primary`}
                          >
                            <p className='w-full'>Man and Van</p>
                          </Link>
                        </li>
                        {/* <li>
                          <a className="btn-nav">Storage & Self Storage</a>
                        </li> */}
                        <li>
                          <Link
                            href='/services/storage'
                            className={`${
                              router.pathname === "/services/storage"
                                ? " text-primary"
                                : ""
                            } font-semibold hover:text-primary`}
                          >
                            <p className='w-full'>Storage & Self Storage</p>
                          </Link>
                        </li>

                        {/* <li>
                          <a className="btn-nav">Handy Man / Packing</a>
                        </li> */}
                        <li>
                          <Link
                            href='/services/handy-man-packing'
                            className={`${
                              router.pathname === "/services/handy-man-packing"
                                ? " text-primary"
                                : ""
                            } font-semibold hover:text-primary`}
                          >
                            <p className='w-full'>Handy Man / Packing</p>
                          </Link>
                        </li>
                        {/* <li>
                          <a className="btn-nav">Moving Your Business</a>
                        </li> */}
                      </ul>
                    </li>

                    <li className='dropdown dropdown-hover dropdown-end group'>
                      <label
                        tabIndex={0}
                        className='flex items-center font-semibold hover:text-primary'
                      >
                        <p className=''>Reservations</p>
                        <span className='group-hover:rotate-180 duration-100 ml-[5px]'>
                          <BsChevronDown />
                        </span>
                      </label>
                      <ul
                        tabIndex={0}
                        className='dropdown-content border-t-[5px] border-primary z-[1] flex flex-col space-y-[15px] py-[20px] shadow-xl bg-base-100 rounded-box w-[250px] text-[16px] px-[20px]'
                      >
                        <li>
                          {!users?.userDetails?.emailVerified && (
                            <Link
                              href={`${
                                reserveId === ""
                                  ? "/reserve-login"
                                  : `/reservations/${reserveId}`
                              }`}
                              className={`${
                                router.pathname === "/reserve-login"
                                  ? "text-primary"
                                  : ""
                              } font-semibold hover:text-primary w-full`}
                            >
                              Move Reservation
                            </Link>
                          )}
                          {users?.userDetails?.emailVerified && (
                            <Link
                              // href={`/mover-profile/dashboard/${uid}`}
                              href={`/mover-profile/dashboard`}
                              className={`${
                                router.pathname === "/mover-profile/dashboard"
                                  ? " text-primary"
                                  : ""
                              } font-semibold hover:text-primary w-full`}
                            >
                              My Move Dashboard
                            </Link>
                          )}
                        </li>

                        <li className='w-full'>
                          {!storageId && (
                            <div
                              // href={`${
                              //   !storageId
                              //     ? "/storage-login"
                              //     : `storage/reservations/${storageId}`
                              // }`}
                              onClick={
                                ()=>{
                                  // router.push()
                                  !storageId
                                  ? router.push("/storage-login")
                                  : router.push(`storage/reservations/${storageId}`)
                                }
                              }
                              className={`${
                                router.pathname === "/storage/reservations"
                                  ? " text-primary"
                                  : ""
                              } font-semibold hover:text-primary w-full cursor-pointer`}
                            >
                              <p className='w-full'>Storage Reservation</p>
                            </div>
                          )}
                          {storageId && (
                            <div
                              // href={`storage/reservations/${storageId}}`}
                              onClick={
                                ()=>{
                                  // router.push()
                                  router.push(`storage/reservations/${storageId}`)
                                }
                              }
                              className={`${
                                router.pathname === "/storage/reservations"
                                  ? " text-primary"
                                  : ""
                              } font-semibold hover:text-primary w-full cursor-pointer`}
                            >
                              <p className='w-full'>My Storage Dashboard</p>
                            </div>
                          )}
                        </li>
                      </ul>
                    </li>

                    <li className=''>
                      <Link
                        href='/locations'
                        className={`${
                          router.pathname === "/locations"
                            ? "border-b-[5px] border-primary text-primary"
                            : ""
                        } btn-navs`}
                      >
                        Locations
                      </Link>
                    </li>
                  </ul>
                </div>

                {/* nav right */}
                <div className='navbar-end  lg:w-[40%] flex  space-x-[10px]'>
                  {!users?.userDetails?.emailVerified && (
                    <div className=' lg:space-x-[10px] hidden lg:flex'>
                      <Link
                        href='/join-us'
                        className='btn btn-outline btn-primary'
                      >
                        Become a Mover
                      </Link>
                      <Link href='/mover-login' className='btn  btn-primary'>
                        Mover Login
                      </Link>
                      {/* <a className="btn btn-primary">Mover Login</a> */}
                    </div>
                  )}
                  {users?.userDetails?.emailVerified && (
                    <ul className='  px-1 text-[16px] hidden lg:flex '>
                      <li className='dropdown  dropdown-end'>
                        <label className='avatar cursor-pointer' tabIndex={0}>
                          <div className='w-[40px] rounded-full  border-primary border-[3px]'>
                            {!singleMoversDataLoading && (
                              <img src={previewUrl} />
                            )}
                            {singleMoversDataLoading && <img src={photoUrl} />}
                          </div>
                        </label>

                        <ul
                          tabIndex={0}
                          className='dropdown-content z-[1] border-t-[5px] border-primary flex flex-col space-y-[15px] py-[20px] shadow-xl bg-base-100 rounded-box w-[250px] text-[16px] px-[20px]'
                        >
                          <li className='w-full'>
                            <Link
                              href='/mover-profile/edit-profile'
                              className={`${
                                router.pathname === "/service/home-removals"
                                  ? " text-primary"
                                  : ""
                              } font-semibold hover:text-primary w-full`}
                            >
                              <div className='flex'>
                                <span className='text-[20px] mr-[10px]'>
                                  <FiSettings />
                                </span>
                                <p className=''>Edit Profile</p>
                              </div>
                            </Link>
                          </li>
                          <li
                            className={` font-semibold hover:text-primary cursor-pointer`}
                            onClick={() => logout()}
                          >
                            <div className='flex'>
                              <span className='text-[20px] mr-[10px]'>
                                <BiLogOut />
                              </span>
                              <p className=''>Log Out</p>
                            </div>
                          </li>
                        </ul>
                      </li>
                    </ul>
                  )}

                  <div className='flex-none lg:hidden'>
                    <label
                      htmlFor='my-drawer-3'
                      className='btn btn-square btn-ghost'
                    >
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        fill='none'
                        viewBox='0 0 24 24'
                        className='inline-block w-8 h-8 stroke-current'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth='2'
                          d='M4 6h16M4 12h16M4 18h16'
                        ></path>
                      </svg>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <div className='drawer-side lg:hidden'>
              <label htmlFor='my-drawer-3' className='drawer-overlay'></label>

              <div className='overflow-auto scrollbar-thin scrollbar-track-gray-200/50 scrollbar-thumb-gray-500/20 scrollbar-default h-[100%]'>
                <ul className='menu p-4 w-[250px] md:w-[400px] h-full bg-base-100 md:text-[16px] flex flex-col space-y-[10px] md:space-y-[15px]'>
                  <li>
                    <Link href='/' className='btn-nav'>
                      Home
                    </Link>
                  </li>
                  <li>
                    {/* <a className="btn-nav">Home Removals</a> */}
                    <Link href='/book/home-removals' className='btn-nav'>
                      Home Removals
                    </Link>
                  </li>
                  <li>
                    {/* <a className="btn-nav">Man and Van</a> */}
                    <Link href='/book/man-and-van' className='btn-nav'>
                      Man and Van
                    </Link>
                  </li>
                  <li>
                    <p className='btn-nav'>Storage & Self Storage</p>
                  </li>
                  <li className='border-b-[2px] pb-[10px]'>
                    <p className='btn-nav'>Handy Man / Packing</p>
                  </li>
                  <li>
                    <p className='btn-nav'>Locations</p>
                  </li>
                  <li>
                    <p className='btn-nav'>Moving Tips</p>
                  </li>
                  <li>
                    <p className='btn-nav'>About Us</p>
                  </li>
                  <li>
                    <p className='btn-nav'>Contact Us</p>
                  </li>
                  {/* <li className="border-b-[2px] pb-[10px]">
                    <a className="btn-nav">Blog</a>
                  </li> */}
                  {!users?.userDetails && (
                    <li>
                      <Link href='/join-us' className='btn-nav'>
                        Become a Mover
                      </Link>
                    </li>
                  )}
                  {!users?.userDetails && (
                    <li>
                      <Link href='/mover-login' className='btn-nav'>
                        Mover Login
                      </Link>
                    </li>
                  )}
                  {users?.userDetails && (
                    <li>
                      <p className='btn-nav'>My Profile</p>
                    </li>
                  )}
                  {users?.userDetails && (
                    <li
                      onClick={() => {
                        logout();
                      }}
                    >
                      <p className='btn-nav'>Log Out</p>
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
