import bgPageAccueil from "../assets/images/bg-page-acceuil.png";

function HomePageBody() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center mt-4  text-center">
      <img
        src={bgPageAccueil}
        alt="Background Accueil"
        className="h-full w-screen"
      />
    </div>
  );
}

export default HomePageBody;
