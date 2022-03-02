// some react hooks
import { useContext, useState } from "react";

// typescript interfaces
import { PrismaUser } from "../interfaces";

// components
import Bin from "./Bin";
import NavBar from "./NavBar";
import Switcher from "./Switcher";
import AddBotForm from "./AddBotForm";
import UserContext from "./UserContext";

// interface Props {
//   user: PrismaUser;
// }

const Dash: React.FC = () => {
  const [index, setIndex] = useState(0);
  const [showForm, setShowForm] = useState(false);
  const { prismaUser: user } = useContext(UserContext);

  const renderBots = (user) => {
    if (user && user.bots.length > 0) {
      return <Bin capacity={user.bots[index].fillPercent} />;
    }
    return (
      <>
        <div className="flex flex-col items-center gap-2">
          <h1 className="text-slate-500">
            there are 0 bots registered under your account
          </h1>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowForm(true);
            }}
            className="text-xs text-white rounded-md px-3 py-2 bg-blue-500 hover:bg-blue-600 active:bg-blue-400"
          >
            register a bot
          </button>
        </div>
      </>
    );
  };

  return (
    <>
      <div
        className="w-full h-full flex flex-col items-center justify-between"
        onClick={(e) => {
          setShowForm(false);
        }}
      >
        <NavBar />
        {renderBots(user)}
        {showForm ? <AddBotForm setShowForm={setShowForm} /> : null}
        <Switcher
          index={index}
          setIndex={setIndex}
          maxIndex={user && user.bots ? user.bots.length : 0}
        />
      </div>
    </>
  );
};

export default Dash;
