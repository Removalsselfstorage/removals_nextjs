import React from "react";

const RatingCircles = ({ reviewCount, setReviewCount }) => {
  return (
    <div className='grid grid-cols-6 sm:grid-cols-8 md:grid-cols-11 gap-x-[5px] gap-y-[15px] w-[400px] md:w-[500px]'>
      {/* <div
        onClick={() => {
          setReviewCount(0);
        }}
        className={`${
          reviewCount === 0 && "bg-secondary"
        } flex justify-center items-center group hover:bg-secondary duration-100 hover:text-white rounded-full h-[40px] w-[40px] cursor-pointer border-[2px] border-secondary p-[5px]`}
      >
        <p
          className={`${
            reviewCount === 0 && "text-white"
          } text-[14px] text-secondary font-bold group-hover:text-white duration-100`}
        >
          0
        </p>
      </div> */}
      {/* <div
        onClick={() => {
          setReviewCount(0.5);
        }}
        className={`${
          reviewCount === 0.5 && "bg-secondary"
        } flex justify-center items-center group hover:bg-secondary duration-100 hover:text-white rounded-full h-[40px] w-[40px] cursor-pointer border-[2px] border-secondary p-[5px]`}
      >
        <p
          className={`${
            reviewCount === 0.5 && "text-white"
          } text-[14px] text-secondary font-bold group-hover:text-white duration-100`}
        >
          0.5
        </p>
      </div> */}
      <div
        onClick={() => {
          setReviewCount(1);
        }}
        className={`${
          reviewCount === 1 && "bg-secondary"
        } flex justify-center items-center group hover:bg-secondary duration-100 hover:text-white rounded-full h-[40px] w-[40px] cursor-pointer border-[2px] border-secondary p-[5px]`}
      >
        <p
          className={`${
            reviewCount === 1 && "text-white"
          } text-[14px] text-secondary font-bold group-hover:text-white duration-100`}
        >
          1
        </p>
      </div>
      <div
        onClick={() => {
          setReviewCount(1.5);
        }}
        className={`${
          reviewCount === 1.5 && "bg-secondary"
        } flex justify-center items-center group hover:bg-secondary duration-100 hover:text-white rounded-full h-[40px] w-[40px] cursor-pointer border-[2px] border-secondary p-[5px]`}
      >
        <p
          className={`${
            reviewCount === 1.5 && "text-white"
          } text-[14px] text-secondary font-bold group-hover:text-white duration-100`}
        >
          1.5
        </p>
      </div>
      <div
        onClick={() => {
          setReviewCount(2);
        }}
        className={`${
          reviewCount === 2 && "bg-secondary"
        } flex justify-center items-center group hover:bg-secondary duration-100 hover:text-white rounded-full h-[40px] w-[40px] cursor-pointer border-[2px] border-secondary p-[5px]`}
      >
        <p
          className={`${
            reviewCount === 2 && "text-white"
          } text-[14px] text-secondary font-bold group-hover:text-white duration-100`}
        >
          2
        </p>
      </div>
      <div
        onClick={() => {
          setReviewCount(2.5);
        }}
        className={`${
          reviewCount === 2.5 && "bg-secondary"
        } flex justify-center items-center group hover:bg-secondary duration-100 hover:text-white rounded-full h-[40px] w-[40px] cursor-pointer border-[2px] border-secondary p-[5px]`}
      >
        <p
          className={`${
            reviewCount === 2.5 && "text-white"
          } text-[14px] text-secondary font-bold group-hover:text-white duration-100`}
        >
          2.5
        </p>
      </div>
      <div
        onClick={() => {
          setReviewCount(3);
        }}
        className={`${
          reviewCount === 3 && "bg-secondary"
        } flex justify-center items-center group hover:bg-secondary duration-100 hover:text-white rounded-full h-[40px] w-[40px] cursor-pointer border-[2px] border-secondary p-[5px]`}
      >
        <p
          className={`${
            reviewCount === 3 && "text-white"
          } text-[14px] text-secondary font-bold group-hover:text-white duration-100`}
        >
          3
        </p>
      </div>
      <div
        onClick={() => {
          setReviewCount(3.5);
        }}
        className={`${
          reviewCount === 3.5 && "bg-secondary"
        } flex justify-center items-center group hover:bg-secondary duration-100 hover:text-white rounded-full h-[40px] w-[40px] cursor-pointer border-[2px] border-secondary p-[5px]`}
      >
        <p
          className={`${
            reviewCount === 3.5 && "text-white"
          } text-[14px] text-secondary font-bold group-hover:text-white duration-100`}
        >
          3.5
        </p>
      </div>
      <div
        onClick={() => {
          setReviewCount(4);
        }}
        className={`${
          reviewCount === 4 && "bg-secondary"
        } flex justify-center items-center group hover:bg-secondary duration-100 hover:text-white rounded-full h-[40px] w-[40px] cursor-pointer border-[2px] border-secondary p-[5px]`}
      >
        <p
          className={`${
            reviewCount === 4 && "text-white"
          } text-[14px] text-secondary font-bold group-hover:text-white duration-100`}
        >
          4
        </p>
      </div>
      <div
        onClick={() => {
          setReviewCount(4.5);
        }}
        className={`${
          reviewCount === 4.5 && "bg-secondary"
        } flex justify-center items-center group hover:bg-secondary duration-100 hover:text-white rounded-full h-[40px] w-[40px] cursor-pointer border-[2px] border-secondary p-[5px]`}
      >
        <p
          className={`${
            reviewCount === 4.5 && "text-white"
          } text-[14px] text-secondary font-bold group-hover:text-white duration-100`}
        >
          4.5
        </p>
      </div>
      <div
        onClick={() => {
          setReviewCount(5);
        }}
        className={`${
          reviewCount === 5 && "bg-secondary"
        } flex justify-center items-center group hover:bg-secondary duration-100 hover:text-white rounded-full h-[40px] w-[40px] cursor-pointer border-[2px] border-secondary p-[5px]`}
      >
        <p
          className={`${
            reviewCount === 5 && "text-white"
          } text-[14px] text-secondary font-bold group-hover:text-white duration-100`}
        >
          5
        </p>
      </div>
    </div>
  );
};

export default RatingCircles;
