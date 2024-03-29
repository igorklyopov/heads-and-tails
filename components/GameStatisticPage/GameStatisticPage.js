import { useState, useEffect } from 'react';

import { getStatistic } from '../../utils/indexedDBFunc';
import RoundStatistic from '../RoundStatistic/RoundStatistic';
import ButtonsWrap from '../ButtonsWrap/ButtonsWrap';
import Button from '../Button/Button';
import { SOUNDS } from '../../utils/gameConstants';
import { useAudio } from '../../utils/useAudio';
import { useSoundManager } from '../../utils/useSoundManager';

const buttonStyles = {
  fontWeight: 700,
  fontSize: '30px',
};

const GameStatisticPage = () => {
  const [index, setIndex] = useState(0);
  const [GameStatisticPageData, setGameStatisticPageData] = useState([]);

  useEffect(() => {
    getStatistic(setGameStatisticPageData);
  }, []);

  const { playAudio, stopAudioPlay, onPlayAudioEnd, setAudioPlayVolume } =
    useAudio();
  const { volume, soundOn } = useSoundManager();

  useEffect(() => {
    setAudioPlayVolume(volume);
  }, [setAudioPlayVolume, volume]);

  useEffect(() => {
    if (soundOn) return stopAudioPlay;
  }, [soundOn, stopAudioPlay]);

  const onPrevBtnClick = () => {
    const onPrevBtnClickActions = () => {
      if (index > 0) {
      setIndex((index) => (index -= 1));
    } else {
      return;
    }
    }
    
    if (soundOn) {
      playAudio(SOUNDS.btnClick);
      onPlayAudioEnd(() => {
        onPrevBtnClickActions(true);
      });
    } else {
      onPrevBtnClickActions(true);
    }
  };
  const onNextBtnClick = () => {
    const onNextBtnClickActions = () => {
      if (index < GameStatisticPageData.length - 1) {
      setIndex((index) => (index += 1));
    } else {
      return;
    }
    }
    
    if (soundOn) {
      playAudio(SOUNDS.btnClick);
      onPlayAudioEnd(() => {
        onNextBtnClickActions(true);
      });
    } else {
      onNextBtnClickActions(true);
    }
  };

  if (GameStatisticPageData.length > 0)
    return (
      <>
        <RoundStatistic
          data={GameStatisticPageData[index]}
          roundCount={GameStatisticPageData[index].roundNumber}
        />
        <ButtonsWrap>
          <Button
            style={buttonStyles}
            onClick={onPrevBtnClick}
            disabled={index === 0}
          >
            {'<'}
          </Button>
          <Button
            style={buttonStyles}
            onClick={onNextBtnClick}
            disabled={index === GameStatisticPageData.length - 1}
          >
            {'>'}
          </Button>
        </ButtonsWrap>
      </>
    );
};

export default GameStatisticPage;
