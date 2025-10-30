import {
  type ChangeEvent,
  useEffect,
  useMemo,
  useState,
  useTransition,
} from "react";
import styles from "./UseTransitionExample.module.css";

interface City {
  id: number;
  name: string;
  country: string;
  population: number;
}

const BLOCKING_DURATION_MS = 900;
const RESULTS_TO_SHOW = 40;

const instructionItems = [
  "Type quickly while the transition is enabled and watch the pending badge update without freezing the field.",
  "Disable the transition, repeat the search, and notice how keystrokes wait for the blocking work to finish.",
  "Start a transition, then trigger the urgent update to see the deferred render pause and resume in the console.",
];

const COUNTRIES = [
  "Madagascar",
  "Spain",
  "Italy",
  "South Africa",
  "Scotland",
  "Australia",
  "Kenya",
  "Botswana",
];

function buildCityDirectory(): City[] {
  return Array.from({ length: 6000000 }, (_, index) => {
    const cityNumber = index + 1;
    const country = COUNTRIES[index % COUNTRIES.length];

    return {
      id: cityNumber,
      name: `City ${cityNumber}`,
      country,
      population: 50_000 + (index % 120) * 1_000,
    };
  });
}

function blockMainThread(durationMs: number) {
  const getTime =
    typeof performance !== "undefined" ? () => performance.now() : Date.now;

  const start = getTime();
  while (getTime() - start < durationMs) {
    // Busy loop to simulate CPU-bound work that blocks the thread.
  }
}

function slowFilter(list: City[], query: string) {
  const normalizedQuery = query.trim().toLowerCase();

  blockMainThread(BLOCKING_DURATION_MS);

  if (!normalizedQuery) {
    return list;
  }

  return list.filter((city) => {
    return (
      city.name.toLowerCase().includes(normalizedQuery) ||
      city.country.toLowerCase().includes(normalizedQuery)
    );
  });
}

export function UseTransitionExample() {
  const cities = useMemo(() => buildCityDirectory(), []);
  const [query, setQuery] = useState("");
  const [useConcurrentMode, setUseConcurrentMode] = useState(true);
  const [results, setResults] = useState<City[]>(cities);
  const [isPending, startTransition] = useTransition();
  const [urgentCount, setUrgentCount] = useState(0);
  const [lastUrgentAt, setLastUrgentAt] = useState<number | null>(null);

  useEffect(() => {
    console.log(`[transition] isPending changed: ${isPending}`);
  }, [isPending]);

  const handleQueryChange = (event: ChangeEvent<HTMLInputElement>) => {
    const nextQuery = event.target.value;
    setQuery(nextQuery);
    console.log(`[transition] Scheduling filter for query "${nextQuery}".`);

    const updateResults = () => {
      const filtered = slowFilter(cities, nextQuery);
      console.log(
        `[transition] Heavy filter finished for query "${nextQuery}" with ${filtered.length} matches.`
      );
      setResults(filtered);
    };

    if (useConcurrentMode) {
      startTransition(() => {
        console.log("[transition] startTransition invoked.");
        updateResults();
        console.log("[transition] startTransition work completed.");
      });
    } else {
      updateResults();
    }
  };

  const handleModeToggle = () => {
    const nextMode = !useConcurrentMode;
    console.log(
      `[transition] Toggling concurrent mode: ${
        nextMode ? "enabled" : "disabled"
      }.`
    );
    setUseConcurrentMode(nextMode);
    setResults((current) => slowFilter(cities, query));
  };

  const handleUrgentAction = () => {
    console.log("[urgent] Button clicked. Processing urgent state update.");
    setUrgentCount((count) => {
      const nextCount = count + 1;
      console.log(`[urgent] Urgent count updated to ${nextCount}.`);
      return nextCount;
    });
    const timestamp = Date.now();
    setLastUrgentAt(timestamp);
    console.log("[urgent] Urgent timestamp recorded.", {
      timestamp,
      isPending,
    });
  };

  const statusMessage = isPending
    ? "Rendering filtered list..."
    : `${results.length} matching cities`;

  const lastUrgentDisplay = lastUrgentAt
    ? new Date(lastUrgentAt).toLocaleTimeString()
    : "—";
  const visibleResults = results.slice(0, RESULTS_TO_SHOW);
  const statusBadgeClassName = isPending
    ? `${styles.statusBadge} ${styles.statusBadgePending}`
    : styles.statusBadge;

  return (
    <section className={styles.container}>
      <header className={styles.header}>
        <span className={styles.eyebrow}>Concurrency demo</span>
        <h3 className={styles.title}>
          Responsive filtering with useTransition
        </h3>
        <p className={styles.lead}>
          Filter thousands of synthetic city records while keeping the input
          responsive. The blocking work runs inside <code>startTransition</code>{" "}
          so React can prioritise urgent user feedback.
        </p>
      </header>

      <div className={styles.toolbar}>
        <label className={styles.searchLabel} htmlFor="city-search">
          <span>Search cities</span>
          <input
            className={styles.input}
            id="city-search"
            value={query}
            onChange={handleQueryChange}
            placeholder="Start typing to filter thousands of cities..."
            aria-describedby="transition-status"
          />
        </label>

        <button
          type="button"
          onClick={handleModeToggle}
          className={styles.primaryButton}
        >
          {useConcurrentMode ? "Disable" : "Enable"} useTransition
        </button>
      </div>

      <div className={styles.statusRow}>
        <span className={statusBadgeClassName}>
          {isPending ? "Pending render" : "Idle"}
        </span>
        <p
          className={styles.statusMessage}
          id="transition-status"
          aria-live="polite"
        >
          {statusMessage}
        </p>
        {isPending && (
          <p className={styles.pendingNote} aria-live="polite">
            Deferred work is running in the background...
          </p>
        )}
      </div>

      <div className={styles.urgentPanel}>
        <div>
          <h4 className={styles.panelTitle}>Urgent work</h4>
          <p className={styles.panelCopy}>
            Urgent updates handled: <strong>{urgentCount}</strong> (last at{" "}
            {lastUrgentDisplay})
          </p>
        </div>
        <button
          type="button"
          onClick={handleUrgentAction}
          className={styles.secondaryButton}
        >
          Trigger urgent update
        </button>
      </div>

      <div className={styles.resultsSection}>
        <h4 className={styles.resultsTitle}>Filter results</h4>
        <p className={styles.resultsHint}>
          Showing up to {RESULTS_TO_SHOW} matches out of {results.length}.
        </p>
        <ul className={styles.resultsList}>
          {visibleResults.length > 0 ? (
            visibleResults.map((city) => (
              <li key={city.id} className={styles.resultItem}>
                <strong>{city.name}</strong>
                <span className={styles.resultMeta}>
                  {city.country} · {city.population.toLocaleString()} residents
                </span>
              </li>
            ))
          ) : (
            <li className={styles.emptyState}>
              No cities found. Try a different query.
            </li>
          )}
        </ul>
      </div>

      <aside className={styles.instructions}>
        <h4 className={styles.instructionsTitle}>Try this</h4>
        <ul className={styles.instructionList}>
          {instructionItems.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </aside>
    </section>
  );
}
