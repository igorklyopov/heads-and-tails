import { useEffect, useRef } from 'react';

import { getFromLocalStorage } from '../../utils/localStorageFunc';

const AudioPlayer = ({ src }) => {
  const audioPlayerRef = useRef(null);

  useEffect(() => {
    const savedVolume = getFromLocalStorage('volume');

    audioPlayerRef.current.volume = savedVolume || DEFAULT_SOUNDS_VOLUME;

    if (src) {
      audioPlayerRef.current.play();
    }
  }, [src]);

  return <audio ref={audioPlayerRef} src={src}></audio>;
};

export default AudioPlayer;
