"use client";

import { useLocation } from "../../hooks/useLocation";
import { LocationDisplay } from "../ui/LocationDisplay";
import { LoadingSpinner } from "../ui/LoadingSpinner";
import { ErrorMessage } from "../ui/ErrorMessage";

export default function Location() {
  const { data, loading, error } = useLocation();

  const containerClasses =
    "bg-gradient-to-r from-sky-200 to-blue-300 rounded-lg shadow-md mx-4 my-6 p-6";

  if (loading) {
    return (
      <div className={containerClasses}>
        <LoadingSpinner message="Localizando você..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className={containerClasses}>
        <ErrorMessage message={error} />
      </div>
    );
  }

  if (!data) {
    return (
      <div className={containerClasses}>
        <ErrorMessage message="Localização não disponível" />
      </div>
    );
  }

  return (
    <div className={containerClasses}>
      <LocationDisplay city={data.city} country={data.country} />
    </div>
  );
}
