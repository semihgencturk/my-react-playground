import { create } from "zustand";

export const STALE_TIME_MS = 60_000;
export const STALE_TIME_SECONDS = Math.ceil(STALE_TIME_MS / 1000);

interface ReactQueryCountdownState {
  lastUpdatedAt: number | null;
  nextRefetchAt: number | null;
  staleTimeMs: number;
  secondsLeft: number;
  syncFromQuery: (updatedAt: number, staleTimeMs: number) => void;
}

let intervalId: number | null = null;

const computeSecondsRemaining = (target: number | null, staleTimeMs: number) => {
  if (!target) {
    return Math.max(0, Math.ceil(staleTimeMs / 1000));
  }

  const diff = Math.ceil((target - Date.now()) / 1000);
  return diff > 0 ? diff : 0;
};

export const useReactQueryCountdownStore = create<ReactQueryCountdownState>(
  (set, get) => {
    const ensureInterval = () => {
      if (intervalId !== null) return;

      intervalId = window.setInterval(() => {
        const { nextRefetchAt, staleTimeMs } = get();
        if (!nextRefetchAt) return;

        const remaining = computeSecondsRemaining(nextRefetchAt, staleTimeMs);
        set({ secondsLeft: remaining });

        if (remaining <= 0) {
          window.clearInterval(intervalId!);
          intervalId = null;
        }
      }, 1000);
    };

    return {
      lastUpdatedAt: null,
      nextRefetchAt: null,
      staleTimeMs: STALE_TIME_MS,
      secondsLeft: STALE_TIME_SECONDS,
      syncFromQuery: (updatedAt, staleTimeMs) => {
        if (!updatedAt) return;

        const { lastUpdatedAt } = get();
        const staleTimeToUse = staleTimeMs || STALE_TIME_MS;

        if (lastUpdatedAt === updatedAt) {
          const { nextRefetchAt } = get();
          if (nextRefetchAt) {
            set({
              secondsLeft: computeSecondsRemaining(nextRefetchAt, staleTimeToUse),
            });
          }
          ensureInterval();
          return;
        }

        const nextAt = updatedAt + staleTimeToUse;

        set({
          lastUpdatedAt: updatedAt,
          nextRefetchAt: nextAt,
          staleTimeMs: staleTimeToUse,
          secondsLeft: computeSecondsRemaining(nextAt, staleTimeToUse),
        });

        ensureInterval();
      },
    };
  }
);
