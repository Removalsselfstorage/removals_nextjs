import FormikContainer from "@/components/Formik/FormikContainer";
import ReviewCard from "@/components/HomePage/OurReviews/ReviewCard";
import ReviewCard3 from "@/components/HomePage/OurReviews/ReviewCard3";
import StarRating from "@/components/Rating/EditHalfStars2";
import { reviews } from "@/dummyData/dummyData";
import MoverLayout from "@/layouts/MoverLayout";
import NormalLayout from "@/layouts/NormalLayout";
import { getAllUserDetails } from "@/store/userSlice";
import Head from "next/head";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { BiLogOut } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { useSelector } from "react-redux";

const Reviews = () => {
  const router = useRouter();
  const userDetails = useSelector(getAllUserDetails);

  return (
    <MoverLayout>
      <Head>
        <title>Mover Profile - Reviews</title>
        <meta name='description' content='Rss removal and storage website' />
        <link rel='icon' href='/rrs_favicon.svg' />
      </Head>

      <main>
        <div className='bg-white/90 py-[50px] pb-[0px] px-[30px] min-h-[100vh]'>
          <section className='mb-[30px]  px-[0px] '>
            <div className='flex flex-col'>
              <p className='font-bold text-[25px] mb-[0px]'>Reviews</p>
              <p className=''>
                Get updated with the reviews from clients who completed moves
                with you.
              </p>
            </div>
          </section>

          <div className='mt-[10px] mb-[20px] flex flex-col items-center text-gray-600 text-center'>
            <div className='flex items-center space-x-[10px]'>
              <p className='text-[24px] font-semibold pt-[3px] text-primary'>Excellent</p>
              <StarRating rating={4.9} size='text-[18px]' />
            </div>
            <p className='px-[50px] text-[16px] lg:text-[18px] leading-[22px]'>
              <span className='text-[18px] mr-[5px] italic'>"</span>Rated 4.8
              out of 5 based on 7,203 reviews
              <span className='text-[20px] ml-[0px] italic'>"</span>
            </p>
            {/* <img src="/svg/trustpilot.svg" alt="" className='h-[25px] w-fit'/> */}
          </div>

          {/* reviews */}
          <div className='h-[500px] lg:h-[600px] overflow-auto scrollbar-thin scrollbar-track-gray-200 scrollbar-thumb-primary scrollbar-default rounded-[30px] bg-primary/10  px-[20px] py-[10px] mx-[10px] md:mx-[30px] xl:mx-[0px]'>
            <div className='grid lg:grid-cols-2 gap-[20px] xl:grid-cols-2 [1550px]:grid-cols-3 justify-center'>
              {reviews.map((review, index) => {
                return (
                  <div className='py-[0px]' key={review.id}>
                    <ReviewCard3
                      name={review.name}
                      location={review.location}
                      date={review.date}
                      rating={review.rating}
                      comment={review.comment}
                    />
                  </div>
                );
              })}
            </div>
          </div>

          <div className='pb-[50px] pt-[20px] h-full'></div>
        </div>
      </main>
    </MoverLayout>
  );
};

export default Reviews;
