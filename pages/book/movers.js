import BookingLayout from '@/layouts/BookingLayout';
import { titleFont } from '@/utils/fonts';
import Head from 'next/head';
import Link from 'next/link';
import React, { useRef, useState } from 'react';

import PriceDatePick from '@/components/BookingPages/movers/PriceDatePick';
import FeaturesScroll from '@/components/BookingPages/movers/FeaturesScroll';
import FullRating from '@/components/Rating/FullRating';
import MoverCard from '@/components/BookingPages/movers/MoverCard';
import { BiSolidPhoneCall } from 'react-icons/bi';
import MoveDetails from '@/components/BookingPages/movers/MoveDetails';
import { getAllDetails } from '@/store/quoteSlice';
import { useDispatch, useSelector } from 'react-redux';

const Movers = () => {
  const details = useSelector(getAllDetails);

  const [showModal, setShowModal] = useState(false);
//   console.log(details.moveDetails.movePackage);

  return (
    <BookingLayout>
      <Head>
        <title>Movers - Removals and Selfstorage</title>
        <meta name="description" content="Rss removal and storage website" />
        <link rel="icon" href="/rrs_favicon.svg" />
      </Head>

      <main className="">
        <div className="mb-[70px] lg:mb-[100px] pt-[80px] md:pt-[100px] ">
          <div className="md:max-w-7xl mx-auto">
            {/* features links */}
            <FeaturesScroll />
            {/* price date pick */}
            <PriceDatePick />
            {/* movers list row */}
            <div className="flex flex-col space-y-[10px] lg:space-y-0 lg:flex-row lg:space-x-[10px] mx-[10px] md:mx-[20px]">
              {/* left section */}
              <div className="lg:flex-[1]  w-full">
                <MoveDetails />
              </div>

              {/* right section */}
              <div className="bg-white shadow-lg rounded-[30px] lg:flex-[3] py-[30px] md:px-[30px] w-full">
                <h1 className="text-2xl font-bold mb-[30px] px-[20px]">
                  You've been matched with{' '}
                  <span className="text-primary">4 verified movers.</span>
                </h1>
                <div className="mx-[10px] flex-col space-y-[20px]">
                  {/* mover 1 */}
                  <MoverCard
                    image="/van1.png"
                    name="Plaza Removals"
                    phone="020 8874 0090"
                    email="enquiries@plazaremovals.co.uk"
                    loadArea="H-2.0m, L-3.1m, W-2.0m"
                    rating={4.2}
                    reviewCount={14}
                    price={456.68}
                    hiresCount={45}
                    description="Plaza Removals offers residential and commercial removal services. We provide full goods in transit insurance as well as the right materials and tools required for the jobs. We also offer man and Van service. Our Expertise in different areas of the Removal department makes sure the company meets the customer’s needs and pays special attention to details. Your move is in safe hands with us. Have your move done safely securely and sound with All Seasons Removal & Storage Ltd."
                  />

                  {/* mover 2 */}
                  <MoverCard
                    image="/van2.png"
                    name="ZEDZ Removals"
                    phone="011 9874 2090"
                    email="enquiries@zedzremovals.com"
                    loadArea="H-2.2m, L-3.5m, W-2.5m"
                    rating={4.5}
                    reviewCount={30}
                    price={466.68}
                    hiresCount={49}
                    description="ZEDZ Removals are a family-run removal company based in Croydon, South London. We operate throughout the UK, undertaking house moves, in addition to providing storage for those who require it. Our experienced team are equipped to move your belongings in a professional manner, be it from a small flat or a house with multiple bedrooms. We proudly offer personalised services and strive to exceed the expectations of our customers. We have both Goods in Transit and Public Liability insurances in place, so you have peace of mind your goods are in safe hands."
                  />

                  {/* mover 3 */}
                  <MoverCard
                    image="/van3.png"
                    name="Cos Freight"
                    phone="555 6142 7624"
                    email="info@cosfreight.co.uk"
                    loadArea="H-2.2m, L-3.5m, W-2.5m"
                    rating={4.1}
                    reviewCount={10}
                    price={476.18}
                    hiresCount={12}
                    description="With a global network of branches, Cos Freight is a well-respected London removal company in the UK and international removals industry. With UK bases in London and Luton, we have expanded our operations globally, helping you move to anywhere in the world. Covering London and surrounding areas such as High Wycombe, St Albans, to global international moves. We have the expertise, knowledge, capability and service to complete your move. Our team are hard-working and go above and beyond to ensure a first-class moving house experience. We ensure your move is as stress-free as possible – we will arrive on time, handle your belongings carefully during loading, transport and unloading, and will help you through any step of the process to make it that bit easier."
                  />

                  {/* mover 4 */}
                  <MoverCard
                    image="/van4.png"
                    name="DBM Express"
                    phone="020 3621 3141"
                    email="info@dbmexpress.co.uk"
                    loadArea="H-2.2m, L-3.5m, W-2.5m"
                    rating={4.7}
                    reviewCount={50}
                    price={462.21}
                    hiresCount={35}
                    description="Welcome to DBM Express, we are ‘Devoted Boundless Movers’; we pride ourselves on delivering a quality service that exceeds the standards set by our competitors. We are a medium-sized business and we have a committed team of removals experts who have spent many years working in the removals industry. We are one of the best North London removal companies and we offer a stress-free, smooth, punctual and reliable service to all our clients, however big or small."
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <div className="w-[20vw] h-[100%] z-[2000] absolute top-0 right-0 bg-white">
            <p className="text-3xl font-bold">Side bar</p>
        </div> */}
      </main>
    </BookingLayout>
  );
};

export default Movers;
