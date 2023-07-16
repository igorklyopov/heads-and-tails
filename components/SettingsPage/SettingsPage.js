import { useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';

import { DEFAULT_SOUNDS_VOLUME } from '../../utils/gameConstants';
import {
  getFromLocalStorage,
  saveToLocalStorage,
} from '../../utils/localStorageFunc';
import Container from '../Container/Container';

import styles from './SettingsPage.module.scss';

const SettingsPage = () => {
  const [soundOn, setSoundOn] = useState(false);
  const [volume, setVolume] = useState(0);

  useEffect(() => {
    const savedVolume = getFromLocalStorage('volume');
    setVolume(savedVolume || DEFAULT_SOUNDS_VOLUME);
  }, []);

  const soundToggle = (e) => {
    setSoundOn(e.target.checked);
    saveToLocalStorage('sound', e.target.checked ? 'on' : 'off');
  };

  const onVolumeChange = (e) => {
    setVolume(e.target.value);
    saveToLocalStorage('volume', e.target.value);
  };

  return (
    <Container>
      <section className={styles.settings}>
        <h2 className="visually_hidden">Settings</h2>
        <ul className="list">
          <li className={styles.settings_item}>
            <label className={styles.input_wrap}>
              <span className={styles.label_text}>sound</span>
              <input
                type="checkbox"
                name="sound-toggle"
                onChange={soundToggle}
                className="visually_hidden"
              />
              <span className={styles.custom_checkbox}>
                {soundOn ? 'on' : 'off'}
              </span>
            </label>
          </li>
          <li>
            <label className={styles.input_wrap}>
              <span className={styles.label_text}>volume</span>
              <input
                type="range"
                name="sound-volume"
                min="0"
                max="1"
                step={0.1}
                value={volume}
                onChange={onVolumeChange}
                className={styles.volume_range}
              />
            </label>
          </li>
        </ul>
        <Link href="/game" className="basic_link">
          Go to game
        </Link>
      </section>
    </Container>
  );
};

export default SettingsPage;
