import { useEffect } from 'react';

import Container from '../Container/Container';
import Button from '../Button/Button';
import { SOUNDS } from '../../utils/gameConstants';
import { useAudio } from '../../utils/useAudio';
import { useSoundManager } from '../../utils/useSoundManager';

import styles from './GamePage.module.scss';

const Start = ({ setIsGameStarted }) => {
  const { playAudio, stopAudioPlay, onPlayAudioEnd, setAudioPlayVolume } =
    useAudio();
  const { volume, soundOn } = useSoundManager();

  useEffect(() => {
    setAudioPlayVolume(volume);
  }, [setAudioPlayVolume, volume]);

  useEffect(() => {
    if (soundOn) return stopAudioPlay;
  }, [soundOn, stopAudioPlay]);

  const startGame = () => {
    if (soundOn) {
      playAudio(SOUNDS.btnClick);
      onPlayAudioEnd(() => {
        setIsGameStarted(true);
      });
    } else {
      setIsGameStarted(true);
    }
  };

  return (
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

export default Start;
