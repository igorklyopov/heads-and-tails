import { useAudio } from '../../utils/useAudio';
import { useSoundManager } from '../../utils/useSoundManager';
import { SOUNDS } from '../../utils/gameConstants';

import styles from './ResultOfSetMessage.module.scss';

const ResultOfSetMessage = ({ isPlayerGuessed }) => {
  const { playAudio, stopAudioPlay, onPlayAudioEnd, setAudioPlayVolume } =
    useAudio();
  const { volume, soundOn } = useSoundManager();

  if (soundOn) {
    setAudioPlayVolume(volume);
    playAudio(isPlayerGuessed ? SOUNDS.win : SOUNDS.loss);
    onPlayAudioEnd(() => {
      stopAudioPlay();
    });
  }

  return (
    <p className={styles.message}>
      {isPlayerGuessed ? (
        <span className={styles.success}>You won !</span>
      ) : (
        <span className={styles.error}>Casino won !</span>
      )}
    </p>
  );
};

export default ResultOfSetMessage;
