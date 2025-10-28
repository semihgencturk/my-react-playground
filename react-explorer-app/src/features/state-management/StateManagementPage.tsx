import UseStateExample from "./useState/UseStateExample.js";
import PassingPropsToOneChildExample from "./props/PassingPropsToOneChildExample.js";
import PassingPropsToTwoChildExample from "./props/PassingPropsToTwoChildExample.js";
import PropsDrillingExample from "./props/PropsDrillingExample.js";
import UseReducerExample from "./useReducer/UseReducerExample.js";
import styles from "./stateManagement.module.css";
import GlobalStateWithZustandExample from "./zustand/GlobalStateWithZustandExample.js";

export default function StateManagementPage() {
  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <span className={styles.eyebrow}>State Management</span>
        <h1 className={styles.title}>State Management Examples</h1>
        <p className={styles.lead}>
          Explore how data flows across components by comparing basic state with
          prop drilling patterns and reducer-powered coordination.
        </p>
      </div>

      <div className={styles.examples}>
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>useState Example</h2>
          <p className={styles.sectionCopy}>
            Flip between light and dark themes to highlight how local component
            state powers dynamic styling.
          </p>
          <UseStateExample />
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>
            Passing Props To One Child Example
          </h2>
          <p className={styles.sectionCopy}>
            Share a counter with one child component and surface update handlers
            from the parent.
          </p>
          <PassingPropsToOneChildExample />
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>
            Passing Props To Two Child Example
          </h2>
          <p className={styles.sectionCopy}>
            The same counter fanned out to multiple children shows how prop
            drilling repeats boilerplate quickly.
          </p>
          <PassingPropsToTwoChildExample />
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Props Drilling Example</h2>
          <p className={styles.sectionCopy}>
            Follow the count through three generations to see how deeply nested
            props impact component ergonomics.
          </p>
          <PropsDrillingExample />
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>useReducer Example</h2>
          <p className={styles.sectionCopy}>
            Coordinate updates with a reducer and dispatch functions to
            centralise state transitions.
          </p>
          <UseReducerExample />
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Zustand Store Snapshot</h2>
          <p className={styles.sectionCopy}>
            Watch the shared countdown from the React Query examples update in
            real time without prop drilling.
          </p>
          <GlobalStateWithZustandExample />
        </section>
      </div>
    </div>
  );
}
