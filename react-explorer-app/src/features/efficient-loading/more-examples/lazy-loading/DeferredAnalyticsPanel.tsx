import { useEffect } from "react";
import styles from "../efficientLoadingMoreExamplesPage.module.css";

const trends = [
  { label: "Traffic Uplift", value: "+18%" },
  { label: "Conversion Rate", value: "4.7%" },
  { label: "Cart Abandonment", value: "-9%" },
];

export default function DeferredAnalyticsPanel() {
  return (
    <article className={styles.card}>
      <header>
        <h3 className={styles.cardTitle}>Engagement At A Glance</h3>
        <p className={styles.cardCopy}>
          Loaded on demand once the page settles so the initial route stays
          fast. Ideal for dashboards and other non-critical panels.
        </p>
      </header>

      <dl>
        {trends.map((trend) => (
          <div key={trend.label}>
            <dt>{trend.label}</dt>
            <dd>{trend.value}</dd>
          </div>
        ))}
      </dl>
    </article>
  );
}
