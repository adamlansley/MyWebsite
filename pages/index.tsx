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

      <header className="absolute max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 w-full left-0 right-0">
        <Navbar />
      </header>

      <main className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 h-screen">
        <Hook />
      </main>
    </>
  );
};

export default Home;
