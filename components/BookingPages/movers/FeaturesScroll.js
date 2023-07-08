import React, { useRef, useState } from 'react';
import { TiTick } from 'react-icons/ti';
import {
  BiSolidChevronLeft,
  BiSolidChevronRight,
  BiHappy,
  BiSolidPackage,
  BiSolidHappy,
} from 'react-icons/bi';
import {
  MdKeyboardArrowRight,
  MdPayments,
  MdFreeCancellation,
  MdCancel,
} from 'react-icons/md';
import { RiRefundFill } from 'react-icons/ri';
import { FaTruckMoving } from 'react-icons/fa';
import { GiCancel } from 'react-icons/gi';
import HorizontalScroll from '@/components/HorizontalScroll';

const FeaturesScroll = () => {
  return (
    <div className="pl-[0px] mx-[10px]">
              <div className=" py-[0px] md:py-[0px] px-[0px] lg:px-[100px] xl:px-[0px] hidden xl:grid grid-cols-2   md:grid-cols-3 xl:grid-cols-6 justify-center gap-x-[10px] gap-y-[10px] ">
                <div className="flex space-x-[10px] items-center md:justify-center bg-primary/10 py-[8px] px-[20px] rounded-[10px]">
                  <MdCancel className="text-[30px] xl:text-[20px] text-primary" />
                  <p className="text-primary text-[14px] leading-[16px]">
                    Free Cancellation
                  </p>
                </div>
                <div className="flex space-x-[10px] items-center md:justify-center bg-primary/10 py-[8px] px-[10px] rounded-[10px]">
                  <BiHappy className="text-[30px] xl:text-[20px] text-primary" />
                  <p className="text-primary text-[14px] leading-[16px]">
                    Happiness Guarantee
                  </p>
                </div>
                <div className="flex space-x-[10px] items-center md:justify-center bg-primary/10 py-[8px] px-[20px] rounded-[10px]">
                  <BiSolidPackage className="text-[30px] xl:text-[20px] text-primary" />
                  <p className="text-primary text-[14px] leading-[16px]">
                    Transit blankets
                  </p>
                </div>
                <div className="flex space-x-[10px] items-center md:justify-center bg-primary/10 py-[8px] px-[20px] rounded-[10px]">
                  <FaTruckMoving className="text-[30px] xl:text-[20px] text-primary" />
                  <p className="text-primary text-[14px] leading-[16px]">
                    Trusted Movers
                  </p>
                </div>
                <div className="flex space-x-[10px] items-center md:justify-center bg-primary/10 py-[8px] px-[20px] rounded-[10px]">
                  <BiSolidHappy className="text-[30px] xl:text-[20px] text-primary" />
                  <p className="text-primary text-[14px] leading-[16px]">
                    100% Satisfaction
                  </p>
                </div>
                <div className="flex space-x-[10px] items-center md:justify-center bg-primary/10 py-[8px] px-[20px] rounded-[10px]">
                  <RiRefundFill className="text-[30px] xl:text-[20px] text-primary" />
                  <p className="text-primary text-[14px] leading-[16px]">
                    Full Refund
                  </p>
                </div>
              </div>
              <div className="xl:hidden">
                <HorizontalScroll speed={80}>
                  <div className="flex items-center space-x-[10px]">
                    <div className="flex  space-x-[10px] items-center justify-center bg-primary/10  py-[8px] px-[20px] rounded-[10px]">
                      <MdCancel className="text-[20px] text-primary" />
                      <p className="text-primary text-[14px] leading-[16px] flex whitespace-nowrap text-center">
                        Free Cancellation
                      </p>
                    </div>
                    <div className="flex  space-x-[10px] items-center justify-center bg-primary/10  py-[8px] px-[10px] rounded-[10px]">
                      <BiHappy className="text-[20px] text-primary" />
                      <p className="text-primary text-[14px] leading-[16px] flex whitespace-nowrap text-center">
                        Happiness Guarantee
                      </p>
                    </div>
                    <div className="flex space-x-[10px] items-center justify-center bg-primary/10  py-[8px] px-[20px] rounded-[10px]">
                      <BiSolidPackage className="text-[20px] text-primary" />
                      <p className="text-primary text-[14px] leading-[16px] flex whitespace-nowrap text-center">
                        Transit blankets
                      </p>
                    </div>
                    <div className="flex space-x-[10px] items-center justify-center bg-primary/10  py-[8px] px-[20px] rounded-[10px]">
                      <FaTruckMoving className="text-[20px] text-primary" />
                      <p className="text-primary text-[14px] leading-[16px] flex whitespace-nowrap text-center">
                        Trusted Movers
                      </p>
                    </div>
                    <div className="flex space-x-[10px] items-center justify-center bg-primary/10  py-[8px] px-[20px] rounded-[10px]">
                      <BiSolidHappy className="text-[20px] text-primary" />
                      <p className="text-primary text-[14px] leading-[16px] flex whitespace-nowrap text-center">
                        100% Satisfaction
                      </p>
                    </div>
                    <div className="flex space-x-[10px] items-center justify-center bg-primary/10  py-[8px] px-[20px] rounded-[10px]">
                      <RiRefundFill className="text-[20px] text-primary" />
                      <p className="text-primary text-[14px] leading-[16px] flex whitespace-nowrap text-center">
                        Full Refund
                      </p>
                    </div>
                    <div className="flex  space-x-[10px] items-center justify-center bg-primary/10  py-[8px] px-[20px] rounded-[10px]">
                      <MdCancel className="text-[20px] text-primary" />
                      <p className="text-primary text-[14px] leading-[16px] flex whitespace-nowrap text-center">
                        Free Cancellation
                      </p>
                    </div>
                    <div className="flex  space-x-[10px] items-center justify-center bg-primary/10  py-[8px] px-[10px] rounded-[10px]">
                      <BiHappy className="text-[20px] text-primary" />
                      <p className="text-primary text-[14px] leading-[16px] flex whitespace-nowrap text-center">
                        Happiness Guarantee
                      </p>
                    </div>
                    <div className="flex space-x-[10px] items-center justify-center bg-primary/10  py-[8px] px-[20px] rounded-[10px]">
                      <BiSolidPackage className="text-[20px] text-primary" />
                      <p className="text-primary text-[14px] leading-[16px] flex whitespace-nowrap text-center">
                        Transit blankets
                      </p>
                    </div>
                    <div className="flex space-x-[10px] items-center justify-center bg-primary/10  py-[8px] px-[20px] rounded-[10px]">
                      <FaTruckMoving className="text-[20px] text-primary" />
                      <p className="text-primary text-[14px] leading-[16px] flex whitespace-nowrap text-center">
                        Trusted Movers
                      </p>
                    </div>
                    <div className="flex space-x-[10px] items-center justify-center bg-primary/10  py-[8px] px-[20px] rounded-[10px]">
                      <BiSolidHappy className="text-[20px] text-primary" />
                      <p className="text-primary text-[14px] leading-[16px] flex whitespace-nowrap text-center">
                        100% Satisfaction
                      </p>
                    </div>
                    <div className="flex space-x-[10px] items-center justify-center bg-primary/10  py-[8px] px-[20px] rounded-[10px]">
                      <RiRefundFill className="text-[20px] text-primary" />
                      <p className="text-primary text-[14px] leading-[16px] flex whitespace-nowrap text-center">
                        Full Refund
                      </p>
                    </div>
                    <div className="flex  space-x-[10px] items-center justify-center bg-primary/10  py-[8px] px-[20px] rounded-[10px]">
                      <MdCancel className="text-[20px] text-primary" />
                      <p className="text-primary text-[14px] leading-[16px] flex whitespace-nowrap text-center">
                        Free Cancellation
                      </p>
                    </div>
                    <div className="flex  space-x-[10px] items-center justify-center bg-primary/10  py-[8px] px-[10px] rounded-[10px]">
                      <BiHappy className="text-[20px] text-primary" />
                      <p className="text-primary text-[14px] leading-[16px] flex whitespace-nowrap text-center">
                        Happiness Guarantee
                      </p>
                    </div>
                    <div className="flex space-x-[10px] items-center justify-center bg-primary/10  py-[8px] px-[20px] rounded-[10px]">
                      <BiSolidPackage className="text-[20px] text-primary" />
                      <p className="text-primary text-[14px] leading-[16px] flex whitespace-nowrap text-center">
                        Transit blankets
                      </p>
                    </div>
                    <div className="flex space-x-[10px] items-center justify-center bg-primary/10  py-[8px] px-[20px] rounded-[10px]">
                      <FaTruckMoving className="text-[20px] text-primary" />
                      <p className="text-primary text-[14px] leading-[16px] flex whitespace-nowrap text-center">
                        Trusted Movers
                      </p>
                    </div>
                    <div className="flex space-x-[10px] items-center justify-center bg-primary/10  py-[8px] px-[20px] rounded-[10px]">
                      <BiSolidHappy className="text-[20px] text-primary" />
                      <p className="text-primary text-[14px] leading-[16px] flex whitespace-nowrap text-center">
                        100% Satisfaction
                      </p>
                    </div>
                    <div className="flex space-x-[10px] items-center justify-center bg-primary/10  py-[8px] px-[20px] rounded-[10px]">
                      <RiRefundFill className="text-[20px] text-primary" />
                      <p className="text-primary text-[14px] leading-[16px] flex whitespace-nowrap text-center">
                        Full Refund
                      </p>
                    </div>
                  </div>
                </HorizontalScroll>
              </div>
            </div>
  )
}

export default FeaturesScroll
