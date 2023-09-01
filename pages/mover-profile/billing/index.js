import MoverLayout from "@/layouts/MoverLayout";
import NormalLayout from "@/layouts/NormalLayout";
import { fetchMoverDetails3 } from "@/lib/fetchData2";
import { getAllUserDetails } from "@/store/userSlice";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { BiLogOut } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { useSelector } from "react-redux";

const Billing = () => {
  const router = useRouter();
  // console.log({ router: router.pathname });
  return (
    <MoverLayout >
      <Head>
        <title>Mover Profile - Billing</title>
        <meta name="description" content="Rss removal and storage website" />
        <link rel="icon" href="/rrs_favicon.svg" />
      </Head>

      <div className="py-[50px] bg-white/90 px-[30px]">
        <p>Billing</p>
      </div>
    </MoverLayout>
  );
};

export default Billing;

