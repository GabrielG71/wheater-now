"use client";

import { useState, useEffect } from "react";
import { LocationState } from "../types/location";
import { LocationService } from "../services/locationService";

export function useLocation(): LocationState {
  const [state, setState] = useState<LocationState>({
    data: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    let isMounted = true;

    const fetchLocation = async () => {
      try {
        setState((prev) => ({ ...prev, loading: true, error: null }));

        const locationData = await LocationService.getCurrentLocation();

        if (isMounted) {
          setState({
            data: locationData,
            loading: false,
            error: null,
          });
        }
      } catch (error) {
        if (isMounted) {
          setState({
            data: null,
            loading: false,
            error: error instanceof Error ? error.message : "Erro desconhecido",
          });
        }
      }
    };

    fetchLocation();

    return () => {
      isMounted = false;
    };
  }, []);

  return state;
}
