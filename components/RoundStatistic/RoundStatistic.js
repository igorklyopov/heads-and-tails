import styles from './RoundStatistic.module.scss';

const RoundStatistic = ({ data, roundCount }) => {
  const { roundNumber, coinTossNumber, playerWinsCount } = data;
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

  return (
    <section className={styles.statistic}>
      <h2 className={styles.title}>Round {roundCount} statistic</h2>

      <div key={roundNumber}>
        <p>
          Coin toss number :{' '}
          <span className={styles.count}>{coinTossNumber} </span>
        </p>
        <p>
          You won <span className={styles.count}>{playerWinsCount} </span>
          set(s)
        </p>
        <p>
          Casino won <span className={styles.count}>{casinoWinsCount} </span>
          set(s)
        </p>
        <p className={styles.result}>{winnerMessage}</p>
      </div>
    </section>
  );
};

export default RoundStatistic;
