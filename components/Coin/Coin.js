import Coin2D from './Coin2D';
import Coin3D from './Coin3D';


import { SOUNDS } from '../../utils/gameConstants';
import { useAudio } from '../../utils/useAudio';
import { useSoundManager } from '../../utils/useSoundManager';

import styles from './Coin.module.scss';

const Coin = ({
  coinFlipped,
  coinTossResult,
  coinSideSelection,
  setShowCoinSideChoiceButtons,
  setShowCoinTossChoiceButtons,
}) => {
  const { playAudio, stopAudioPlay, setAudioPlayVolume } = useAudio();
  const { volume, soundOn } = useSoundManager();
  const { transform, opacity } = useSpring({
    opacity: coinFlipped ? 1 : 0,
    transform: `perspective(600px) rotateX(${coinFlipped ? 1800 : 0}deg)`,
    config: { mass: 50, tension: 50, friction: 80 },
    onStart: () => {
      setShowCoinTossChoiceButtons(false);
      if (soundOn) {
        setAudioPlayVolume(volume);
        playAudio(SOUNDS.coinToss);
      }
    },

    onRest: () => {
      setShowCoinSideChoiceButtons(true);
      if (soundOn) {
        stopAudioPlay();
      }
    },
  });

  const coinSide = coinSideSelection ? coinTossResult : 'unknown';

  return (
    <div className={styles.container}>
      {/* <Coin3D
        coinFlipped={coinFlipped}
        coinTossResult={coinTossResult}
        coinSideSelection={coinSideSelection}
        setShowCoinSideChoiceButtons={setShowCoinSideChoiceButtons}
        setShowCoinTossChoiceButtons={setShowCoinTossChoiceButtons}
      /> */}
      <Coin2D
        coinFlipped={coinFlipped}
        coinTossResult={coinTossResult}
        coinSideSelection={coinSideSelection}
        setShowCoinSideChoiceButtons={setShowCoinSideChoiceButtons}
        setShowCoinTossChoiceButtons={setShowCoinTossChoiceButtons}
      />
    </div>
  );
};

export default Coin;
