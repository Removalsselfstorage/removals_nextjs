import NormalLayout from "@/layouts/NormalLayout";
import React, { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { BsFillPlayFill } from "react-icons/bs";
import Modal from "@/components/Modal/Modal";
import FAQ from "@/components/HomePage/FAQ";
import OurReviews from "@/components/HomePage/OurReviews";
import OurReviews2 from "@/components/HomePage/OurReviews/OurReviews2";

const Reviews = () => {
  return (
    <>
      <Head>
        <title>Reviews - Removals and Selfstorage</title>
        <meta name='description' content='Rss removal and storage website' />
        <link rel='icon' href='/rrs_favicon.svg' />
      </Head>
      <NormalLayout>
        <div className='bg-base-200 mt-[50px]  md:mt-[0px] md:pt-[70px] lg:pt-[100px]'>
          <OurReviews2 />
        </div>
      </NormalLayout>
    </>
  );
};

export default Reviews;
