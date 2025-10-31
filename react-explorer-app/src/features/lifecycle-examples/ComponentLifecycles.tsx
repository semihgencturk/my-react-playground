import { Component, useEffect, useRef, useState } from "react";
import styles from "./ComponentLifecycles.module.css";

type FunctionalLifecycleChildProps = {
  count: number;
};

const FunctionalLifecycleChild = ({ count }: FunctionalLifecycleChildProps) => {
  useEffect(() => {
    console.log("%c[Child] mounted", "color: green;");

    return () => {
      console.log("%c[Child] unmounted", "color: red;");
    };
  }, []);

  useEffect(() => {
    if (count === 0) return;

    console.log(`%c[Child] count updated -> ${count}`, "color: dodgerblue;");

    return () => {
      console.log(
        `%c[Child] cleanup before next render (count: ${count})`,
        "color: orange;"
      );
    };
  }, [count]);

  return (
    <div className={styles.childCard}>
      <p className={styles.childLabel}>
        Child component receives `count`: <strong>{count}</strong>
      </p>
      <p className={styles.childNote}>
        Watch the console to see mount, update, and cleanup logs.
      </p>
    </div>
  );
};

type ClassLifecycleChildProps = {
  count: number;
};

type ClassLifecycleChildState = {
  internalClicks: number;
};

class ClassLifecycleChild extends Component<
  ClassLifecycleChildProps,
  ClassLifecycleChildState
> {
  state: ClassLifecycleChildState = {
    internalClicks: 0,
  };

  constructor(props: ClassLifecycleChildProps) {
    super(props);
    console.log("%c[ClassChild] constructor", "color: #6f42c1;");
  }

  static getDerivedStateFromProps(
    nextProps: ClassLifecycleChildProps,
    prevState: ClassLifecycleChildState
  ) {
    console.log(
      "%c[ClassChild] getDerivedStateFromProps",
      "color: #1f6feb;",
      nextProps,
      prevState
    );
    return null;
  }

  componentDidMount(): void {
    console.log("%c[ClassChild] componentDidMount", "color: green;");
  }

  shouldComponentUpdate(
    nextProps: ClassLifecycleChildProps,
    nextState: ClassLifecycleChildState
  ): boolean {
    console.log(
      "%c[ClassChild] shouldComponentUpdate",
      "color: #f39c12;",
      nextProps,
      nextState
    );
    return true;
  }

  componentDidUpdate(
    prevProps: ClassLifecycleChildProps,
    prevState: ClassLifecycleChildState
  ): void {
    console.log(
      "%c[ClassChild] componentDidUpdate",
      "color: dodgerblue;",
      prevProps,
      prevState
    );
  }

  componentWillUnmount(): void {
    console.log("%c[ClassChild] componentWillUnmount", "color: red;");
  }

  handleInternalClick = () => {
    this.setState((prev) => ({ internalClicks: prev.internalClicks + 1 }));
  };

  render() {
    console.log("%c[ClassChild] render", "color: purple;");

    const { count } = this.props;
    const { internalClicks } = this.state;

    return (
      <div className={styles.childCard}>
        <p className={styles.childLabel}>
          Class component receives `count`: <strong>{count}</strong>
        </p>
        <p className={styles.childNote}>
          Internal state updates also trigger lifecycle methods. Internal
          clicks: <strong>{internalClicks}</strong>
        </p>
        <button className={styles.button} onClick={this.handleInternalClick}>
          Add internal click
        </button>
      </div>
    );
  }
}

const ComponentLifecycles = () => {
  const [functionalCount, setFunctionalCount] = useState(0);
  const [showFunctionalChild, setShowFunctionalChild] = useState(true);
  const [classCount, setClassCount] = useState(0);
  const [showClassChild, setShowClassChild] = useState(true);
  const renderCount = useRef(0);

  renderCount.current += 1;
  console.log(
    `%c[Parent] render #${renderCount.current} (functionalCount=${functionalCount}, showFunctional=${showFunctionalChild}, classCount=${classCount}, showClass=${showClassChild})`,
    "color: purple;"
  );

  useEffect(() => {
    console.log("%c[Parent] mounted", "color: green;");

    return () => {
      console.log("%c[Parent] unmounted", "color: red;");
    };
  }, []);

  useEffect(() => {
    console.log(
      `%c[Parent] functional count changed -> ${functionalCount}`,
      "color: teal;"
    );
  }, [functionalCount]);

  useEffect(() => {
    console.log(
      `%c[Parent] class count changed -> ${classCount}`,
      "color: #0ea5e9;"
    );
  }, [classCount]);

  return (
    <section className={styles.page}>
      <header className={styles.header}>
        <span className={styles.badge}>Lifecycle Explorer</span>
        <h2 className={styles.title}>Component lifecycle demo</h2>
        <p className={styles.subtitle}>
          Interact with the controls and open your browser console to see how
          lifecycle hooks (functional) and lifecycle methods (class) fire in
          React.
        </p>
      </header>

      <div className={styles.grid}>
        <article className={styles.card}>
          <h3 className={styles.sectionTitle}>Functional component (hooks)</h3>
          <p className={styles.sectionHint}>
            Hooks like `useEffect` cover mount, update, and cleanup logic.
          </p>
          <div className={styles.controls}>
            <button
              className={styles.button}
              onClick={() => setFunctionalCount((prev) => prev + 1)}
            >
              Increment
            </button>
            <button
              className={styles.button}
              onClick={() => setFunctionalCount((prev) => prev - 1)}
            >
              Decrement
            </button>
            <button
              className={`${styles.button} ${styles.buttonSoft}`}
              onClick={() => setFunctionalCount(0)}
            >
              Reset
            </button>
            <button
              className={`${styles.button} ${styles.buttonSoft}`}
              onClick={() => setShowFunctionalChild((prev) => !prev)}
            >
              {showFunctionalChild ? "Hide" : "Show"} child
            </button>
          </div>
          {showFunctionalChild ? (
            <FunctionalLifecycleChild count={functionalCount} />
          ) : (
            <p className={styles.placeholder}>Functional child is hidden.</p>
          )}
        </article>

        <article className={styles.card}>
          <h3 className={styles.sectionTitle}>Class component (lifecycle methods)</h3>
          <p className={styles.sectionHint}>
            Classic lifecycle methods show exactly when React invokes each phase.
          </p>
          <div className={styles.controls}>
            <button
              className={styles.button}
              onClick={() => setClassCount((prev) => prev + 1)}
            >
              Increment
            </button>
            <button
              className={styles.button}
              onClick={() => setClassCount((prev) => prev - 1)}
            >
              Decrement
            </button>
            <button
              className={`${styles.button} ${styles.buttonSoft}`}
              onClick={() => setClassCount(0)}
            >
              Reset
            </button>
            <button
              className={`${styles.button} ${styles.buttonSoft}`}
              onClick={() => setShowClassChild((prev) => !prev)}
            >
              {showClassChild ? "Hide" : "Show"} child
            </button>
          </div>
          {showClassChild ? (
            <ClassLifecycleChild count={classCount} />
          ) : (
            <p className={styles.placeholder}>Class child is hidden.</p>
          )}
        </article>
      </div>
    </section>
  );
};

export default ComponentLifecycles;
