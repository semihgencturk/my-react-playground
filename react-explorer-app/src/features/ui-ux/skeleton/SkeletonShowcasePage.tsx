import styles from "./skeletonShowcasePage.module.css";
import PageSkeletonExample from "./PageSkeletonExample.js";

const pageNotes = [
  "Request intentionally pauses ~2 seconds to showcase the loading state.",
  "Skeleton shimmer components reserve space and reduce layout shift once data hydrates.",
  "Refresh the page and see how the skeletons improve UI/UX.",
];

export default function SkeletonShowcasePage() {
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <span className={styles.eyebrow}>Skeleton Screens</span>
        <h1 className={styles.title}>Graceful Loading With Shimmers</h1>
        <p className={styles.lead}>
          This playground simulates a slower API response and presents a
          composed page skeleton while we wait for data. Builders can swap in
          their own shimmer components or leverage existing design-system
          placeholders.
        </p>
        <ul className={styles.instructionList}>
          {pageNotes.map((note) => (
            <li key={note}>{note}</li>
          ))}
        </ul>
      </header>

      <PageSkeletonExample />
    </div>
  );
}
