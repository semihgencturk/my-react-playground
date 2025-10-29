import { Link } from "react-router-dom";
import styles from "./efficientLoadingExamplesPage.module.css";
import DynamicImportExample from "./dynamic-import/DynamicImportExample.js";
import LazyLoadingExample from "./lazy-loading/LazyLoadingExample.js";

import PrefetchExample from "./prefetch/PrefetchExample.js";
import PreloadExample from "./preload/PreloadExample.js";

const instructions = [
  "Inspect the network tab to see when each technique fetches its chunk.",
  "Toggle the demos individually to compare preload, prefetch, and lazy-load timing.",
  "Use React DevTools Suspense inspector to watch the fallback states.",
];

export default function EfficientLoadingExamplesPage() {
  const handleMoreExamplesClick = () => {
    if (typeof window !== "undefined") {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <span className={styles.eyebrow}>Efficient Loading</span>
        <h1 className={styles.title}>Optimize Asset Delivery Strategies</h1>
        <p className={styles.lead}>
          Compare dynamic imports, lazy components, prefetch hints, and preload
          directives. Each card demonstrates how to balance bundle size against
          perceived responsiveness.
        </p>
        <ul className={styles.instructionList}>
          {instructions.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </header>

      <div className={styles.grid}>
        <DynamicImportExample />
        <LazyLoadingExample />
        <PrefetchExample />
        <PreloadExample />
        <Link
          to="/efficient-loading-examples/more-examples"
          className={styles.moreExamplesLink}
          onClick={handleMoreExamplesClick}
        >
          <span>More Efficient Loading Examples</span>
          <svg
            className={styles.moreExamplesLinkIcon}
            viewBox="0 0 20 20"
            aria-hidden="true"
            focusable="false"
          >
            <path
              d="M4.5 10h10m0 0-4-4m4 4-4 4"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
            />
          </svg>
        </Link>
      </div>
    </div>
  );
}
