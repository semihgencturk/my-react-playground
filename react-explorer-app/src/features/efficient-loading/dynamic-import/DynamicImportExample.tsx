import { Suspense } from "react";
import styles from "../shared/exampleCard.module.css";
import React from "react";

// Lazy import — split into its own bundle
const ExampleHeavyReactComponent = React.lazy(
  () => import("./ExampleHeavyReactComponent.js")
);

export default function DynamicImportExample() {
  async function handleMath() {
    // Plain dynamic import (no React.lazy)
    const exampleJsOrTsComponent = await import("./ExampleJsOrTsComponent.js");
    alert(exampleJsOrTsComponent.add(2, 3));
  }

  return (
    <section className={styles.card}>
      <header className={styles.header}>
        <span className={styles.eyebrow}>Dynamic Import</span>
        <h2 className={styles.title}>Split Bundles With React.lazy</h2>
        <p className={styles.copy}>
          This card lazy-loads a heavy dashboard component and dynamically
          imports a plain module when you request it. Check the network tab to
          watch the extra chunks load on demand.
        </p>
      </header>

      <div className={styles.buttonRow}>
        <button type="button" className={styles.button} onClick={handleMath}>
          Do Math (import)
        </button>
      </div>

      <Suspense
        fallback={<p className={styles.fallback}>Loading analytics module…</p>}
      >
        <ExampleHeavyReactComponent />
      </Suspense>
    </section>
  );
}
