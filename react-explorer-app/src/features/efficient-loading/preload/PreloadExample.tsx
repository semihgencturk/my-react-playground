// AppPreload.jsx
import { Suspense, useState, useEffect } from "react";
import styles from "../shared/exampleCard.module.css";
import React from "react";

const ExamplePreloadComponent = React.lazy(
  () => import("./ExamplePreloadComponent.js")
);

export default function PreloadExample() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "preload";
    link.as = "script";
    link.href = "./ExamplePreloadComponent.tsx"; // There will be 404 in development mode. In prod it will give 200. Instead of targeting the lazy chunk, preload a static file that actually exists in dev: i.e. main.jsx you will see 304. In prod
    document.head.appendChild(link);
  }, []);

  return (
    <section className={styles.card}>
      <header className={styles.header}>
        <span className={styles.eyebrow}>Preload</span>
        <h2 className={styles.title}>Fetch Critical Chunks Ahead of Time</h2>
        <p className={styles.copy}>
          A preload hint requests the lazy chunk with high priority. When you
          reveal the component, the bytes are already downloaded.
        </p>
      </header>

      <div className={styles.buttonRow}>
        <button
          type="button"
          className={styles.button}
          onClick={() => setShow(true)}
        >
          Show Preloaded Component
        </button>
      </div>

      <Suspense
        fallback={
          <p className={styles.fallback}>Loading ExamplePreloadComponent…</p>
        }
      >
        {show && <ExamplePreloadComponent />}
      </Suspense>
    </section>
  );
}
