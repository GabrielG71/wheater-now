interface ErrorMessageProps {
  message: string;
}

export function ErrorMessage({ message }: ErrorMessageProps) {
  return (
    <div className="flex items-center justify-center space-x-3">
      <span className="text-2xl">⚠️</span>
      <span className="text-blue-800 font-medium">{message}</span>
    </div>
  );
}
