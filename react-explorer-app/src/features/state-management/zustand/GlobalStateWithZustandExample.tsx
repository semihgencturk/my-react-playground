import {
  STALE_TIME_SECONDS,
  useReactQueryCountdownStore,
} from "@/stores/reactQueryCountdownStore";
import styles from "./GlobalStateWithZustandExample.module.css";

export default function GlobalStateWithZustandExample() {
  const secondsLeft = useReactQueryCountdownStore(
    (state: { secondsLeft: any }) => state.secondsLeft
  );

  return (
    <div className={styles.panel}>
      <p className={styles.label}>Seconds To Refetch</p>
      <p className={styles.value}>{secondsLeft}</p>
      <p className={styles.caption}>
        This countdown lives in a shared Zustand store. React Query resets it
        every {STALE_TIME_SECONDS} seconds when fresh data arrives.
      </p>
      <p className={styles.tip}>
        Tip: jump over to the React Query tab and then return here to watch the
        timer resync from the shared store in real time.
      </p>
    </div>
  );
}
