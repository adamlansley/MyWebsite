import type { NextPage } from "next";
import Head from "next/head";
import Vanity from "components/landing/Vanity";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Adam Lansley - Front End Developer</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Vanity />
      </main>
    </>
  );
};

export default Home;
