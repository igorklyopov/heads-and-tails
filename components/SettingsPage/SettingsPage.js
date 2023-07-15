import Link from 'next/link';

import styles from './SettingsPage.module.scss';

const SettingsPage = () => {
  return (
    <div className={styles.container}>
      <section className={styles.main}>
        <h2>Settings</h2>
        <ul>
          <li>
            <label>
              <input type="checkbox" name="" id="" />
            </label>
          </li>
          <li>
            <label>
              <input type="range" name="" id="" />
            </label>
          </li>
        </ul>
      </section>
    </div>
  );
};

export default SettingsPage;
