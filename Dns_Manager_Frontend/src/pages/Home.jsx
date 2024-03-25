import Navbar from "../components/Navbar ";
import SideMenu from "../components/SideMenu";

const Home = () => {
  return (
    <div className="flex">
      <SideMenu />
      <div className="flex  justify-center ">
        <Navbar />
        <div className="max-w-xl">
          <img src="/dashboard.svg" alt="Dashboard"   />
        </div>
      </div>
    </div>
  );
};

export default Home;
