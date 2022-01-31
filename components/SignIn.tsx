import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../firebase";

const handleClick = async () => {
  signInWithPopup(auth, provider).catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    const email = error.email;
    console.log({ errorCode, errorMessage, email });
  });
};

const SignIn: React.FC = () => {
  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      <button
        onClick={handleClick}
        className="group w-2/3 flex items-center py-4 px-12 gap-2 justify-between border-2 border-black/30 hover:border-black rounded-full"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M23.745 12.27C23.745 11.48 23.675 10.73 23.555 10H12.255V14.51H18.725C18.435 15.99 17.585 17.24 16.325 18.09V21.09H20.185C22.445 19 23.745 15.92 23.745 12.27Z"
            fill="#4285F4"
          />
          <path
            d="M12.255 24C15.495 24 18.205 22.92 20.185 21.09L16.325 18.09C15.245 18.81 13.875 19.25 12.255 19.25C9.12501 19.25 6.47501 17.14 5.52501 14.29H1.54501V17.38C3.51501 21.3 7.56501 24 12.255 24Z"
            fill="#34A853"
          />
          <path
            d="M5.52501 14.29C5.27501 13.57 5.145 12.8 5.145 12C5.145 11.2 5.28501 10.43 5.52501 9.71V6.62H1.545C0.725004 8.24 0.255005 10.06 0.255005 12C0.255005 13.94 0.725004 15.76 1.545 17.38L5.52501 14.29Z"
            fill="#FBBC05"
          />
          <path
            d="M12.255 4.75C14.025 4.75 15.605 5.36 16.855 6.55L20.275 3.13C18.205 1.19 15.495 0 12.255 0C7.56501 0 3.51501 2.7 1.54501 6.62L5.52501 9.71C6.47501 6.86 9.12501 4.75 12.255 4.75Z"
            fill="#EA4335"
          />
        </svg>
        <span className="font-bold text-lg text-black/30 group-hover:text-black">
          Continue with Google
        </span>
      </button>
    </div>
  );
};

export default SignIn;
