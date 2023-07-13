import { useRef } from 'react';

export const useAudio = () => {
  const audio = typeof Audio !== 'undefined' ? new Audio() : undefined;
  const audioRef = useRef(audio);

  const play = (src) => {
    audioRef.current.src = src;
    audioRef.current.play();
  };

  const pause = () => audioRef.current.pause();

  const stopPlay = () => {
    audioRef.current.pause();
    audioRef.current.currentTime = 0;
  };

  const setVolume = (volume) => {
    audioRef.current.volume = volume;
  };

  return {
    setAudioPlayVolume: (volume) => setVolume(volume),
    playAudio: (src) => play(src),
    pauseAudio: () => pause(),
    stopAudioPlay: () => stopPlay(),
    onPlayAudioEnd: (func) => (audioRef.current.onended = func),
  };
};
