import Head from 'next/head';
import Image from 'next/image';
import HomePage from '../components/HomePage/HomePage';


const Home = () => {
  return (
    <>
      <Head>
        <title>Next test</title>
        <meta name="description" content="Home page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <HomePage/>
    </>
  );
};

export default Home;
