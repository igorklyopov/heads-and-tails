import Coin2D from './Coin2D';
import Coin3D from './Coin3D';

import styles from './Coin.module.scss';

const Coin = ({
  coinFlipped,
  coinTossResult,
  coinSideSelection,
  setShowCoinSideChoiceButtons,
  setShowCoinTossChoiceButtons,
}) => {
  return (
    <div className={styles.container}>
      <Coin3D
        coinFlipped={coinFlipped}
        coinTossResult={coinTossResult}
        coinSideSelection={coinSideSelection}
        setShowCoinSideChoiceButtons={setShowCoinSideChoiceButtons}
        setShowCoinTossChoiceButtons={setShowCoinTossChoiceButtons}
      />
      {/* <Coin2D
        coinFlipped={coinFlipped}
        coinTossResult={coinTossResult}
        coinSideSelection={coinSideSelection}
        setShowCoinSideChoiceButtons={setShowCoinSideChoiceButtons}
        setShowCoinTossChoiceButtons={setShowCoinTossChoiceButtons}
      /> */}
    </div>
  );
};

export default Coin;
