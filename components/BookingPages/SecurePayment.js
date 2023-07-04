import React from 'react';
import { BsFillShieldLockFill } from 'react-icons/bs';

const SecurePayment = () => {
  return (
    <div className="mb-[0px] lg:mb-[20px] pt-[100px]">
      <div className="md:max-w-7xl mx-auto">
        {/* Secure features*/}
        <div className="flex items-center px-[20px] space-x-[20px] justify-center">
          <div className="flex items-center space-x-[7px] ">
            <BsFillShieldLockFill  className="text-gray-400 text-[30px] md:text-[25px]"/>
            <p className="text-[16px] text-gray-400">Secure Checkout</p>
          </div>
          <div className="flex items-center space-x-[7px] ">
            <BsFillShieldLockFill  className="text-gray-400 text-[30px] md:text-[25px]"/>
            <p className="text-[16px] text-gray-400">Flexible Reservation</p>
          </div>
          <div className="flex items-center space-x-[7px] ">
            <BsFillShieldLockFill  className="text-gray-400 text-[30px] md:text-[25px]"/>
            <p className="text-[16px] text-gray-400">Trusted Reviews</p>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default SecurePayment;
