import useGameLoop from "./utils/useGameLoop";
import styles from "./App.module.scss";
import DayNightCycle from "./components/DayNightCycle";
import LeftColumn from "./components/LeftColum";
import RightColumn from "./components/RightColumn";
import Main from "./components/Main";
import { useStoreState } from "./stores/store";

export default function App() {
  useGameLoop();
  const gameOver = useStoreState((state) => state.gameOver);
  const turnCount = useStoreState((state) => state.turnCount);

  return (
    <>
      {gameOver ? (
        <div className={styles.gameOver}>
          <h1>GameOver</h1>
          <h2>You made it {turnCount} turns.</h2>
        </div>
      ) : null}
      <DayNightCycle />
      <div className={styles.app}>
        <LeftColumn />
        <Main />
        <RightColumn />
      </div>
    </>
  );
}
