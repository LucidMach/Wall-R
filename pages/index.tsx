import { useAuthState } from "react-firebase-hooks/auth";
import SignIn from "../components/SignIn";
import type { NextPage } from "next";
import { auth } from "../firebase";
import Head from "next/head";

const Home: NextPage = () => {
  const [user, loading, error] = useAuthState(auth);

  return (
    <>
      <Head>
        <title>Wall-R</title>
        <meta name="description" content="Wall-E but Real" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {!user && !loading ? <SignIn /> : user?.email}
    </>
  );
};

export default Home;
