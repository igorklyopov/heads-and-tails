import { useEffect, useState } from 'react';

import Container from '../Container/Container';
import Coin from '../Coin/Coin';
import RoundStatistic from '../RoundStatistic/RoundStatistic';
import { coinToss } from '../../utils/coinToss';
import { MAX_COIN_TOSS_COUNT } from '../../utils/gameConstants';
import {
  saveInLocalStorage,
  getFromLocalStorage,
} from '../../utils/localStorageFunc';
import CoinSideSelector from '../CoinSideSelector/CoinSideSelector';
import ButtonWrap from '../ButtonsWrap/ButtonsWrap';
import Button from '../Button/Button';

import styles from './Round.module.scss';

const Round = ({ setIsGameStarted }) => {
  const [isRoundStarted, setIsRoundStarted] = useState(true);
  const [roundCount, setRoundCount] = useState(1);
  const [coinTossCount, setCoinTossCount] = useState(0);
  const [coinFlipped, setCoinFlipped] = useState(false);
  const [showCoinTossChoiceButtons, setShowCoinTossChoiceButtons] =
    useState(true);
  const [showCoinSideChoiceButtons, setShowCoinSideChoiceButtons] =
    useState(false);
  const [coinSideSelection, setCoinSideSelection] = useState(null);
  const [coinTossResult, setCoinTossResult] = useState(null);
  const [playerWinsCount, setPlayerWinsCount] = useState(0);
  const [roundsStatistic, setRoundsStatistic] = useState([]);
  const [showRoundStatistic, setShowRoundStatistic] = useState(false);

  useEffect(() => {
    const roundsStatisticData = getFromLocalStorage('rounds-statistic');
    const coinTossStatisticData = getFromLocalStorage('coin-toss-statistic');

    if (roundsStatisticData?.length > 0) {
      const currentRoundCount =
        roundsStatisticData[roundsStatisticData.length - 1].roundNumber;

      setRoundCount(currentRoundCount);
      setRoundsStatistic(roundsStatisticData);
      setIsRoundStarted(false);
      setShowRoundStatistic(true);
    }

    if (Object.keys(coinTossStatisticData || {}).length > 0) {
      const { coinTossNumber, coinTossResult, coinSideSelection } =
        coinTossStatisticData;

      setCoinTossCount(coinTossNumber);
      setCoinTossResult(coinTossResult);
      setCoinSideSelection(coinSideSelection);
      setShowCoinTossChoiceButtons(true);
      setShowCoinSideChoiceButtons(false);
    }
  }, []);

  const startRound = () => {
    setShowRoundStatistic(false);
    setIsRoundStarted(true);
    setRoundCount((roundCount) => (roundCount += 1));
    setCoinTossCount(0);
    setPlayerWinsCount(0);
    setCoinSideSelection(null);
    setShowCoinTossChoiceButtons(true);
    setShowCoinSideChoiceButtons(false);
  };

  // const getCoinSpin = () => setCoinFlipped((state) => !state);

  const makeCoinToss = () => {
    // getCoinSpin();
    setCoinFlipped(true);

    if (coinSideSelection) setCoinSideSelection(null);
    setCoinTossResult(coinToss());
  };

  const finishRound = () => {
    if (coinTossCount === 0 || showRoundStatistic) setIsGameStarted(false);

    const newRoundStatistic = {
      roundNumber: roundCount,
      coinTossNumber: coinTossCount,
      playerWinsCount,
    };

    setRoundsStatistic((prevRoundStatistic) => [
      ...prevRoundStatistic,
      newRoundStatistic,
    ]);
    setIsRoundStarted(false);
    setShowRoundStatistic(true);

    saveInLocalStorage('coin-toss-statistic', {});
    saveInLocalStorage('rounds-statistic', []);
  };

  useEffect(() => {
    if (coinTossCount === MAX_COIN_TOSS_COUNT) finishRound();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [coinTossCount]);

  useEffect(() => {
    saveInLocalStorage('rounds-statistic', roundsStatistic);
  }, [roundsStatistic]);

  const isPlayerGuessed = coinSideSelection === coinTossResult;

  const selectCoinSide = (e) => {
    setCoinSideSelection(e.target.value);
    if (e.target.value === coinTossResult)
      setPlayerWinsCount((playerWinsCount) => (playerWinsCount += 1));

    setCoinFlipped(false);
    setCoinTossCount((coinTossCount) => (coinTossCount += 1));
    setShowCoinSideChoiceButtons(false);

    const coinTossStatistic = {
      roundNumber: roundCount,
      coinTossNumber: coinTossCount,
      coinTossResult,
      coinSideSelection: e.target.value,
    };

    saveInLocalStorage('coin-toss-statistic', coinTossStatistic);
  };

  return (
    <Container>
      {showRoundStatistic && (
        <RoundStatistic data={roundsStatistic} roundCount={roundCount} />
      )}
      <section className={styles.round}>
        {isRoundStarted ? (
          <>
            <Coin
              coinFlipped={coinFlipped}
              coinTossResult={coinTossResult}
              coinSideSelection={coinSideSelection}
              setCoinFlipped={setCoinFlipped}
              setShowCoinTossChoiceButtons={setShowCoinTossChoiceButtons}
              setShowCoinSideChoiceButtons={setShowCoinSideChoiceButtons}
            />
            <h2 className={styles.title}>Round {roundCount}</h2>

            {coinSideSelection && (
              <p className={styles.message}>
                {isPlayerGuessed ? (
                  <span className={styles.success}>You won !</span>
                ) : (
                  <span className={styles.error}>Casino won !</span>
                )}
              </p>
            )}
            {showCoinTossChoiceButtons && (
              <>
                <p className={styles.question}>Are you ready to rumble ?</p>
                <ButtonWrap>
                  <Button type="button" onClick={makeCoinToss}>
                    Yes
                  </Button>
                  <Button type="button" onClick={finishRound}>
                    No
                  </Button>
                </ButtonWrap>
              </>
            )}
            {showCoinSideChoiceButtons && (
              <CoinSideSelector
                selectCoinSide={selectCoinSide}
                coinSideSelection={coinSideSelection}
              />
            )}
          </>
        ) : (
          <>
            <p className={styles.question}>Another round ?</p>
            <ButtonWrap>
              <Button type="button" onClick={startRound}>
                Yes
              </Button>
              <Button type="button" onClick={finishRound}>
                No
              </Button>
            </ButtonWrap>
          </>
        )}
      </section>
    </Container>
  );
};

export default Round;
