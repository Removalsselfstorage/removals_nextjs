import React, { useRef, useState } from 'react';
import {
  MdKeyboardArrowRight,
  MdPayments,
  MdFreeCancellation,
  MdCancel,
  MdWork,
  MdEmail,
} from 'react-icons/md';
import { FaTruckMoving } from 'react-icons/fa';
import { BiSolidPhoneCall } from 'react-icons/bi';

import FullRating from '@/components/Rating/FullRating';
import Modal from '@/components/Modal/Modal';
import SideModal from '@/components/Modal/SideModal';
import Link from 'next/link';

const MoverCard = ({
  image,
  name,
  phone,
  email,
  loadArea,
  rating,
  reviewCount,
  price,
  hiresCount,
  description,
}) => {
  const [selectedTime, setSelectedTime] = useState(null);
  const [showMore, setShowMore] = useState(true);
  const [showModal, setShowModal] = useState(true);

  const allTime = [
    { id: '7am - 9am', time: '7am - 9am' },
    { id: '9am - 12am', time: '9am - 12am' },
    { id: '12pm - 3pm', time: '12pm - 3pm' },
    { id: '3pm - 5pm', time: '3pm - 5pm' },
  ];

  return (
    <>
      <div className="flex border-[2px] rounded-[30px] py-[0px] shadow-xl overflow-hidden pb-[20px] w-full">
        <div className="flex flex-col w-full">
          {/* row 1 */}
          <div className="flex flex-col xl:flex-row xl:items-center xl:space-x-[0px] mb-[20px] xl:mb-[0px] xl:py-[10px]">
            {/* image + details */}
            <div className="flex flex-col md:flex-row md:items-center px-[20px] md:flex-[3] md:space-x-[30px] lg:space-x-[15px] mb-[20px] sm:mb-[10px] md:mb-[0px]">
              {/* image */}
              <div
                className=" py-[20px]"
                onClick={() => {
                  setShowModal(true);
                }}
              >
                <img
                  src={image}
                  alt=""
                  className="h-[150px]  w-[300px] lg:w-[200px] object-cover md:h-[180px] lg:h-[140px] rounded-[30px]"
                />
              </div>
              {/* mover details */}
              <div className="flex flex-col w-full flex-[2]">
                {/* mover name */}
                <div className="flex items-center justify-between w-full pr-[20px] mb-[5px] sm:mb-[7px]">
                  <h2 className="text-primary text-bold text-[20px] ">
                    {name}
                  </h2>
                </div>
                {/* phone / email */}
                {/* <div className="flex flex-col  sm:items-start  space-y-[5px] mb-[5px] sm:mb-[10px] text-[15px]">
                <div className="flex items-center space-x-[5px]">
                  <BiSolidPhoneCall className="text-primary" />
                  <a href={`tel:${phone}`} className=" link link-hover">
                    {phone}
                  </a>
                </div>
                <div className="flex items-center space-x-[5px]">
                  <MdEmail className="text-[20px] text-primary" />
                  <a
                    href={`mailto:${email}?subject=Enquiry`}
                    className="link link-hover"
                  >
                    {email}
                  </a>
                </div>
              </div> */}

                {/* loading area */}
                <div className="flex items-center space-x-[15px] md:space-x-[5px]  sm:items-start  space-y-[0px] lg:space-y-[0px] lg:flex-row lg:items-center mb-[5px] sm:mb-[7px] lg:mb-[7px] text-[15px]">
                  <div className="flex items-center space-x-[5px]">
                    <FaTruckMoving className="text-[20px] text-primary" />
                    <p className="text-primary font-semibold hidden md:block">
                      Load area:
                    </p>
                  </div>
                  <p className="link link-hover ">{loadArea}</p>
                </div>
                {/* rating / reviews */}
                <div className="flex flex-col lg:flex-row lg:items-center space-y-[5px] lg:space-y-0 lg:space-x-[10px] mt-[0px] text-[15px] mb-[7px]">
                  <div className="flex items-center space-x-[10px] mt-[0px] text-[15px]">
                    <p className="font-semibold">{rating}</p>
                    <FullRating small value={4} color="text-secondary" />
                    <p className="">{`- (${reviewCount} Reviews)`}</p>
                  </div>
                  {/* <div className="flex items-center space-x-[10px] mt-[0px] text-[15px]">
                  <p className="link link-hover text-primary font-semibold mt-[5px] md:mt-[0px] ">
                    See All Reviews
                  </p>
                </div> */}
                </div>
                {/* package type */}
                <div className="flex justify-center items-center py-[3px] px-[10px] bg-secondary/20 rounded-[10px] max-w-[200px]">
                  <p className="text-secondary font-semibold">Gold Package</p>
                </div>
              </div>
            </div>
            {/* mover price */}
            <div className="flex md:flex-[1]">
              <div className="flex  space-x-[20px] md:space-x-0 justify-between w-full xl:flex-col border border-primary rounded-[20px] xl:items-center xl:justify-center md:flex-[1] py-[10px] xl:py-[20px] mx-[20px] md:mx-[30px] xl:mx-[0px] xl:mr-[30px] px-[10px] sm:px-[20px] xl:px-[0px]">
                <div className="flex flex-col xl:items-center">
                  <p className="font-bold text-primary text-[24px] whitespace-nowrap">
                    {`₤ ${price}`}
                  </p>
                  <p className="text-[12px] text-gray-500">
                    Final price VAT included
                  </p>
                </div>
                <div className="flex  flex-col items-center justify-center space-y-[3px] lg:space-y-0 lg:flex-row md:space-x-[10px] md:items-center md:justify-center bg-primary/10 py-[5px] px-[10px] md:px-[30px] xl:px-[20px] rounded-[10px] xl:mt-[10px]">
                  <MdWork className="text-[20px] text-primary" />
                  <p className="text-primary text-[14px] leading-[16px]">
                    {hiresCount} hires
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* row 2 */}
          <div
            onClick={() => setShowMore((prev) => !prev)}
            className="flex justify-center mb-[30px] mx-[20px] md:mx-[30px] lg:hidden"
          >
            <div className="btn btn-primary btn-outline btn-block">
              {showMore ? 'See More Details' : 'See Less Details'}
            </div>
          </div>

          {/* row 3 */}
          <p
            className={`${
              showMore ? 'hidden' : 'block'
            } lg:block mx-[20px] md:mx-[30px] text-[15px] overflow-auto scrollbar-thin scrollbar-track-gray-200/50 scrollbar-thumb-gray-500/20 scrollbar-default h-[120px] md:h-[100px] w-auto`}
          >
            {description}
          </p>

          {/* row 4 */}
          <div
            className={`${
              showMore ? 'hidden' : 'flex'
            } lg:flex flex-col space-y-[20px] lg:space-y-0 lg:flex-row mx-[20px] md:mx-[30px] mt-[20px] md:justify-between`}
          >
            {/* time + instruction */}
            <div className="flex flex-col">
              {/* time */}
              <div className="grid grid-cols-2 justify-center gap-x-[10px] gap-y-[10px] sm:grid-cols-4 w-auto md:w-[450px]">
                {allTime.map((tm, index) => {
                  let isActive = tm.id == selectedTime;
                  return (
                    <div key={index} className="flex items-center text-[15px]">
                      <div
                        onClick={() => setSelectedTime(tm.id)}
                        className={`${
                          isActive
                            ? 'bg-secondary text-white border-secondary'
                            : 'text-primary hover:border-secondary border-primary'
                        } flex py-[5px] px-[10px] hover:cursor-pointer  rounded-[10px] items-center justify-center border-[2px] group  duration-150 whitespace-nowrap mr-[0px] w-full md:w-[200px]`}
                      >
                        {tm.time}
                      </div>
                    </div>
                  );
                })}
              </div>
              {/* instruction */}
              <div className="flex w-full justify-center md:justify-start">
                <p className="mt-[7px] text-gray-500 text-[14px]">
                  Choose convenient pick-up time
                </p>
              </div>
            </div>
            {/* check out */}
            <Link href='/book/checkout' className="btn btn-primary w-auto">
                <div >Check Out</div>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default MoverCard;
