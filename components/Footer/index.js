import React from 'react';
import { AiOutlineMail, AiFillInstagram, AiFillLinkedin } from 'react-icons/ai';
import { IoLocationOutline } from 'react-icons/io5';
import { BiSolidPhoneCall } from 'react-icons/bi';
import { FaFacebookF } from 'react-icons/fa';
import { BsTwitter } from 'react-icons/bs';
import Link from 'next/link';

const Footer = () => {
  return (
    <div className="bg-[#1C1C1C] text-neutral-content">
      <footer className="md:px-[80px] footer py-[50px] px-[30px] bg-[#1C1C1C] text-neutral-content w-full  md:max-w-7xl mx-auto">
        {/* column 1 */}
        <div className="md:max-w-[350px]">
          <span className="footer-title">Contact Us</span>
          <div className="flex space-x-[10px] mb-[10px]">
            <div className="">
              <AiOutlineMail size={20} className="" />
            </div>
            <a
              href="mailto:removalsandselfstorage@gmail.com?subject=Enquiry"
              className="link link-hover"
            >
              removalsandselfstorage@gmail.com
            </a>
          </div>
          <div className="flex space-x-[10px]">
            <div className="">
              <BiSolidPhoneCall size={20} className="" />
            </div>
            <div className="flex flex-col gap-y-[10px]">
              <p className="">
                KENT: Medway:{' '}
                <span className="link link-hover">
                  <a href="tel:01634 940721">01634-940721</a>
                </span>{' '}
                | Tunbridge Wells:{' '}
                <span className="link link-hover">
                  <a href="tel:01892-234350">01892 234350</a>
                </span>{' '}
                | Sevenoaks:{' '}
                <span className="link link-hover">
                  <a href="tel:01732-240501">01732 240501</a>
                </span>{' '}
                | Gravesend:{' '}
                <span className="link link-hover">
                  <a href="tel:01474-632503">01474 632503</a>
                </span>
              </p>
              <p className="">
                ESSEX: Basildon:{' '}
                <span className="link link-hover">
                  <a href="tel:01268-937401">01268 937401</a>
                </span>{' '}
                | Chelmsford:{' '}
                <span className="link link-hover">
                  <a href="tel:01425-206510">01425 206510</a>
                </span>
              </p>
            </div>
          </div>
        </div>

        {/* column 2 */}
        <div>
          <span className="footer-title">Services</span>
          <a className="link link-hover">Man and Van</a>
          <a className="link link-hover my-[5px]">Storage & Self Storage</a>
          <a className="link link-hover">Moving Your Employees</a>
          <a className="link link-hover my-[5px]">Moving Your Business</a>
          <a className="link link-hover">UK Home Moving</a>
        </div>

        {/* column 3 */}
        <div>
          <span className="footer-title">Company</span>
          <a className="link link-hover">About Us</a>
          <a className="link link-hover my-[5px]">Locations</a>
          <a className="link link-hover ">Reviews</a>
          <a className="link link-hover my-[5px]">Blog</a>
          <a className="link link-hover">Terms & Conditions</a>
          <a className="link link-hover my-[5px]">Privacy Policy</a>
        </div>

        {/* column 4 */}
        <div className="md:max-w-[300px]">
          <Link href='/' className="">
            <img src="/rrs_logo_gray2.svg" alt="" className="h-[60px]" />
          </Link>
          {/* <p className="">
            A stress-free move day is just a few clicks away. We’ve got you
            covered with easier-than-ever booking, flexible service options.
          </p> */}
          <div className="flex space-x-[10px] mt-[10px]">
            {/* <div className="">
              <IoLocationOutline size={20} className="" />
            </div> */}
            <p className="">
              Removals Selfstorage Amwell St, Islington LONDON EC1R 1UR United
              Kingdom
            </p>
          </div>
          <div className="flex space-x-[10px] mt-[10px]">
            <a
              href="https://www.facebook.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-white"
            >
              <FaFacebookF size={30} className="" />
            </a>
            <a
              href="https://www.twitter.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-white"
            >
              <BsTwitter size={30} className="" />
            </a>
            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-white"
            >
              <AiFillInstagram size={30} className="" />
            </a>
            <a
              href="https://www.linkedin.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-white"
            >
              <AiFillLinkedin size={30} className="" />
            </a>
          </div>

          <div className="flex items-center"></div>
        </div>
      </footer>
      <footer className="px-[80px] footer p-10 bg-[#1C1C1C] text-neutral-content w-full justify-center md:max-w-7xl mx-auto border-t border-gray-400/50">
        <p className="text-center">Copyright © 2023 by Removals & Selfstorage</p>
      </footer>
    </div>
  );
};

export default Footer;
