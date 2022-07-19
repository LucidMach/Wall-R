import { Dispatch, SetStateAction } from "react";

interface Props {
  index: number;
  setIndex: Dispatch<SetStateAction<number>>;
  maxIndex: number;
}

const Switcher: React.FC<Props> = ({ index, setIndex, maxIndex }) => {
  return (
    <div className="w-full flex justify-around items-center py-4 px-6 shadow-inner">
      <svg
        className={`left ${
          index !== 0 ? "cursor-pointer" : "cursor-not-allowed"
        }`}
        width="	1rem"
        height="2rem"
        viewBox="0 0 30 36"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        onClick={() => {
          if (index !== 0) setIndex((i) => i - 1);
        }}
      >
        <path
          d="M-8.74228e-07 18L30 0.679488L30 35.3205L-8.74228e-07 18Z"
          fill="#777777"
        />
      </svg>
      <h1 className="text-2xl">bot#{index}</h1>
      <svg
        className={`right ${
          index < maxIndex ? "cursor-pointer" : "cursor-not-allowed"
        }`}
        width="	1rem"
        height="2rem"
        viewBox="0 0 30 36"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        onClick={() => {
          if (index < maxIndex) setIndex((i) => i + 1);
        }}
      >
        <path
          d="M30 18L-1.63133e-06 35.3205L-1.17124e-07 0.67949L30 18Z"
          fill="#777777"
        />
      </svg>
    </div>
  );
};

export default Switcher;