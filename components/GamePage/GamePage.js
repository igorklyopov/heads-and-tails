import { useState, useEffect } from 'react';

import styles from './GamePage.module.scss';

import { getFromLocalStorage } from '../../utils/localStorageFunc';
import Round from '../Round/Round';
import Container from '../Container/Container';
import Button from '../Button/Button';
import Coin3D from '../Coin/Coin3D';

const GamePage = () => {
  const [isGameStarted, setIsGameStarted] = useState(false);

  useEffect(() => {
    const roundsStatisticData = getFromLocalStorage('rounds-statistic');
    const coinTossStatisticData = getFromLocalStorage('coin-toss-statistic');

    if (
      roundsStatisticData?.length > 0 ||
      Object.keys(coinTossStatisticData || {}).length > 0
    ) {
      setIsGameStarted(true);
    }
  }, []);

  const startGame = () => {
    setIsGameStarted(true);
  };

  return isGameStarted ? (
    <Round setIsGameStarted={setIsGameStarted} />
  ) : (
    <section className={styles.game}>
      <Container>
        <h1 className={styles.title}>Heads and tails game</h1>
        <p className={styles.question}>Let{"'"}s play?</p>
        <Button type="button" onClick={startGame}>
          Start
        </Button>
      </Container>
    </section>
  );
};

export default GamePage;
