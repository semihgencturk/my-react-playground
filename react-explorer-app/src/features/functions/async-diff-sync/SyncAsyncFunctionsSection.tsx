import { asyncFunction } from "./AsynchronousFunction";
import { syncFunction } from "./SynchronousFunction";
import styles from "../functions.module.css";

export default function SyncAsyncFunctionsSection() {
  const startSyncCalls = () => {
    console.log("▶ Starting synchronous calls...");
    let id = 1;

    syncFunction(id);
    id++;

    syncFunction(id);
    id++;

    console.log("🟩 Finished all synchronous calls");
  };

  const startAsyncCalls = async () => {
    console.log("▶ Starting asynchronous calls...");
    let id = 1;

    // Simulate asynchronous version using setTimeout
    asyncFunction(id);
    id++;

    asyncFunction(id);
    id++;

    console.log("🟩 Finished scheduling asynchronous calls");
  };

  return (
    <section className={styles.card}>
      <div className={styles.cardHeader}>
        <span className={styles.badge}>Sync vs Async</span>
        <h2 className={styles.cardTitle}>Call Stack Comparison</h2>
        <p className={styles.cardSubtitle}>
          Trigger identical tasks implemented synchronously and asynchronously to
          observe how the JavaScript call stack pauses or yields control.
        </p>
      </div>

      <p className={styles.consoleNote}>
        Tip: Keep the devtools console open to follow execution order and log
        timestamps.
      </p>

      <div className={styles.buttonRow}>
        <button
          type="button"
          onClick={startSyncCalls}
          className={`${styles.button} ${styles.buttonAccent}`}
        >
          Run synchronous version
        </button>
        <button
          type="button"
          onClick={startAsyncCalls}
          className={`${styles.button} ${styles.buttonPrimary}`}
        >
          Run asynchronous version
        </button>
      </div>
    </section>
  );
}
