import { useState, useEffect } from 'react';

import { getStatistic } from '../../utils/indexedDBFunc';
import RoundStatistic from '../RoundStatistic/RoundStatistic';
import ButtonsWrap from '../ButtonsWrap/ButtonsWrap';
import Button from '../Button/Button';

const buttonStyles = {
  fontWeight: 700,
  fontSize: '30px',
};

const GameStatistic = () => {
  const [index, setIndex] = useState(0);
  const [gameStatisticData, setGameStatisticData] = useState([]);

  useEffect(() => {
    getStatistic(setGameStatisticData);
  }, []);

  const onPrevBtnClick = () => {
    if (index > 0) {
      setIndex((index) => (index -= 1));
    } else {
      return;
    }
  };
  const onNextBtnClick = () => {
    if (index < gameStatisticData.length - 1) {
      setIndex((index) => (index += 1));
    } else {
      return;
    }
  };

  if (gameStatisticData.length > 0)
    return (
      <>
        <RoundStatistic
          data={gameStatisticData[index]}
          roundCount={gameStatisticData[index].roundNumber}
        />
        <ButtonsWrap>
          <Button style={buttonStyles} onClick={onPrevBtnClick}>
            {'<'}
          </Button>
          <Button style={buttonStyles} onClick={onNextBtnClick}>
            {'>'}
          </Button>
        </ButtonsWrap>
      </>
    );
};

export default GameStatistic;
