import { useState } from "react";
import Bin from "./Bin";
import NavBar from "./NavBar";
import Switcher from "./Switcher";

const Dash: React.FC = () => {
  const [capacity, setCapacity] = useState<number>(35);
  const [index, setIndex] = useState(0);

  return (
    <div className="w-full h-full flex flex-col items-center justify-between">
      <NavBar />
      <Bin capacity={capacity} setCapacity={setCapacity} />
      <Switcher index={index} setIndex={setIndex} />
    </div>
  );
};

export default Dash;
