import styles from "./EfficientRenderingPage.module.css";
import { ConcurrencyExamplesSection } from "./concurrency/ConcurrencyExamplesSection";
import { AvoidExpensiveRenders } from "./avoid-expensive-renders/AvoidExpensiveRenders";
import { AvoidUnncessaryRendersExamples } from "./avoid-unnecessary-renders/AvoidUnncessaryRendersExamples";
import { SelectiveRenderingSection } from "./selective-rendering/SelectiveRenderingSection";
import ConditionalMountingSection from "./conditional-mounting-example/ConditionalMountingSection";
import { ReconcilliationSection } from "./reconciliation/ReconcilliationSection";

const heroBullets = [
  "Observe how React schedules urgent vs. transition work with detailed status cues.",
  "Learn how memoization patterns prevent cascading renders in complex component trees.",
  "Open the console while interacting to correlate UI feedback with render lifecycles.",
];

export default function EfficientRenderingPage() {
  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <span className={styles.eyebrow}>Efficient rendering</span>
        <h1 className={styles.title}>
          Prioritise the right work at render time
        </h1>
        <p className={styles.lead}>
          React concurrency tools and memoization strategies let you keep
          experiences responsive even when components process heavy data. Try
          the interactive labs to feel how transitions, memoized lists, and
          stable callbacks shape rendering behaviour.
        </p>
        <ul className={styles.bulletList}>
          {heroBullets.map((bullet) => (
            <li key={bullet}>{bullet}</li>
          ))}
        </ul>
      </header>

      <div className={styles.sections}>
        <ConcurrencyExamplesSection />
        <AvoidExpensiveRenders />
        <AvoidUnncessaryRendersExamples />
        <SelectiveRenderingSection />
        <ConditionalMountingSection />
        <ReconcilliationSection />
      </div>
    </main>
  );
}
