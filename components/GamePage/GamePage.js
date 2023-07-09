import { useEffect, useRef, useState } from 'react';

import styles from './GamePage.module.scss';

import Round from '../Round/Round';
import Container from '../Container/Container';
import Button from '../Button/Button';
import AudioPlayer from '../AudioPlayer/AudioPlayer';

const GamePage = () => {
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [file, setFile] = useState(null);

  const startGame = () => {
    setIsGameStarted(true);
  };

  return isGameStarted ? (
    <Round setIsGameStarted={setIsGameStarted} />
  ) : (
    <section className={styles.game}>
      <Container>
        <AudioPlayer src={file} />

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
