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
                {/* <a
                  className={
                    pathname === '/statistic'
                      ? `${styles.link} ${styles.active}`
                      : styles.link
                  }
                >
                  Statistic
                </a> */}
                Statistic
              </Link>
            </li>
          </ul>
        </nav>
      </Container>
    </header>
  );
};
export default Header;
