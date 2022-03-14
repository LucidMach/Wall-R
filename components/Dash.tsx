import { useState } from "react";
import Bin from "./Bin";
import NavBar from "./NavBar";
import Switcher from "./Switcher";
import { db } from "../firebase";
import { onValue, ref } from "firebase/database";

const Dash: React.FC = () => {
  const [capacity, setCapacity] = useState<number>(35);
  const [index, setIndex] = useState(0);
  const fillPercentRef = ref(db, `/${index}/fill`);
  onValue(fillPercentRef, (snapshot) => {
    const data = snapshot.val();
    // console.log(data);
    if (data !== capacity) setCapacity(data);
  });

  return (
    <div className="w-full h-full flex flex-col items-center justify-between">
      <NavBar />
      <Bin capacity={capacity} />
      <Switcher index={index} setIndex={setIndex} maxIndex={2} />
    </div>
  );
};

export default Dash;
