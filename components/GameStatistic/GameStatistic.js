import { useState, useEffect } from 'react';

import { getFromLocalStorage } from '../../utils/localStorageFunc';
import RoundStatistic from '../RoundStatistic/RoundStatistic';
import ButtonsWrap from '../ButtonsWrap/ButtonsWrap';
import Button from '../Button/Button';

const buttonStyles = {
  fontWeight: 700,
  fontSize: '30px',
};

const GameStatistic = () => {
  const roundsStatisticData = getFromLocalStorage('rounds-statistic');

  // const roundsStatisticData = [];

  // useEffect(() => { }, []);
  console.log(roundsStatisticData);
  console.log(localStorage);

  const [index, setIndex] = useState(0);
  const onPrevBtnClick = () => {
    setIndex((index -= 1));
  };
  const onNextBtnClick = () => {
    setIndex((index += 1));
  };

  if (roundsStatisticData.length > 0)
    return (
      <>
        <RoundStatistic
          data={roundsStatisticData}
          roundCount={roundsStatisticData[index].roundNumber}
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