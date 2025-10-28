import React from "react";
import styles from "../hooksExamples.module.css";

export default class BeforeUseRefExample extends React.Component {
  inputRef = React.createRef<HTMLInputElement>();

  focusInput = () => {
    this.inputRef.current?.focus();
  };

  render() {
    return (
      <div className={styles.card}>
        <p className={styles.description}>
          Class components manage imperative DOM access by creating refs during
          construction and invoking them within lifecycle methods or handlers.
        </p>

        <div className={styles.inputGroup}>
          <input
            ref={this.inputRef}
            type="text"
            placeholder="Type here before focusing"
            className={styles.input}
          />

          <div className={styles.buttons}>
            <button className={styles.button} onClick={this.focusInput}>
              Focus Input
            </button>
          </div>
        </div>
      </div>
    );
  }
}
