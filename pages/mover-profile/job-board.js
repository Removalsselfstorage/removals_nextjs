import MoverLayout from "@/layouts/MoverLayout";
import NormalLayout from "@/layouts/NormalLayout";
import { getAllUserDetails } from "@/store/userSlice";
import Head from "next/head";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { BiLogOut } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { useSelector } from "react-redux";

const JobBoard = () => {
   const router = useRouter();
  const userDetails = useSelector(getAllUserDetails);

  useEffect(() => {
    if (!userDetails.userDetails) {
      router.push("/");
    }
  }, []);
  return (
    <MoverLayout>
      <Head>
        <title>Mover Profile - Job Board</title>
        <meta name="description" content="Rss removal and storage website" />
        <link rel="icon" href="/rrs_favicon.svg" />
      </Head>

      {/* <div className="py-[50px] bg-white/90 px-[30px]">
        <p>Job Board</p>
      </div> */}
      {userDetails.userDetails ? (
        <div className="py-[50px] bg-white/90 px-[30px]">
          <p>Job Board</p>
        </div>
      ) : (
        <div className="flex items-center justify-center h-[100vh] ">
          <span className="h-full loading loading-bars text-primary w-[40px] lg:w-[60px]"></span>
        </div>
      )}
    </MoverLayout>
  );
};

export default JobBoard;
