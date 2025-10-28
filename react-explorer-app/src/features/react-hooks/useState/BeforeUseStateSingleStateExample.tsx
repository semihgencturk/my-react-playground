// Era: pre–16 (and also 16 before hooks)
// Capability: state + lifecycle via class API
import React from "react";
import styles from "../hooksExamples.module.css";

export default class BeforeUseStateSingleStateExample extends React.Component<
  {},
  { count: number }
> {
  state = { count: 0 };

  increment = () => this.setState((s) => ({ count: s.count + 1 }));

  render() {
    const { count } = this.state;

    return (
      <div className={styles.card}>
        <p className={styles.description}>
          Class-based state management with a single counter before hooks were
          introduced.
        </p>

        <div className={styles.metrics}>
          <div className={styles.metric}>
            <span className={styles.metricLabel}>Count</span>
            <span className={styles.metricValue}>{count}</span>
          </div>
        </div>

        <div className={styles.buttons}>
          <button className={styles.button} onClick={this.increment}>
            Increment
          </button>
        </div>
      </div>
    );
  }
}
