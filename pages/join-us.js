import Hero from "@/components/HomePage/Hero";
import HowItWorks from "@/components/HomePage/HowItWorks";
import JoinUsFAQ from "@/components/JoinUs/FAQ";
import JoinUsHero from "@/components/JoinUs/Hero2";
import MoverFeatures from "@/components/JoinUs/MoverFeatures";
import NormalLayout from "@/layouts/NormalLayout";
import Head from "next/head";
import React from "react";

const JoinUs = () => {
  return (
    <NormalLayout>
      <Head>
        <title>Removals and Selfstorage - Register</title>
        <meta name="description" content="Rss removal and storage website" />
        <link rel="icon" href="/rrs_favicon.svg" />
      </Head>

      <main>
        <JoinUsHero />
        <MoverFeatures />
        <JoinUsFAQ/>
      </main>
    </NormalLayout>
  );
};

export default JoinUs;
