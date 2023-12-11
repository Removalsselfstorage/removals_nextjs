import moment from "moment";
import dayjs from "dayjs";
import React, { Fragment, useState, useCallback, useMemo } from "react";
import {
  Calendar,
  momentLocalizer,
  dayjsLocalizer,
  Views,
  DateLocalizer,
} from "react-big-calendar";
import { MdNotificationsActive } from "react-icons/md";
// import {
//     Calendar as BigCalendar,
//     momentLocalizer
// }

// const localizer = momentLocalizer(moment);

// const CustomToolbar = (toolbar) => {
// //   const { label, onView, onNavigate, views, view } = toolbar;

//   return (
//     <div className='rbc-toolbar'>
//       <span className='rbc-toolbar-label'>{label}</span>
//       <span className='rbc-toolbar-label'>{view}</span>
//       {/* <span className="rbc-toolbar-label">{view}</span> */}
//       {/* Add other toolbar components if needed */}
//       {/* Omitting the "back" button */}
//     </div>
//   );
// };

const BgCalendar = () => {
  const [events, setEvents] = useState([]);
  const [modalTitle, setModalTitle] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSelectSlot = useCallback(
    ({ start, end }) => {
      //   const title = window.prompt("New Event name");
      //   if (title) {
      //     setEvents((prev) => [...prev, { start, end, title }]);
      //   }
      window.my_modal_619.showModal();
    },
    [setEvents]
  );

  const handleSelectEvent = useCallback(
    (event) => window.alert(event.title),
    []
  );

  // Set the minimum date to the current day
  const minDate = new Date();
  const localizer = dayjsLocalizer(dayjs);

  const handleModalSubmit = useCallback(() => {
    const newEvent = {
      title: modalTitle || "New Event", // Use modalTitle as the title, or default to 'New Event'
      start: new Date(), // You might want to replace this with the actual start time
      end: new Date(), // You might want to replace this with the actual end time
    };

    setEvents([...events, newEvent]);
    window.my_modal_619.close();
    // setIsModalOpen(false);
    setModalTitle("");
  }, [events, modalTitle, setEvents, setModalTitle]);

//   const handleDayClick = ({ start }) => {
//     // Open a modal or form to input event details
//     window.my_modal_619.showModal();
//     // For simplicity, let's assume you have a custom form component (MyEventForm)
//     // that takes care of capturing event details and adding them to the state
//     const newEvent = {
//       title: "New Event",
//       start,
//       end: moment(start).add(1, "hour").toDate(), // Set an end time (1 hour duration in this example)
//     };

//     setEvents([...events, newEvent]);
//   };

  return (
    <div className='py-[30px]' style={{ height: "100vh" }}>
      <Calendar
        localizer={localizer}
        // views={["month", "week", "day", "agenda"]}
        events={events}
        startAccessor='start'
        endAccessor='end'
        min={minDate}
        // onSelectSlot={handleDayClick}
        onSelectEvent={handleSelectEvent}
        onSelectSlot={handleSelectSlot}
        selectable
        //   components={{ toolbar: CustomToolbar }}
      />
      {/* * modal */}
      <dialog id='my_modal_619' className='modal py-[20px] px-[10px]'>
        <form method='dialog' className='modal-box '>
          <button className='btn btn-sm btn-circle btn-ghost absolute right-2 top-2 border border-primary text-primary'>
            ✕
          </button>
          {/* 
          <div className='w-full flex justify-center mb-[20px]'>
            <div className='text-primary bg-primary/10 flex justify-center items-center w-[60px] h-[60px] rounded-full'>
              <MdNotificationsActive className='text-[30px] text-primary' />
            </div>
          </div>
          <div className='w-full flex-col items-center'>
            <h3 className='font-bold text-[22px] text-primary px-[20px] text-center'>
              Hello
            </h3>
          </div>

          <p className='mt-[10px] mb-[20px] text-[14px] text-gray-600 w-full text-center'>
            world
          </p>

          <>
            <p className='mb-[20px] text-[14px] md:text-[16px]'>message1</p>
            <p className='mb-[20px] text-[15px] font-bold'>From: admin</p>
          </> */}
          <label>
            Event Title:
            <input
              type='text'
              className='input input-bordered w-full'
              value={modalTitle}
              onChange={(e) => setModalTitle(e.target.value)}
            />
          </label>

          <button
            type='button'
            className='btn btn-primary mt-[20px]'
            onClick={handleModalSubmit}
          >
            Save Event
          </button>
        </form>
        <form method='dialog' className='modal-backdrop'>
          <button>close</button>
        </form>
      </dialog>
    </div>
  );
};

export default BgCalendar;
