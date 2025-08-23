export function msToKmh(speedInMs: number): number {
  return Math.round(speedInMs * 3.6);
}

export function kelvinToCelsius(kelvin: number): number {
  return Math.round(kelvin - 273.15);
}

export function celsiusToFahrenheit(celsius: number): number {
  return Math.round((celsius * 9) / 5 + 32);
}

export function metersToKilometers(meters: number): number {
  return Math.round(meters / 1000);
}

export function getWeatherDescription(condition: string): string {
  const descriptions: Record<string, string> = {
    "clear sky": "céu limpo",
    "few clouds": "poucas nuvens",
    "scattered clouds": "nuvens dispersas",
    "broken clouds": "nuvens fragmentadas",
    "shower rain": "chuva rápida",
    rain: "chuva",
    thunderstorm: "tempestade",
    snow: "neve",
    mist: "neblina",
    fog: "névoa",
    haze: "bruma",
  };

  return descriptions[condition.toLowerCase()] || condition;
}

export function isDaytime(iconCode: string): boolean {
  return iconCode.endsWith("d");
}

export function getWeatherBackgroundColor(iconCode: string): string {
  const timeOfDay = isDaytime(iconCode) ? "day" : "night";
  const condition = iconCode.substring(0, 2);

  const colors: Record<string, Record<string, string>> = {
    "01": {
      day: "from-yellow-400 via-orange-400 to-red-400",
      night: "from-blue-900 via-purple-900 to-indigo-900",
    },
    "02": {
      day: "from-blue-400 via-blue-500 to-blue-600",
      night: "from-gray-700 via-gray-800 to-gray-900",
    },
    "03": {
      day: "from-gray-400 via-gray-500 to-gray-600",
      night: "from-gray-600 via-gray-700 to-gray-800",
    },
    "04": {
      day: "from-gray-500 via-gray-600 to-gray-700",
      night: "from-gray-700 via-gray-800 to-black",
    },
    "09": {
      day: "from-blue-600 via-blue-700 to-blue-800",
      night: "from-blue-800 via-blue-900 to-black",
    },
    "10": {
      day: "from-blue-500 via-blue-600 to-blue-700",
      night: "from-blue-700 via-blue-800 to-gray-900",
    },
    "11": {
      day: "from-gray-600 via-gray-700 to-gray-800",
      night: "from-gray-800 via-black to-purple-900",
    },
    "13": {
      day: "from-blue-100 via-blue-200 to-blue-300",
      night: "from-blue-200 via-blue-300 to-blue-400",
    },
    "50": {
      day: "from-gray-300 via-gray-400 to-gray-500",
      night: "from-gray-600 via-gray-700 to-gray-800",
    },
  };

  return (
    colors[condition]?.[timeOfDay] || "from-blue-400 via-blue-500 to-blue-600"
  );
}
