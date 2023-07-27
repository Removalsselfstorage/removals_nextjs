import NormalLayout from "@/layouts/NormalLayout";
import Head from "next/head";
import React from "react";

const Login = () => {
  return (
    <NormalLayout>
      <Head>
        <title>Removals and Selfstorage - Login</title>
        <meta name="description" content="Rss removal and storage website" />
        <link rel="icon" href="/rrs_favicon.svg" />
      </Head>

      <main className="">
        <h1>Login</h1>
      </main>
    </NormalLayout>
  );
};

export default Login;
