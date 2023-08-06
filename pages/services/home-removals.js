import Features from "@/components/HomePage/Features";
import Hero from "@/components/HomePage/Hero";
import HowItWorks from "@/components/HomePage/HowItWorks";
import WhyChooseUs from "@/components/HomePage/WhyChooseUs";
import HomeRemovalsHero from "@/components/HomeRemovals/HomeRemovalsHero";
import WhyHomeRemovals from "@/components/HomeRemovals/WhyHomeRemovals";
import NormalLayout from "@/layouts/NormalLayout";
import Head from "next/head";
import React from "react";

const HomeRemovals = () => {
  return (
    <NormalLayout>
      <Head>
        <title>Removals and Selfstorage - Register</title>
        <meta name="description" content="Rss removal and storage website" />
        <link rel="icon" href="/rrs_favicon.svg" />
      </Head>
      <main className="">
        <HomeRemovalsHero />
        <Features />
        <HowItWorks />
        <WhyHomeRemovals />
      </main>
    </NormalLayout>
  );
};

export default HomeRemovals;
