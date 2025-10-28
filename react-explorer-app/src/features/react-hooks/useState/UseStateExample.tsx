import { useState } from "react";
import styles from "../hooksExamples.module.css";

export default function UseStateExample() {
  const [count, setCount] = useState<number>(0);
  const [anotherCount, setAnotherCount] = useState<number>(10);

  const increment = () => setCount((prev) => prev + 1);
  const incrementAnother = () => setAnotherCount((prev) => prev + 1);
  return (
    <div className={styles.card}>
      <p className={styles.description}>
        Managing multiple state values in a functional component with the
        `useState` hook.
      </p>

      <div className={styles.metrics}>
        <div className={styles.metric}>
          <span className={styles.metricLabel}>Count</span>
          <span className={styles.metricValue}>{count}</span>
        </div>

        <div className={styles.metric}>
          <span className={styles.metricLabel}>Another Count</span>
          <span className={styles.metricValue}>{anotherCount}</span>
        </div>
      </div>

      <div className={styles.buttons}>
        <button className={styles.button} onClick={increment}>
          Increment Count
        </button>
        <button
          className={`${styles.button} ${styles.secondaryButton}`}
          onClick={incrementAnother}
        >
          Increment Another
        </button>
      </div>
    </div>
  );
}
