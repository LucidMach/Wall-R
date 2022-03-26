import type { NextPage } from "next";
import Image from "next/image";

const Offline: NextPage = () => {
  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      <Image src="/LoGo.png" alt="logo" height={200} width={200} />
      <h1 className="text-xs text-slate-400">oh snap! you&apos;re offline</h1>
    </div>
  );
};

export default Offline;
