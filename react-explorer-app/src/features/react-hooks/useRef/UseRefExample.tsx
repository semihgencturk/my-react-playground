import { useRef } from "react";
import styles from "../hooksExamples.module.css";

export default function UseRefExample() {
  const inputRef = useRef<HTMLInputElement>(null);

  const focusInput = () => {
    inputRef.current?.focus();
  };

  return (
    <div className={styles.card}>
      <p className={styles.description}>
        The `useRef` hook returns a stable object that persists across renders,
        making DOM element access declarative within function components.
      </p>

      <div className={styles.inputGroup}>
        <input
          ref={inputRef}
          type="text"
          placeholder="useRef keeps this reference stable"
          className={styles.input}
        />

        <div className={styles.buttons}>
          <button
            className={`${styles.button} ${styles.secondaryButton}`}
            onClick={focusInput}
          >
            Focus Input
          </button>
        </div>
      </div>
    </div>
  );
}
