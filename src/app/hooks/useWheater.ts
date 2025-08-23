"use client";

import { useState, useEffect, useCallback } from "react";
import { WeatherState } from "../types/weather";
import { GeolocationPosition } from "../types/location";
import { WeatherService } from "../services/weatherSerive";

interface UseWeatherOptions {
  coordinates?: GeolocationPosition;
  city?: string;
  country?: string;
  autoFetch?: boolean;
}

export function useWeather(options: UseWeatherOptions = {}) {
  const [state, setState] = useState<WeatherState>({
    data: null,
    loading: false,
    error: null,
  });

  const fetchWeather = useCallback(async () => {
    setState((prev) => ({ ...prev, loading: true, error: null }));

    try {
      let weatherData;

      if (options.coordinates) {
        weatherData = await WeatherService.getWeatherByCoordinates(
          options.coordinates
        );
      } else if (options.city) {
        weatherData = await WeatherService.getWeatherByCity(
          options.city,
          options.country
        );
      } else {
        throw new Error("É necessário fornecer coordenadas ou nome da cidade");
      }

      setState({
        data: weatherData,
        loading: false,
        error: null,
      });
    } catch (error) {
      setState({
        data: null,
        loading: false,
        error: error instanceof Error ? error.message : "Erro desconhecido",
      });
    }
  }, [
    options.coordinates?.latitude,
    options.coordinates?.longitude,
    options.city,
    options.country,
  ]);

  const refetch = useCallback(() => {
    fetchWeather();
  }, [fetchWeather]);

  useEffect(() => {
    if (options.autoFetch !== false && (options.coordinates || options.city)) {
      fetchWeather();
    }
  }, [options.autoFetch, fetchWeather]);

  return {
    ...state,
    refetch,
  };
}
