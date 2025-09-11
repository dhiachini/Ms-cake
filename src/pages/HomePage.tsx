import HomePageBody from "../components/HomePageBody";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function HomePage() {
  return (
    <div className="w-full flex flex-col">
      {/* Navbar fixée en haut */}
      <div className="fixed top-0 w-full z-50">
        <Navbar />
      </div>

      {/* Contenu de la page centré verticalement et après le navbar */}
      <div className="h-full w-full flex flex-col">
        {/* Ensure full height */}
        <HomePageBody />
      </div>

  {/* Footer en bas */}
  <Footer />
    </div>
  );
}

export default HomePage;