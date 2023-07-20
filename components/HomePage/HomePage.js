import Link from 'next/link';

import Container from '../Container/Container';

import styles from './HomePage.module.scss';

const HomePage = () => {
  return (
    <Container>
      <section className={styles.main}>
        <h1 className={styles.title}>
          Hello! I invite you to play the game "heads and tails"
        </h1>

        <p className={styles.description}>
          In order to start the game - you need to go to the "Game" page. A
          round of five throws is played. A "coin toss" is done by answering the
          question: Are you ready to rumble? - yes. Then it prompts the user to
          choose heads or tails. The game shows the user the result of each
          throw - guessed or not. After the end of each round, the game shows
          the player the result: the number of throws in the round, the number
          of sets when the player won and when the casino won, who won the
          round. The game then offers to play another round or end the game.
        </p>
        <p className={styles.description}>
          On the "Statistics" page, you can see the results of each round
          played. If the player starts the game again, the statistics of
          previous rounds are not saved and the game starts from the first
          round.
        </p>
        <p className={styles.description}>
          On the "Settings" page, you can turn sounds on/off, as well as change
          the volume.
        </p>

        <ul className={styles.links_list}>
          <li className={styles.links_item}>
            <Link href="/game" className="basic_link">
              Go to game
            </Link>
          </li>
          <li className={styles.links_item}>
            <Link href="/settings" className="basic_link">
              Settings
            </Link>
          </li>
        </ul>
      </section>
    </Container>
  );
};

export default HomePage;
