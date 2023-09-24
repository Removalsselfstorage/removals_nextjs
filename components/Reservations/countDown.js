import React, { useState, useEffect } from "react";

const Countdown = ({ date }) => {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  function calculateTimeLeft() {
    const endDate = new Date(date).getTime();
    const now = new Date().getTime();
    const timeDifference = endDate - now;

    if (timeDifference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor(
      (timeDifference % (1000 * 60 * 60)) / (1000 * 60)
    );
    const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

    return { days, hours, minutes, seconds };
  }

  useEffect(() => {
    const countdownInterval = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => {
      clearInterval(countdownInterval);
    };
  }, []);

  return (
    // <div className="text-center  font-bold">
    //   <div className="flex justify-center space-x-[10px]">
    //     <div className="bg-gray-300 p-4 rounded-lg">
    //       <div className="text-2xl">{timeLeft.days}</div>
    //       <span className="text-gray-700">Days</span>
    //     </div>
    //     <div className="bg-gray-300 p-4 rounded-lg">
    //       <div className="text-2xl">{timeLeft.hours}</div>
    //       <span className="text-gray-700">Hours</span>
    //     </div>
    //     <div className="bg-gray-300 p-4 rounded-lg">
    //       <div className="text-2xl">{timeLeft.minutes}</div>
    //       <span className="text-gray-700">Minutes</span>
    //     </div>
    //     <div className="bg-gray-300 p-4 rounded-lg">
    //       <div className="text-2xl">{timeLeft.seconds}</div>
    //       <span className="text-gray-700">Seconds</span>
    //     </div>
    //   </div>
    // </div>
    <div className="grid grid-flow-col gap-5 text-center auto-cols-max">
      <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
        <span className="countdown font-mono text-5xl">{timeLeft.days}</span>
        day(s)
      </div>
      <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
        <span className="countdown font-mono text-5xl">{timeLeft.hours}</span>
        hour(s)
      </div>
      <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
        <span className="countdown font-mono text-5xl">{timeLeft.minutes}</span>
        min
      </div>
      <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
        <span className="countdown font-mono text-5xl">{timeLeft.seconds}</span>
        sec
      </div>
    </div>
  );
};

export default Countdown;
