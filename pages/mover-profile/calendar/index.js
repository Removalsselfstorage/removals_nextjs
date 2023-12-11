import BgCalendar from "@/components/Calendar/BigCalendar";
import MoverLayout from "@/layouts/MoverLayout";
import NormalLayout from "@/layouts/NormalLayout";
import { fetchMoverDetails3 } from "@/lib/fetchData2";
import { getAllUserDetails } from "@/store/userSlice";
import Head from "next/head";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { BiLogOut } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { useSelector } from "react-redux";
// import { Scheduler } from "@bitnoi.se/react-scheduler";

// const data = ["a", "b"]

const Calendar = () => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <MoverLayout>
      <Head>
        <title>Mover Profile - Calendar</title>
        <meta name='description' content='Rss removal and storage website' />
        <link rel='icon' href='/rrs_favicon.svg' />
      </Head>

      <main>
        <div className='bg-white/90 py-[50px] pb-[0px] px-[30px] min-h-[100vh]'>
          <section className='mb-[30px]  px-[0px] '>
            <div className='flex flex-col'>
              <p className='font-bold text-[25px] mb-[0px]'>Calendar</p>
              <p className=''>
                Increase the chances of getting jobs assigned to you by
                scheduling off-days and highlighting availability.
              </p>
            </div>
          </section>

          {/* <BgCalendar /> */}
        </div>
      </main>
    </MoverLayout>
  );
};

export default Calendar;
