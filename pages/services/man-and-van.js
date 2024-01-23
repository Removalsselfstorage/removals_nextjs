import Features from "@/components/HomePage/Features";
import FeaturedCompanies from "@/components/HomePage/FeatureCompanies";
import Hero from "@/components/HomePage/Hero";
import HowItWorks from "@/components/HomePage/HowItWorks";
import OurReviews from "@/components/HomePage/OurReviews";
import WhyChooseUs from "@/components/HomePage/WhyChooseUs";
import HomeRemovalsHero from "@/components/HomeRemovals/HomeRemovalsHero";
import WhyHomeRemovals from "@/components/HomeRemovals/WhyHomeRemovals";
import About from "@/components/ServicesSection/About";
import NormalLayout from "@/layouts/NormalLayout";
import FAQ from "@/components/ServicesSection/FAQ";
import Head from "next/head";
import React from "react";
import { faqData3 } from "@/dummyData/FaqData";

const ManVan = () => {
  return (
    <NormalLayout>
      <Head>
        <title>Removals and Selfstorage - Man and Van Services</title>
        <meta name='description' content='Rss removal and storage website' />
        <link rel='icon' href='/rrs_favicon.svg' />
      </Head>
      <main className=''>
        <HomeRemovalsHero
          title='Nearby Man and Van Service'
          subtitle="Your Immediate Moving Solution - We're Here Around the Corner, Ready to Make Your Relocation a Breeze!"
          img='manvan.jpg'
          link='/book/man-and-van'
          btnText='Man & van Quotes'
        />
        {/* <HomeRemovalsHero title="Man and van" img="manvan.jpg" /> */}
        <Features />
        <HowItWorks />
        <About
          sectionTitle='About Man & Van'
          title1='Get moving with instant man and van quotes'
          img1='/manvan2.jpg'
          sub1a='Whenever you need a hand with a house move, e.g. transporting furniture and your precious belongings, we strive to make the task of moving as easy and cost-effective as possible with our local man with a van for hire services. With Removal & Selfstorage, you can receive instant man and van prices along with free basic compensation cover and an industry professional to oversee the job from start to finish. No matter what you need to move, our transport partners will have precisely what they need to get the job done.'
          sub1b='This includes materials to pack, secure and protect your items, as well as tools that may be needed to disassemble and reassemble certain items to help them fit through narrow spaces. Regardless of what you need from Removal & Selfstorage, you can be sure you’re getting the best service at a competitive price; we routinely save money for customers by making use of the empty space in our vans as they travel along their existing routes.'
          title2='Man and van transport operations across UK'
          img2='/manvan1.jpg'
          sub2a='Removal & Selfstorage’s man and a van removal services span the entire continent. If you’re looking for great prices for a job going to or from any part of the UK or Europe, don’t hesitate to get in touch.'
          sub2b='Our experienced transport partners are ready to help you with your cheap man with a van needs today. Contact us for a free man with a van quote now for prices starting from only £26.'
          btnText='Get Instant Quote'
          link='/book/man-and-van'
          btn2
        />
        <OurReviews />
        <FeaturedCompanies />
        <FAQ data={faqData3} />
      </main>
    </NormalLayout>
  );
};

export default ManVan;
