import { StorageData } from "@/dummyData/dummyData";
import React, { useRef, useState } from "react";
import { BiSolidChevronLeft, BiSolidChevronRight } from "react-icons/bi";

const Selector = ({ setActiveCont, activeCont, setDuration, setQuantity }) => {
  const rowRef = useRef(null);
  const [isMoved, setIsMoved] = useState(false);
  const [checkIndex, setCheckIndex] = useState(0);
  const [formattedDate, setFormattedDate] = useState("");

  const handleClick = (direction) => {
    setIsMoved(true);
    if (rowRef.current) {
      const { scrollLeft, clientWidth } = rowRef.current;

      console.log({ clientWidth });

      const scrollTo =
        direction === "left" ? scrollLeft - 200 : scrollLeft + 200;
      rowRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
      //   const scrollTo =
      //     direction === "left"
      //       ? scrollLeft - clientWidth
      //       : scrollLeft + clientWidth;
      //   rowRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
  };

  console.log({ checkIndex });

  return (
    <div className='group mr-[0px] ml-[0px] mx-[10px] md:mx-[100px] relative border-b border-white/20 pb-[0px] md:pb-[0px] mt-[10px]'>
      <BiSolidChevronLeft
        className={`group-hover:flex absolute hidden top-[0%]  left-[0px] z-40 h-full w-10 cursor-pointer text-white  opacity-100 transition hover:scale-125 group-hover:opacity-100 hover:bg-green-700/60 hover:text-white  bg-primary/70
                    `}
        onClick={() => handleClick("left")}
      />
      <div
        ref={rowRef}
        className='flex items-center w-full space-x-[0px] overflow-x-scroll  scrollbar-hide pr-[20px]  pt-[0px] pb-[0px] mb-[0px]'
        // className='flex items-center w-full space-x-[0px] overflow-x-scroll scrollbar-thin scrollbar-track-primary/10 scrollbar-thumb-primary/50 scrollbar-default pr-[20px]  pt-[0px] pb-[0px] mb-[0px]'
      >
        {StorageData?.map((sd, index) => {
          return (
            <div
              onClick={() => {
                setActiveCont(sd?.active);
                setDuration(1);
                setQuantity(1);

                if (index === checkIndex) {
                  handleClick("");
                } else if (index > checkIndex) {
                  handleClick("right");
                } else {
                  handleClick("left");
                }
                setCheckIndex(index);
              }}
              className={`${
                activeCont === sd?.active
                  ? "bg-white border-t border-r border-l text-primary"
                  : "border-t border-b border-r border-l text-black"
              } flex flex-col items-center justify-center cursor-pointer hover:text-primary bg-primary/5 w-[200px] h-[100px]  border-primary/30 text-center space-y-[5px] px-[20px] py-[20px] shrink-[0]`}
            >
              <p className='font-bold'>{sd?.name1}</p>
              <p className={` font-semibold`}>Storage</p>
            </div>
          );
        })}
      </div>

      <BiSolidChevronRight
        className='absolute top-[0%] right-[0px]  z-40 h-full w-10 cursor-pointer text-white opacity-100 transition hover:scale-125 group-hover:opacity-100 hover:bg-green-700/60 hover:text-white  bg-primary/70'
        onClick={() => handleClick("right")}
      />
    </div>
  );
};

export default Selector;
