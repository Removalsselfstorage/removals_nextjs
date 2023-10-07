import React, { useState, useEffect } from "react";

const Countdown = ({ date }) => {
  const targetDate = new Date(date).getTime();
  const [countdown, setCountdown] = useState(calculateCountdown());

  function calculateCountdown() {
    const currentDate = new Date().getTime();
    const timeRemaining = targetDate - currentDate;

    const months = Math.floor(timeRemaining / (1000 * 60 * 60 * 24 * 30));
    const days = Math.floor(
      (timeRemaining % (1000 * 60 * 60 * 24 * 30)) / (1000 * 60 * 60 * 24)
    );
    const hours = Math.floor(
      (timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor(
      (timeRemaining % (1000 * 60 * 60)) / (1000 * 60)
    );
    const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

    return { months, days, hours, minutes, seconds };
  }

  useEffect(() => {
    const countdownInterval = setInterval(() => {
      setCountdown(calculateCountdown());
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
    <div className="grid grid-flow-col gap-[5px] text-center auto-cols-max">
      <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
        <span className="countdown font-mono font-bold text-2xl lg:text-3xl">
          {countdown.months}
        </span>
        <span className="text-[15px]">month(s)</span>
      </div>
      <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
        <span className="countdown font-mono font-bold text-2xl lg:text-3xl">
          {countdown.days}
        </span>
        <span className="text-[15px]">day(s)</span>
      </div>
      <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
        <span className="countdown font-mono font-bold text-2xl lg:text-3xl">
          {countdown.hours}
        </span>
        <span className="text-[15px]">hour(s)</span>
      </div>
      <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
        <span className="countdown font-mono font-bold text-2xl lg:text-3xl">
          {countdown.minutes}
        </span>
        <span className="text-[15px]">min</span>
      </div>
      <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
        <span className="countdown font-mono font-bold text-2xl lg:text-3xl">
          {countdown.seconds}
        </span>
        <span className="text-[15px]">sec</span>
      </div>
    </div>
  );
};

export default Countdown;
