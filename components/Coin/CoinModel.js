import { useEffect, useRef, useState } from 'react';
import { useLoader } from '@react-three/fiber';
import { degToRad, radToDeg } from 'three/src/math/MathUtils';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';
import { useSpring, animated } from '@react-spring/three';

const ROTATE_90_DEG_IN_RAD = degToRad(90);
const COIN_REVOLUTIONS_NUMBER = 5;
const ONE_FULL_COIN_ROTATION_IN_RAD = degToRad(360);

const CoinModel = ({
  coinFlipped,
  coinTossResult,
  coinSideSelection,
  setShowCoinSideChoiceButtons,
  setShowCoinTossChoiceButtons,
}) => {
  const fbx = useLoader(FBXLoader, 'assets/3d-models/coin-model.fbx');
  const [rotationY, setRotationY] = useState(0);

  useEffect(() => {
    /**
     * determines by how much the rotation needs to be changed so that when the coin is reversed, its correct side is shown
     */
    const getRotationValue = (value) => {
      const normalizedValue = Number((radToDeg(value) / 360).toFixed(2)); // 360 - one full rotation of the coin in degrees
      const koef = normalizedValue % COIN_REVOLUTIONS_NUMBER;
      const newCoinRevolutionsNumber = COIN_REVOLUTIONS_NUMBER - (koef - 0.25);

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

    onStart: () => setShowCoinTossChoiceButtons(false),
    onRest: () => {
      coinSideSelection
        ? setShowCoinTossChoiceButtons(true)
        : setShowCoinSideChoiceButtons(true);
    },
  });

  const coinModelRef = useRef();

  return (
    <animated.primitive object={fbx} ref={coinModelRef} rotation={rotation} />
  );
};

export default CoinModel;
