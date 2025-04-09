"use client";

import React, { useEffect, useState } from "react";
import { db } from "../firebase/config";
import { collection, onSnapshot } from "firebase/firestore";

const AnimalsPage = () => {
  const [animals, setAnimals] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "animals"), (snapshot) => {
      const animalList = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setAnimals(animalList);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="min-h-screen bg-green-100">
      <div className="p-8 text-2xl text-green-800 text-center">
        Animal List
      </div>
      <ul className="p-8 space-y-4">
        {animals.map((animal) => (
          <li key={animal.id} className="text-lg text-green-900">
            {animal.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AnimalsPage;
