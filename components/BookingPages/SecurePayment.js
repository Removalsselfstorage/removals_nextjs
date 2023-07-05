import React from 'react';
import { BsFillShieldLockFill } from 'react-icons/bs';
import { AiOutlineStar } from 'react-icons/ai';
import { BiTask } from 'react-icons/bi';
// import { BsFillShieldLockFill } from 'react-icons/bs';

const SecurePayment = () => {
  return (
    <div className="mb-[0px] lg:mb-[20px] pt-[100px]">
      <div className="md:max-w-7xl mx-auto">
        {/* Secure features*/}
        <div className="flex items-center px-[20px] space-x-[20px] lg:space-x-[40px] justify-center mb-[50px]">
          <div className="flex md:items-center justify-center space-x-[7px] ">
            <BsFillShieldLockFill  className="text-gray-400 text-[30px] md:text-[25px]"/>
            <p className="text-[14px] text-gray-400 leading-[18px]">Secure Checkout</p>
          </div>
          <div className="flex md:items-center justify-center space-x-[7px] ">
            <BiTask  className="text-gray-400 text-[30px] md:text-[25px]"/>
            <p className="text-[14px] text-gray-400 leading-[18px]">Flexible Reservation</p>
          </div>
          <div className="flex md:items-center justify-center space-x-[7px] ">
            <AiOutlineStar  className="text-gray-400 text-[30px] md:text-[25px]"/>
            <p className="text-[14px] text-gray-400 leading-[18px]">Trusted Reviews</p>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default SecurePayment;
