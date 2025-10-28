import { useState } from "react";
import styles from "../stateManagement.module.css";

type counterProps = {
  count: number;
  onIncrement?: () => void;
  onDecrement?: () => void;
  id: number;
};

export default function PassingPropsToOneChildExample() {
  const [count, setCount] = useState<number>(0);

  const handleIncrement = () => setCount((prevCount) => prevCount + 1);
  const handleDecrement = () => setCount((prevCount) => prevCount - 1);

  return (
    <div className={styles.card}>
      <span className={styles.badge}>Prop Sharing</span>
      <h3 className={styles.stackTitle}>Passing Props To One Child</h3>
      <p className={styles.textMuted}>
        A parent component owns the counter state and provides update handlers
        directly to its child.
      </p>

      <div className={styles.statStack}>
        <div className={styles.statRow}>
          <span className={styles.statLabel}>Parent Count</span>
          <span className={styles.statValue}>{count}</span>
        </div>
      </div>

      <div className={styles.buttons}>
        <button className={styles.button} onClick={handleIncrement}>
          Increment from Parent
        </button>
        <button
          className={`${styles.button} ${styles.buttonGhost}`}
          onClick={handleDecrement}
        >
          Decrement from Parent
        </button>
      </div>

      <div className={styles.nestedStack}>
        <ChildComponent
          id={1}
          count={count}
          onIncrement={handleIncrement}
          onDecrement={handleDecrement}
        />
      </div>
    </div>
  );
}

function ChildComponent({ count, onIncrement, onDecrement, id }: counterProps) {
  return (
    <div className={`${styles.nestedCard} ${styles.nestedCardLevel2}`}>
      <h4 className={styles.stackTitle}>{id}. Child Component</h4>
      <p className={styles.textMuted}>
        Receives current count ({count}) plus the handlers passed down from the
        parent.
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
