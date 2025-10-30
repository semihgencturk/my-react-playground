import { useEffect, useRef, useState } from "react";
import styles from "../functions.module.css";

export default function UiFreezeDemo() {
  const [count, setCount] = useState(0);
  const intervalRef = useRef<number | undefined>(undefined);

  // Counter that increments every 100 ms
  useEffect(() => {
    intervalRef.current = window.setInterval(() => {
      setCount((c) => c + 1);
    }, 100);
    return () => clearInterval(intervalRef.current);
  }, []);

  // 🧱 Synchronous heavy work — blocks UI for ~3 seconds
  const handleSyncBlock = () => {
    console.log("🔹 Sync block started");
    const start = Date.now();
    while (Date.now() - start < 3000) {
      // burn CPU for 3s
    }
    console.log("✅ Sync block finished");
  };

  // ⚙️ Asynchronous heavy work — non-blocking
  const handleAsyncWork = async () => {
    console.log("🔸 Async work started");
    await new Promise((resolve) => setTimeout(resolve, 3000)); // simulate 3s async task
    console.log("✅ Async work finished");
  };

  return (
    <section className={styles.card}>
      <div className={styles.cardHeader}>
        <span className={styles.badge}>Main Thread</span>
        <h2 className={styles.cardTitle}>UI Freeze Demonstration</h2>
        <p className={styles.cardSubtitle}>
          Compare a busy synchronous loop with an asynchronous delay to see how
          blocking the main thread affects rendering.
        </p>
      </div>

      <div className={styles.innerStack}>
        <div>
          <p className={styles.buttonGroupLabel}>Live counter</p>
          <span className={styles.counter}>{count}</span>
        </div>

        <div className={styles.buttonRow}>
          <button
            type="button"
            onClick={handleSyncBlock}
            className={`${styles.button} ${styles.buttonAccent}`}
          >
            Run synchronous block
          </button>
          <button
            type="button"
            onClick={handleAsyncWork}
            className={`${styles.button} ${styles.buttonPrimary}`}
          >
            Run asynchronous work
          </button>
        </div>

        <div className={styles.callout}>
          Try the synchronous button while watching the counter — it pauses
          because the while loop monopolizes the thread. The asynchronous button
          schedules the delay without freezing updates.
        </div>

        <p className={styles.hint}>
          Inspect the Performance tab to contrast the long task produced by the
          loop with the idle time during the async example.
        </p>
      </div>
    </section>
  );
}
