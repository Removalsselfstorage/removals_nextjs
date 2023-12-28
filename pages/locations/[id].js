import React from "react";
import NormalLayout from "@/layouts/NormalLayout";
import Head from "next/head";

const Locate = ({ url }) => {
  function formatAndSeparateString(inputString) {
    // Separate the string into individual words based on "_"
    const words = inputString.split("_");

    // Convert each word to sentence case and replace "-" with a space
    const formattedCity = words[0]
      .replace(/-/g, " ")
      .replace(/\b\w/g, (c) => c.toUpperCase());
    const formattedSub = words[1] && words[1]
      .replace(/-/g, " ")
      .replace(/\b\w/g, (c) => c.toUpperCase());

    // Create and return an object with "city" and "sub" keys
    const resultObject = {
      city: formattedCity,
      sub: formattedSub,
    };

    return resultObject;
  }

  const formattedCity = formatAndSeparateString(url);

  console.log({ formattedCity });

  return (
    <>
      <Head>
        <title>{url} - Removals and Selfstorage Location</title>
        <meta name='description' content='Rss removal and storage website' />
        <link rel='icon' href='/rrs_favicon.svg' />
      </Head>
      <NormalLayout>
        <p className='mt-[200px]'>
          Slug location - {formattedCity?.city} - {formattedCity?.sub}
        </p>
      </NormalLayout>
    </>
  );
};

export default Locate;

export async function getServerSideProps(context) {
  const { id } = context.params; // Access the UID from the URL

  // console.log({ progressData });

  return {
    props: {
      // userData,
      url: id,
    },
  };
}
