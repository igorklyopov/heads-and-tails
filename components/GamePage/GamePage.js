import Image from 'next/image';
import { useState } from 'react';
import styles from './GamePage.module.scss';
import coinImg from '../../public/assets/images/coin.jpg'

const GamePage = () => {
  const [showCoinTossGif, setShowCoinTossGif] = useState(true);

  return (
    <>
      <section>
        <h1>Game</h1>
        <p>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Saepe
          adipisci aliquid impedit beatae autem dicta tempora molestias
          aspernatur vitae doloremque, sit, dolorum necessitatibus, architecto
          debitis placeat natus esse optio incidunt!
        </p>
        <p>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Saepe
          adipisci aliquid impedit beatae autem dicta tempora molestias
          aspernatur vitae doloremque, sit, dolorum necessitatibus, architecto
          debitis placeat natus esse optio incidunt!
        </p>
        <p>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Saepe
          adipisci aliquid impedit beatae autem dicta tempora molestias
          aspernatur vitae doloremque, sit, dolorum necessitatibus, architecto
          debitis placeat natus esse optio incidunt!
        </p>
        <p>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Saepe
          adipisci aliquid impedit beatae autem dicta tempora molestias
          aspernatur vitae doloremque, sit, dolorum necessitatibus, architecto
          debitis placeat natus esse optio incidunt!
        </p>
        <p>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Saepe
          adipisci aliquid impedit beatae autem dicta tempora molestias
          aspernatur vitae doloremque, sit, dolorum necessitatibus, architecto
          debitis placeat natus esse optio incidunt!
        </p>
        <div className={styles.imgWrap}>
          {showCoinTossGif && (
            <Image
              src={coinImg}
              width={700}
              height={394}
              alt="coin flip"
              placeholder="blur"
              className={styles.coinTossGif}
            />
          )}
        </div>
        <button
          type="button"
          onClick={() => {
            setShowCoinTossGif(!showCoinTossGif);
          }}
        >
          coin toss
        </button>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
      </section>
    </>
  );
};

export default GamePage;
