import { useState } from 'react';
import { useSpring, a } from '@react-spring/web';

import styles from './Coin.module.scss';

const Coin = () => {
  const [flipped, set] = useState(false);
  const { transform, opacity } = useSpring({
    opacity: flipped ? 1 : 0,
    transform: `perspective(600px) rotateX(${flipped ? 1800 : 0}deg)`,
    config: { mass: 50, tension: 50, friction: 80 },
  });
  return (
    <div className={styles.container} onClick={() => set((state) => !state)}>
      <a.div
        className={`${styles.c} ${styles.back}`}
        style={{ opacity: opacity.to((o) => 1 - o), transform }}
      />
      <a.div
        className={`${styles.c} ${styles.front}`}
        style={{
          opacity,
          transform,
          rotateX: '1800deg',
        }}
      />
    </div>
  );
};

export default Coin;
