import { useState, useMemo } from "react";
import styles from "../hooksExamples.module.css";

export default function UseMemoExample() {
  const [count, setCount] = useState(0);
  const [anotherState, setAnotherState] = useState(false);

  const expensiveValue = useMemo(() => {
    console.log("[useMemo] Heavy calculation recomputed (count changed)");
    let total = 0;
    for (let i = 0; i < 1e7; i++) total += i;
    return total + count;
  }, [count]); // only recalculates when count changes

  const toggleAnotherState = () => {
    setAnotherState((prev) => !prev);
  };

  const formattedValue = expensiveValue.toLocaleString("en-US");

  return (
    <div className={styles.card}>
      <span className={`${styles.pill} ${styles.pillPositive}`}>With useMemo</span>

      <p className={styles.description}>
        Memoization keeps the expensive computation cached and only recomputes
        it when its dependencies change.
      </p>

      <span className={styles.consoleNote}>Open the console to see memoized calculations</span>

      <div className={styles.metrics}>
        <div className={styles.metric}>
          <span className={styles.metricLabel}>Count</span>
          <span className={styles.metricValue}>{count}</span>
        </div>

        <div className={styles.metric}>
          <span className={styles.metricLabel}>Expensive Value</span>
          <span className={styles.metricValueNeutral}>{formattedValue}</span>
        </div>
      </div>

      <div className={styles.timeline}>
        <div className={styles.timelineItem}>
          <span className={styles.timelineLabel}>Memo Cache</span>
          <span>
            Heavy loop runs once per count change; subsequent renders reuse the
            cached result.
          </span>
        </div>
        <div className={styles.timelineItem}>
          <span className={styles.timelineLabel}>Toggle</span>
          <span>
            Flipping <code>anotherState</code> leaves the memoized value intact,
            avoiding unnecessary work.
          </span>
        </div>
      </div>

      <div className={styles.buttons}>
        <button className={styles.button} onClick={() => setCount(count + 1)}>
          Increment Count
        </button>
        <button
          className={`${styles.button} ${styles.tertiaryButton}`}
          onClick={toggleAnotherState}
        >
          Toggle Another State ({anotherState ? "On" : "Off"})
        </button>
      </div>
    </div>
  );
}
