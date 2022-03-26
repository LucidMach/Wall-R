// some react hooks
import { useContext, useEffect, useState, useRef, ReactElement } from "react";

// typescript interfaces
import { PrismaUser } from "../interfaces";

// components
import Bin from "./Bin";
import NavBar from "./NavBar";
import Switcher from "./Switcher";
import AddBotForm from "./AddBotForm";
import UserContext from "./UserContext";
import Spinner from "./Spinner";

// interface Props {
//   user: PrismaUser;
// }

const Dash: React.FC = () => {
  const [index, setIndex] = useState(0);
  const [showForm, setShowForm] = useState(false);
  const { prismaUser, setPrismaUser } = useContext(UserContext);

  useEffect(() => {
    if (!prismaUser) return;

    const url = new URL(window.location.href + "api/graphql");

    const SUB_USER_QUERY = `subscription {
      subUser(email: "${prismaUser.email}") {
        __typename
        id
        email
        bots {
          id
          fillPercent
        }
      }
    }`;

    url.searchParams.append("query", SUB_USER_QUERY);

    const eventsource = new EventSource(url.toString(), {
      withCredentials: true, // This is required for cookies
    });

    eventsource.onmessage = async (event) => {
      const { data } = JSON.parse(event.data);
      setPrismaUser(data.subUser);
    };
  });

  const renderBots = (user) => {
    if (user && user.bots.length > 0) {
      return (
        <Bin bot={user.bots[index]} capacity={user.bots[index].fillPercent} />
      );
    }
    if (user === undefined) return <Spinner />;
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
        <div>{renderBots(prismaUser)}</div>
        {showForm ? <AddBotForm setShowForm={setShowForm} /> : null}
        <Switcher
          bot={
            prismaUser && prismaUser.bots
              ? prismaUser.bots[index]
              : { id: 0, fillPercent: 0 }
          }
          setShowForm={setShowForm}
          index={index}
          setIndex={setIndex}
          maxIndex={prismaUser && prismaUser.bots ? prismaUser.bots.length : 0}
        />
      </div>
    </>
  );
};

export default Dash;
