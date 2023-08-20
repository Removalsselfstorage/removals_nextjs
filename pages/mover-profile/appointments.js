import MoverLayout from "@/layouts/MoverLayout";
import NormalLayout from "@/layouts/NormalLayout";
import { getAllUserDetails } from "@/store/userSlice";
import Head from "next/head";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { BiLogOut } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { useSelector } from "react-redux";

const Appointments = () => {
  return (
    <MoverLayout>
      <Head>
        <title>Mover Profile - Appointments</title>
        <meta name="description" content="Rss removal and storage website" />
        <link rel="icon" href="/rrs_favicon.svg" />
      </Head>

      <div className="py-[50px] bg-white/90 px-[30px]">
        <p>Appointments</p>
      </div>
    </MoverLayout>
  );
};

export default Appointments;
