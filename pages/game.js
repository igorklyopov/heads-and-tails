import Head from 'next/head';

import GamePage from '../components/GamePage/GamePage';

const Game = () => {
  return (
    <>
      <Head>
        <title>Game</title>
        <meta name="description" content="Game page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <GamePage />
    </>
  );
};

export default Game;
