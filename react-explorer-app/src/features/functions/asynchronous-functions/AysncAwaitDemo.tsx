import {
  cancellableTask,
  createCancelRef,
  fakeApiCall,
  fakeApiCallWithErorPropagation,
} from "./asyncWorker";
import styles from "../functions.module.css";

export default function AsyncAwaitDemo() {
  // 1️⃣ Using .then() / .catch()
  const showPromiseChain = () => {
    console.log("▶ Starting Promise chain example...");

    fakeApiCall("Promise-1")
      .then((result1) => {
        console.log("Result 1:", result1);
        return fakeApiCall("Promise-2");
      })
      .then((result2) => {
        console.log("Result 2:", result2);
        console.log("🟩 Promise chain finished");
      })
      .catch((err) => console.error("Error:", err));
  };

  // 2️⃣ Using async/await sequentially
  const showAwaitSequential = async () => {
    console.log("▶ Starting async/await (sequential)...");
    try {
      const res1 = await fakeApiCall("Await-1");
      const res2 = await fakeApiCall("Await-2");
      console.log("Results:", res1, res2);
      console.log("🟩 Sequential await finished");
    } catch (err) {
      console.error("Error:", err);
    }
  };

  // 3️⃣ Using async/await in parallel with Promise.all
  const showAwaitParallel = async () => {
    console.log("▶ Starting async/await (parallel)...");
    try {
      const [res1, res2] = await Promise.all([
        fakeApiCall("Parallel-1", 2000),
        fakeApiCall("Parallel-2", 2000),
      ]);
      console.log("Results:", res1, res2);
      console.log("🟩 Parallel await finished");
    } catch (err) {
      console.error("Error:", err);
    }
  };

  const showErrorPropagration = async () => {
    console.log("▶ Starting async/await (parallel)...");
    try {
      const [a, b] = await Promise.all([
        fakeApiCallWithErorPropagation("SuccessExample"),
        fakeApiCallWithErorPropagation("FailExample"), // one rejects
      ]);
    } catch (err) {
      console.error("Caught error:", err);
    }
  };

  const showAllSettled = async () => {
    const results = await Promise.allSettled([
      fakeApiCallWithErorPropagation("SuccessExample"),
      fakeApiCallWithErorPropagation("FailExample"),
    ]);
    console.log(results);
  };

  const showRaceConditionExample = async () => {
    const winner = await Promise.race([
      fakeApiCall("Fast", 1000),
      fakeApiCall("Slow", 3000),
    ]);
    console.log("Winner:", winner);
  };

  const showCancellableRaceConditionExample = async () => {
    console.log("▶ Starting cancellable race example...");
    const cancelRef = createCancelRef();

    try {
      const racePromise = Promise.race([
        cancellableTask("CancellableFast", 1000, cancelRef),
        cancellableTask("CancellableSlow", 3000, cancelRef),
      ]);

      console.log("⏳ Race started; awaiting winner...");
      const winner = await racePromise;

      console.log("✅ Winner received:", winner);
      if (!cancelRef.cancelled) {
        console.log("⏹ Cancelling remaining tasks after winner.");
        cancelRef.cancel();
      }
    } catch (err) {
      console.error("⚠️ Cancellable race error:", err);
      cancelRef.cancel();
    } finally {
      cancelRef.reset();
      console.log("🔁 Cancel ref reset; ready for next run.");
    }
  };

  const showAbordableRaceConditionExample = async () => {
    const controller1 = new AbortController();
    const controller2 = new AbortController();

    // httpbin lets you add ?delay=SECONDS to simulate slow endpoints
    const fast = fetch("https://httpbin.org/delay/2", {
      signal: controller1.signal,
    }); // 2s delay
    const slow = fetch("https://httpbin.org/delay/5", {
      signal: controller2.signal,
    }); // 5s delay

    Promise.race([fast, slow])
      .then(async (winner) => {
        console.log("✅ Winner response received!");
        const data = await winner.json();
        console.log("Winner JSON:", data);

        // Abort the remaining request
        controller1.abort();
        controller2.abort();
        console.log("Race.then block execution is finished.");
      })
      .catch((err) => {
        if (err.name === "AbortError") {
          console.warn("❌ One of the requests was aborted.");
        } else {
          console.error("⚠️ Fetch error:", err);
        }
      });
    console.log("Race block execution is finished.");
  };

  return (
    <section className={styles.card}>
      <div className={styles.cardHeader}>
        <span className={styles.badge}>Async & Await</span>
        <h2 className={styles.cardTitle}>Promise Flow Playground</h2>
        <p className={styles.cardSubtitle}>
          Explore chaining, sequential vs. parallel invocation, error
          propagation, and race conditions. Each control logs timing insights to
          the console.
        </p>
      </div>

      <div className={styles.innerStack}>
        <div className={styles.buttonCluster}>
          <p className={styles.buttonGroupLabel}>Core Promise Patterns</p>
          <div className={styles.buttonGrid}>
            <button
              type="button"
              onClick={showPromiseChain}
              className={`${styles.button} ${styles.buttonPrimary}`}
            >
              Run with .then() / .catch()
            </button>
            <button
              type="button"
              onClick={showAwaitSequential}
              className={styles.button}
            >
              Async / await (sequential)
            </button>
            <button
              type="button"
              onClick={showAwaitParallel}
              className={styles.button}
            >
              Async / await (parallel)
            </button>
            <button
              type="button"
              onClick={showErrorPropagration}
              className={styles.button}
            >
              Error propagation (Promise.all)
            </button>
            <button
              type="button"
              onClick={showAllSettled}
              className={styles.button}
            >
              Promise.allSettled example
            </button>
          </div>
        </div>

        <div className={styles.buttonCluster}>
          <p className={styles.buttonGroupLabel}>Race Conditions</p>
          <div className={styles.buttonGrid}>
            <button
              type="button"
              onClick={showRaceConditionExample}
              className={styles.button}
            >
              Promise.race demo
            </button>
            <button
              type="button"
              onClick={showCancellableRaceConditionExample}
              className={styles.button}
            >
              Promise.race with cancel
            </button>
            <button
              type="button"
              onClick={showAbordableRaceConditionExample}
              className={`${styles.button} ${styles.buttonAccent}`}
            >
              Promise.race + fetch abort
            </button>
          </div>
        </div>

        <p className={styles.hint}>
          Keep the console visible to compare how microtasks settle before
          macrotasks when these examples schedule work.
        </p>
      </div>
    </section>
  );
}
