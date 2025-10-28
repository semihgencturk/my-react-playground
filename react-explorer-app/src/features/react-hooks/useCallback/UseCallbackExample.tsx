import { memo, useCallback, useState } from "react";
import styles from "../hooksExamples.module.css";

export default function WithCallback() {
  const [count, setCount] = useState(0);
  const [theme, setTheme] = useState("light");

  const handleClick = useCallback(() => {
    setCount((c) => c + 1);
  }, []); // stays the same unless dependencies change

  const themeClass =
    theme === "light" ? styles.themeChipLight : styles.themeChipDark;

  return (
    <div className={styles.card}>
      <span className={`${styles.pill} ${styles.pillPositive}`}>
        With useCallback
      </span>

      <p className={styles.description}>
        The handler is memoized so the child sees a stable function reference.
        Combined with <code>React.memo</code>, the child skips re-renders when
        unrelated state changes.
      </p>

      <span className={styles.consoleNote}>Open the console to confirm child render behavior</span>

      <div className={styles.metrics}>
        <div className={styles.metric}>
          <span className={styles.metricLabel}>Count</span>
          <span className={styles.metricValue}>{count}</span>
        </div>
        <div className={styles.metric}>
          <span className={styles.metricLabel}>Theme</span>
          <span className={`${styles.themeChip} ${themeClass}`}>
            {theme} mode
          </span>
        </div>
      </div>

      <div className={styles.timeline}>
        <div className={styles.timelineItem}>
          <span className={styles.timelineLabel}>Memoized Handler</span>
          <span>
            <code>useCallback</code> returns the same function between renders
            until its dependency array changes.
          </span>
        </div>
        <div className={styles.timelineItem}>
          <span className={styles.timelineLabel}>Child Impact</span>
          <span>
            The memoized child component receives a stable prop and therefore
            avoids unnecessary renders when only the theme toggles.
          </span>
        </div>
      </div>

      <Child onClick={handleClick} />

      <div className={styles.buttons}>
        <button className={styles.button} onClick={() => setCount((c) => c + 1)}>
          Increment Count
        </button>
        <button
          className={`${styles.button} ${styles.tertiaryButton}`}
          onClick={() => setTheme(theme === "light" ? "dark" : "light")}
        >
          Toggle Theme
        </button>
      </div>
    </div>
  );
}

interface ChildProps {
  onClick: () => void;
}

const Child = memo(function Child({ onClick }: ChildProps) {
  console.log("[useCallback] Child component rendered");
  return (
    <div className={styles.childCard}>
      <h4 className={styles.childTitle}>Child Component</h4>
      <p className={styles.childCopy}>
        Receives a memoized callback, so it only re-renders when the dependency
        list changes or when the parent count updates.
      </p>
      <button className={`${styles.button} ${styles.tertiaryButton}`} onClick={onClick}>
        Increment from Child
      </button>
    </div>
  );
});
