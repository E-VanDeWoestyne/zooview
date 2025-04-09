"use client";

import { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebase/config";

const AnimalsPage = () => {
  const [animals, setAnimals] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "animals"), (snapshot) => {
      const animalData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setAnimals(animalData);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="min-h-screen bg-green-100 p-8">
      <h1 className="text-3xl font-semibold text-green-800 text-center mb-8">
        🐾 Animal List
      </h1>

      {animals.length === 0 ? (
        <p className="text-center text-green-700">No animals available right now.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {animals.map((animal) => (
            <div
              key={animal.id}
              className="bg-white rounded-xl shadow-md p-4 border border-green-200"
            >
              {animal.imageUrl ? (
                <img
                  src={animal.imageUrl}
                  alt={animal.name}
                  className="w-full h-40 object-cover rounded-lg mb-3"
                />
              ) : (
                <div className="w-full h-40 bg-green-200 rounded-lg flex items-center justify-center text-green-800 text-xl">
                  🐾
                </div>
              )}

              <h2 className="text-xl font-bold text-green-800 mb-2">
                {animal.name}
              </h2>
              <p className="text-green-700 text-sm">
                {animal.description || "No description provided."}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AnimalsPage;
