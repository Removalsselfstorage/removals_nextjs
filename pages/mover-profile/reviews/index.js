import FormikContainer from "@/components/Formik/FormikContainer";
import ReviewCard from "@/components/HomePage/OurReviews/ReviewCard";
import ReviewCard3 from "@/components/HomePage/OurReviews/ReviewCard3";
import StarRating from "@/components/Rating/EditHalfStars2";
// import { reviews } from "@/dummyData/dummyData";
import { db } from "@/firebase";
import useMover from "@/hooks/useMover";
import useMoversData from "@/hooks/useMoversData";
import MoverLayout from "@/layouts/MoverLayout";
import NormalLayout from "@/layouts/NormalLayout";
import { getAllUserDetails } from "@/store/userSlice";
import { calculateAverageRating, calculateAverageRating2, convertDateFormatNoTime, getRatingGrade } from "@/utils/logics";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import Head from "next/head";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { BiLogOut } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { useSelector } from "react-redux";

const Reviews = () => {
  const {
    allMoversData,
    allMoversDataLoading,
    refetchAllMoversData,
    singleMoversData,
    singleMoversDataLoading,
    refetchSingleMoversData,
    portFolioPix,
    uid,
    router,
  } = useMoversData();

  // const router = useRouter();
  const userDetails = useSelector(getAllUserDetails);
  const { personalMoverDetails, companyDetails } = useMover();
  const [reviews2, setReviews2] = useState([]);

 

  const reviewRef = collection(db, "bookingData");

  useEffect(() => {
    // const queryMessages = query(reviewRef);
    const queryMessages = query(
      reviewRef,
      where("moverName", "==", personalMoverDetails?.generatedName)
      // orderBy("createdAt", "asc")
    );
    const unsubscribe = onSnapshot(queryMessages, (snapshot) => {
      let rev = [];
      snapshot.forEach((doc) => {
        rev.push({ ...doc.data(), id: doc.id });
      });
      // const completedMb = rev?.filter((bc) => bc.completedBook === true);
      const reviewedM = rev?.filter((bc) => bc.reviewDetails != undefined);
      // const completedMb = rev?.filter((bc) => bc.moveCarriedOut === true);
      setReviews2(reviewedM);
      // console.log({ reviewedM, personalMoverDetails, reviews2 });
    });

    return () => unsubscribe();
  }, []);

  const reviewAverage = calculateAverageRating2(reviews2) ?? 0;

  const reviewGrade = reviewAverage ? getRatingGrade(reviewAverage) : "Good";

  // console.log({ singleMoversData// });
  console.log({ singleMoversData });

  return (
    <MoverLayout>
      <Head>
        <title>Mover Profile - Reviews</title>
        <meta name='description' content='Rss removal and storage website' />
        <link rel='icon' href='/rrs_favicon.svg' />
      </Head>

      {!singleMoversDataLoading && (
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
                <p className='text-[24px] font-semibold pt-[3px] text-primary'>
                  {reviewGrade}
                </p>
                <StarRating rating={reviewAverage} size='text-[18px]' />
              </div>
              <p className='px-[50px] text-[16px] lg:text-[18px] leading-[22px]'>
                <span className='text-[18px] mr-[5px] italic'>"</span>Rated{" "}
                {reviewAverage.toFixed(1)} out of 5 based on {reviews2?.length}{" "}
                review(s)
                <span className='text-[20px] ml-[0px] italic'>"</span>
              </p>
              {/* <img src="/svg/trustpilot.svg" alt="" className='h-[25px] w-fit'/> */}
            </div>

            {/* reviews */}
            <div className='h-[500px] lg:h-[600px] overflow-auto scrollbar-thin scrollbar-track-gray-200 scrollbar-thumb-primary scrollbar-default rounded-[30px] bg-primary/10  px-[20px] py-[10px] mx-[10px] md:mx-[30px] xl:mx-[0px]'>
              <div className='grid lg:grid-cols-2 gap-[20px] xl:grid-cols-2 [1550px]:grid-cols-3 justify-center'>
                {reviews2.map((review, index) => {
                  return (
                    <div className='py-[0px]' key={review.id}>
                      <ReviewCard3
                        name={review?.reviewDetails?.name}
                        location={review?.reviewDetails?.address1}
                        date={convertDateFormatNoTime(
                          review?.reviewDetails?.date
                        )}
                        rating={review?.reviewDetails?.rating}
                        comment={review?.reviewDetails?.review}
                      />
                    </div>
                  );
                })}
              </div>
            </div>

            <div className='pb-[50px] pt-[20px] h-full'></div>
          </div>
        </main>
      )}

      {singleMoversDataLoading && (
        <div className='flex justify-center items-center w-full h-screen'>
          <span className='loading loading-spinner loading-lg text-primary'></span>
        </div>
      )}
    </MoverLayout>
  );
};

export default Reviews;
