import { useEffect, useRef, useState } from 'react';
import { useLoader } from '@react-three/fiber';
import { degToRad, radToDeg } from 'three/src/math/MathUtils';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';
import { useSpring, animated } from '@react-spring/three';

import { SOUNDS, MAX_COIN_TOSS_COUNT } from '../../utils/gameConstants';
import { useAudio } from '../../utils/useAudio';
import { useSoundManager } from '../../utils/useSoundManager';

const ROTATE_90_DEG_IN_RAD = degToRad(90);
const ONE_FULL_COIN_ROTATION_IN_RAD = degToRad(360);
const getNumberFullRotation = (value) =>
  Number((radToDeg(value) / 360).toFixed(2)); // 360 - one full rotation of the coin in degrees

const CoinModel = ({
  coinFlipped,
  coinTossResult,
  coinSideSelection,
  setShowCoinSideChoiceButtons,
  setShowCoinTossChoiceButtons,
}) => {
  const fbx = useLoader(FBXLoader, 'assets/3d-models/coin-model.fbx');
  const [rotationY, setRotationY] = useState(0);

  const { playAudio, stopAudioPlay, setAudioPlayVolume } = useAudio();
  const { volume, soundOn } = useSoundManager();

  useEffect(() => {
    /**
     * determines by how much the rotation needs to be changed so that when the coin is reversed, its correct side is shown
     */
    const getRotationValue = (value) => {
      const normalizedValue = Number((radToDeg(value) / 360).toFixed(2)); // 360 - one full rotation of the coin in degrees;
      const koef = normalizedValue % MAX_COIN_TOSS_COUNT;
      const newCoinRevolutionsNumber = MAX_COIN_TOSS_COUNT - (koef - 0.25);

      return newCoinRevolutionsNumber;
    };

    if (coinFlipped) {
      setRotationY((prev) => {
        const rotationNumber = getRotationValue(prev);

        return (prev += ONE_FULL_COIN_ROTATION_IN_RAD * rotationNumber);
      });
    }

    const rotateToHeads = () => {
      setRotationY((prev) => {
        return (prev -= ROTATE_90_DEG_IN_RAD);
      });
    };

    const rotateToTails = () => {
      setRotationY((prev) => {
        return (prev += ROTATE_90_DEG_IN_RAD);
      });
    };

    if (coinSideSelection) {
      coinTossResult === 'heads' ? rotateToHeads() : rotateToTails();
    }
  }, [coinFlipped, coinSideSelection, coinTossResult]);

  const { rotation } = useSpring({
    rotation: [0, rotationY, 0],
    config: { mass: 50, tension: 50, friction: 80 },

    onStart: () => {
      if (soundOn && !coinSideSelection) {
        setAudioPlayVolume(volume);
        playAudio(SOUNDS.coinToss);
      }
      setShowCoinTossChoiceButtons(false);
    },
    onRest: () => {
      coinSideSelection
        ? setShowCoinTossChoiceButtons(true)
        : setShowCoinSideChoiceButtons(true);

      if (soundOn) {
        stopAudioPlay();
      }
    },
  });

  const coinModelRef = useRef();

  return (
    <animated.primitive object={fbx} ref={coinModelRef} rotation={rotation} />
  );
};

export default CoinModel;
