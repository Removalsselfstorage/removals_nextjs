import Image from "next/image";
import Head from "next/head";
import { titleFont } from "@/utils/fonts";
import Hero from "@/components/HomePage/Hero";
import OurServices from "@/components/HomePage/OurServices";
import WhyChooseUs from "@/components/HomePage/WhyChooseUs";
import AboutUs from "@/components/HomePage/AboutUs";
import OurReviews from "@/components/HomePage/OurReviews";
import FAQ from "@/components/HomePage/FAQ";
import FeaturedCompanies from "@/components/HomePage/FeatureCompanies";
import InputSearch from "@/components/Inputs/InputSearch";
import Features from "@/components/HomePage/Features";
import HowItWorks from "@/components/HomePage/HowItWorks";
import NormalLayout from "@/layouts/NormalLayout";
import { getAllUserDetails } from "@/store/userSlice";
import { useDispatch, useSelector } from "react-redux";
import MuiModal from "@/components/Modal/MuiModal";
import { useState } from "react";
import { getAllMoverDetails } from "@/store/moverSlice";

export default function Home() {

  const dispatch = useDispatch();

  const users = useSelector(getAllUserDetails);
  const moverDetails = useSelector(getAllMoverDetails);


  const [open, setOpen] = useState(false);

  return (
    <NormalLayout>
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
        {/* <MuiModal open={open} setOpen={setOpen}>
          <p className="text-2xl font-bold text-black">Hello World</p>
        </MuiModal>
        <button onClick={()=> setOpen(true)}>Open Modal</button> */}
        <OurServices />
        <HowItWorks />
        <WhyChooseUs />
        <AboutUs />
        <OurReviews />
        <FeaturedCompanies />
        <FAQ />
      </main>
    </NormalLayout>
  );
}
