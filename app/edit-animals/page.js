"use client";

import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/navigation";
import { auth, db } from "../firebase/config";
import {
  collection,
  getDocs,
  updateDoc,
  doc,
  addDoc,
} from "firebase/firestore";

export default function EditAnimals() {
  const [user, loading] = useAuthState(auth);
  const [animals, setAnimals] = useState([]);
  const [editing, setEditing] = useState({});
  const [newAnimalName, setNewAnimalName] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/sign-in");
    } else if (user) {
      fetchAnimals();
    }
  }, [user, loading]);

  const fetchAnimals = async () => {
    const snapshot = await getDocs(collection(db, "animals"));
    const animalList = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
    setAnimals(animalList);
  };

  const handleChange = (id, value) => {
    setEditing({ ...editing, [id]: value });
  };

  const handleSave = async (id) => {
    const docRef = doc(db, "animals", id);
    await updateDoc(docRef, { name: editing[id] });
    setEditing((prev) => {
      const copy = { ...prev };
      delete copy[id];
      return copy;
    });
  };

  const handleAddAnimal = async () => {
    if (!newAnimalName.trim()) return;
    await addDoc(collection(db, "animals"), { name: newAnimalName });
    setNewAnimalName("");
    fetchAnimals(); // refresh list
  };

  if (loading) {
    return <div className="text-white text-2xl p-4">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-green-100 p-8">
      <h1 className="text-2xl text-green-800 mb-6">Edit Animal Page</h1>

      {/* Add New Animal */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="New animal name"
          className="p-2 rounded border border-green-600 text-black"
          value={newAnimalName}
          onChange={(e) => setNewAnimalName(e.target.value)}
        />
        <button
          onClick={handleAddAnimal}
          className="ml-2 px-4 py-2 bg-green-700 text-black rounded"
        >
          Add Animal
        </button>
      </div>

      {/* Edit Existing Animals */}
      {animals.map((animal) => (
        <div key={animal.id} className="mb-4">
          <input
            type="text"
            className="p-2 rounded border border-green-600 text-black"
            value={editing[animal.id] ?? animal.name}
            onChange={(e) => handleChange(animal.id, e.target.value)}
          />
          <button
            onClick={() => handleSave(animal.id)}
            className="ml-2 px-4 py-2 bg-green-700 text-black rounded"
          >
            Save
          </button>
        </div>
      ))}
    </div>
  );
}
