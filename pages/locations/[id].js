import React from "react";
import NormalLayout from "@/layouts/NormalLayout";
import Head from "next/head";
import LocationHero from "@/components/Locations/Hero";
import Features2 from "@/components/Locations/Features";
import OurServices from "@/components/HomePage/OurServices";
import HowItWorks from "@/components/HomePage/HowItWorks";
import WhyChooseUs from "@/components/HomePage/WhyChooseUs";
import AboutUs from "@/components/HomePage/AboutUs";
import OurReviews from "@/components/HomePage/OurReviews";
import FeaturedCompanies from "@/components/HomePage/FeatureCompanies";
import FAQ from "@/components/HomePage/FAQ";

const Locate = ({ url }) => {
  function formatAndSeparateString(inputString) {
    // Separate the string into individual words based on "_"
    const words = inputString.split("_");

    // Convert each word to sentence case and replace "-" with a space
    const formattedCity = words[0]
      .replace(/-/g, " ")
      .replace(/\b\w/g, (c) => c.toUpperCase());
    const formattedSub =
      words[1] &&
      words[1].replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

    // Create and return an object with "city" and "sub" keys
    const resultObject = {
      city: formattedCity,
      sub: formattedSub,
    };

    return resultObject;
  }

  const formattedCity = formatAndSeparateString(url);

  return (
    <>
      <Head>
        <title>{url} - Removals and Selfstorage Location</title>
        <meta name='description' content='Rss removal and storage website' />
        <link rel='icon' href='/rrs_favicon.svg' />
      </Head>
      <NormalLayout>
        <div className='w-full  border-t-[2px]   border-black mt-[100px]  md:mt-[70px] lg:mt-[100px]'></div>
        <LocationHero formattedCity={formattedCity} />

        <Features2 formattedCity={formattedCity} />
        <OurServices />
        <HowItWorks />
        <WhyChooseUs />
        <AboutUs />
        <OurReviews />
        <FeaturedCompanies />
        <FAQ />
      </NormalLayout>
    </>
  );
};

export default Locate;

export async function getServerSideProps(context) {
  const { id } = context.params; // Access the UID from the URL

  // console.log({ progressData });

  return {
    props: {
      // userData,
      url: id,
    },
  };
}
