"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase/config";
import Navbar from "./components/Navbar";

export default function Home() {
  const [user] = useAuthState(auth);
  const router = useRouter();
  const [userSession, setUserSession] = useState(null);
  const [isSessionLoaded, setIsSessionLoaded] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined" && user) {
      const storedSession = sessionStorage.getItem("user");
      setUserSession(storedSession);
      setIsSessionLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (isSessionLoaded && !user && !userSession) {
      router.push("/sign-in");
    }
  }, [user, userSession, isSessionLoaded, router]);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="text-white text-2xl">Welcome to My App</div>
    </div>
  );
}
