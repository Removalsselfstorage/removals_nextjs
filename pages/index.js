import Image from 'next/image';
import Head from 'next/head';
import { titleFont } from '@/utils/fonts';
import Hero from '@/components/HomePage/Hero';
import OurServices from '@/components/HomePage/OurServices';
import WhyChooseUs from '@/components/HomePage/WhyChooseUs';
import AboutUs from '@/components/HomePage/AboutUs';

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
        <OurServices />
        <WhyChooseUs />
        <AboutUs />
      </main>
    </>
  );
}
