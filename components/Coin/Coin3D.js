import { Canvas, useLoader } from '@react-three/fiber';
import { degToRad } from 'three/src/math/MathUtils';
import * as THREE from 'three';
import { TextureLoader } from 'three/src/loaders/TextureLoader';
import { CameraControls } from '@react-three/drei';
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

  const coinHeadImg = 'assets/images/coin-head-bg.png';
  const coinTailImg = 'assets/images/coin-tail-bg.png';

  const colorMap_1 = useLoader(TextureLoader, coinHeadImg);
  const colorMap_2 = useLoader(TextureLoader, coinTailImg);

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
      <ambientLight intensity={0.1} />
      <directionalLight
        color={colors.ambientLight}
        position={[-1, 2, 30]}
        intensity={0.3}
      />
      <mesh rotation-x={degToRad(90)} rotation-y={degToRad(90)}>
        <cylinderGeometry
          attach="geometry"
          args={[
            coinGeometryParams.radiusTop,
            coinGeometryParams.radiusBottom,
            coinGeometryParams.height,
            coinGeometryParams.radialSegments,
          ]}
        />
        <meshPhongMaterial
          attach="material-1"
          // color={colors.primaryBgDarkShade}
          flatShading
          shininess={150}
          // side={THREE.DoubleSide}
          // toneMapped={false}
          map={colorMap_1}
        />
        <meshPhongMaterial
          attach="material-2"
          flatShading
          shininess={150}
          map={colorMap_2}
        />
      </mesh>
      {/* <CoinModel /> */}
      <CameraControls />
    </Canvas>
  );
};
export default Coin3D;
