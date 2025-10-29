import styles from "../efficientLoadingMoreExamplesPage.module.css";

const metrics = [
  { label: "Largest Contentful Paint", value: "1.3s" },
  { label: "First Input Delay", value: "23ms" },
  { label: "Cumulative Layout Shift", value: "0.05" },
  { label: "Time to Interactive", value: "2.1s" },
];

export default function OnDemandMetrics() {
  return (
    <div className={styles.inViewCard}>
      <div className={styles.metricGrid}>
        {metrics.map((metric) => (
          <div key={metric.label} className={styles.metric}>
            <span className={styles.metricLabel}>{metric.label}</span>
            <span className={styles.metricValue}>{metric.value}</span>
          </div>
        ))}
      </div>

      <div className={styles.graph} aria-hidden="true">
        {metrics.map((metric, index) => (
          <div
            key={`${metric.label}-bar`}
            className={styles.bar}
            style={{ height: `${60 + index * 10}%` }}
          />
        ))}
      </div>
    </div>
  );
}
