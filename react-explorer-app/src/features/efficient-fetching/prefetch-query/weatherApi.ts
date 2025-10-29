const WEATHER_BASE_URL = "https://api.weatherapi.com/v1";

function getWeatherApiKey(): string {
  const key = import.meta.env.VITE_WEATHER_API_KEY;
  if (!key) {
    throw new Error(
      "Missing VITE_WEATHER_API_KEY. Add it to your environment to load weather data."
    );
  }
  return key;
}

const encodeCity = (city: string) => encodeURIComponent(city);

export const weatherEndpoints = {
  current(city: string) {
    const key = getWeatherApiKey();
    return `${WEATHER_BASE_URL}/current.json?key=${key}&q=${encodeCity(city)}`;
  },
  forecast(city: string, days = 3) {
    const key = getWeatherApiKey();
    return `${WEATHER_BASE_URL}/forecast.json?key=${key}&q=${encodeCity(
      city
    )}&days=${days}`;
  },
  history(city: string, date: string) {
    const key = getWeatherApiKey();
    return `${WEATHER_BASE_URL}/history.json?key=${key}&q=${encodeCity(
      city
    )}&dt=${date}`;
  },
} as const;

async function fetchWeatherJson(url: string, signal?: AbortSignal) {
  const response = await fetch(url, { signal });
  if (!response.ok) {
    throw new Error(`Weather API request failed (${response.status}).`);
  }
  return response.json();
}

export function fetchCurrentWeather(city: string, signal?: AbortSignal) {
  return fetchWeatherJson(weatherEndpoints.current(city), signal);
}

export function fetchForecastWeather(
  city: string,
  days = 3,
  signal?: AbortSignal
) {
  return fetchWeatherJson(weatherEndpoints.forecast(city, days), signal);
}

export function fetchHistoricalWeather(
  city: string,
  date: string,
  signal?: AbortSignal
) {
  return fetchWeatherJson(weatherEndpoints.history(city, date), signal);
}
