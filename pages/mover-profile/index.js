import MoverLayout from "@/layouts/MoverLayout";
import NormalLayout from "@/layouts/NormalLayout";
import { getAllUserDetails } from "@/store/userSlice";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { BiChevronLeft, BiChevronRight, BiLogOut } from "react-icons/bi";
import { BsTools } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";
import { IoMdNotificationsOutline } from "react-icons/io";
import { useSelector } from "react-redux";

const sections = [
  {
    id: 0,
    title: "Add a Profile Picture!",
    subText:
      "Add a professional profile picture that makes you appear approachable and personable.",
    // icon: <CgProfile className="w-[30px] h-[30px]" />,
    buttonTitle: "Add Picture",
    navNumber: 1,
    link: "edit-profile",
    required: true,
  },
  {
    id: 1,
    title: "Accept our Terms & Policies!",
    subText:
      "By accepting our Terms & Policies you have the legal right to use our website. You will also understand how your information will be used.",
    // icon: <CgProfile className="w-[30px] h-[30px]" />,
    buttonTitle: "Read Terms & Policies",
    navNumber: 2,
    link: "terms-and-policies",
    required: true,
  },
  {
    id: 2,
    title: "Attract more Customers!",
    subText:
      "Add reviews from your previous jobs. They appear on your profile as reviews and get you more customers.",
    // icon: <CgProfile className="w-[30px] h-[30px]" />,
    buttonTitle: "Add Reviews",
    navNumber: 3,
    link: "reviews",
    required: false,
  },
  {
    id: 3,
    title: "Show off your work!",
    subText:
      "Upload a portfolio of work samples and other imagery that provide an overview of your abilities and qualifications.",
    // icon: <CgProfile className="w-[30px] h-[30px]" />,
    buttonTitle: "Upload Portfolio",
    navNumber: 4,
    link: "portfolio",
    required: false,
  },
  {
    id: 4,
    title: "Enter Bank Account Details",
    subText:
      "Your payment will be deposited directly into your Bank Account every Monday at 6pm, and subject to the job being completed.",
    // icon: <CgProfile className="w-[30px] h-[30px]" />,
    buttonTitle: "Add Bank Account",
    navNumber: 5,
    link: "billing",
    required: false,
  },
];

const MoverProfile = () => {
  const router = useRouter();
  const userDetails = useSelector(getAllUserDetails);

  const [index, setIndex] = useState(0);
  const [sectionData, setSectionData] = useState(sections);

  useEffect(() => {
    if (!userDetails.userDetails) {
      router.push("/");
    }
  }, []);

  useEffect(() => {
    const lastIndex = sectionData.length - 1;
    if (index < 0) {
      setIndex(lastIndex);
    }
    if (index > lastIndex) {
      setIndex(0);
    }
  }, [index, sectionData]);

  // useEffect(() => {
  //   let slider = setInterval(() => {
  //     setIndex(index + 1);
  //   }, 5000);
  //   return () => {
  //     clearInterval(slider);
  //   };
  // }, [index]);

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
                  <p className="italic text-gray-400 ">No reviews yet</p>
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
                  "Set up your profile" section below.
                </p>
              </div>
            </div>
          </section>

          {/* scroll section */}
          <div className="w-[100%] h-[55vh] sm:h-[45vh]  lg:h-[35vh]  relative flex overflow-x-hidden overflow-auto scrollbar-thin scrollbar-track-gray-200 scrollbar-thumb-gray-400 scrollbar-default">
            {sectionData.map((section, sectionIndex) => {
              let position = "translate-x-[100%]";
              if (sectionIndex === index) {
                position = "opacity-100 translate-x-[0]";
              }
              if (
                sectionIndex === index - 1 ||
                (index === 0 && sectionIndex === sections.length - 1)
              ) {
                position = "translate-x-[-100%]";
              }
              return (
                <section
                  className={`${position} mb-[30px]  bg-gray-100/80  rounded-[10px] border pt-[10px] absolute top-0 left-0 w-[100%] h-[100%] opacity-0 transition-all flex flex-col `}
                  key={section.id}
                >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between bg-white px-[20px] py-[20px]">
                    <p className="font-bold text-[20px]">Set up our profile</p>
                    <p className="">1 out of 6 completed</p>
                  </div>
                  <div className="flex flex-col space-y-[20px] md:space-y-[0px] md:flex-row md:justify-between md:space-x-[50px] py-[20px] px-[20px]">
                    {/* left */}
                    <div className="flex space-x-[20px] ">
                      <div className="flex items-center justify-center bg-white border rounded-[10px] w-[50px] h-[50px] px-[10px]">
                        <BsTools className="text-[25px] text-primary" />
                      </div>
                      <div className="flex flex-col">
                        <p className="font-bold">
                          {section.title}{" "}
                          {section.required && (
                            <span className="text-secondary">(Required!)</span>
                          )}
                        </p>
                        <p className="mt-[5px] ">{section.subText}</p>
                      </div>
                    </div>
                    {/* right */}
                    <div className="flex justify-between flex-row md:flex-col md:items-end md:space-y-[20px]">
                      <div className="flex items-center ">
                        <div
                          className="cursor-pointer bg-secondary/20 rounded-full"
                          onClick={() => setIndex(index - 1)}
                        >
                          <BiChevronLeft className="text-[25px]" />
                        </div>
                        <p className="mx-[10px]">{section.navNumber} / 5</p>
                        <div
                          className="cursor-pointer bg-secondary/20 rounded-full"
                          onClick={() => setIndex(index + 1)}
                        >
                          <BiChevronRight className="text-[25px]" />
                        </div>
                      </div>
                      <Link
                        href={`/mover-profile/${section.link}`}
                        className="btn btn-secondary whitespace-nowrap"
                      >
                        {section.buttonTitle}
                      </Link>
                    </div>
                  </div>
                </section>
              );
            })}
          </div>
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
