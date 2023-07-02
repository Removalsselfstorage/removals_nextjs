import { titleFont } from '@/utils/fonts';
import React, { useEffect, useState } from 'react';
import { CgChevronRight, CgChevronLeft } from 'react-icons/cg';
import ReviewCard from './ReviewCard';
import { reviews } from '@/dummyData/dummyData';

const OurReviews = () => {
  //   const [review, setReview] = useState(reviews);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const lastIndex = reviews.length - 1;
    if (index < 0) {
      setIndex(lastIndex);
    }
    if (index > lastIndex) {
      setIndex(0);
    }
  }, [index, reviews]);

  useEffect(() => {
    let slider = setInterval(() => {
      setIndex(index + 1);
    }, 5000);
    return () => {
      clearInterval(slider);
    };
  }, [index]);

  const handlePrev = () => {
    setCurrentReview(
      (prevReview) => (prevReview - 1 + reviews.length) % reviews.length
    );
  };

  const handleNext = () => {
    setCurrentReview((prevReview) => (prevReview + 1) % reviews.length);
  };

  return (
    <div className="mb-[50px]">
      <div className="md:max-w-7xl mx-auto">
        {/* Title */}
        <div className="w-full flex justify-center py-[50px]">
          {/* <h3 className="text-4xl font-extrabold">Our Services</h3> */}
          <h3
            className={`${titleFont.variable} font-sans2 text-3xl lg:text-4xl font-extrabold flex-col items-center justify-center`}
          >
            <p className="">Customers Reviews</p>{' '}
            <div className="w-full bg-primary/20 h-[20px] mt-[-12px] "></div>
          </h3>
        </div>

        {/* reviews */}
        <div className="h-[500px] lg:h-[600px] overflow-auto scrollbar-thin scrollbar-track-gray-200 scrollbar-thumb-primary scrollbar-default rounded-[30px] bg-primary/10  px-[20px] py-[10px]">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 justify-center">
            {reviews.map((review, index) => {
              return (
                <div className="py-[10px]" key={review.id}>
                  <ReviewCard
                    name={review.name}
                    location={review.location}
                    date={review.date}
                    rating={review.rating}
                    comment={review.comment}
                  />
                </div>
              );
            })}
            {/* <button
              className="left-0 absolute top-[200px] translate-y-[-50%] bg-[#3b3b3b] text-white w-[40px] h-[40px] grid cursor-pointer rounded-[50%] place-items-center ml-[5px] hover:bg-[#1e1e1e] duration-300 hover:translate-x-[-5px]"
              onClick={() => setIndex(index - 1)}
            >
              <CgChevronLeft className="xs:text-[20px]" />
            </button>
            <button
              className="right-0 absolute top-[200px] translate-y-[-50%] bg-[#3b3b3b] text-white w-[40px] h-[40px] grid cursor-pointer rounded-[50%] place-items-center hover:bg-[#1e1e1e] duration-300 mr-[5px] hover:translate-x-[5px]"
              onClick={() => setIndex(index + 1)}
            >
              <CgChevronRight className="xs:text-[20px]" />
            </button> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OurReviews;
