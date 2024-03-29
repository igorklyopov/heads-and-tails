function getStatisticDB() {
  const openRequest = indexedDB.open('statistic', 1);

  openRequest.onupgradeneeded = function () {
    const db = openRequest.result;
    if (!db.objectStoreNames.contains('statistic')) {
      db.createObjectStore('statistic', { keyPath: 'roundNumber' });
    }
  };
  openRequest.onerror = function () {
    console.error('Error', openRequest.error);
    return null;
  };

  return openRequest;
}

function saveStatistic({ roundNumber, coinTossNumber, playerWinsCount }) {
  const openRequest = getStatisticDB();

  openRequest.onsuccess = function () {
    const db = openRequest.result;
    const transaction = db.transaction('statistic', 'readwrite');
    const GameStatisticPage = transaction.objectStore('statistic');
    const roundStatistic = {
      roundNumber,
      coinTossNumber,
      playerWinsCount,
    };
    const request = GameStatisticPage.put(roundStatistic);

    request.onsuccess = function () {
      console.log('%cStatistic save', 'color:#15eb15');
    };
    request.onerror = function () {
      console.error('Error, statistic not save', request.error);
    };
  };
}

function getStatistic(func) {
  const openRequest = getStatisticDB();

  openRequest.onsuccess = function () {
    const db = openRequest.result;
    const store = db.transaction('statistic').objectStore('statistic');

    store.getAll().onsuccess = function (event) {
      console.log('%cGet statistic success', 'color:#15eb15');

      func(event.target.result);
    };

    store.getAll().onerror = function () {
      console.error('Error, statistic not get', statisticData.getAll().error);
    };
  };
}

function removeStatistic() {
  const openRequest = getStatisticDB();

  openRequest.onsuccess = function () {
    const db = openRequest.result;
    const statistic = db
      .transaction('statistic', 'readwrite')
      .objectStore('statistic');

    statistic.clear();

    statistic.clear().onsuccess = function () {
      console.log('%cStatistic clear', 'color:#15eb15');
    };

    statistic.clear().onerror = function () {
      console.error('Error, statistic not clear', statistic.clear().error);
    };
  };
}

export { saveStatistic, getStatistic, removeStatistic };
