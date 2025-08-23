import { LocationData, GeolocationPosition } from "../types/location";

export class LocationService {
  private static readonly BIGDATA_API_URL =
    "https://api.bigdatacloud.net/data/reverse-geocode-client";
  private static readonly IPAPI_URL = "https://ipapi.co/json/";

  static async getLocationFromGeolocation(): Promise<LocationData> {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error("Geolocalização não suportada"));
        return;
      }

      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            const coords: GeolocationPosition = {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            };

            const locationData = await this.reverseGeocode(coords);
            resolve(locationData);
          } catch (error) {
            reject(error);
          }
        },
        (error) => {
          reject(new Error(`Erro na geolocalização: ${error.message}`));
        },
        {
          timeout: 10000,
          enableHighAccuracy: true,
        }
      );
    });
  }

  private static async reverseGeocode(
    coords: GeolocationPosition
  ): Promise<LocationData> {
    const url = `${this.BIGDATA_API_URL}?latitude=${coords.latitude}&longitude=${coords.longitude}&localityLanguage=pt`;

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Erro ao fazer geocodificação reversa");
    }

    const data = await response.json();

    return {
      city: data.city || data.locality || "Cidade não encontrada",
      country: data.countryName || "País não encontrado",
    };
  }

  static async getLocationFromIP(): Promise<LocationData> {
    const response = await fetch(this.IPAPI_URL);

    if (!response.ok) {
      throw new Error("Erro ao buscar localização via IP");
    }

    const data = await response.json();

    return {
      city: data.city || "Cidade não encontrada",
      country: data.country_name || "País não encontrado",
    };
  }

  static async getCurrentLocation(): Promise<LocationData> {
    try {
      return await this.getLocationFromGeolocation();
    } catch (geolocationError) {
      console.warn(
        "Geolocalização falhou, usando IP como fallback:",
        geolocationError
      );

      try {
        return await this.getLocationFromIP();
      } catch (ipError) {
        throw new Error("Não foi possível obter a localização");
      }
    }
  }
}
