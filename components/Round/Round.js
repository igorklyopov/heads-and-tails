import { useEffect, useState } from 'react';

import Container from '../Container/Container';
import Coin from '../Coin/Coin';
import RoundStatistic from '../RoundStatistic/RoundStatistic';
import { coinToss } from '../../utils/coinToss';
import { MAX_COIN_TOSS_COUNT, SOUNDS } from '../../utils/gameConstants';
import { saveStatistic, removeStatistic } from '../../utils/indexedDBFunc';
import CoinSideSelector from '../CoinSideSelector/CoinSideSelector';
import ButtonWrap from '../ButtonsWrap/ButtonsWrap';
import Button from '../Button/Button';
import ResultOfSetMessage from '../ResultOfSetMessage/ResultOfSetMessage';
import { useAudio } from '../../utils/useAudio';
import { useSoundManager } from '../../utils/useSoundManager';

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
  const [roundStatistic, setRoundStatistic] = useState({});
  const [showRoundStatistic, setShowRoundStatistic] = useState(false);
  const [isPlayerGuessed, setIsPlayerGuessed] = useState(null);

  const { playAudio, stopAudioPlay, onPlayAudioEnd, setAudioPlayVolume } =
    useAudio();
  const { volume, soundOn } = useSoundManager();

  useEffect(() => {
    if (soundOn) {
      setAudioPlayVolume(volume);
      return stopAudioPlay;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [volume, soundOn]);

  const startRound = () => {
    const startRoundActions = () => {
      setShowRoundStatistic(false);
      setIsRoundStarted(true);
      setRoundCount((roundCount) => (roundCount += 1));
      setCoinTossCount(0);
      setPlayerWinsCount(0);
      setCoinSideSelection(null);
      setShowCoinTossChoiceButtons(true);
      setShowCoinSideChoiceButtons(false);
    };

    if (soundOn) {
      playAudio(SOUNDS.btnClick);
      onPlayAudioEnd(() => {
        startRoundActions();
      });
    } else {
      startRoundActions();
    }
  };

  const makeCoinToss = () => {
    const makeCoinTossActions = () => {
      setCoinFlipped(true);

      if (coinSideSelection) setCoinSideSelection(null);
      if (roundCount === 1 && coinTossCount === 0) removeStatistic();
      setCoinTossResult(coinToss());
    };

    if (soundOn) {
      playAudio(SOUNDS.btnClick);
      onPlayAudioEnd(() => {
        makeCoinTossActions();
      });
    } else {
      makeCoinTossActions();
    }
  };

  const finishRound = () => {
    const finishRoundActions = () => {
      if (coinTossCount === 0 || showRoundStatistic) setIsGameStarted(false);

      const newRoundStatistic = {
        roundNumber: roundCount,
        coinTossNumber: coinTossCount,
        playerWinsCount,
      };

      setRoundStatistic(newRoundStatistic);
      setIsRoundStarted(false);
      setShowRoundStatistic(true);

      if (Object.keys(roundStatistic).length > 0) {
        saveStatistic(roundStatistic);
      }
    };

    if (soundOn) {
      playAudio(SOUNDS.btnClick);
      onPlayAudioEnd(() => finishRoundActions());
    }
    finishRoundActions();
  };

  useEffect(() => {
    if (coinTossCount === MAX_COIN_TOSS_COUNT) finishRound();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [coinTossCount]);

  const selectCoinSide = (e) => {
    const selectCoinSideActions = () => {
      setCoinSideSelection(e.target.value);
      if (e.target.value === coinTossResult)
        setPlayerWinsCount((playerWinsCount) => (playerWinsCount += 1));

      setCoinFlipped(false);
      setCoinTossCount((coinTossCount) => (coinTossCount += 1));
      setShowCoinSideChoiceButtons(false);
    };

    if (soundOn) {
      playAudio(SOUNDS.btnClick);
      onPlayAudioEnd(() => {
        selectCoinSideActions();
      });

      selectCoinSideActions();
    } else {
      selectCoinSideActions();
    }
  };

  useEffect(() => {
    setIsPlayerGuessed(coinSideSelection === coinTossResult);
  }, [coinSideSelection, coinTossResult]);

  useEffect(() => {
    if (soundOn && coinSideSelection) {
      setAudioPlayVolume(volume);
      playAudio(isPlayerGuessed ? SOUNDS.win : SOUNDS.loss);
      onPlayAudioEnd(() => {
        stopAudioPlay();
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [coinSideSelection, isPlayerGuessed, soundOn, volume]);

  useEffect(() => {
    if (soundOn && showRoundStatistic) {
      playAudio(SOUNDS.showStatistic);
      onPlayAudioEnd(() => {
        stopAudioPlay();
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showRoundStatistic, soundOn]);

  return (
    <Container>
      {showRoundStatistic && <RoundStatistic data={roundStatistic} />}
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
              <ResultOfSetMessage isPlayerGuessed={isPlayerGuessed} />
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
