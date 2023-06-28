import styles from './RoundStatistic.module.scss';

const RoundStatistic = ({ data, roundCount }) => {
  data=[];
  return (
    <section className={styles.statistic}>
      <h2 className={styles.title}>Round {roundCount} statistic</h2>

      {data.map(({ roundNumber, coinTossNumber, playerWinsCount }, index) => {
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

        if (data.length > 0 && index === data.length - 1)
          return (
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
                Casino won{' '}
                <span className={styles.count}>{casinoWinsCount} </span>
                set(s)
              </p>
              <p className={styles.result}>{winnerMessage}</p>
            </div>
          );
      })}
    </section>
  );
};

export default RoundStatistic;
