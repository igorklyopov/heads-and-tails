import { Suspense } from 'react';
import { Canvas, useLoader } from '@react-three/fiber';
import { degToRad } from 'three/src/math/MathUtils';
import * as THREE from 'three';
import { CameraControls, useTexture, Environment } from '@react-three/drei';

import CoinModel from './CoinModel';


const Coin3D = () => {
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
    primaryBgDarkShade: '#4d5561', // #55616b
    primaryBgDark: '#434b57',
  };
  const coinGeometryParams = {
    radiusTop: 40,
    radiusBottom: 40,
    height: 4,
    radialSegments: 32,
    // heightSegments: 1,
    // openEnded: false,
    // thetaStart: 0,
    // thetaLength: 2 * Math.PI,
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
      <directionalLight
        color={colors.ambientLight}
        position={[-1, 2, 30]}
        intensity={0.3}
      />

      <CoinModel />

      <CameraControls />
    </Canvas>
  );
};
export default Coin3D;
