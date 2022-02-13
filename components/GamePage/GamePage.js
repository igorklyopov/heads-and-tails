import { useState,  } from 'react';

import styles from './GamePage.module.scss';
import Round from '../Round/Round';

const GamePage = () => {
  const [isGameStarted, setIsGameStarted] = useState(false);
  const startGame = () => {
    setIsGameStarted(true);
  };

  return isGameStarted ? (
    <Round />
  ) : (
    <>
      <h1>Game</h1>
      <p>Let{"'"}s play?</p>
      <button type="button" onClick={startGame}>
        Start
      </button>
    </>
  );
};

export default GamePage;
