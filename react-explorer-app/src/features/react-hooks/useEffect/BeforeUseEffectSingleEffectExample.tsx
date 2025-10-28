import React from "react";
import styles from "../hooksExamples.module.css";

export default class BeforeUseEffectSingleEffectExample extends React.Component<
  {},
  { count: number; name: string }
> {
  state = { count: 0, name: "Semih" };

  increment = () => this.setState((s) => ({ count: s.count + 1 }));
  changeName = () => this.setState({ name: "Updated!" });

  componentDidUpdate(
    prevProps: {},
    prevState: { count: number; name: string }
  ) {
    if (prevState.count !== this.state.count) {
      console.log(
        `[Before useEffect] Count changed from ${prevState.count} to ${this.state.count}`
      );
      document.title = `Count: ${this.state.count}`;
    }

    if (prevState.name !== this.state.name) {
      console.log(
        `[Before useEffect] Name changed from ${prevState.name} to ${this.state.name}`
      );
    }
  }

  render() {
    const { count, name } = this.state;

    return (
      <div className={styles.card}>
        <p className={styles.description}>
          A single `componentDidUpdate` method deciding which side effect to run
          based on state changes.
        </p>

        <span className={styles.consoleNote}>Open the console to observe lifecycle logs</span>

        <div className={styles.metrics}>
          <div className={styles.metric}>
            <span className={styles.metricLabel}>Count</span>
            <span className={styles.metricValue}>{count}</span>
          </div>

          <div className={styles.metric}>
            <span className={styles.metricLabel}>Name</span>
            <span className={styles.metricValue}>{name}</span>
          </div>
        </div>

        <div className={styles.buttons}>
          <button className={styles.button} onClick={this.increment}>
            Increment Count
          </button>
          <button
            className={`${styles.button} ${styles.secondaryButton}`}
            onClick={this.changeName}
          >
            Change Name
          </button>
        </div>
      </div>
    );
  }
}
