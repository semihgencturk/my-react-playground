import { useState, Suspense } from "react";
import styles from "../shared/exampleCard.module.css";
import React from "react";

// Lazy import: this chunk is NOT loaded until <Profile /> is rendered.
const ExampleLazyLoadingComponent = React.lazy(
  () => import("./ExampleLazyLoadingComponent.js")
);

export default function LazyLoadingExample() {
  const [show, setShow] = useState(false);

  return (
    <section className={styles.card}>
      <header className={styles.header}>
        <span className={styles.eyebrow}>Lazy Loading</span>
        <h2 className={styles.title}>Delay Heavy Widgets Until Needed</h2>
        <p className={styles.copy}>
          The heavy dashboard chunk is excluded from the initial bundle. Click
          the button to render it, and React.lazy will fetch the code on demand.
        </p>
      </header>

      <div className={styles.buttonRow}>
        <button
          type="button"
          className={styles.button}
          onClick={() => setShow(true)}
        >
          Show Dashboard
        </button>
      </div>

      <Suspense
        fallback={
          <p className={styles.fallback}>
            Loading ExampleLazyLoadingComponent…
          </p>
        }
      >
        {show && <ExampleLazyLoadingComponent />}
      </Suspense>
    </section>
  );
}
