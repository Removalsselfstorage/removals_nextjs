import Features from "@/components/HomePage/Features";
import Hero from "@/components/HomePage/Hero";
import HowItWorks from "@/components/HomePage/HowItWorks";
import WhyChooseUs from "@/components/HomePage/WhyChooseUs";
import HomeRemovalsHero from "@/components/HomeRemovals/HomeRemovalsHero";
import WhyHomeRemovals from "@/components/HomeRemovals/WhyHomeRemovals";
import OurReviews from "@/components/HomePage/OurReviews";
import FAQ from "@/components/ServicesSection/FAQ";
import { faqData4 } from "@/dummyData/FaqData";
import NormalLayout from "@/layouts/NormalLayout";
import Head from "next/head";
import React from "react";

const HandPacking = () => {
  return (
    <NormalLayout>
      <Head>
        <title>Removals and Selfstorage - Handy Man Packing Services</title>
        <meta name='description' content='Rss removal and storage website' />
        <link rel='icon' href='/rrs_favicon.svg' />
      </Head>
      <main className=''>
      <HomeRemovalsHero
          title='Effortless Packing Solutions'
          subtitle='Leave the Details to Us - Our Expert Handymen Ensure Your Belongings Are Packed Safely and Efficiently, Making Your Move Stress-Free.'
          img='handman.jpg'
          link='/hand-packing'
          btnText='Get Packing Quotes'
        />
        {/* <HomeRemovalsHero title='Handy Man / Packing' img='handman.jpg' /> */}
        <OurReviews />
        <FAQ data={faqData4} />
      </main>
    </NormalLayout>
  );
};

export default HandPacking;
