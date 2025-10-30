import styles from "./AvoidExpensiveRenders.module.css";
import MemoizedComputation from "./memoized-computation/MemoizedComputation";
import WebWorkerExample from "./web-worker/WebWorkerExample";

const overviewPoints = [
  "Memoize heavy computations so expensive loops do not rerun after unrelated state changes.",
  "Offload CPU-intensive work to a Web Worker to keep the main thread responsive to user input.",
  "Compare main-thread vs. worker execution to understand how to schedule demanding tasks.",
];

export function AvoidExpensiveRenders() {
  return (
    <section className={styles.section}>
      <header className={styles.header}>
        <span className={styles.eyebrow}>Avoid expensive renders</span>
        <h2 className={styles.title}>Move heavy work off the render path</h2>
        <p className={styles.lead}>
          Heavy computations can block your UI if they run on every render. Use
          memoization to cache pure results and Web Workers to execute costly
          algorithms away from the main thread.
        </p>
        <ul className={styles.bulletList}>
          {overviewPoints.map((point) => (
            <li key={point}>{point}</li>
          ))}
        </ul>
      </header>

      <div className={styles.examples}>
        <MemoizedComputation />
        <WebWorkerExample />
      </div>
    </section>
  );
}
