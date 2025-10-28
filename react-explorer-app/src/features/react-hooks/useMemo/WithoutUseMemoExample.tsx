import { useState } from "react";
import styles from "../hooksExamples.module.css";

export default function WithoutUseMemoExample() {
  const [count, setCount] = useState(0);
  const [anotherState, setAnotherState] = useState(false);

  // This simulates a heavy calculation
  const expensiveValue = (() => {
    console.log("[Without useMemo] Heavy calculation executed again");
    let total = 0;
    for (let i = 0; i < 1e7; i++) total += i;
    return total + count;
  })();

  const toggleAnotherState = () => {
    setAnotherState((prev) => !prev);
  };

  const formattedValue = expensiveValue.toLocaleString("en-US");

  return (
    <div className={styles.card}>
      <span className={`${styles.pill} ${styles.pillNegative}`}>Without useMemo</span>

      <p className={styles.description}>
        The expensive calculation runs on every render, even when unrelated
        state toggles, causing avoidable performance work.
      </p>

      <span className={styles.consoleNote}>Open the console to see when the calculation runs</span>

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
          <span className={styles.timelineLabel}>Render</span>
          <span>
            Inline IIFE executes the heavy loop on every render before the JSX
            returns.
          </span>
        </div>
        <div className={styles.timelineItem}>
          <span className={styles.timelineLabel}>Toggle</span>
          <span>
            Flipping <code>anotherState</code> re-runs the calculation even
            though the computed value does not depend on it.
          </span>
        </div>
      </div>

      <div className={styles.buttons}>
        <button className={styles.button} onClick={() => setCount(count + 1)}>
          Increment Count
        </button>
        <button
          className={`${styles.button} ${styles.secondaryButton}`}
          onClick={toggleAnotherState}
        >
          Toggle Another State ({anotherState ? "On" : "Off"})
        </button>
      </div>
    </div>
  );
}
