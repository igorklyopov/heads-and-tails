import { useEffect, useState } from 'react';
import Link from 'next/link';

import { DEFAULT_SOUNDS_VOLUME } from '../../utils/gameConstants';
import { saveToLocalStorage } from '../../utils/localStorageFunc';

import styles from './SettingsPage.module.scss';

const SettingsPage = () => {
  const [soundOn, setSoundOn] = useState(false);
  const [volume, setVolume] = useState(DEFAULT_SOUNDS_VOLUME);

  const soundToggle = (e) => {
    setSoundOn(e.target.checked);
    saveToLocalStorage('sound', e.target.checked ? 'on' : 'off');
  };

  const onVolumeChange = (e) => {
    setVolume(e.target.value);
    saveToLocalStorage('volume', e.target.value);
  };

  useEffect(() => {
    console.log('render SettingsPage');
  }, []); // for test

  return (
    <div className={styles.container}>
      <section className={styles.main}>
        <h2>Settings</h2>
        <ul>
          <li>
            <label>
              <span>sound</span>
              <input
                type="checkbox"
                name="sound-toggle"
                onChange={soundToggle}
              />
            </label>
          </li>
          <li>
            <label>
              <span>volume</span>
              <input
                type="range"
                name="sound-volume"
                min="0"
                max="1"
                step={0.1}
                value={volume}
                onChange={onVolumeChange}
              />
            </label>
          </li>
        </ul>
        <Link href="/game">Go to game</Link>
      </section>
    </div>
  );
};

export default SettingsPage;
