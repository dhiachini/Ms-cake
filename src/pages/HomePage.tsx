import Layout from "../Layout";

function HomePage() {
  return (
    <Layout>
      <div className="space-y-7">
        <div className="banner py-24">
          <div className="container space-y-3">
            <h1 className=" text-2xl max-w-[260px] ">
              La haute pâtisserie française, personalisée pour vos plus belles
              occasions
            </h1>
            <button className="bg-amber-100 text-black px-3 py-1 rounded-3xl cursor-pointer border-0 outline-none">
              Découvrez-nous
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default HomePage;
