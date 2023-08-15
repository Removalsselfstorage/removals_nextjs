import StarRating from "@/components/Rating/EditHalfStars2";
import FullRating from "@/components/Rating/FullRating";
import { truncateTexts } from "@/utils/truncateText";
import React, { useState } from "react";

const ReviewCard2 = ({ name, location, date, rating, comment }) => {
  function spliceFirstLetter(sentence) {
    if (sentence.length === 0) {
      return sentence;
    }

    const words = sentence.split(" ");

    const firstWord = words[0].split("");

    return firstWord[0];
  }

  const [isExpanded, setIsExpanded] = useState(false);
  return (
    <div className="card w-full bg-base-500  flex flex-col px-[20px] py-[20px] border-b">
      <div className="   flex items-center w-full space-x-[10px]">
        {/* <div className="bg-primary rounded-full h-[50px] w-[50px] grid place-items-center text-white font-semibold text-[20px]">
          {spliceFirstLetter(name)}
        </div> */}
        <div className="flex flex-col">
          <p className="font-semibold">
            {name}, ({location})
          </p>
          <p className="text-[14px] text-gray-500">{date}</p>
        </div>
      </div>
      <div className="my-[10px]">
        <StarRating rating={rating} size="text-[18px]" />
      </div>
      <div className="">
        <p className={`${isExpanded ? "" : "line-clamp-2"} text-[15px] `}>
          {comment}{" "}
          <span
            className="text-secondary hover:underline text-[15px] font-semibold cursor-pointer"
            onClick={() => {
              setIsExpanded(!isExpanded);
            }}
          >
            {isExpanded ? "Read less" : "Read more"}
          </span>
        </p>
        <span
                className={`${
                  isExpanded ? "hidden" : "flex"
                } text-secondary hover:underline text-[15px] font-semibold cursor-pointer`}
                onClick={() => {
                  setIsExpanded(!isExpanded);
                }}
              >
                {isExpanded ? "Read less" : "Read more"}
              </span>
      </div>
    </div>
  );
};

export default ReviewCard2;
