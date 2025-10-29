import { Suspense, lazy, useEffect, useState } from "react";
import styles from "../efficientLoadingMoreExamplesPage.module.css";

const DeferredAnalyticsPanel = lazy(
  () => import("./DeferredAnalyticsPanel.js")
);
const DeferredCommunityPanel = lazy(
  () => import("./DeferredCommunityPanel.js")
);

const renderDeferredFallback = (message: string) => (
  <div className={styles.fallbackCard}>{message}</div>
);

export default function DeferredWidgetsSection() {
  const [showDeferredWidgets, setShowDeferredWidgets] = useState(false);

  return (
    <section className={`${styles.section} ${styles.sectionPrimary}`}>
      <h2 className={styles.sectionTitle}>Defer Non-Critical Downloads</h2>
      <p className={styles.sectionCopy}>
        These widgets wait until after the first render to request their code
        split bundles. We reveal lightweight placeholders first, then stream the
        real UI when the downloads finish.
      </p>

      <button onClick={() => setShowDeferredWidgets(true)}>
        Show Deferred Widgets
      </button>

      <div className={styles.deferredGrid}>
        {showDeferredWidgets ? (
          <>
            <Suspense fallback={renderDeferredFallback("Fetching analytics…")}>
              <DeferredAnalyticsPanel />
            </Suspense>
            <Suspense
              fallback={renderDeferredFallback("Loading activity feed…")}
            >
              <DeferredCommunityPanel />
            </Suspense>
          </>
        ) : (
          <>
            {renderDeferredFallback(
              "The download will started, when the user click the show. button"
            )}
            {renderDeferredFallback(
              "The download will started, when the user click the show. button"
            )}
          </>
        )}
      </div>
    </section>
  );
}
