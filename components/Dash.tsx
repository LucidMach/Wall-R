import Bin from "./Bin";
import NavBar from "./NavBar";
import Switcher from "./Switcher";

const Dash: React.FC = () => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-between">
      <NavBar />
      <Bin />
      <Switcher />
    </div>
  );
};

export default Dash;
