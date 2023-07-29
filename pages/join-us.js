import Hero from "@/components/HomePage/Hero";
import HowItWorks from "@/components/HomePage/HowItWorks";
import JoinUsFAQ from "@/components/JoinUs/FAQ";
import JoinUsHero from "@/components/JoinUs/Hero2";
import MoverFeatures from "@/components/JoinUs/MoverFeatures";
import NormalLayout from "@/layouts/NormalLayout";
import { getCsrfToken, getProviders, getSession } from "next-auth/react";
import Head from "next/head";
import React from "react";

const JoinUs = ({ providers, csrfToken, callbackUrl }) => {
  return (
    <NormalLayout>
      <Head>
        <title>Removals and Selfstorage - Register</title>
        <meta name="description" content="Rss removal and storage website" />
        <link rel="icon" href="/rrs_favicon.svg" />
      </Head>

      <main>
        <JoinUsHero providers={providers} csrfToken={csrfToken} callbackUrl={callbackUrl} />
        <MoverFeatures />
        <JoinUsFAQ/>
      </main>
    </NormalLayout>
  );
};

export default JoinUs;


export async function getServerSideProps(context) {
  const { req, query } = context;

  const session = await getSession({ req });
  // const { callbackUrl } = query;

  if (session) {
    return {
      redirect: {
        destination: `${callbackUrl}`,
        permanent: false,
      },
    };
  }
  const csrfToken = await getCsrfToken(context);

  const providers = Object.values(await getProviders());
  return {
    props: {
      providers,
      csrfToken,
      // callbackUrl,
    },
  };
}

