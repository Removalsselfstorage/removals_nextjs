import { BiSolidPhoneCall } from 'react-icons/bi';
import { BiMenu } from 'react-icons/bi';
import { IoClose } from 'react-icons/io5';
import { BsChevronDown } from 'react-icons/bs';
import { RiCustomerService2Fill } from 'react-icons/ri';
import { useEffect, useState } from 'react';
import Link from 'next/link';

const Navbar2 = () => {
  const [shadow, setShadow] = useState(false);
  const [showNav, setShowNav] = useState(true);

  useEffect(() => {
    const handleShadow = () => {
      if (window.scrollY >= 90) {
        setShadow(true);
      } else {
        setShadow(false);
      }
    };
    window.addEventListener('scroll', handleShadow);
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
    window.addEventListener('scroll', showNavbar);
  }, [showNav]);

  return (
    <>
      <div
        className={`${
          shadow
            ? 'shadow-xl fixed left-0 right-0 top-0 z-50 border-b-[1.8px]'
            : 'fixed left-0 right-0 top-0 z-50 border-b-[1.8px]'
        } flex flex-col items-center`}
      >
        {/* Top Nav */}
        {/* {showNav && (
          <div className="bg-primary w-full">
            <div className="flex lg:flex-row flex-col w-full md:max-w-7xl mx-auto px-[0px] items-center  py-[10px] text-[13px] h-[40px] text-white lg:justify-between ">
              <div className="flex  items-center">
                <div className="flex md:hidden">
                    <p className="hidden lg:flex">Need help?</p>
                    <div className="flex items-center ml-[10px] space-x-[7px]">
                      <RiCustomerService2Fill size={20} className="" />
                      <a href="tel:07869116203" className="link link-hover">
                        07869116203{' '}
                      </a>
                      <p className="">|</p>
                    </div>
                </div>

                <div className="flex items-center ml-[10px] space-x-[7px]">
                  <BiSolidPhoneCall size={20} className="" />
                  <a href="tel:(800)-995-5003" className="link link-hover">
                    (800) 995-5003{' '}
                  </a>
                </div>
              </div>
              <div className="lg:flex items-center  space-x-[10px] hidden">
                <p className="link link-hover ">About Us</p>
                <p className="">|</p>
                <p className="link link-hover ">Contact Us</p>
                <p className="">|</p>
                <p className="link link-hover"> Blog</p>
              </div>
            </div>
          </div>
        )} */}

        {/* Main Nav */}
        <div className={`${shadow ? 'bg-white/90 ' : 'bg-white'} w-full `}>
          <div className="drawer z-[900]">
            <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col">
              {/* Navbar */}
              <div className="w-full navbar  md:max-w-7xl mx-auto items-center ">
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
                        07869116203{' '}
                      </a>
                    </div>
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

            <div className="drawer-side">
              <label htmlFor="my-drawer-3" className="drawer-overlay"></label>

              <ul className="menu p-4 w-[250px] md:w-[400px] h-full bg-base-100 md:text-[16px] flex flex-col space-y-[10px] md:space-y-[20px]">
                <li>
                  <a className="btn-nav">Home</a>
                </li>
                <li>
                  <a className="btn-nav">UK Home Moving</a>
                </li>
                <li>
                  <a className="btn-nav">Man & Van</a>
                </li>
                <li>
                  <a className="btn-nav">Storage & Self Storage</a>
                </li>
                <li>
                  <a className="btn-nav">Moving Your Employees</a>
                </li>
                <li className="border-b-[1.5px]">
                  <a className="btn-nav">Moving Your Business</a>
                </li>
                <li>
                  <a className="btn-nav">Moving Tips</a>
                </li>
                <li className="border-b-[1.5px]">
                  <a className="btn-nav">Become a Mover</a>
                </li>
                <li>
                  <a className="btn-nav">Join Us</a>
                </li>
                <li>
                  <a className="btn-nav">Login</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar2;