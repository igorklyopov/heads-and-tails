import Head from 'next/head';

import HomePage from '../components/HomePage/HomePage';

const Home = () => {
  return (
    <>
      <Head>
        <title>Head and Tails | Home</title>
        <meta name="description" content="Home page" />
      </Head>
      <HomePage />
    </>
  );
};

export default Home;
