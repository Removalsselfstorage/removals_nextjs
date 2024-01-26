import BecomeMover from "@/components/HomePage/BecomeMover";
import FeaturedCompanies from "@/components/HomePage/FeatureCompanies";
import Features from "@/components/HomePage/Features";
import Hero from "@/components/HomePage/Hero";
import HowItWorks from "@/components/HomePage/HowItWorks";
import OurReviews from "@/components/HomePage/OurReviews";
import WhyChooseUs from "@/components/HomePage/WhyChooseUs";
import HomeRemovalsHero from "@/components/HomeRemovals/HomeRemovalsHero";
import WhyHomeRemovals from "@/components/HomeRemovals/WhyHomeRemovals";
import About from "@/components/ServicesSection/About";
import FAQ from "@/components/ServicesSection/FAQ";
import { faqData2 } from "@/dummyData/FaqData";
import NormalLayout from "@/layouts/NormalLayout";
import Head from "next/head";
import React from "react";

const HomeRemovals = () => {
  return (
    <NormalLayout>
      <Head>
        <title>Removals and Selfstorage - Home Removals Services</title>
        <meta name='description' content='Rss removal and storage website' />
        <link rel='icon' href='/rrs_favicon.svg' />
      </Head>
      <main className=''>
        <HomeRemovalsHero
          title='Get A Home Removals Quote'
          subtitle='Streamlining Your Move with Expertise and Care - Experience Seamless Home Removals Tailored Just for You!'
          img='hero_homeremovals.jpg'
          link='/book/home-removals'
          btnText='Book Home Removals'
        />
        <Features />
        <HowItWorks />
        {/* <WhyHomeRemovals /> */}
        <About
          sectionTitle='About Home Removals'
          title1='Affordable house moves'
          img1="/houseremovalsfamily.jpg"
         
          sub1a='We offer extremely competitive pricing so you can get to moving a house immediately and not have to worry. At the same time, you can book your house move weeks in advance; whatever and wherever you’re moving, we strive to make the operation easy and convenient.'
          sub1b='On the day of your home move, your requirements will be taken care of by a team with lifting equipment, protective clothing and packing materials to move your goods safely. This equipment extends to the kind of tools that may be needed if you require assembly, packing, storage and disassembly. No matter the size of property you are moving out of or into, our house moving companies know the perfect way to pack your belongings into their vans safely and efficiently. Their experience removes the need for both return trips and the risk of any potential breakages.'
          title2='House moves across UK'
          img2="/removals2.png"
          sub2a="Removal & Selfstorage provides home removal services across the entire continent. If you are looking for cost-effective house removal services for moving to or from anywhere in the UK or Europe, please don't hesitate to contact us."
          sub2b='Our Removal Partners are capable of helping you with transportation, packing, assembly, and disassembly. Get a free house moving quote from us now, with affordable prices.'
          btnText="Get Instant Quote"
          link='/book/home-removals'
          btn2
        />
        <OurReviews />
        <FeaturedCompanies />
        <BecomeMover />
        <FAQ data={faqData2}/>
      </main>
    </NormalLayout>
  );
};

export default HomeRemovals;
