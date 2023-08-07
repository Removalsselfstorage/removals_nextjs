import MoverLayout from "@/layouts/MoverLayout";
import NormalLayout from "@/layouts/NormalLayout";
import { getAllUserDetails } from "@/store/userSlice";
import Head from "next/head";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { BiChevronLeft, BiChevronRight, BiLogOut } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { IoMdNotificationsOutline } from "react-icons/io";
import { useSelector } from "react-redux";

const MoverProfile = () => {
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
        <title>Mover Profile - Dashboard</title>
        <meta name="description" content="Rss removal and storage website" />
        <link rel="icon" href="/rrs_favicon.svg" />
      </Head>

      {userDetails.userDetails ? (
        <div className="py-[50px] bg-white/90 px-[30px]">
          <section className="mb-[30px]">
            <div className="flex flex-col">
              <p className="font-bold text-[25px] mb-[20px]">Dashboard</p>
              <div className="flex items-center space-x-[30px]">
                <div className="bg-gray-200 h-[100px] w-[100px] rounded-[10px] flex justify-center items-center text-[30px] font-bold">
                  OG
                </div>
                <div className="flex flex-col">
                  <p className="">Welcome,</p>
                  <p className="font-bold text-[25px]">Oliver G.</p>
                  <p className="italic text-gray-200 ">No reviews yet</p>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-[30px]">
            <div className="flex items-center bg-secondary/10 rounded-[10px] px-[20px] py-[15px] space-x-[20px]">
              <div className="flex items-center justify-center h-[50px] w-[50px] bg-secondary rounded-[10px] text-white px-[10px]">
                <IoMdNotificationsOutline className="text-white text-[30px]" />
              </div>
              <div className="flex flex-col">
                <p className="font-bold text-secondary">
                  Your profile is pending activation!
                </p>
                <p className="text-[13px] text-secondary">
                  Make sure to complete all the required steps (in red) in the
                  "Set up your profile" below.
                </p>
              </div>
            </div>
          </section>

          <section className="mb-[30px] bg-gray-100/80  rounded-[10px] border pt-[10px]">
            <div className="flex flex-col ">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between bg-white px-[20px] py-[20px]">
                <p className="font-bold text-[20px]">Set up our profile</p>
                <p className="">1 out of 6 completed</p>
              </div>

              <div className="flex flex-col space-y-[20px] md:space-y-[0px] md:flex-row md:justify-between py-[20px] px-[20px]">
                {/* left */}
                <div className="flex space-x-[20px] ">
                  <div className="flex items-center justify-center bg-white border rounded-[10px] w-[50px] h-[50px] px-[10px]">
                    <CgProfile className="text-[25px]" />
                  </div>
                  <div className="flex flex-col">
                    <p className="font-bold">
                      Add a Profile Picture!{" "}
                      <span className="text-secondary">(Required!)</span>
                    </p>
                    <p className="">
                      Add a professional profile picture that xmakes you appear
                      approachable and personable.
                    </p>
                  </div>
                </div>
                {/* right */}
                <div className="flex justify-between flex-row md:flex-col md:items-end md:space-y-[20px]">
                  <div className="flex items-center ">
                    <div className="cursor-pointer">
                      <BiChevronLeft className="text-[25px]" />
                    </div>
                    <p className="">1 / 6</p>
                    <div className="cursor-pointer">
                      <BiChevronRight className="text-[25px]" />
                    </div>
                  </div>
                  <div className="btn btn-secondary w-[150px]">Add Picture</div>
                </div>
              </div>
            </div>
          </section>
        </div>
      ) : (
        <div className="flex items-center justify-center h-[100vh] ">
          <span className="h-full loading loading-bars text-primary w-[40px] lg:w-[60px]"></span>
        </div>
      )}
    </MoverLayout>
  );
};

export default MoverProfile;
