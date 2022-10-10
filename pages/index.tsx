import type { NextPage } from "next";
import Head from "next/head";
import Hook from "components/bio/Hook";
import Navbar from "components/Navbar";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Adam Lansley - Front End Developer</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />

      <main className="max-w-screen-2xl mx-auto h-screen -mt-9">
        <Hook />
      </main>

      <div className="h-screen"></div>
    </>
  );
};

export default Home;
