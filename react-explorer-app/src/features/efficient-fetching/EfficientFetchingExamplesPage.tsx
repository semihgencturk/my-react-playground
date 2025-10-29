import ReactQueryExample from "./react-query/ReactQueryExample.jsx";
import styles from "./efficientFetchingExamplesPage.module.css";
import WeatherDashboard from "./prefetch-query/WeatherDashboard.jsx";
import PrefetchGalleryExample from "./static-asset-fetching-efficiently-with-prefetch/PrefetchGalleryExample.js";
import PreloadAssetsExample from "./static-asset-fetching-efficiently-with-preload/PreloadAssetsExample.js";

const instructions = [
  "Open the React Query Devtools to inspect query lifecycle events as you interact with each demo.",
  "Play with browser throttling to observe how stale data is served instantly while fresh data streams in.",
  "Hover or focus weather cards to queue prefetches, then switch views to experience cache hits in action.",
  "Compare how preloading vs. prefetching primes large hero imagery so UI transitions stay snappy.",
];

export default function EfficientFetchingExamplesPage() {
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <span className={styles.eyebrow}>Efficient Fetching</span>
        <h1 className={styles.title}>
          Shape Perceived Latency With Smarter Data Fetching
        </h1>
        <p className={styles.lead}>
          Compare how declarative query management and targeted prefetching
          reduce unnecessary network chatter. Watch how React Query synchronizes
          status, cache lifetimes, and background refreshes.
        </p>
        <ul className={styles.instructionList}>
          {instructions.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </header>

      <div className={styles.grid}>
        <section className={styles.exampleSection}>
          <div className={styles.exampleIntro}>
            <span className={styles.exampleLabel}>Query Fundamentals</span>
            <h2 className={styles.exampleTitle}>
              Typed Fetching &amp; Cache Awareness
            </h2>
            <p className={styles.exampleDescription}>
              A baseline example that highlights React Query&apos;s handling of
              loading states, background refetches, and stale times while
              working against the JSONPlaceholder API.
            </p>
          </div>
          <ReactQueryExample />
        </section>

        <section className={styles.exampleSection}>
          <div className={styles.exampleIntro}>
            <span className={styles.exampleLabel}>Prefetch Workflows</span>
            <h2 className={styles.exampleTitle}>
              Predictive Weather Dashboard
            </h2>
            <p className={styles.exampleDescription}>
              Explore hover-to-prefetch interactions that warm the cache for
              multiple query variants. The dashboard showcases how to combine
              `prefetchQuery`, cache inspection, and status messaging.
            </p>
          </div>
          <WeatherDashboard />
        </section>

        <section className={styles.exampleSection}>
          <div className={styles.exampleIntro}>
            <span className={styles.exampleLabel}>Static Assets</span>
            <h2 className={styles.exampleTitle}>
              Efficient Hero Loading With Preload
            </h2>
            <p className={styles.exampleDescription}>
              Preview how <code>rel="preload"</code> warms a high-resolution
              hero image when intent is detected. The demo illustrates adding
              preload hints dynamically and promoting the asset once the bytes
              are cached.
            </p>
          </div>
          <PreloadAssetsExample />
        </section>

        <section className={styles.exampleSection}>
          <div className={styles.exampleIntro}>
            <span className={styles.exampleLabel}>Static Assets</span>
            <h2 className={styles.exampleTitle}>
              Predictive Galleries With Prefetch
            </h2>
            <p className={styles.exampleDescription}>
              Explore interaction-driven <code>rel="prefetch"</code> behavior
              that primes follow-up views. Each gallery card warms a large hero
              so modal transitions feel immediate even on slower networks.
            </p>
          </div>
          <PrefetchGalleryExample />
        </section>
      </div>
    </div>
  );
}
