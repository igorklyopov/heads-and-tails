import { useEffect } from 'react';
import { useSpring, a } from '@react-spring/web';

import { COIN_SIDES, SOUNDS } from '../../utils/gameConstants';
import { useAudio } from '../../utils/useAudio';
import { useSoundManager } from '../../utils/useSoundManager';

import styles from './CoinSideSelector.module.scss';

const CoinSideSelector = ({ selectCoinSide, coinSideSelection }) => {
  const { playAudio, stopAudioPlay, setAudioPlayVolume } = useAudio();
  const { volume, soundOn } = useSoundManager();

  const props = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
  });

  useEffect(() => {
    if (soundOn) {
      setAudioPlayVolume(volume);
      playAudio(SOUNDS.sideChoice);

      return stopAudioPlay;
    }
  }, [playAudio, setAudioPlayVolume, soundOn, stopAudioPlay, volume]);

  return (
    <a.form style={props}>
      <label className={styles.label}>
        <span>Heads</span>
        <input
          type="radio"
          name="coin-side"
          value={COIN_SIDES.heads}
          onChange={selectCoinSide}
          checked={coinSideSelection === COIN_SIDES.heads}
          disabled={coinSideSelection}
          className="visuallyHidden"
        />
      </label>
      <span className={styles.separator}>or </span>
      <label className={styles.label}>
        <span>Tails</span>
        <input
          type="radio"
          name="coin-side"
          value={COIN_SIDES.tails}
          onChange={selectCoinSide}
          checked={coinSideSelection === COIN_SIDES.tails}
          disabled={coinSideSelection}
          className="visuallyHidden"
        />
      </label>
    </a.form>
  );
};

export default CoinSideSelector;
