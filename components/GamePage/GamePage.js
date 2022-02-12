import Image from 'next/image';
import { useEffect, useState, useReducer, useCallback } from 'react';

import styles from './GamePage.module.scss';
import { coinToss } from '../../utils/coinToss';

const GamePage = () => {
  const [isRoundStarted, setIsRoundStarted] = useState(false);
  const [roundCount, setRoundCount] = useState(0);
  const [coinTossCount, setCoinTossCount] = useState(0);
  const [coinSideSelection, setCoinSideSelection] = useState(null);
  const [coinTossResult, setCoinTossResult] = useState(null);
  const [playerWinsCount, setPlayerWinsCount] = useState(0);
  const [roundsStatistic, setRoundsStatistic] = useState([]);
  const [showRoundStatistic, setShowRoundStatistic] = useState(false);

  const COIN_SIDES = {
    heads: 'heads',
    tails: 'tails',
  };
  const MAX_COIN_TOSS_COUNT = 5;

  const startRound = () => {
    setShowRoundStatistic(false);
    setIsRoundStarted(true);
    setRoundCount((roundCount += 1));
    setCoinTossCount(0);
  };

  const makeCoinToss = () => {
    setCoinTossCount((coinTossCount += 1));
    if (coinSideSelection) setCoinSideSelection(null);
    setCoinTossResult(coinToss());
  };

  const finishRound = () => {
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
        <h1>Game</h1>
        <p>Let{"'"}s play?</p>
        <button type="button" onClick={startRound}>
          Start
        </button>
        {!isRoundStarted ? (
          <>
            <p>Another round?</p>
            <button type="button" onClick={startRound}>
              Yes
            </button>
            <button type="button" onClick={finishRound}>
              No
            </button>
          </>
        ) : (
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
        )}
      </section>
      {showRoundStatistic && (
        <section>
          <h2>Round statistic</h2>

          {roundsStatistic.map(
            ({ roundNumber, coinTossNumber, playerWinsCount }) => {
              const casinoWinsCount = coinTossNumber - playerWinsCount;
              const winRate = playerWinsCount - casinoWinsCount;
              const getWinnerMessage = () => {
                if (winRate > 0) {
                  return 'You won this round';
                } else if (winRate < 0) {
                  return 'Casino won this round';
                } else {
                  return 'There is no winner in this round';
                }
              };

              const winnerMessage = getWinnerMessage();

              if (roundNumber === roundCount)
                return (
                  <div key={roundNumber}>
                    <p>Coin toss number: {coinTossNumber}</p>
                    <p>You won {playerWinsCount} set(s)</p>
                    <p>Casino won {casinoWinsCount} set(s)</p>
                    <p>{winnerMessage}</p>
                  </div>
                );
            }
          )}
        </section>
      )}
    </>
  );
};

export default GamePage;
