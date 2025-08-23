import Header from "./components/LayoutComponents/Header";
import Footer from "./components/LayoutComponents/Footer";
import Location from "./components/MainComponents/Location";
import Weather from "./components/ui/Weather";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-blue-50 to-indigo-100 flex flex-col">
      <Header />

      <main className="flex-1 container mx-auto px-4 py-8 max-w-3xl flex flex-col items-center justify-center">
        <div className="text-center mb-8 max-w-xl">
          <p className="text-2xl font-semibold text-gray-700 leading-relaxed">
            Stay updated with the latest{" "}
            <span className="text-blue-600">weather conditions</span> in your
            area and be prepared for the day ahead.
          </p>
        </div>

        <div className="space-y-6 w-full flex flex-col items-center">
          <Location />
          <Weather />
        </div>
      </main>

      <Footer />
    </div>
  );
}
