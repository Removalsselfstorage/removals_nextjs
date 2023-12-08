import MoverLayout from "@/layouts/MoverLayout";
import NormalLayout from "@/layouts/NormalLayout";
import { getAllUserDetails } from "@/store/userSlice";
import Head from "next/head";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { BiLogOut } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { useSelector } from "react-redux";

const Inbox = () => {
  const router = useRouter();
  const userDetails = useSelector(getAllUserDetails);

  return (
    <MoverLayout>
      <Head>
        <title>Mover Profile - Inbox</title>
        <meta name='description' content='Rss removal and storage website' />
        <link rel='icon' href='/rrs_favicon.svg' />
      </Head>

      <div className='py-[50px] bg-white/90 min-h-[100%]'>
        <section className='mb-[40px] w-full px-[10px] md:px-[30px] '>
          <div className='flex flex-col'>
            <p className='font-bold text-[25px] mb-[20px]'>Notifications</p>
          </div>
        </section>
      </div>
    </MoverLayout>
  );
};

export default Inbox;
