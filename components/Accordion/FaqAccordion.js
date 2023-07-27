import React, { useState } from 'react';
import { IoMdAddCircleOutline, IoMdRemoveCircleOutline } from 'react-icons/io';
function FaqAccordion({ items, openFirst, titleStyle, childrenStyle }) {
  const [activeIndex, setActiveIndex] = useState(openFirst ? 0 : null);

  const onTitleClick = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  return (
    <div className="w-full">
      {items.map((item, index) => (
        <div key={index} className="mb-[0px]">
          {/* accordion title */}
          <div
            type="button"
            onClick={() => onTitleClick(index)}
            className={`${
              activeIndex === index ? 'bg-primary/10 rounded-[20px]' : ''
            } flex justify-between border-b-[2.2px] cursor-pointer  ${titleStyle} `}
          >
            <p className={`font-bold text-[16px] lg:text-[20px] pr-[20px]`}>{item.question}</p>
            <div
              className={` ${
                activeIndex === index
                  ? 'flex justify-center items-center'
                  : 'bg-primary-dark  flex justify-center items-center'
              }  rounded-full`}
            >
              {activeIndex === index ? (
                <IoMdRemoveCircleOutline  className='text-secondary text-[30px]'/>
              ) : (
                <IoMdAddCircleOutline className='text-primary text-[30px]'/>
              )}
            </div>
          </div>
          {/* accordion content */}
          {index === activeIndex && (
            // child
            <div className="">
              <p
                className={`${
                  activeIndex === index ? 'flex  ' : 'hidden'
                } items-center justify-between  cursor-pointer lg:text-[17px] ${childrenStyle}`}
              >
                {item.answer}
              </p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default FaqAccordion;
