import { useState, useEffect } from "react";
import styles from "../hooksExamples.module.css";

export default function AfterUseStateExample() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState("Semih");

  const increment = () => setCount((prev) => prev + 1);
  const changeName = () => setName("Updated!");

  // Effect for count changes
  useEffect(() => {
    console.log(`[useEffect] runs when watcher var changes:
 Count effect triggered -> ${count}`);
    document.title = `Count: ${count}`;
  }, [count]);

  // Effect for name changes
  useEffect(() => {
    console.log(
      `[useEffect] runs when watcher var changes: Name effect triggered -> ${name}`
    );
  }, [name]);

  useEffect(() => {
    console.log(
      "[useEffect] this runs when Every render (componentDidMount + componnentDidUpdate)"
    );
  });

  useEffect(() => {
    console.log(
      "[useEffect] this runs when Only on mount/unmount componentDidMount + componnentWillUnmount"
    );
  }, []);

  return (
    <div className={styles.card}>
      <p className={styles.description}>
        Two dedicated `useEffect` hooks keep the count and name side effects
        isolated and predictable.
      </p>

      <span className={styles.consoleNote}>
        Open the console to observe effect logs
      </span>

      <div className={styles.metrics}>
        <div className={styles.metric}>
          <span className={styles.metricLabel}>Count</span>
          <span className={styles.metricValue}>{count}</span>
        </div>

        <div className={styles.metric}>
          <span className={styles.metricLabel}>Name</span>
          <span className={styles.metricValue}>{name}</span>
        </div>
      </div>

      <div className={styles.buttons}>
        <button className={styles.button} onClick={increment}>
          Increment Count
        </button>
        <button
          className={`${styles.button} ${styles.tertiaryButton}`}
          onClick={changeName}
        >
          Change Name
        </button>
      </div>
    </div>
  );
}
