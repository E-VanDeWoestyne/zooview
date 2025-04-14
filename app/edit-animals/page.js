"use client";

import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/navigation";
import { auth } from "../firebase/config";

import AddAnimal from "../components/AddAnimal";
import AnimalList from "../components/AnimalList";

async function getData() {
  const res = await fetch("http://localhost:3000/api/animals", {
    cache: "no-cache",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  const data = await res.json();
  return data;
}

export default function EditAnimals() {
  const [user, loading] = useAuthState(auth);
  const router = useRouter();
  const [animals, setAnimals] = useState([]);

  useEffect(() => {
    if (!loading && !user) {
      router.push("/sign-in");
    }
  }, [user, loading, router]);

  useEffect(() => {
    async function fetchAnimals() {
      try {
        const data = await getData();
        setAnimals(data);
      } catch (error) {
        console.error(error);
      }
    }
    if (user) {
      fetchAnimals();
    }
  }, [user]);

  if (loading) {
    return <div className="text-white text-2xl p-4">Loading...</div>;
  }

  return (
    <main className="flex min-h-screen flex-col justify-start p-24 bg-gradient-to-br from-green-100 to-green-300">
      <AddAnimal />
      <AnimalList animal={animals} />
    </main>
  );
}
