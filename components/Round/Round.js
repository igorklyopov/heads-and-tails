import { useEffect, useState, useReducer, useCallback } from 'react';

import { COIN_SIDES, MAX_COIN_TOSS_COUNT } from '../../utils/gameConstants';
import RoundStatistic from '../RoundStatistic/RoundStatistic';
import { coinToss } from '../../utils/coinToss';
import styles from './Round.module.scss';

const Round = ({ setIsGameStarted }) => {
  const [isRoundStarted, setIsRoundStarted] = useState(true);
  const [roundCount, setRoundCount] = useState(1);
  const [coinTossCount, setCoinTossCount] = useState(0);
  const [coinSideSelection, setCoinSideSelection] = useState(null);
  const [coinTossResult, setCoinTossResult] = useState(null);
  const [playerWinsCount, setPlayerWinsCount] = useState(0);
  const [roundsStatistic, setRoundsStatistic] = useState([]);
  const [showRoundStatistic, setShowRoundStatistic] = useState(false);

  const startRound = () => {
    setShowRoundStatistic(false);
    setIsRoundStarted(true);
    setRoundCount((roundCount += 1));
    setCoinTossCount(0);
    setPlayerWinsCount(0);
  };

  const makeCoinToss = () => {
    setCoinTossCount((coinTossCount += 1));
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
  };

  useEffect(() => {
    if (coinTossCount === MAX_COIN_TOSS_COUNT) finishRound();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [coinTossCount]);

  const isPlayerGuessed = coinSideSelection === coinTossResult;

  const selectCoinSide = (e) => {
    setCoinSideSelection(e.target.value);
    if (e.target.value === coinTossResult)
      setPlayerWinsCount((playerWinsCount += 1));
  };

  return (
    <>
      <section>
        {isRoundStarted ? (
          <>
            <h2>Round {roundCount}</h2>
            <p>Are you ready to rumble?</p>
            <button type="button" onClick={makeCoinToss}>
              Yes
            </button>
            <button type="button" onClick={finishRound}>
              No
            </button>
            <form>
              <label
                className={
                  coinSideSelection === COIN_SIDES.heads ? styles.active : ''
                }
              >
                <span>Heads</span>
                <input
                  type="radio"
                  name="coin-side"
                  value={COIN_SIDES.heads}
                  onChange={selectCoinSide}
                  checked={coinSideSelection === COIN_SIDES.heads}
                  disabled={coinSideSelection}
                />
              </label>
              <span>or</span>
              <label
                className={
                  coinSideSelection === COIN_SIDES.tails ? styles.active : ''
                }
              >
                <span>Tails</span>
                <input
                  type="radio"
                  name="coin-side"
                  value={COIN_SIDES.tails}
                  onChange={selectCoinSide}
                  checked={coinSideSelection === COIN_SIDES.tails}
                  disabled={coinSideSelection}
                />
              </label>
            </form>

            {coinSideSelection && (
              <p>{isPlayerGuessed ? 'You won' : 'Casino won'}</p>
            )}
          </>
        ) : (
          <>
            <p>Another round?</p>
            <button type="button" onClick={startRound}>
              Yes
            </button>
            <button type="button" onClick={finishRound}>
              No
            </button>
          </>
        )}
      </section>
      {showRoundStatistic && (
        <RoundStatistic data={roundsStatistic} roundCount={roundCount} />
      )}
    </>
  );
};

export default Round;
