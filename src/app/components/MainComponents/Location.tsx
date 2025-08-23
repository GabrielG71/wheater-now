"use client";

import { useState, useEffect } from "react";

interface LocationData {
  city: string;
  country: string;
}

export default function Location() {
  const [location, setLocation] = useState<LocationData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getLocation = async () => {
      try {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            async (position) => {
              const { latitude, longitude } = position.coords;

              // Usa a API de geocoding reverso gratuita
              const response = await fetch(
                `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=pt`
              );

              if (response.ok) {
                const data = await response.json();
                setLocation({
                  city: data.city || data.locality || "Cidade não encontrada",
                  country: data.countryName || "País não encontrado",
                });
              } else {
                throw new Error("Erro ao buscar localização");
              }
              setLoading(false);
            },
            async (error) => {
              console.log("Geolocalização falhou, usando IP como fallback");
              try {
                const response = await fetch("https://ipapi.co/json/");
                if (response.ok) {
                  const data = await response.json();
                  setLocation({
                    city: data.city || "Cidade não encontrada",
                    country: data.country_name || "País não encontrado",
                  });
                } else {
                  throw new Error("Erro ao buscar localização via IP");
                }
              } catch (ipError) {
                setError("Não foi possível obter sua localização");
              }
              setLoading(false);
            }
          );
        } else {
          const response = await fetch("https://ipapi.co/json/");
          if (response.ok) {
            const data = await response.json();
            setLocation({
              city: data.city || "Cidade não encontrada",
              country: data.country_name || "País não encontrado",
            });
          } else {
            throw new Error("Erro ao buscar localização via IP");
          }
          setLoading(false);
        }
      } catch (err) {
        setError("Não foi possível obter sua localização");
        setLoading(false);
      }
    };

    getLocation();
  }, []);

  if (loading) {
    return (
      <div className="bg-gradient-to-r from-sky-200 to-blue-300 rounded-lg shadow-md mx-4 my-6 p-6">
        <div className="flex items-center justify-center space-x-3">
          <div className="animate-spin text-2xl">🌍</div>
          <span className="text-blue-800 font-medium">Localizando você...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-gradient-to-r from-sky-200 to-blue-300 rounded-lg shadow-md mx-4 my-6 p-6">
        <div className="flex items-center justify-center space-x-3">
          <span className="text-2xl">📍</span>
          <span className="text-blue-800 font-medium">{error}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-r from-sky-200 to-blue-300 rounded-lg shadow-md mx-4 my-6 p-6">
      <div className="flex items-center justify-center space-x-3">
        <span className="text-2xl animate-bounce">📍</span>
        <span className="text-blue-800 font-semibold text-lg">
          You're in {location?.city}, {location?.country}
        </span>
      </div>
    </div>
  );
}
