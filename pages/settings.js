import Head from 'next/head';

import SettingsPage from '../components/SettingsPage/SettingsPage';

const Settings = () => {
  return (
    <>
      <Head>
        <title>Head and Tails | Settings</title>
        <meta name="description" content="Settings page" />
      </Head>
      <SettingsPage />
    </>
  );
};

export default Settings;
