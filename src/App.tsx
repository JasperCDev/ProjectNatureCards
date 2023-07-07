import useGameLoop from "./utils/useGameLoop";
import styles from "./App.module.scss";
import DayNightCycle from "./components/DayNightCycle";
import LeftColumn from "./components/LeftColum";
import RightColumn from "./components/RightColumn";
import Main from "./components/Main";

export default function App() {
  useGameLoop();

  return (
    <>
      <DayNightCycle />
      <div className={styles.app}>
        <LeftColumn />
        <Main />
        <RightColumn />
      </div>
    </>
  );
}
