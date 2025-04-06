"use client";
import Link from "next/link";
import { signOut, SignOut } from "firebase/auth";
import { auth } from "../firebase/config";
import { useRouter } from "next/navigation";
import { useAuthState } from "react-firebase-hooks/auth";

const Navbar = () => {
  const [user] = useAuthState(auth);
  const router = useRouter();

  // FixME:  add handle Signout method
  const handleLogOut = () => {
    signOut(auth)
      .then(() => {
        sessionStorage.removeItem("user");
        router.push("/sign-in");
      })
      .catch((error) => {
        console.log("Error Signing Out", error.message);
      });
  };

  return (
    <nav className="bg-gray-800 p-4 flex justify-between items-center">
      <h1>My App</h1>
      <div>
        <Link href="/" className="text-white mx-2">
          Home
        </Link>
        {user && <Link href="/protected-page">Protected Page</Link>}
        {user ? (
          <button
            onClick={handleLogOut}
            className="bg-red-500 text-white px-4 py-2 rounded ml-2"
          >
            Sign Out
          </button>
        ) : (
          <Link href="/sign-in">SignIn</Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
