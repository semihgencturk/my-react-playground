import styles from "../efficientLoadingMoreExamplesPage.module.css";

const updates = [
  { id: 1, title: "Design System Sync", time: "12 min ago" },
  { id: 2, title: "Accessibility Audit", time: "38 min ago" },
  { id: 3, title: "Bundle Size Review", time: "2 hours ago" },
];

const tags = ["collaboration", "async updates", "shipping fast"];

export default function DeferredCommunityPanel() {
  return (
    <article className={styles.card}>
      <header>
        <h3 className={styles.cardTitle}>Team Room Activity</h3>
        <p className={styles.cardCopy}>
          This widget hydrates later, keeping the hero content interactive while
          we stream collaboration updates in the background.
        </p>
      </header>

      <ul>
        {updates.map((update) => (
          <li key={update.id}>
            <span className={styles.cardHighlight}>{update.title}</span>
            <span className={styles.cardMeta}>{update.time}</span>
          </li>
        ))}
      </ul>

      <div className={styles.pillRow}>
        {tags.map((tag) => (
          <span key={tag} className={styles.pill}>
            {tag}
          </span>
        ))}
      </div>
    </article>
  );
}
