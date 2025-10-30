import styles from "./AvoidUnncessaryRendersExamples.module.css";
import { NonReactMemoExample } from "./react-memo/NonReactMemoExample";
import { ReactMemoExample } from "./react-memo/ReactMemoExample";
import { UseCallbackExample } from "./use-callback-hook/UseCallbackExample";

const overviewBullets = [
  "Compare memoized vs. non-memoized list rows to see how prop identity drives renders.",
  "React.memo avoids re-rendering list rows when parent state changes elsewhere.",
  "useCallback keeps function props stable so memoized children stay idle.",
  "Inspect the render counters to confirm which components actually update.",
];

export function AvoidUnncessaryRendersExamples() {
  return (
    <section className={styles.section}>
      <header className={styles.header}>
        <span className={styles.eyebrow}>Avoid unnecessary renders</span>
        <h2 className={styles.title}>Keep stable work from re-running</h2>
        <p className={styles.lead}>
          Memoization and stable callbacks keep UI responsive by preventing
          components from re-rendering without prop changes. Explore the demos
          and watch render counters stay flat when the optimizations are in
          place.
        </p>
        <ul className={styles.bulletList}>
          {overviewBullets.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </header>

      <div className={styles.examplesGrid}>
        <NonReactMemoExample />
        <ReactMemoExample />
        <UseCallbackExample />
      </div>
    </section>
  );
}
