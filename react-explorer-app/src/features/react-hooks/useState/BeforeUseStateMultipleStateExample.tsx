// Era: pre–16 (and also 16 before hooks)
// Capability: state + lifecycle via class API
import React from "react";
import styles from "../hooksExamples.module.css";

export default class BeforeUseStateExample extends React.Component<
  {},
  { count: number; anotherCount: number }
> {
  state = { count: 0, anotherCount: 10 };

  increment = () => this.setState((s) => ({ count: s.count + 1 }));

  incrementAnother = () =>
    this.setState((s) => ({ anotherCount: s.anotherCount + 1 }));

  render() {
    const { count, anotherCount } = this.state;

    return (
      <div className={styles.card}>
        <p className={styles.description}>
          Two independent pieces of state managed within a pre-hooks class
          component.
        </p>

        <div className={styles.metrics}>
          <div className={styles.metric}>
            <span className={styles.metricLabel}>Count</span>
            <span className={styles.metricValue}>{count}</span>
          </div>

          <div className={styles.metric}>
            <span className={styles.metricLabel}>Another Count</span>
            <span className={styles.metricValue}>{anotherCount}</span>
          </div>
        </div>

        <div className={styles.buttons}>
          <button className={styles.button} onClick={this.increment}>
            Increment Count
          </button>
          <button
            className={`${styles.button} ${styles.secondaryButton}`}
            onClick={this.incrementAnother}
          >
            Increment Another
          </button>
        </div>
      </div>
    );
  }
}
