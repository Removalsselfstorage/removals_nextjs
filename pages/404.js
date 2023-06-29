import Head from 'next/head';

const Custom404 = () => {
  return (
    <>
      <Head>
        <title>
          Removals and Selfstorage - Book Movers & Moving Help Online
        </title>
        <meta name="description" content="Rss removal and storage website" />
        <link rel="icon" href="/rrs_favicon.svg" />
      </Head>

      <div className="flex flex-col justify-center items-center h-screen px-[20px]">
        <div className="font-extrabold xs:text-[40px] text-primary sm:text-[60px] md:text-[70px] text-center">
          Oops!
        </div>
        <div className="xs:text-[16px] sm:text-[20px] md:text-[30px] text-center mb-[20px]">
          Page not found
        </div>
        <img src="/404.svg" alt="" className="max-h-[300px]" />
        <a
          href="/"
          className="cursor-pointer underline text-primary text-[14px] md:text-[20px] text-center mt-[50px]"
        >
          Go to Home Page
        </a>
      </div>
    </>
  );
};

export default Custom404;
