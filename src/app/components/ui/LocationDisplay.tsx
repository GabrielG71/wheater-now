interface LocationDisplayProps {
  city: string;
  country: string;
}

export function LocationDisplay({ city, country }: LocationDisplayProps) {
  return (
    <div className="flex items-center justify-center space-x-3">
      <span className="text-2xl animate-bounce">📍</span>
      <span className="text-blue-800 font-semibold text-lg">
        You're in {city}, {country}
      </span>
    </div>
  );
}
