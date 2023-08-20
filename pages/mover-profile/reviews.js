import FormikContainer from "@/components/Formik/FormikContainer";
import MoverLayout from "@/layouts/MoverLayout";
import NormalLayout from "@/layouts/NormalLayout";
import { getAllUserDetails } from "@/store/userSlice";
import Head from "next/head";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { BiLogOut } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { useSelector } from "react-redux";

const Reviews = () => {
  const router = useRouter();
  const userDetails = useSelector(getAllUserDetails);

 
  return (
    <MoverLayout>
      <Head>
        <title>Mover Profile - Reviews</title>
        <meta name="description" content="Rss removal and storage website" />
        <link rel="icon" href="/rrs_favicon.svg" />
      </Head>

      <div className="py-[50px] bg-white/90 px-[30px]">
        <p>Review</p>
      </div>
    </MoverLayout>
  );
};

export default Reviews;
