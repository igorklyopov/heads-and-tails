import { useState, useEffect } from 'react';

import RoundStatistic from '../components/RoundStatistic/RoundStatistic';
import ButtonWrap from '../components/ButtonsWrap/ButtonsWrap';
import Button from '../components/Button/Button';
import GameStatistic from '../components/GameStatistic/GameStatistic';

const buttonStyles = {
  fontWeight: 700,
  fontSize: '30px',
};

const Statistic = () => {
  const roundsStatisticData = [
    { roundNumber: 1, coinTossNumber: 3, playerWinsCount: 2 },
    { roundNumber: 2, coinTossNumber: 1, playerWinsCount: 1 },
  ];

  // useEffect(() => { }, []);

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
        <ButtonWrap>
          <Button style={buttonStyles} onClick={onPrevBtnClick}>
            {'<'}
          </Button>
          <Button style={buttonStyles} onClick={onNextBtnClick}>
            {'>'}
          </Button>
        </ButtonWrap>
      </>
    );
};

// const Statistic = () => <GameStatistic />;

export default Statistic;
