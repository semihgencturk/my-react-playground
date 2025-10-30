import { useEffect } from "react";
import styles from "../functions.module.css";

export default function MicroMacroTasksDemo() {
  useEffect(() => {
    console.log(
      "Explanation: The code excution order: 1->5 but you will see that 1,5,3,4,2"
    );
    console.log("1. Script start");

    // Macrotask → runs after all microtasks complete
    setTimeout(() => console.log("2. setTimeout (macrotask)"), 0);

    // Microtask → runs before macrotasks
    Promise.resolve().then(() => console.log("3. Promise.then (microtask)"));

    // Microtask → explicit queueMicrotask
    queueMicrotask(() => console.log("4. queueMicrotask (microtask)"));

    console.log("5. Script end");
  }, []);

  const runEventLoopDemo = () => {
    console.clear();
    console.log("🧠 Event Loop Demo Started");

    console.log("1️⃣ Synchronous start");

    // Schedule a macrotask
    setTimeout(() => {
      console.log("5️⃣ Macrotask (setTimeout 0ms)");
    }, 0);

    // Schedule a microtask using a resolved Promise
    Promise.resolve().then(() => {
      console.log("3️⃣ Microtask (Promise.then)");
    });

    // Schedule another microtask manually
    queueMicrotask(() => {
      console.log("4️⃣ Microtask (queueMicrotask)");
    });

    console.log("2️⃣ Synchronous end");
  };

  const runAdvancedScenario = () => {
    console.clear();
    console.log("🚀 Advanced Event Loop Scenario");

    setTimeout(() => console.log("🧱 Timeout A (macrotask)"), 0);
    setTimeout(() => console.log("🧱 Timeout B (macrotask)"), 0);

    Promise.resolve()
      .then(() => {
        console.log("🔹 Microtask 1");
        setTimeout(
          () => console.log("🟢 Nested Timeout (from Microtask 1)"),
          0
        );
      })
      .then(() => {
        console.log("🔹 Microtask 2");
      });

    console.log("🧩 Sync code end");
  };

  return (
    <section className={styles.card}>
      <div className={styles.cardHeader}>
        <span className={styles.badge}>Event Loop</span>
        <h2 className={styles.cardTitle}>Microtasks vs. Macrotasks</h2>
        <p className={styles.cardSubtitle}>
          Trigger different queue types to visualize how JavaScript interleaves
          synchronous work, microtasks, and macrotasks.
        </p>
      </div>

      <div className={styles.innerStack}>
        <div className={styles.twoColumn}>
          <div>
            <p className={styles.buttonGroupLabel}>Queues at a glance</p>
            <ul className={styles.list}>
              <li>Microtasks: Promise callbacks, queueMicrotask, process.nextTick</li>
              <li>Macrotasks: setTimeout, setInterval, fetch callbacks, I/O</li>
            </ul>
          </div>
          <div className={styles.callout}>
            Microtasks flush immediately after the current synchronous frame.
            Macrotasks wait for the next event loop tick, so they always run
            after pending microtasks finish.
          </div>
        </div>

        <div className={styles.buttonRow}>
          <button
            type="button"
            onClick={runEventLoopDemo}
            className={`${styles.button} ${styles.buttonPrimary}`}
          >
            Run basic demo
          </button>
          <button
            type="button"
            onClick={runAdvancedScenario}
            className={styles.button}
          >
            Run advanced scenario
          </button>
        </div>

        <p className={styles.consoleNote}>
          Clear your console before each run to watch the precise ordering of
          logs as the queues drain.
        </p>
      </div>
    </section>
  );
}
