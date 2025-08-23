interface LoadingSpinnerProps {
  message?: string;
}

export function LoadingSpinner({
  message = "Carregando...",
}: LoadingSpinnerProps) {
  return (
    <div className="flex items-center justify-center space-x-3">
      <div className="animate-spin text-2xl">🌍</div>
      <span className="text-blue-800 font-medium">{message}</span>
    </div>
  );
}
