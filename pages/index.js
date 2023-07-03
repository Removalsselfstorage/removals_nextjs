import Image from 'next/image';
import Head from 'next/head';
import { titleFont } from '@/utils/fonts';
import Hero from '@/components/HomePage/Hero';
import OurServices from '@/components/HomePage/OurServices';
import WhyChooseUs from '@/components/HomePage/WhyChooseUs';
import AboutUs from '@/components/HomePage/AboutUs';
import OurReviews from '@/components/HomePage/OurReviews';
import FAQ from '@/components/HomePage/FAQ';
import FeaturedCompanies from '@/components/HomePage/FeatureCompanies';
import InputSearch from '@/components/InputSearch';
import Features from '@/components/HomePage/Features';
import HowItWorks from '@/components/HomePage/HowItWorks';

export default function Home() {
  return (
    <>
      <Head>
        <title>
          Removals and Selfstorage - Book Movers & Moving Help Online
        </title>
        <meta name="description" content="Rss removal and storage website" />
        <link rel="icon" href="/rrs_favicon.svg" />
      </Head>

      <main className="">
        <Hero />
        <Features />
        <OurServices />
        <HowItWorks />
        <WhyChooseUs />
        <AboutUs />
        <OurReviews />
        <FeaturedCompanies />
        <FAQ />
      </main>
    </>
  );
}
