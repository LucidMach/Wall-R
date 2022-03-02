import { signOut } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";
import Image from "next/image";

const NavBar: React.FC = () => {
  const [user] = useAuthState(auth);

  const handleClick = () => {
    if (user) return signOut(auth);
  };

  return (
    <div className="flex flex-col w-full shadow-md">
      <div className="flex w-full justify-between items-center px-8 py-4">
        <Image
          src="/LoGo.png"
          alt="logo"
          className="cursor-pointer"
          height={40}
          width={40}
        />
        {user ? (
          <Image
            src={user.photoURL}
            className="rounded-full cursor-pointer"
            onClick={handleClick}
            width={40}
            height={40}
            alt="user dp"
          />
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default NavBar;
