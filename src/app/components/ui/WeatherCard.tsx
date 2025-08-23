import { WeatherData } from "../../types/weather";
import { WEATHER_EMOJIS } from "../../constants/weather";

interface WeatherCardProps {
  weather: WeatherData;
}

export function WeatherCard({ weather }: WeatherCardProps) {
  const weatherEmoji = WEATHER_EMOJIS[weather.icon] || "🌤️";

  return (
    <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6 shadow-lg">
      <div className="text-center mb-6">
        <div className="flex items-center justify-center space-x-4 mb-2">
          <span className="text-6xl">{weatherEmoji}</span>
          <div>
            <div className="text-5xl font-bold text-white">
              {weather.temperature}°
            </div>
            <div className="text-white/80 text-sm">
              Sensação de {weather.feelsLike}°
            </div>
          </div>
        </div>
        <div className="text-white/90 text-lg capitalize font-medium">
          {weather.description}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white/10 rounded-lg p-3">
          <div className="flex items-center space-x-2">
            <span className="text-lg">💨</span>
            <div>
              <div className="text-white/80 text-xs uppercase tracking-wide">
                Vento
              </div>
              <div className="text-white font-semibold">
                {weather.windSpeed} km/h
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white/10 rounded-lg p-3">
          <div className="flex items-center space-x-2">
            <span className="text-lg">💧</span>
            <div>
              <div className="text-white/80 text-xs uppercase tracking-wide">
                Umidade
              </div>
              <div className="text-white font-semibold">
                {weather.humidity}%
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white/10 rounded-lg p-3">
          <div className="flex items-center space-x-2">
            <span className="text-lg">🌡️</span>
            <div>
              <div className="text-white/80 text-xs uppercase tracking-wide">
                Pressão
              </div>
              <div className="text-white font-semibold">
                {weather.pressure} hPa
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white/10 rounded-lg p-3">
          <div className="flex items-center space-x-2">
            <span className="text-lg">👁️</span>
            <div>
              <div className="text-white/80 text-xs uppercase tracking-wide">
                Visibilidade
              </div>
              <div className="text-white font-semibold">
                {weather.visibility} km
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
