import styles from './ResultOfSetMessage.module.scss';

const ResultOfSetMessage = ({ isPlayerGuessed }) => {
  return (
    <p className={styles.message}>
      {isPlayerGuessed ? (
        <span className={styles.success}>You won !</span>
      ) : (
        <span className={styles.error}>Casino won !</span>
      )}
    </p>
  );
};

export default ResultOfSetMessage;
