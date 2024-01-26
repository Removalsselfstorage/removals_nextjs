import Features from "@/components/HomePage/Features";
import Hero from "@/components/HomePage/Hero";
import HowItWorks from "@/components/HomePage/HowItWorks";
import WhyChooseUs from "@/components/HomePage/WhyChooseUs";
import HomeRemovalsHero from "@/components/HomeRemovals/HomeRemovalsHero";
import WhyHomeRemovals from "@/components/HomeRemovals/WhyHomeRemovals";
import NormalLayout from "@/layouts/NormalLayout";
import OurReviews from "@/components/HomePage/OurReviews";
import FAQ from "@/components/ServicesSection/FAQ";
import Head from "next/head";
import React from "react";
import { faqData4 } from "@/dummyData/FaqData";
import About from "@/components/ServicesSection/About";

const Storages = () => {
  return (
    <NormalLayout>
      <Head>
        <title>Removals and Selfstorage - Storage Services</title>
        <meta name='description' content='Rss removal and storage website' />
        <link rel='icon' href='/rrs_favicon.svg' />
      </Head>
      <main className=''>
        <HomeRemovalsHero
          title='Get Secure Storage Solutions'
          subtitle='Safeguarding Your Belongings with Precision and Care - Explore Our Range of Flexible and Reliable Storage Services for Peace of Mind.'
          img='store.jpg'
          link='/storage'
          btnText='Get Storage Quotes'
        />
        <About
          sectionTitle='About Storage & Selfstorage'
          title1='Discover Storage Units That Will Give You The Proper Space You Need'
          img1='/store.jpg'
          sub1a='Uncover the perfect storage solution at Bolt Storage 62 locations across 11 states. Our diverse storage units offer the space you need, with 24/7 access and top-notch video surveillance. From standard to climate-controlled units, we provide reliable and secure options for your belongings. Explore our online rentals now and discover the ideal storage space tailored to your requirements'
          sub1b='This storage space will accommodate the content of a student flat, a single-room move, Ideal for small furniture storage, small Transit Van loads. Small garden shed size, suitable for storing kitchen appliances, single mattresses, chairs and stools.'
          // btn1

          title2='Self storage units you can trust.'
          img2='/store.webp'
          sub2a='Storage units, storage rooms, self storage - however you like to call it - we have 107 conveniently located storage facilities across London and the UK. Not only that, but when it comes to self storage, we pride ourselves on exceptional customer service and incomparable security. Don’t just take our word for it - our storage customers think we do a pretty great job too.'
          sub2b='So, whether you want to rent a self storage room because you’re moving home, going travelling, starting a business or heading to university, we have an amazing range of storage units to suit your needs. Book online now, or come in and have a chat.'
          btnText='Get Instant Quote'
          link='/storage'
          btn2
        />
        <OurReviews />
        <FAQ data={faqData4} />
      </main>
    </NormalLayout>
  );
};

export default Storages;
