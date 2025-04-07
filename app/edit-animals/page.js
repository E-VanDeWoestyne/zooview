"use client";

import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/navigation";
import { auth } from "../firebase/config";

export default function EditAnimals() {
  const [user, loading] = useAuthState(auth);
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/sign-in");
    }
  }, [user, loading, router]);

  if (loading) {
    return <div className="text-white text-2xl p-4">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-green-100">
      <div className="p-8 text-2xl text-green-800">Edit Animal Page</div>
    </div>
  );
}
