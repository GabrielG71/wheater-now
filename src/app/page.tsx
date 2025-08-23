import Header from "./components/LayoutComponents/Header";
import Footer from "./components/LayoutComponents/Footer";
import Location from "./components/MainComponents/Location";
import Weather from "./components/ui/Weather";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-blue-50 to-indigo-100 flex flex-col">
      <Header />

      <main className="flex-1 container mx-auto px-4 py-8 max-w-3xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-3 tracking-tight">
            <span className="text-blue-600">Weathering With You</span>
          </h1>
          <p className="text-lg text-gray-600">
            Check the current weather conditions in your area.
          </p>
        </div>

        <div className="space-y-6">
          <Location />
          <Weather />
        </div>
      </main>

      <Footer />
    </div>
  );
}
