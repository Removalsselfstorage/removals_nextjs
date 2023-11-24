import React, { useEffect, useState } from "react";

import {
  checkBookStatus,
  convertMoveDateFormat,
  trimDateFormat,
  trimDateFormats,
} from "@/utils/logics";
import Link from "next/link";

const AllTable = ({ moverBooks }) => {
  return (
    <div className='overflow-x-auto w-full overflow-hidden py-[30px] px-[10px] md:px-[30px]'>
      <table className='table table-md'>
        {/* head */}
        <thead>
        <tr className='border-[2px]'>
            {/* <th></th> */}
            {/* <th className='text-[15px] text-primary'>Book Date</th> */}
            <th className='text-[15px] text-black'>QuoteRef</th>
            <th className='text-[15px] text-black'>Move Desc.</th>
            <th className='text-[15px] text-black'>Move Date</th>
            <th className='text-[15px] text-black'>Move Time</th>
            <th className='text-[15px] text-black'>Status</th>
          </tr>
        </thead>
        {moverBooks?.map((mm, index) => {
          const isGivenDateGreaterThanCurrent = checkBookStatus(
            mm?.moveDate,
            mm?.moverTime
          );
          return (
            <tbody key={index}>
              <tr className='hover'>
                {/* <th>{index + 1}</th> */}
                {/* <td className=''>{trimDateFormat(mm?.date)}</td> */}
                <td className='link'>
                  <Link
                    href={`/mover-profile/appointments/booking/${mm?.bookingId}`}
                    className='tooltip '
                    // data-tip={`${mm?.propertyType} - ${
                    //   mm?.movePackage
                    // } ${mm?.movePackage && "Package"} - ${
                    //   mm?.numberOfMovers
                    // } ${mm?.numberOfMovers && "and Jumbo Van"}`}
                    data-tip={`View all details`}
                  >
                    {mm?.quoteRef}
                  </Link>
                </td>
                <td className='link'>
                  <Link
                    href={`/mover-profile/appointments/booking/${mm?.bookingId}`}
                    className='tooltip '
                    // data-tip={`${mm.propertyType} - ${
                    //   mm.movePackage
                    // } ${mm.movePackage && "Package"} - ${
                    //   mm.numberOfMovers
                    // } ${mm.numberOfMovers && "and Jumbo Van"}`}
                    data-tip={`View all details`}
                  >
                    {mm.propertyType}
                  </Link>
                </td>
                <td className=''>{convertMoveDateFormat(mm?.moveDate)}</td>
                <td className=''>{trimDateFormat(mm?.moverTime)}</td>
                <td
                  className={`${
                    isGivenDateGreaterThanCurrent
                      ? "text-primary"
                      : "text-secondary"
                  } font-semibold text-[12px]`}
                >
                  {isGivenDateGreaterThanCurrent ? "ONGOING" : "EXPIRED"}
                </td>
              </tr>
            </tbody>
          );
        })}
      </table>
    </div>
  );
};

export default AllTable;
