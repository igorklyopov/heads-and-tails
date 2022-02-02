import Link from 'next/link';
import { useRouter } from 'next/router';

import styles from './Header.module.scss';

const Header = () => {
  const { pathname } = useRouter();

  return (
    <header>
      <p>Header</p>
      <nav className={styles.nav}>
        <ul className={styles.navList}>
          <li>
            <Link href="/">
              <a className={pathname === '/' ? styles.active : null}>
                Home
              </a>
            </Link>
          </li>
          <li>
            <Link href="/game">
              <a className={pathname === '/game' ? styles.active : null}>
                Game
              </a>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};
export default Header;
