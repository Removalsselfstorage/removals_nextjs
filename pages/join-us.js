import Hero from "@/components/HomePage/Hero";
import HowItWorks from "@/components/HomePage/HowItWorks";
import JoinUsFAQ from "@/components/JoinUs/FAQ";
import JoinUsHero from "@/components/JoinUs/Hero2";
import MoverFeatures from "@/components/JoinUs/MoverFeatures";
import NormalLayout from "@/layouts/NormalLayout";
import { getAllUserDetails } from "@/store/userSlice";
import { getCsrfToken, getProviders, getSession } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Lottie from "lottie-react";
import movingVan from "@/lottieJsons/movingVan.json";
// const JoinUs = ({ providers, csrfToken, callbackUrl }) => {
const JoinUs = () => {
  const router = useRouter();

  const dispatch = useDispatch();

  // const details = useSelector(getAllDetails);
  const userDetails = useSelector(getAllUserDetails);

  useEffect(() => {
    if (userDetails.userDetails) {
      router.push("/");
    }
  }, []);

  return (
    <NormalLayout>
      <Head>
        <title>Removals and Selfstorage - Register</title>
        <meta name="description" content="Rss removal and storage website" />
        <link rel="icon" href="/rrs_favicon.svg" />
      </Head>

      {!userDetails.userDetails ? (
        <main>
          <JoinUsHero />
          <MoverFeatures />
          <JoinUsFAQ />
        </main>
      ) : (
        <div className="flex items-center justify-center h-[100vh] ">
          <div className="flex justify-center w-full">
            <Lottie animationData={movingVan} className="w-[400px]" />
          </div>
          {/* <span className="h-full loading loading-bars text-primary w-[40px] lg:w-[60px]"></span> */}
        </div>
      )}
    </NormalLayout>
  );
};

export default JoinUs;

// export async function getServerSideProps(context) {
//   const { req, query } = context;

//   const session = await getSession({ req });
//   // const { callbackUrl } = query;

//   if (session) {
//     return {
//       redirect: {
//         destination: `${callbackUrl}`,
//         permanent: false,
//       },
//     };
//   }
//   const csrfToken = await getCsrfToken(context);

//   const providers = Object.values(await getProviders());
//   return {
//     props: {
//       providers,
//       csrfToken,
//       // callbackUrl,
//     },
//   };
// }
