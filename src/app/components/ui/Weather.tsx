"use client";

import { useMemo } from "react";
import { useWeather } from "../../hooks/useWheater";
import { useLocation } from "../../hooks/useLocation";
import { WeatherCard } from "../../components/ui/WeatherCard";
import { LoadingSpinner } from "../../components/ui/LoadingSpinner";
import { ErrorMessage } from "../../components/ui/ErrorMessage";

export default function Weather() {
  const locationState = useLocation();

  const weatherOptions = useMemo(
    () => ({
      city: locationState.data?.city,
      country: locationState.data?.country,
      autoFetch:
        !!locationState.data && !locationState.loading && !locationState.error,
    }),
    [
      locationState.data?.city,
      locationState.data?.country,
      locationState.loading,
      locationState.error,
    ]
  );

  const weatherState = useWeather(weatherOptions);

  const isLoading = locationState.loading || weatherState.loading;
  const error = locationState.error || weatherState.error;

  if (isLoading) {
    return (
      <div className="bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 rounded-xl shadow-lg mx-4 my-6 p-8">
        <LoadingSpinner message="Carregando informações do tempo..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 rounded-xl shadow-lg mx-4 my-6 p-8">
        <ErrorMessage message={error} />
        {weatherState.refetch && (
          <div className="mt-4 text-center">
            <button
              onClick={weatherState.refetch}
              className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg transition-colors"
            >
              Tentar novamente
            </button>
          </div>
        )}
      </div>
    );
  }

  if (!weatherState.data) {
    return (
      <div className="bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 rounded-xl shadow-lg mx-4 my-6 p-8">
        <ErrorMessage message="Dados do tempo não disponíveis" />
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 rounded-xl shadow-lg mx-4 my-6 p-8">
      <div className="mb-4">
        <h2 className="text-white text-xl font-semibold text-center">
          Tempo agora em {weatherState.data.city}
        </h2>
      </div>
      <WeatherCard weather={weatherState.data} />
      <div className="mt-6 text-center">
        <button
          onClick={weatherState.refetch}
          className="bg-white/20 hover:bg-white/30 text-white px-6 py-2 rounded-lg transition-colors flex items-center space-x-2 mx-auto"
        >
          <span className="text-sm">🔄</span>
          <span>Atualizar</span>
        </button>
      </div>
    </div>
  );
}
