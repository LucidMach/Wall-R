import { useState } from "react";

import Bin from "./Bin";
import NavBar from "./NavBar";
import Switcher from "./Switcher";

import { db } from "../firebase";
import { onValue, ref } from "firebase/database";

import { botStatus } from "../util/enums";

const Dash: React.FC = () => {
  const [capacity, setCapacity] = useState<number>(35);
  const [status, setStatus] = useState<botStatus>(0);
  const [index, setIndex] = useState(0);

  const fillPercentRef = ref(db, `/${index}/fill`);
  const statusRef = ref(db, `/${index}/status`);

  onValue(fillPercentRef, (snapshot) => {
    const data = snapshot.val();
    // console.log(data);
    if (data !== capacity) setCapacity(data);
  });

  onValue(statusRef, (snapshot) => {
    const data = snapshot.val();
    if (data !== status) setStatus(data);
  });

  return (
    <div className="w-full h-full flex flex-col items-center justify-between">
      <NavBar />
      <Bin capacity={capacity} status={status} />
      <Switcher index={index} setIndex={setIndex} maxIndex={2} />
    </div>
  );
};

export default Dash;
