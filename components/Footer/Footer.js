import Container from '../Container/Container';
import styles from './Footer.module.scss';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <Container>
        <p className={styles.copyright}>
          {'© '}
        <a
          color="inherit"
          href="https://github.com/igorklyopov"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.copyrightLink}
        >
          by Igor Klyopov
        </a>{' '}
        {new Date().getFullYear()}
        </p>
        
      </Container>
    </footer>
  );
};

export default Footer;
