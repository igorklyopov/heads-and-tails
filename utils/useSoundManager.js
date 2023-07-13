import { useEffect, useState } from 'react';

import { DEFAULT_SOUNDS_VOLUME } from '../utils/gameConstants';
import { getFromLocalStorage } from '../utils/localStorageFunc';
import { useAudio } from '../utils/useAudio';

export const useSoundManager = () => {
  const [volume, setVolume] = useState(DEFAULT_SOUNDS_VOLUME);
  const [soundOn, setSoundOn] = useState(false);
  const { setAudioPlayVolume } = useAudio();

  useEffect(() => {
    const isSoundOn = getFromLocalStorage('sound') === 'on';
    const savedAudioVolume = getFromLocalStorage('volume');

    setSoundOn(isSoundOn);
    setVolume(savedAudioVolume);
  }, [setAudioPlayVolume, volume]);

  return { volume, soundOn };
};
