import Head from 'next/head';

import GameStatistic from '../components/GameStatistic/GameStatistic';

const Statistic = () => {
  return (
    <>
      <Head>
        <title>Head and Tails | Statistic</title>
        <meta name="description" content="Game page" />
      </Head>
      <GameStatistic />
    </>
  );
};

export default Statistic;
