import * as classNames from "classnames";
import { useStoreState } from "../stores/store";
import styles from "./DayNightCycle.module.scss";

export default function DayNightCycle() {
  const partOfDay = useStoreState((state) => state.partOfDay);
  const className = classNames(styles.dayNightCycle, {
    [styles.isMorning]: partOfDay === "morning",
    [styles.isNoon]: partOfDay === "noon",
    [styles.isAfternoon]: partOfDay === "afternoon",
    [styles.isMidnight]: partOfDay === "midnight",
  });
  return <div className={className}></div>;
}
