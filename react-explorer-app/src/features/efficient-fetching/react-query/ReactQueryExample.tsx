import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import styles from "./reactQueryExample.module.css";
import {
  STALE_TIME_MS,
  STALE_TIME_SECONDS,
  useReactQueryCountdownStore,
} from "@/stores/reactQueryCountdownStore";

// Define the shape of a user from the API
interface User {
  id: number;
  name: string;
  email: string;
  username: string;
}

// Fetch function typed with a return type
async function fetchUsers(): Promise<User[]> {
  const res = await fetch("https://jsonplaceholder.typicode.com/users");
  if (!res.ok) throw new Error("Network response was not ok");
  return res.json();
}

export default function ReactQueryExample() {
  // useQuery automatically infers types from fetchUsers
  const { data, error, isLoading, isFetching, dataUpdatedAt } = useQuery<
    User[]
  >({
    queryKey: ["users"],
    queryFn: fetchUsers,
    staleTime: STALE_TIME_MS, // 1 minute
  });

  const secondsLeft = useReactQueryCountdownStore(
    (state: { secondsLeft: any }) => state.secondsLeft
  );
  const syncFromQuery = useReactQueryCountdownStore(
    (state: { syncFromQuery: any }) => state.syncFromQuery
  );

  useEffect(() => {
    if (!dataUpdatedAt) return;
    syncFromQuery(dataUpdatedAt, STALE_TIME_MS);
  }, [dataUpdatedAt, syncFromQuery]);

  if (isLoading) {
    return (
      <section className={styles.card}>
        <div className={styles.heading}>
          <h2 className={styles.title}>React Query Users</h2>
          <p className={styles.description}>
            Fetching users from a placeholder API. React Query handles loading,
            caching, and background revalidation for us.
          </p>
        </div>
        <p className={styles.description}>Loading users...</p>
      </section>
    );
  }

  if (error instanceof Error) {
    return (
      <section className={styles.card}>
        <div className={styles.heading}>
          <h2 className={styles.title}>React Query Users</h2>
          <p className={styles.description}>
            Fetching users from a placeholder API. React Query handles loading,
            caching, and background revalidation for us.
          </p>
        </div>
        <p className={styles.helper}>Unable to load users: {error.message}</p>
      </section>
    );
  }

  return (
    <section className={styles.card}>
      <div className={styles.heading}>
        <h2 className={styles.title}>React Query Users</h2>
        <p className={styles.description}>
          This example uses <code>useQuery</code> with a typed fetcher to show
          how data + status values flow through the component. Refresh the page
          or interact with the devtools to see caching in action.
        </p>
        <div className={styles.meta}>
          <span className={styles.badge}>Query Key: users</span>
          {isFetching && (
            <span className={styles.helper}>
              Background refetch in progress…
            </span>
          )}
        </div>
      </div>

      <div className={styles.tip}>
        <span className={styles.tipIcon}>🧭</span>
        <div className={styles.tipContent}>
          <p className={styles.tipTitle}>Network Explorer</p>
          <p className={styles.tipBody}>
            Switch to a different route, then come back and observe the Network
            tab. You won&apos;t see a new `users` request immediately because
            the data is warm in the cache. After roughly {STALE_TIME_SECONDS}{" "}
            seconds (the configured `staleTime`) React Query will trigger a
            background refetch. Developers can adjust this window as needed.
          </p>
          <p className={styles.tipCounter}>
            Countdown to next fetch:{" "}
            <span className={styles.tipCounterValue}>
              {secondsLeft.toString().padStart(2, "0")}s
            </span>{" "}
            —{" "}
            {secondsLeft > 0
              ? "no additional network calls will fire before this timer finishes; it resets as soon as React Query fetches new data."
              : "the cache is stale now, so watch for the refetch request."}
          </p>
        </div>
      </div>

      <ul className={styles.list}>
        {data?.map((user) => (
          <li key={user.id} className={styles.item}>
            <span className={styles.name}>{user.name}</span>
            <span className={styles.email}>{user.email}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
