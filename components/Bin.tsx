import { botStatus } from "../util/enums";

interface Props {
  capacity: number;
  status: number;
}

const Bin: React.FC<Props> = ({ capacity, status }) => {
  return (
    <>
      <div className="w-full flex flex-col items-center absolute top-1/2 transform -translate-y-1/2">
        <svg
          width="200"
          height="300"
          viewBox="0 0 200 300"
          style={{
            fill: `hsl(${capacity}, 75%, 45%, 1)`,
          }}
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M192.857 18.7499H139.286L135.089 7.79289C134.2 5.45039 132.831 3.47994 131.135 2.10319C129.44 0.726448 127.485 -0.0019573 125.491 -8.03747e-05H74.4643C72.4749 -0.0101178 70.5236 0.715572 68.8339 2.09385C67.1443 3.47212 65.7846 5.44723 64.9107 7.79289L60.7143 18.7499H7.14286C5.24845 18.7499 3.43164 19.7376 2.09209 21.4958C0.752549 23.2539 0 25.6385 0 28.1249L0 46.8749C0 49.3613 0.752549 51.7459 2.09209 53.504C3.43164 55.2622 5.24845 56.2499 7.14286 56.2499H192.857C194.752 56.2499 196.568 55.2622 197.908 53.504C199.247 51.7459 200 49.3613 200 46.8749V28.1249C200 25.6385 199.247 23.2539 197.908 21.4958C196.568 19.7376 194.752 18.7499 192.857 18.7499ZM23.75 273.633C24.0907 280.773 26.4918 287.475 30.4645 292.373C34.4373 297.272 39.683 299.999 45.1339 300H154.866C160.317 299.999 165.563 297.272 169.535 292.373C173.508 287.475 175.909 280.773 176.25 273.633L185.714 74.9999H14.2857L23.75 273.633Z" />
        </svg>
        <h1 className="text-center absolute top-1/2 text-white font-semibold transform -translate-y-1/4">
          <span className="text-xs">capacity</span>
          <br />
          <span className="text-6xl">{capacity}</span>
          <br />
          <span className="text-2xl">%</span>
        </h1>
      </div>
      <div className="relative top-40">
        <span className="font-semibold">STATUS: </span>
        <span>{botStatus[status]}</span>
      </div>
    </>
  );
};

export default Bin;
