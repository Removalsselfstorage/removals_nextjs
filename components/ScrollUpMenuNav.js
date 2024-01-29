import React, { useState, useEffect } from 'react';
import { MdKeyboardArrowUp } from 'react-icons/md';
import { RiChatSmile3Fill } from 'react-icons/ri';
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';
import Link from 'next/link';

const ScrollUpMenuNav = () => {
  const [scrollUp, setScrollUp] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.scrollY > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  return (
    <div className="">
      {/* scroll button */}
      <div
        onClick={scrollToTop}
        className={
          isVisible
            ? 'lg:flex cursor-pointer fixed flex-col z-50 right-[20px] bottom-[30px] md:right-0 xs:mr-[20px] md:mr-[40px] duration-300 opacity-[80%]'
            : 'lg:flex fixed flex-col z-50 right-[20px] bottom-[20px] md:right-0 xs:mr-[20px] md:mr-[40px] opacity-[0%] duration-300'
        }
      >
        <div className="text-[40px] rounded-[50%] shadow-lg outline outline-white/[0.1] outline-[0.5px] hover:scale-[1.2] hover:outline-white/[2] hover:text-royal/70 duration-300 bg-primary p-[5px] text-white md:p-[5px] mb-[20px]">
          <MdKeyboardArrowUp />
        </div>
      </div>
    </div>
  );
};

export default ScrollUpMenuNav;
