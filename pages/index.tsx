import { useEffect, useState } from "react";

import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";

import SignIn from "../components/SignIn";
import Dash from "../components/Dash";

import type { NextPage } from "next";
import Head from "next/head";

import client from "../apollo-client";
import { gql } from "@apollo/client";
import { PrismaUser } from "../interfaces";
import UserContext from "../components/UserContext";

const Home: NextPage = () => {
  const [user, loading, error] = useAuthState(auth);
  const [prismaUser, setPrismaUser] = useState<PrismaUser>();

  useEffect(() => {
    console.log(prismaUser);

    // gql queries for the app
    const query = gql`
      query getUser($email: String) {
        getUser(email: $email) {
          id
          email
          bots {
            id
            fillPercent
          }
        }
      }
    `;

    // function for gql request to sync user data from prisma
    const prismaUSerSync = async () => {
      const { data } = await client.query({
        query,
        variables: {
          email: user.email,
        },
      });

      // getting active user data from Prisma
      setPrismaUser(data.getUser);
    };

    // making gql request after google oauth
    if (user) prismaUSerSync();
  }, [user, prismaUser]);

  // quick routing between signin page and dashboard UI
  const render = () => {
    // loading spinner animations
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
    <UserContext.Provider value={{ prismaUser, setPrismaUser }}>
      <Head>
        <title>Wall-R</title>
        <meta name="description" content="Wall-E but Real" />
        <link rel="icon" href="/LoGo.png" />
      </Head>
      <div className="h-full w-full flex justify-center items-center">
        {render()}
      </div>
    </UserContext.Provider>
  );
};

export default Home;
