import { WeatherData, OpenWeatherMapResponse } from "../types/weather";
import { GeolocationPosition } from "../types/location";
import { WEATHER_API, WEATHER_UNITS } from "../constants/weather";

export class WeatherService {
  private static validateApiKey(): void {
    const apiKey =
      process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY || WEATHER_API.API_KEY;
    if (!apiKey || apiKey === "YOUR_API_KEY_HERE" || apiKey.trim() === "") {
      console.error("Variáveis de ambiente disponíveis:", {
        NEXT_PUBLIC_OPENWEATHER_API_KEY:
          process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY,
        WEATHER_API_API_KEY: WEATHER_API.API_KEY,
      });
      throw new Error(
        "API Key do OpenWeatherMap não configurada. Verifique se NEXT_PUBLIC_OPENWEATHER_API_KEY está no .env.local e reinicie o servidor"
      );
    }
  }

  static async getWeatherByCoordinates(
    coords: GeolocationPosition
  ): Promise<WeatherData> {
    this.validateApiKey();

    const url = new URL(`${WEATHER_API.BASE_URL}/weather`);
    url.searchParams.append("lat", coords.latitude.toString());
    url.searchParams.append("lon", coords.longitude.toString());
    const apiKey =
      process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY || WEATHER_API.API_KEY;
    url.searchParams.append("appid", apiKey);
    url.searchParams.append("units", WEATHER_UNITS.METRIC);
    url.searchParams.append("lang", "pt_br");

    const response = await fetch(url.toString());

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error("API Key inválida. Verifique sua configuração.");
      }
      if (response.status === 404) {
        throw new Error("Localização não encontrada.");
      }
      throw new Error(`Erro na API do tempo: ${response.status}`);
    }

    const data: OpenWeatherMapResponse = await response.json();
    return this.transformWeatherData(data);
  }

  static async getWeatherByCity(
    city: string,
    country?: string
  ): Promise<WeatherData> {
    this.validateApiKey();

    const query = country ? `${city},${country}` : city;
    const url = new URL(`${WEATHER_API.BASE_URL}/weather`);
    url.searchParams.append("q", query);
    const apiKey =
      process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY || WEATHER_API.API_KEY;
    url.searchParams.append("appid", apiKey);
    url.searchParams.append("units", WEATHER_UNITS.METRIC);
    url.searchParams.append("lang", "pt_br");

    const response = await fetch(url.toString());

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error("API Key inválida. Verifique sua configuração.");
      }
      if (response.status === 404) {
        throw new Error(`Cidade "${city}" não encontrada.`);
      }
      throw new Error(`Erro na API do tempo: ${response.status}`);
    }

    const data: OpenWeatherMapResponse = await response.json();
    return this.transformWeatherData(data);
  }

  private static transformWeatherData(
    data: OpenWeatherMapResponse
  ): WeatherData {
    const weather = data.weather[0];

    return {
      temperature: Math.round(data.main.temp),
      feelsLike: Math.round(data.main.feels_like),
      humidity: data.main.humidity,
      description: weather.description,
      icon: weather.icon,
      windSpeed: Math.round(data.wind.speed * 3.6),
      pressure: data.main.pressure,
      visibility: Math.round(data.visibility / 1000),
      city: data.name,
      country: data.sys.country,
    };
  }

  static getWeatherIconUrl(iconCode: string, size: "2x" | "4x" = "2x"): string {
    return `${WEATHER_API.ICON_URL}/${iconCode}@${size}.png`;
  }
}
