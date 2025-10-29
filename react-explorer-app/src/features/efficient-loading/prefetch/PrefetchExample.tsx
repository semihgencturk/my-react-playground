// AppB.jsx
import { Suspense, useState, useEffect } from "react";
import styles from "../shared/exampleCard.module.css";
import React from "react";

const ExamplePrefetchComponent = React.lazy(
  () => import("./ExamplePrefetchComponent.js")
);

export default function PrefetchExample() {
  const [show, setShow] = useState(false);

  // Prefetch Chart.js chunk as soon as browser is idle
  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "prefetch";
    link.href = "./ExamplePrefetchComponent.tsx";
    document.head.appendChild(link);
  }, []);

  return (
    <section className={styles.card}>
      <header className={styles.header}>
        <span className={styles.eyebrow}>Prefetch</span>
        <h2 className={styles.title}>Hint Next-View Bundles Early</h2>
        <p className={styles.copy}>
          A <code>rel="prefetch"</code> hint requests the chunk during idle
          time. When the user opens the modal, the code is already in cache,
          eliminating the wait.
        </p>
      </header>

      <div className={styles.buttonRow}>
        <button
          type="button"
          className={styles.button}
          onClick={() => setShow(true)}
        >
          Show Prefetched Module
        </button>
      </div>

      <Suspense
        fallback={
          <p className={styles.fallback}>Loading ExamplePrefetchComponent…</p>
        }
      >
        {show && <ExamplePrefetchComponent />}
      </Suspense>
    </section>
  );
}
