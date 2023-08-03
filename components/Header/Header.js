import Link from 'next/link';
import { useRouter } from 'next/router';

import Container from '../Container/Container';
import styles from './Header.module.scss';

const Header = () => {
  const { pathname } = useRouter();

  return (
    <header className={styles.header}>
      <Container>
        <nav className={styles.nav}>
          <ul className={styles.navList}>
            <li>
              <Link
                href="/"
                className={
                  pathname === '/'
                    ? `${styles.link} ${styles.active}`
                    : styles.link
                }
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/game"
                className={
                  pathname === '/game'
                    ? `${styles.link} ${styles.active}`
                    : styles.link
                }
              >
                Game
              </Link>
            </li>
            <li>
              <Link
                href="/statistic"
                className={
                  pathname === '/statistic'
                    ? `${styles.link} ${styles.active}`
                    : styles.link
                }
              >
                Statistic
              </Link>
            </li>
            <li>
              <Link
                href="/settings"
                className={
                  pathname === '/settings'
                    ? `${styles.link} ${styles.active}`
                    : styles.link
                }
              >
                Settings
              </Link>
            </li>
          </ul>
        </nav>
      </Container>
    </header>
  );
};
export default Header;
