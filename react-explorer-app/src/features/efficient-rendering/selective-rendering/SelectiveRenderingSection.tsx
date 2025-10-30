import styles from "./SelectiveRenderingSection.module.css";
import { ReactWindowExample } from "./virtualized-lists/react-window/ReactWindowExample";
import { ReactVirtualizedExample } from "./virtualized-lists/react-virtualized/ReactVirtualizedExample";
import { TanStackVirtualListExample } from "./virtualized-lists/tanstack-react-virtual-list/TanstackReactVirtualListExample";
import ConditionalMountingExample from "./conditional-rendering/ConditionalMountingExample";

const overview = [
  "Virtualization keeps DOM output tiny even when datasets grow to thousands of rows.",
  "Only the rows inside the viewport render, so scrolling stays smooth on low-powered devices.",
  "Different libraries specialize for unique scenarios—from list virtualization to multidimensional dashboards.",
];

export function SelectiveRenderingSection() {
  return (
    <section className={styles.section}>
      <header className={styles.header}>
        <span className={styles.eyebrow}>Selective rendering</span>
        <h2 className={styles.title}>Render only what the user can see</h2>
        <p className={styles.lead}>
          Pair virtualization libraries like <code>react-window</code>,{" "}
          <code>react-virtualized</code>, and{" "}
          <code>@tanstack/react-virtual</code> with large datasets to prevent
          unnecessary DOM work. Each example below demonstrates a different
          flavour of selective rendering.
        </p>
        <ul className={styles.bulletList}>
          {overview.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </header>

      <ReactWindowExample />
      <ReactVirtualizedExample />
      <TanStackVirtualListExample />
      <ConditionalMountingExample />
    </section>
  );
}
