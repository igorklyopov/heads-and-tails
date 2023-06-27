import { useLoader } from '@react-three/fiber';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';
import { degToRad } from 'three/src/math/MathUtils';

const CoinModel = () => {
  const fbx = useLoader(FBXLoader, 'assets/3d-models/coin-3d-model.fbx');
  return (
    <primitive
      object={fbx}
      rotation-x={degToRad(90)}
      rotation-y={degToRad(180)}
    />
  );
};

export default CoinModel;
