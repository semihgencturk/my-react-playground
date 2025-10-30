import styles from "./ConcurrencyExamplesSection.module.css";
import { UseTransitionExample } from "./use-transition-hook/UseTransitionExample";
import { UseDeferredValueExample } from "./use-deferred-value-hook/UseDeferredValueExample";

const overviewPoints = [
  "Transitions mark expensive updates as low priority so typing stays responsive.",
  "Pending states communicate progress while React schedules heavy work off the urgent path.",
];

export function ConcurrencyExamplesSection() {
  return (
    <section className={styles.section}>
      <header className={styles.header}>
        <span className={styles.eyebrow}>Concurrent rendering</span>
        <h2 className={styles.title}>Defer expensive UI without blocking input</h2>
        <p className={styles.lead}>
          Experiment with React concurrency features like <code>useTransition</code>
          to separate urgent work from deferred rendering. Watch pending feedback and
          console logs while triggering the demos.
        </p>
        <ul className={styles.bulletList}>
          {overviewPoints.map((point) => (
            <li key={point}>{point}</li>
          ))}
        </ul>
      </header>

      <UseTransitionExample />
      <UseDeferredValueExample />
    </section>
  );
}
