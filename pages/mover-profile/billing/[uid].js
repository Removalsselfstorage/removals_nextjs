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

const Billing = ({ userData }) => {
  const router = useRouter();
  // console.log({ router: router.pathname });
  return (
    <MoverLayout data={userData}>
      <Head>
        <title>Mover Profile - Billing</title>
        <meta name="description" content="Rss removal and storage website" />
        <link rel="icon" href="/rrs_favicon.svg" />
      </Head>

      <div className="py-[50px] bg-white/90 px-[30px]">
        <p>Billing{userData.firstName}</p>
      </div>
    </MoverLayout>
  );
};

export default Billing;

export async function getServerSideProps(context) {
  const { uid } = context.params; // Access the UID from the URL
  let userData = null;

  // console.log({uid})

  // const res = await fetchMoverDetails3("5L2jQzETlfTusrd5GE48eS08r3H2");
  const res = await fetchMoverDetails3(uid);
  if(res){

    userData = res;
  } else {
    console.log("No data")
  }
  

  return {
    props: {
      userData,
    },
  };
}
