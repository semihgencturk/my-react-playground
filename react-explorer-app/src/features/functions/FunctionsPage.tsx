import SyncAsyncFunctionsSection from "./async-diff-sync/SyncAsyncFunctionsSection";
import AsyncAwaitDemo from "./asynchronous-functions/AysncAwaitDemo";
import MicroMacroTasksDemo from "./microtasks-macrotasks/MicroMacroTasks";
import UiFreezeDemo from "./ui-freeze/UiFreezeDemo";
import styles from "./functions.module.css";

export default function FunctionsPage() {
  return (
    <div className={styles.page}>
      <section className={styles.intro}>
        <h1 className={styles.pageTitle}>Asynchronous Function Patterns</h1>
        <p className={styles.pageSubtitle}>
          Experiment with synchronous blocks, async/await workflows, Promise
          utilities, and the browser event loop. Open your console, click
          through the interactive controls, and watch how each pattern behaves.
        </p>
      </section>

      <SyncAsyncFunctionsSection />
      <AsyncAwaitDemo />
      <UiFreezeDemo />
      <MicroMacroTasksDemo />
    </div>
  );
}
