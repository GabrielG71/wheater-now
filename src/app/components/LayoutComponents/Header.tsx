export default function Header() {
  return (
    <header className="bg-gradient-to-r from-sky-300 to-blue-400 shadow-md">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-center space-x-3">
          <span className="text-4xl">☀️</span>
          <h1 className="text-2xl md:text-3xl font-bold text-white tracking-wide">
            Weather Now
          </h1>
        </div>
      </div>
    </header>
  );
}
