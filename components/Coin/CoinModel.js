import { useLoader } from '@react-three/fiber';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';

const CoinModel = () => {
  const fbx = useLoader(FBXLoader, 'assets/3d-models/coin-model.fbx');
  return <primitive object={fbx} />;
};

export default CoinModel;
