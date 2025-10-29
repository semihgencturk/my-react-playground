import { useEffect, useMemo, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import styles from "./weatherDashboard.module.css";
import {
  fetchCurrentWeather,
  fetchForecastWeather,
  fetchHistoricalWeather,
} from "./weatherApi.js";

const STALE_TIME = 1000 * 60 * 5; // 5 minutes

const cities = ["Istanbul", "Paris", "Amsterdam", "Hamburg", "Munich", "Ankara"];

const VIEW_CONFIG = {
  forecast: {
    label: "3-Day Outlook",
    button: "Show 3-Day Outlook",
    promiseLabel: "extended forecast",
  },
  history: {
    label: "Weather History",
    button: "Show Weather History",
    promiseLabel: "historical snapshot",
  },
};

const VIEW_ORDER = ["forecast", "history"];

const getQueryKey = (view, city) => ["weather", view, city];

async function fetchWeather(view, city, yesterday) {
  if (!city) {
    throw new Error("City is required to fetch weather data.");
  }

  return view === "forecast"
    ? fetchForecastWeather(city, 3)
    : fetchHistoricalWeather(city, yesterday);
}

export default function WeatherDashboard() {
  const queryClient = useQueryClient();
  const [overview, setOverview] = useState({ loading: true, error: null, data: [] });
  const [selectedCity, setSelectedCity] = useState(null);
  const [selectedView, setSelectedView] = useState("forecast");
  const [status, setStatus] = useState(
    "Hover a city to prefetch its forecast and history snapshots."
  );

  const yesterday = useMemo(() => {
    const date = new Date();
    date.setDate(date.getDate() - 1);
    return date.toISOString().slice(0, 10);
  }, []);

  useEffect(() => {
    let cancelled = false;
    const controller = new AbortController();

    async function loadOverview() {
      try {
        setOverview((prev) => ({ ...prev, loading: true, error: null }));

        const responses = await Promise.all(
          cities.map(async (city) => {
            const json = await fetchCurrentWeather(city, controller.signal);
            return {
              name: city,
              temp_c: json.current?.temp_c ?? 0,
              condition: json.current?.condition?.text ?? "Unknown",
            };
          })
        );

        if (!cancelled) {
          setOverview({ loading: false, error: null, data: responses });
        }
      } catch (error) {
        if (!cancelled) {
          setOverview({
            loading: false,
            error:
              error instanceof Error
                ? error.message
                : "Unable to load weather overview.",
            data: [],
          });
        }
      }
    }

    void loadOverview();

    return () => {
      cancelled = true;
      controller.abort();
    };
  }, []);

  const selectedQueryKey = selectedCity
    ? getQueryKey(selectedView, selectedCity)
    : ["weather", "placeholder"];

  const {
    data: selectedData,
    isLoading: isSelectedLoading,
    isFetching: isSelectedFetching,
    isError: isSelectedError,
    error: selectedError,
  } = useQuery({
    queryKey: selectedQueryKey,
    queryFn: () => fetchWeather(selectedView, selectedCity ?? "", yesterday),
    enabled: Boolean(selectedCity),
    staleTime: STALE_TIME,
  });

  useEffect(() => {
    if (!selectedCity) return;

    if (isSelectedError) {
      setStatus(
        selectedError instanceof Error
          ? selectedError.message
          : `Unable to load ${VIEW_CONFIG[selectedView].promiseLabel} for ${selectedCity}.`
      );
      return;
    }

    if (isSelectedFetching) {
      setStatus(
        `Fetching ${VIEW_CONFIG[selectedView].promiseLabel} for ${selectedCity}…`
      );
      return;
    }

    if (selectedData) {
      setStatus(`${VIEW_CONFIG[selectedView].label} for ${selectedCity} ready.`);
    }
  }, [
    isSelectedError,
    isSelectedFetching,
    selectedCity,
    selectedData,
    selectedError,
    selectedView,
  ]);

  const handlePrefetch = async (city, view) => {
    const queryKey = getQueryKey(view, city);
    const existing = queryClient.getQueryState(queryKey);

    if (existing?.status === "success") {
      setStatus(`${VIEW_CONFIG[view].label} for ${city} already cached.`);
      return;
    }

    setStatus(`Prefetching ${VIEW_CONFIG[view].promiseLabel} for ${city}…`);

    try {
      await queryClient.prefetchQuery({
        queryKey,
        queryFn: () => fetchWeather(view, city, yesterday),
        staleTime: STALE_TIME,
      });
      setStatus(`${VIEW_CONFIG[view].label} for ${city} warmed in cache.`);
    } catch (error) {
      setStatus(
        error instanceof Error
          ? error.message
          : `Unable to prefetch ${VIEW_CONFIG[view].promiseLabel} — try again.`
      );
    }
  };

  const handleSelect = (city, view) => {
    setSelectedCity(city);
    setSelectedView(view);
    void handlePrefetch(city, view);
  };

  const renderForecast = (data) => (
    <div className={styles.forecastGrid}>
      {data?.forecast?.forecastday?.map((day) => (
        <div key={day.date} className={styles.forecastItem}>
          <span className={styles.date}>{day.date}</span>
          <span className={styles.temperature}>
            {Math.round(day.day.avgtemp_c)}°C · {day.day.condition.text}
          </span>
        </div>
      ))}
    </div>
  );

  const renderHistory = (data) => (
    <div className={styles.historyGrid}>
      {data?.forecast?.forecastday?.map((day) => (
        <div key={day.date} className={styles.historyItem}>
          <span className={styles.date}>{day.date}</span>
          <div className={styles.historyMeta}>
            <span>
              Avg {Math.round(day.day.avgtemp_c)}°C · {day.day.condition.text}
            </span>
            <span>
              High {Math.round(day.day.maxtemp_c)}°C / Low {Math.round(day.day.mintemp_c)}°C
            </span>
            <span>
              Humidity {day.day.avghumidity}% · Wind {Math.round(day.day.maxwind_kph)} km/h
            </span>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className={styles.dashboard}>
      <section className={styles.overviewCard}>
        <header className={styles.overviewHeader}>
          <h3 className={styles.overviewTitle}>Global Weather Pulse</h3>
          <span className={styles.statusPill}>
            {overview.loading ? "Loading" : "Live"}
          </span>
        </header>

        {overview.error ? (
          <div className={styles.error}>{overview.error}</div>
        ) : overview.loading ? (
          <div className={styles.loadingSkeleton}>
            {cities.map((city) => (
              <span key={city} className={styles.loadingBar} />
            ))}
          </div>
        ) : (
          <div className={styles.cityGrid}>
            {overview.data.map((city) => {
              const isActive = city.name === selectedCity;
              const showSkeleton =
                isActive && (!selectedData && (isSelectedLoading || isSelectedFetching));
              const showError = isActive && isSelectedError;
              const showData = isActive && selectedData && !isSelectedError;

              return (
                <div
                  key={city.name}
                  className={`${styles.cityCard} ${
                    isActive ? styles.cityCardActive : ""
                  }`}
                  onMouseEnter={() => {
                    void handlePrefetch(city.name, "forecast");
                    void handlePrefetch(city.name, "history");
                  }}
                >
                  <div>
                    <span className={styles.cityName}>{city.name}</span>
                    <div className={styles.cityMeta}>
                      <span className={styles.cityTemp}>
                        {Math.round(city.temp_c)}°C
                      </span>
                      <span className={styles.cityCondition}>{city.condition}</span>
                    </div>
                  </div>

                  <div className={styles.cityActionGroup}>
                    {VIEW_ORDER.map((view) => {
                      const isActionActive = isActive && selectedView === view;
                      return (
                        <button
                          key={view}
                          type="button"
                          className={`${styles.cityAction} ${
                            view === "history" ? styles.cityActionSecondary : ""
                          } ${isActionActive ? styles.cityActionActive : ""}`}
                          onClick={() => handleSelect(city.name, view)}
                          onFocus={() => handlePrefetch(city.name, view)}
                        >
                          {VIEW_CONFIG[view].button}
                        </button>
                      );
                    })}
                  </div>

                  {isActive && (
                    <div className={styles.cityExpansion}>
                      <div className={styles.expansionHeader}>
                        <span className={styles.expansionTitle}>
                          {VIEW_CONFIG[selectedView].label}
                        </span>
                        <span className={styles.expansionLabel}>{city.name}</span>
                      </div>

                      {showError ? (
                        <div className={styles.error}>
                          {selectedError instanceof Error
                            ? selectedError.message
                            : "Unable to load data."}
                        </div>
                      ) : showSkeleton ? (
                        <div className={styles.loadingSkeleton}>
                          <span className={styles.loadingBar} />
                          <span className={styles.loadingBar} />
                          <span className={styles.loadingBar} />
                        </div>
                      ) : showData ? (
                        selectedView === "forecast"
                          ? renderForecast(selectedData)
                          : renderHistory(selectedData)
                      ) : null}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </section>

      <span className={styles.statusMessage}>{status}</span>
    </div>
  );
}
