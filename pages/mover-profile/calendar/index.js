// import BgCalendar from "@/components/Calendar/BigCalendar";
import MuiCalendar from "@/components/Calendar/MuiCalendar";
import Schedulers from "@/components/Calendar/Scheduler";
// import Scheduler from "@/components/Calendar/Scheduler";
import MoverLayout from "@/layouts/MoverLayout";
import NormalLayout from "@/layouts/NormalLayout";
import { fetchMoverDetails3 } from "@/lib/fetchData2";
import { getAllUserDetails } from "@/store/userSlice";
import Head from "next/head";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { BiLogOut } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { useSelector } from "react-redux";
import { Scheduler } from "@aldabil/react-scheduler";
import { ReactCalendarScheduler } from "react-calendar-scheduler";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import { MdNotificationsActive } from "react-icons/md";
import Datetime from "react-datetime";

const Calendar = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");

  const calendarRef = useRef(null);

  const onEventAdded = (e) => {
    let calendarApi = calendarRef.current.getApi();
    calendarApi.addEvent(e);
    console.log({e, calendarApi})
  };

  const handleEvent = () => {
    // e.preventDefault();

    onEventAdded({
      title,
      start,
      end,
    });
    window.my_modal_419.close();
  };

  function renderEventContent(eventInfo) {
    console.log({eventInfo})
    return (
      <>
        <b>{eventInfo.timeText}</b>
        <i>{eventInfo.event.title}</i>
      </>
    )
  }

  // const [events, setEvents] = useState([]);

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

          <div className='w-full my-[20px]'>
            <div
              className='btn btn-primary'
              onClick={() => {
                window.my_modal_419.showModal();
              }}
            >
              Add Off Days
            </div>
          </div>

          {/* <BgCalendar /> */}
          {/* <div className="container"><MuiCalendar/></div> */}
          <div className='pb-[50px] pt-[20px] h-full'>
            {/* <Schedulely events={[]} /> */}
            <FullCalendar
              ref={calendarRef}
              plugins={[dayGridPlugin]}
              initialView='dayGridMonth'
              headerToolbar={{
                left: 'prev,next today',
                center: 'title',
                right: 'dayGridMonth'
                // right: 'dayGridMonth,timeGridWeek,timeGridDay'
              }}
              events={[
                { title: 'event 1', start: '2023-12-12' },
                { title: 'event 2', start: '2023-12-02' }
              ]}
              eventContent={renderEventContent}
              editable={true}
            selectable={true}
            />
          </div>
          <dialog id='my_modal_419' className='modal py-[20px] px-[10px]'>
            <form method='dialog' className='modal-box '>
              <button className='btn btn-sm btn-circle btn-ghost absolute right-2 top-2 border border-primary text-primary'>
                ✕
              </button>

              <div className='w-full flex justify-center mb-[20px]'>
                <div className='text-primary bg-primary/10 flex justify-center items-center w-[60px] h-[60px] rounded-full'>
                  <MdNotificationsActive className='text-[30px] text-primary' />
                </div>
              </div>

              <div
                // onSubmit={handleEvent}
                className='form-control w-full'
              >
                <div className='mb-[10px]'>
                  <label className='label'>
                    <span className='label-text font-semibold'>
                      Title<span className='text-secondary'>*</span>
                    </span>
                  </label>
                  <input
                    type='text'
                    placeholder='Add Title'
                    className={`input input-primary w-full h-[43px]`}
                    onChange={(e) => setTitle(e.target.value)}
                    defaultValue={title}
                  />
                </div>

                <div className='mb-[10px]'>
                  <label className='label'>
                    <span className='label-text font-semibold'>
                      Start Date<span className='text-secondary'>*</span>
                    </span>
                  </label>
                  <Datetime
                    value={start}
                    onChange={(date) => setStart(date)}
                    className='border-[1px] border-primary cursor-pointer rounded-[10px] w-fit py-[5px] px-[5px] outline-none focus:outline-none'
                  />
                </div>

                <div className='mb-[10px]'>
                  <label className='label'>
                    <span className='label-text font-semibold'>
                      End Date<span className='text-secondary'>*</span>
                    </span>
                  </label>
                  <Datetime
                    value={end}
                    onChange={(date) => setEnd(date)}
                    className='border-[1px] border-primary cursor-pointer rounded-[10px] w-fit py-[5px] px-[5px] outline-none focus:outline-none'
                  />
                </div>

                <button
                  // type='submit'
                  className='w-full my-[20px]'
                  onClick={handleEvent}
                >
                  <div className='btn btn-primary btn-wide'>Add Event</div>
                </button>
              </div>
            </form>
            <form method='dialog' className='modal-backdrop'>
              <button>close</button>
            </form>
          </dialog>
        </div>
      </main>
    </MoverLayout>
  );
};

export default Calendar;
