import styles from './Button.module.scss';

const Button = ({ children, type, ...props }) => {
  return (
    <button type={type} {...props} className={styles.button}>
      {children}
    </button>
  );
};

Button.defaultProps = {
  type: 'button',
  children: null,
};

export default Button;
