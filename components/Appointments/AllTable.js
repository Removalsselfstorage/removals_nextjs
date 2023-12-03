import React, { useEffect, useState } from "react";

import {
  checkBookStatus,
  convertMoveDateFormat,
  trimDateFormat,
  trimDateFormats,
} from "@/utils/logics";
import Link from "next/link";
import dayjs from "dayjs";
import useMover from "@/hooks/useMover";

const AllTable = ({ moverBooks }) => {
  const {
    justRegistered,
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
    router,
  } = useMover();

  // const oldApplication = moverBooks?.application ?? [];

  // const checkApplication = oldApplication?.some(
  //   (pa) => pa.mover === personalMoverDetails?.generatedName
  // );

  return (
    <div className='overflow-x-auto w-full overflow-hidden py-[30px] px-[10px] md:px-[30px]'>
      <table className='table table-md w-full'>
        {/* head */}
        <thead>
          <tr className='border-[2px]'>
            {/* <th></th> */}
            {/* <th className='text-[15px] text-primary'>Book Date</th> */}
            <th className='text-[15px] text-black'>QuoteRef</th>
            <th className='text-[15px] text-black'>Move Desc.</th>
            <th className='text-[15px] text-black'>Move Date</th>
            <th className='text-[15px] text-black'>Move Time</th>
            <th className='text-[15px] text-black'>Application</th>
            <th className='text-[15px] text-black'>Status</th>
          </tr>
        </thead>
        {moverBooks?.map((mm, index) => {
          const isGivenDateGreaterThanCurrent = checkBookStatus(
            mm?.moveDate,
            mm?.moverTime
          );

          const oldApplication = mm?.application ?? [];

          const checkApplication = oldApplication?.some(
            (pa) => pa.mover === personalMoverDetails?.generatedName
          );
          return (
            <tbody key={index}>
              <tr
                className={`${checkApplication ? "bg-primary/10" : ""} hover`}
              >
                {/* <th>{index + 1}</th> */}
                {/* <td className=''>{trimDateFormat(mm?.date)}</td> */}
                <td className='link'>
                  <Link
                    href={`/mover-profile/job-board/booking/${mm?.bookingId}`}
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
                    href={`/mover-profile/job-board/booking/${mm?.bookingId}`}
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
                <td className=''>
                  {dayjs(`${mm?.moveDate}`).format("ddd, D MMMM, YYYY")}
                </td>
                <td className=''>{trimDateFormat(mm?.moverTime)}</td>
                <td
                  className={`${
                    checkApplication ? "text-primary" : "text-secondary"
                  } `}
                >
                  {checkApplication ? "Applied" : "Not Applied"}
                </td>
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
