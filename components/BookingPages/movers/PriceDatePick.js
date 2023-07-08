import React, { useRef, useState } from 'react';
import { BiSolidChevronLeft, BiSolidChevronRight } from 'react-icons/bi';

const allDatePrice = [
  { id: 'Thu, sept 7', date: 'Thu, sept 7', price: '456.68' },
  { id: 'Fri, sept 8', date: 'Fri, sept 8', price: '454.63' },
  { id: 'Sat, sept 9', date: 'Sat, sept 9', price: '452.18' },
  { id: 'Sun, sept 10', date: 'Sun, sept 10', price: '456.22' },
  { id: 'Mon, sept 11', date: 'Mon, sept 11', price: '450.38' },
  { id: 'Tue, sept 12', date: 'Tue, sept 12', price: '450.07' },
  { id: 'Wed, sept 13', date: 'Wed, sept 13', price: '448.88' },
  { id: 'Thu, sept 14', date: 'Thu, sept 14', price: '447.74' },
  { id: 'Fri, sept 15', date: 'Fri, sept 15', price: '446.46' },
  { id: 'Sat, sept 16', date: 'Sat, sept 16', price: '443.68' },
  { id: 'Sun, sept 17', date: 'Sun, sept 17', price: '451.63' },
];

const PriceDatePick = () => {
  const rowRef = useRef(null);
  const [isMoved, setIsMoved] = useState(false);
  const [selectedPrice, setSelectedPrice] = useState(null);

  const handleClick = (direction) => {
    setIsMoved(true);
    if (rowRef.current) {
      const { scrollLeft, clientWidth } = rowRef.current;

      const scrollTo =
        direction === 'left'
          ? scrollLeft - clientWidth
          : scrollLeft + clientWidth;
      rowRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };
  return (
    <div className="group mr-[20px] ml-[5px] relative border-b border-white/20 pb-[0px]  md:pb-[0px] mt-[10px] ">
      <BiSolidChevronLeft
        className={`absolute top-[28%] left-[0px] z-40 h-10 w-10 cursor-pointer text-white  opacity-100 transition hover:scale-125 group-hover:opacity-100 hover:bg-green-700/60 hover:text-white rounded-full bg-primary/70
                    ${!isMoved && 'hidden'}
                    `}
        onClick={() => handleClick('left')}
      />
      <div
        className="flex items-center space-x-[10px] overflow-x-scroll scrollbar-hide px-[20px]  py-[20px]"
        ref={rowRef}
      >
        {allDatePrice.map((pr, index) => {
          let isActive = pr.id == selectedPrice;
          return (
            <div key={index}>
              <div
                onClick={() => setSelectedPrice(pr.id)}
                className={`${
                  isActive
                    ? 'border-secondary text-secondary'
                    : 'text-primary hover:border-secondary border-primary'
                } flex flex-col py-[10px] md:py-[15px] px-[10px] md:px-[15px] hover:cursor-pointer rounded-[20px] items-center justify-center border-[2px] group hover:scale-[1.07] duration-150 transition-transform`}
              >
                <p className="font-semibold text-[14px] md:text-[15px]  whitespace-nowrap duration-150">
                  {pr.date}
                </p>
                <p className="font-bold text-[20px] md:text-[22px] whitespace-nowrap">
                  ₤ {pr.price}
                </p>
              </div>
            </div>
          );
        })}
      </div>
      <BiSolidChevronRight
        className="absolute top-[28%] right-[-10px]  z-40 h-10 w-10 cursor-pointer text-white opacity-100 transition hover:scale-125 group-hover:opacity-100 hover:bg-green-700/60 hover:text-white rounded-full bg-primary/70"
        onClick={() => handleClick('right')}
      />
    </div>
  );
};

export default PriceDatePick;
