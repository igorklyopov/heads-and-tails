import { useState } from 'react';

import Start from './Start';
import Round from '../Round/Round';

const GamePage = () => {
  const [isGameStarted, setIsGameStarted] = useState(false);
  console.log('isGameStarted');
  return isGameStarted ? (
    <Round setIsGameStarted={setIsGameStarted} />
  ) : (
    <Start setIsGameStarted={setIsGameStarted} />
  );
};

export default GamePage;
