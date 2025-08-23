export const WEATHER_API = {
  BASE_URL: "https://api.openweathermap.org/data/2.5",
  ICON_URL: "https://openweathermap.org/img/wn",
  API_KEY:
    process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY ||
    "d271dae5e63ade8450001d80cf5c1f47",
} as const;

export const WEATHER_UNITS = {
  METRIC: "metric",
  IMPERIAL: "imperial",
  STANDARD: "standard",
} as const;

export const WEATHER_EMOJIS: Record<string, string> = {
  "01d": "☀️",
  "01n": "🌙",
  "02d": "⛅",
  "02n": "☁️",
  "03d": "☁️",
  "03n": "☁️",
  "04d": "☁️",
  "04n": "☁️",
  "09d": "🌦️",
  "09n": "🌧️",
  "10d": "🌧️",
  "10n": "🌧️",
  "11d": "⛈️",
  "11n": "⛈️",
  "13d": "🌨️",
  "13n": "❄️",
  "50d": "🌫️",
  "50n": "🌫️",
};
