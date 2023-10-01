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
    <div className="grid grid-flow-col gap-[10px] text-center auto-cols-max">
      <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
        <span className="countdown font-mono text-5xl">{countdown.months}</span>
        month(s)
      </div>
      <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
        <span className="countdown font-mono text-5xl">{countdown.days}</span>
        day(s)
      </div>
      <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
        <span className="countdown font-mono text-5xl">{countdown.hours}</span>
        hour(s)
      </div>
      <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
        <span className="countdown font-mono text-5xl">
          {countdown.minutes}
        </span>
        min
      </div>
      <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
        <span className="countdown font-mono text-5xl">
          {countdown.seconds}
        </span>
        sec
      </div>
    </div>
  );
};

export default Countdown;
