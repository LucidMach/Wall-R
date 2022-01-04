import { useAuthState } from "react-firebase-hooks/auth";
import SignIn from "../components/SignIn";
import { auth } from "../firebase";
import Dash from "../components/Dash";
import type { NextPage } from "next";
import Head from "next/head";

const Home: NextPage = () => {
  const [user, loading, error] = useAuthState(auth);

  const render = () => {
    if (loading)
      return (
        <>
          <span className="animate-ping absolute inline-flex h-4 w-4 rounded-full bg-sky-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-sky-500"></span>
        </>
      );

    if (user) return <Dash />;

    if (error) return <>{error.message}</>;

    return <SignIn />;
  };

  return (
    <>
      <Head>
        <title>Wall-R</title>
        <meta name="description" content="Wall-E but Real" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="h-full w-full flex justify-center items-center">
        {render()}
      </div>
    </>
  );
};

export default Home;
