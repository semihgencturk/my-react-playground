import { memo, useCallback, useRef, useState } from "react";
import styles from "./UseCallbackExample.module.css";

function useRenderCount() {
  const renderCountRef = useRef(0);
  renderCountRef.current += 1;
  return renderCountRef.current;
}

interface ActionButtonProps {
  label: string;
  onAction: () => void;
}

const ActionButton = memo(function ActionButton({
  label,
  onAction,
}: ActionButtonProps) {
  const renders = useRenderCount();

  return (
    <button type="button" className={styles.actionButton} onClick={onAction}>
      <span>{label}</span>
      <span className={styles.renderCount}>Renders: {renders}</span>
    </button>
  );
});

export function UseCallbackExample() {
  const [clicks, setClicks] = useState(0);
  const [notesOpen, setNotesOpen] = useState(false);

  const unstableIncrement = () => {
    setClicks((value) => value + 1);
  };

  const stableIncrement = useCallback(() => {
    setClicks((value) => value + 1);
  }, []);

  const toggleNotes = () => {
    setNotesOpen((open) => !open);
  };

  return (
    <article className={styles.card}>
      <header className={styles.header}>
        <h3 className={styles.title}>useCallback stabilises prop references</h3>
        <p className={styles.subtitle}>
          Compare two memoized action panels. The panel receiving an inline
          handler re-renders on every parent update, while the panel wired with{" "}
          <code>useCallback</code> skips redundant renders.
        </p>
      </header>

      <div className={styles.metaRow}>
        <span>Total button clicks: {clicks}</span>
        <span>Notes panel: {notesOpen ? "open" : "collapsed"}</span>
      </div>

      <div className={styles.panelGrid}>
        <section className={styles.panel}>
          <h4 className={styles.panelTitle}>Without useCallback</h4>
          <p className={styles.panelCopy}>
            The inline handler is recreated every render. Even though the child
            is wrapped in <code>React.memo</code>, it still re-renders because
            the function prop identity changes.
          </p>
          <ActionButton
            label="Increment with inline handler"
            onAction={unstableIncrement}
          />
        </section>

        <section className={styles.panel}>
          <h4 className={styles.panelTitle}>With useCallback</h4>
          <p className={styles.panelCopy}>
            <code>useCallback</code> keeps the function reference stable, so the
            memoized child renders once and stays idle while unrelated state
            toggles.
          </p>
          <ActionButton
            label="Increment with stable handler"
            onAction={stableIncrement}
          />
        </section>
      </div>

      <div className={styles.secondaryControls}>
        <button type="button" className={styles.secondaryButton} onClick={toggleNotes}>
          Toggle notes panel
        </button>
      </div>
    </article>
  );
}
