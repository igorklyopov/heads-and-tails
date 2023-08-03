import { useSpring, a } from '@react-spring/web';

// import { SOUNDS } from '../../utils/gameConstants';
// import { useAudio } from '../../utils/useAudio';
// import { useSoundManager } from '../../utils/useSoundManager';

import styles from './Coin.module.scss';

const Coin2D = ({
  coinFlipped,
  coinTossResult,
  coinSideSelection,
  setShowCoinSideChoiceButtons,
  setShowCoinTossChoiceButtons,
}) => {
  // const { playAudio, stopAudioPlay, setAudioPlayVolume } = useAudio();
  // const { volume, soundOn } = useSoundManager();
  const { transform, opacity } = useSpring({
    opacity: coinFlipped ? 1 : 0,
    transform: `perspective(600px) rotateX(${coinFlipped ? 1800 : 0}deg)`,
    config: { mass: 50, tension: 50, friction: 80 },
    onStart: () => {
      setShowCoinTossChoiceButtons(false);
      // if (soundOn) {
      //   setAudioPlayVolume(volume);
      //   playAudio(SOUNDS.coinToss);
      // }
      console.log('start animation');
    },

    onRest: () => {
      setShowCoinSideChoiceButtons(true);
      // if (soundOn) {
      //   stopAudioPlay();
      // }
    },
  });

  const coinSide = coinSideSelection ? coinTossResult : 'unknown';

  return (
    <div className={styles.container}>
      <a.div
        className={`${styles.coin} ${styles[coinSide]}`}
        style={{ opacity: opacity.to((o) => 1 - o), transform }}
      />
      <a.div
        className={`${styles.coin} ${styles[coinSide]}`}
        style={{
          opacity,
          transform,
          rotateX: '1800deg',
        }}
      />
    </div>
  );
};

export default Coin2D;
