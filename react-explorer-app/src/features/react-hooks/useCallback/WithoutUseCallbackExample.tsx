import { memo, useState } from "react";
import styles from "../hooksExamples.module.css";

export default function WithoutCallbackExample() {
  const [count, setCount] = useState(0);
  const [theme, setTheme] = useState("light");

  // new function created on every render
  const handleClick = () => setCount(count + 1);

  const themeClass =
    theme === "light" ? styles.themeChipLight : styles.themeChipDark;

  return (
    <div className={styles.card}>
      <span className={`${styles.pill} ${styles.pillNegative}`}>
        Without useCallback
      </span>

      <p className={styles.description}>
        Every render creates a brand-new event handler. Any child components that
        receive it will re-render, even when unrelated state changes.
      </p>

      <span className={styles.consoleNote}>Open the console to track child re-renders</span>

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
          <span className={styles.timelineLabel}>Render</span>
          <span>
            A new <code>handleClick</code> function is instantiated each time the
            parent renders.
          </span>
        </div>
        <div className={styles.timelineItem}>
          <span className={styles.timelineLabel}>Child Impact</span>
          <span>
            The child component receives a different function reference on every
            render, so it re-renders even when only the theme changes.
          </span>
        </div>
      </div>

      <Child onClick={handleClick} />

      <div className={styles.buttons}>
        <button className={styles.button} onClick={() => setCount(count + 1)}>
          Increment Count
        </button>
        <button
          className={`${styles.button} ${styles.secondaryButton}`}
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
  console.log("[Without useCallback] Child component rendered");
  return (
    <div className={styles.childCard}>
      <h4 className={styles.childTitle}>Child Component</h4>
      <p className={styles.childCopy}>
        Receives a fresh callback every render. Even theme toggles trigger this
        component to render again.
      </p>
      <button className={styles.button} onClick={onClick}>
        Increment from Child
      </button>
    </div>
  );
});
