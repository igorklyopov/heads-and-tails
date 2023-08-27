import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';

import { CameraControls } from '@react-three/drei';

import CoinModel from './CoinModel';


const Coin3D = ({
  coinFlipped,
  coinTossResult,
  coinSideSelection,
  setShowCoinSideChoiceButtons,
  setShowCoinTossChoiceButtons,
}) => {
  const cameraParams = {
    fov: 45,
    near: 0.1,
    far: 1000,
    positionX: 0,
    positionY: 0,
    positionZ: 120,
  };

  const colors = {
    ambientLight: '#ffffff',
    primaryBgDarkShade: '#4d5561',
    primaryBgDark: '#434b57',
  };

  

  return (
    <Canvas
      camera={{
        fov: cameraParams.fov,
        near: cameraParams.near,
        far: cameraParams.far,
        position: [
          cameraParams.positionX,
          cameraParams.positionY,
          cameraParams.positionZ,
        ],
      }}
      color={colors.primaryBgDark}
    >
      <ambientLight intensity={2} />
      <spotLight
        color={colors.ambientLight}
        position={[0, 0, 800]}
        angle={1}
        intensity={0.9}
        penumbra={1}
      />
      <spotLight
        color={colors.ambientLight}
        position={[800, 0, 200]}
        angle={1}
        intensity={0.7}
      />
      <spotLight
        color={colors.ambientLight}
        position={[-800, 0, 200]}
        angle={1}
        intensity={0.7}
      />

      <Suspense fallback={null}>
        <CoinModel
          coinFlipped={coinFlipped}
          coinTossResult={coinTossResult}
          coinSideSelection={coinSideSelection}
          setShowCoinSideChoiceButtons={setShowCoinSideChoiceButtons}
          setShowCoinTossChoiceButtons={setShowCoinTossChoiceButtons}
        />
      </Suspense>

      <CameraControls />
    </Canvas>
  );
};
export default Coin3D;
