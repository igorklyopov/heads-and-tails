import Head from 'next/head';

import GameStatisticPage from '../components/GameStatisticPage/GameStatisticPage';

const Statistic = () => {
  return (
    <>
      <Head>
        <title>Head and Tails | Statistic</title>
        <meta name="description" content="Statistic page" />
      </Head>
      <GameStatisticPage />
    </>
  );
};

export default Statistic;
