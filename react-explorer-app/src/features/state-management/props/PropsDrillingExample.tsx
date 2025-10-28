import { useState } from "react";
import styles from "../stateManagement.module.css";

type counterProps = {
  count: number;
  onIncrement?: () => void;
  onDecrement?: () => void;
};

export default function PropsDrillingExample() {
  const [count, setCount] = useState<number>(0);

  const handleIncrement = () => setCount((prevCount) => prevCount + 1);
  const handleDecrement = () => setCount((prevCount) => prevCount - 1);

  return (
    <div className={styles.card}>
      <span className={styles.badge}>Deep Tree</span>
      <h3 className={styles.stackTitle}>Props Drilling</h3>
      <p className={styles.textMuted}>
        Watch how a single piece of state is threaded through multiple
        descendants without any global store.
      </p>

      <div className={styles.statStack}>
        <div className={styles.statRow}>
          <span className={styles.statLabel}>Parent Count</span>
          <span className={styles.statValue}>{count}</span>
        </div>
      </div>

      <div className={styles.nestedStack}>
        <ChildComponent
          count={count}
          onIncrement={handleIncrement}
          onDecrement={handleDecrement}
        />
      </div>
    </div>
  );
}

function ChildComponent({ count, onIncrement, onDecrement }: counterProps) {
  const handleI = onIncrement ? onIncrement : () => {};
  const handleD = onDecrement ? onDecrement : () => {};
  return (
    <div className={`${styles.nestedCard} ${styles.nestedCardLevel2}`}>
      <h4 className={styles.stackTitle}>Child Component</h4>
      <p className={styles.textMuted}>
        Receives both the current count ({count}) and the mutation callbacks to
        pass deeper.
      </p>

      {onIncrement && (
        <button className={styles.button} onClick={onIncrement}>
          Increment from Child
        </button>
      )}

      {onDecrement && (
        <button
          className={`${styles.button} ${styles.buttonGhost}`}
          onClick={onDecrement}
        >
          Decrement from Child
        </button>
      )}
      <GrandChildComponent
        count={count}
        onIncrement={handleI}
        onDecrement={handleD}
      />
    </div>
  );
}

function GrandChildComponent({
  count,
  onIncrement,
  onDecrement,
}: counterProps) {
  const handleI = onIncrement ? onIncrement : () => {};
  const handleD = onDecrement ? onDecrement : () => {};
  return (
    <div className={`${styles.nestedCard} ${styles.nestedCardLevel3}`}>
      <h4 className={styles.stackTitle}>Grand Child Component</h4>
      <p className={styles.textMuted}>
        Passes the same props down another level, showing how duplication grows.
      </p>

      {onIncrement && (
        <button className={styles.button} onClick={onIncrement}>
          Increment from Child
        </button>
      )}

      {onDecrement && (
        <button
          className={`${styles.button} ${styles.buttonGhost}`}
          onClick={onDecrement}
        >
          Decrement from Child
        </button>
      )}
      <GrandGrandChildComponent
        count={count}
        onIncrement={handleI}
        onDecrement={handleD}
      />
    </div>
  );
}

function GrandGrandChildComponent({
  count,
  onIncrement,
  onDecrement,
}: counterProps) {
  return (
    <div className={`${styles.nestedCard} ${styles.nestedCardLevel4}`}>
      <h4 className={styles.stackTitle}>Grand Grand Child Component</h4>
      <p className={styles.textMuted}>
        Even the deepest descendant still relies on the original handlers passed
        all the way down.
      </p>

      {onIncrement && (
        <button className={styles.button} onClick={onIncrement}>
          Increment from Child
        </button>
      )}

      {onDecrement && (
        <button
          className={`${styles.button} ${styles.buttonGhost}`}
          onClick={onDecrement}
        >
          Decrement from Child
        </button>
      )}
    </div>
  );
}
