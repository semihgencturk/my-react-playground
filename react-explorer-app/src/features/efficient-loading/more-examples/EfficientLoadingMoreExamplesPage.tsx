import styles from "./efficientLoadingMoreExamplesPage.module.css";
import DeferredWidgetsSection from "./lazy-loading/DeferredWidgetsSection.js";
import RenderWhenVisibleSection from "./lazy-mounting/RenderWhenVisibleExample.js";
import SectionGroup from "./components/SectionGroup.js";

const pageInstructions = [
  "Open your browser devtools console to follow the lazy-loading lifecycle logs.",
  "Notice the deferred cards render placeholders immediately so you can observe Suspense fallbacks.",
  "Scroll until the dark performance card intersects the viewport to hydrate it.",
  "Trigger the prefetch and preload buttons to see how the browser warms upcoming assets.",
];

export default function LazyLoadingPage() {
  return (
    <div className={styles.page}>
      <div className={styles.sections}>
        <SectionGroup
          variant="primary"
          title="Deferred Downloading"
          description="The next demo delays its JavaScript bundle until it is actually needed. Keep the Network panel open: these cards fetch only after the initial route settles."
        >
          <DeferredWidgetsSection />
        </SectionGroup>

        <SectionGroup
          variant="tertiary"
          title="Lazy Mount — Deferred Rendering"
          description="This example waits for viewport entry before mounting. By skipping unseen work we free the main thread, keep memory lean, and hydrate just-in-time."
        >
          <RenderWhenVisibleSection />
        </SectionGroup>
      </div>

      <footer className={styles.summary}>
        <span className={styles.eyebrow}>
          Current Examples:: Lazy Load - Lazy Mount
        </span>
        <h1 className={styles.title}>Ship Intentional, On-Demand UI</h1>
        <p className={styles.lead}>
          Three complementary techniques to control when React renders or when
          the browser downloads supporting assets. In this way you can optimize
          your app and increase the performance.
        </p>
        <ul className={styles.instructionList}>
          {pageInstructions.map((instruction) => (
            <li key={instruction}>{instruction}</li>
          ))}
        </ul>
      </footer>
    </div>
  );
}
