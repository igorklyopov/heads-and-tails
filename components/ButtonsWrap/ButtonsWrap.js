import styles from './ButtonsWrap.module.scss';

const ButtonWrap = ({ children }) => {
  return <div className={styles.buttons}>{children}</div>;
};

export default ButtonWrap;
