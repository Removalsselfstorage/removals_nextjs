import { BiSolidPhoneCall } from 'react-icons/bi';
import { BiMenu } from 'react-icons/bi';
import { IoClose } from 'react-icons/io5';
import { BsChevronDown } from 'react-icons/bs';
import { useEffect, useState } from 'react';

const Navbar = () => {
  const [shadow, setShadow] = useState(false);
  const [showNav, setShowNav] = useState(false);

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

  //   useEffect(() => {
  //     let oldScrollY = window.scrollY;
  //     const showNavbar2 = (e) => {
  //       if (oldScrollY > window.scrollY) {
  //         setShowNav(true);
  //       } else {
  //         setShowNav(false);
  //       }
  //     };
  //     window.addEventListener('scroll', showNavbar2);
  //   }, [showNav]);

  return (
    <>
      <div
        className={`${
          shadow
            ? 'shadow-lg fixed left-0 right-0 top-0 z-50 border-b-[1.8px]'
            : 'fixed left-0 right-0 top-0 z-50 border-b-[1.8px]'
        } flex flex-col items-center`}
      >
        {/* Top Nav */}
        {showNav && (
          <div className="bg-primary w-full">
            <div className="flex lg:flex-row flex-col w-full md:max-w-7xl mx-auto px-[20px] items-center  py-[10px] text-[14px] h-[40px] text-white lg:justify-between ">
              <div className="flex  items-center text-[14px]">
                <p className="hidden lg:flex">Prefer to talk to a person?</p>
                <div className="flex items-center ml-[10px] space-x-[7px]">
                  <BiSolidPhoneCall size={20} className="" />
                  <a href="tel:(800)-995-5003" className="link link-hover">
                    (800) 995-5003{' '}
                  </a>
                </div>
              </div>
              <div className="lg:flex items-center  space-x-[10px] hidden">
                <p className="link link-hover ">About Us</p>
                <p className="link link-hover ">|</p>
                <p className="link link-hover ">Contact Us</p>
                <p className="link link-hover ">|</p>
                <p className="link link-hover"> Blog</p>
              </div>
            </div>
          </div>
        )}
        {/* Main Nav */}
        <div className={`${shadow ? 'bg-white/90' : 'bg-white'} w-full`}>
          <div className="drawer z-[900]">
            <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col">
              {/* Navbar */}
              <div className="w-full navbar  md:max-w-7xl mx-auto items-center ">
                <div className="navbar-start flex items-center">
                  <img
                    src="/rss_logo2.svg"
                    alt=""
                    className="h-[30px] md:h-[40px]"
                  />
                </div>
                <div className="navbar-center hidden lg:flex ">
                  <ul className="menu menu-horizontal  px-1 text-[16px]">
                    <li>
                      <a className="btn-nav ">Home</a>
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
                        className="dropdown-content z-[1] menu py-[20px] px-[10px] shadow bg-base-100 rounded-box w-[250px] text-[16px]"
                      >
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
                        <li>
                          <a className="btn-nav">Moving Your Business</a>
                        </li>
                      </ul>
                    </li>
                    <li>
                      <a className="btn-nav">Moving Tips</a>
                    </li>
                    <li>
                      <a className="btn-nav">Become a Mover</a>
                    </li>
                  </ul>
                </div>

                <div className="navbar-end flex space-x-[10px]">
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
                  <div className=" lg:space-x-[10px] hidden lg:flex">
                    <a className="btn btn-outline btn-primary">Join Us</a>
                    <a className="btn btn-primary">Login</a>
                  </div>
                </div>
              </div>
            </div>

            <div className="drawer-side lg:hidden">
              <label htmlFor="my-drawer-3" className="drawer-overlay"></label>
              {/* <ul className="menu p-4 w-80 h-full bg-base-200">
                <li>
                  <a>Sidebar Item 1</a>
                </li>
                <li>
                  <a>Sidebar Item 2</a>
                </li>
              </ul> */}
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
                  <a className="btn-nav">About Us</a>
                </li>
                <li>
                  <a className="btn-nav">Contact Us</a>
                </li>
                <li className="border-b-[1.5px]">
                  <a className="btn-nav">Blog</a>
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

export default Navbar;
