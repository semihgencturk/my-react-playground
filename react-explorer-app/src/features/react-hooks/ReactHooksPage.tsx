import BeforeUseEffectSingleEffectExample from "./useEffect/BeforeUseEffectSingleEffectExample.js";
import BeforeUseEffectMultipleEffectExample from "./useEffect/BeforeUseEffectMultipleEffectExample.js";
import BeforeUseStateSingleStateExample from "./useState/BeforeUseStateSingleStateExample.js";
import UseEffectExample from "./useEffect/UseEffectExample.js";
import BeforeUseStateMultipleStateExample from "./useState/BeforeUseStateMultipleStateExample.js";
import UseStateExample from "./useState/UseStateExample.js";
import styles from "./hooksExamples.module.css";
import BeforeUseRefExample from "./useRef/BeforeUseRefExample.js";
import UseRefExample from "./useRef/UseRefExample.js";
import WithoutUseMemoExample from "./useMemo/WithoutUseMemoExample.js";
import UseMemoExample from "./useMemo/UseMemoExample.js";
import WithoutUseCallbackExample from "./useCallback/WithoutUseCallbackExample.js";
import UseCallbackExample from "./useCallback/UseCallbackExample.js";

export default function ReactHooksPage() {
  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <span className={styles.eyebrow}>React Hooks</span>
        <h1 className={styles.title}>React Hooks Examples</h1>
        <p className={styles.lead}>
          Compare the class-based lifecycle patterns that existed before hooks
          with their modern, hook-driven counterparts.
        </p>
      </div>

      <div className={styles.sections}>
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>
            State Before &amp; After Hooks
          </h2>
          <p className={styles.sectionCopy}>
            Increment counters in class components and see how the same logic
            becomes simpler with the `useState` hook.
          </p>
          <div className={styles.demoGrid}>
            <BeforeUseStateSingleStateExample />
            <BeforeUseStateMultipleStateExample />
            <UseStateExample />
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>
            Effects Before &amp; After Hooks
          </h2>
          <p className={styles.sectionCopy}>
            Observe how `componentDidUpdate` branches transform into focused
            `useEffect` calls that isolate side-effect logic.
          </p>
          <div className={styles.demoGrid}>
            <BeforeUseEffectSingleEffectExample />
            <BeforeUseEffectMultipleEffectExample />
            <UseEffectExample />
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Refs Before &amp; After Hooks</h2>
          <p className={styles.sectionCopy}>
            Compare the class-based `createRef` approach with the functional
            `useRef` hook to manage focus and other imperative DOM tasks.
          </p>
          <div className={styles.demoGridPair}>
            <BeforeUseRefExample />
            <UseRefExample />
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>
            Memoization Before &amp; After Hooks
          </h2>
          <p className={styles.sectionCopy}>
            Heavy calculations run every render without memoization. The
            `useMemo` hook caches results until dependencies change, boosting
            performance.
          </p>
          <div className={styles.demoGridPair}>
            <WithoutUseMemoExample />
            <UseMemoExample />
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>
            Callback Memoization Before &amp; After Hooks
          </h2>
          <p className={styles.sectionCopy}>
            Creating handlers inside the render path introduces new function
            references every time. Pairing `useCallback` with `React.memo`
            stabilises props and reduces wasted renders.
          </p>
          <div className={styles.demoGridPair}>
            <WithoutUseCallbackExample />
            <UseCallbackExample />
          </div>
        </section>
      </div>
    </div>
  );
}
