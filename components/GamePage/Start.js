import { useEffect, useState } from 'react';

import Container from '../Container/Container';
import Button from '../Button/Button';
import { SOUNDS, DEFAULT_SOUNDS_VOLUME } from '../../utils/gameConstants';
import { useAudio } from '../../utils/useAudio';
import { getFromLocalStorage } from '../../utils/localStorageFunc';

import styles from './GamePage.module.scss';

const Start = ({ setIsGameStarted }) => {
  const { playAudio, stopAudioPlay, onPlayAudioEnd, setAudioPlayVolume } =
    useAudio();
  const [volume, setVolume] = useState(DEFAULT_SOUNDS_VOLUME);
  const [soundOn, setSoundOn] = useState(false);

  useEffect(() => {
    const isSoundOn = getFromLocalStorage('sound') === 'on';
    const savedAudioVolume = getFromLocalStorage('volume');

    setSoundOn(isSoundOn);
    setVolume(savedAudioVolume);
    setAudioPlayVolume(volume);

    if (soundOn) return stopAudioPlay;
  }, [setAudioPlayVolume, soundOn, stopAudioPlay, volume]);

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
