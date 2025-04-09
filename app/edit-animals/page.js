"use client";

import { useEffect, useState } from "react";
import {
  collection,
  addDoc,
  onSnapshot,
  updateDoc,
  doc,
} from "firebase/firestore";
import { auth, db } from "../firebase/config";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/navigation";

export default function EditAnimals() {
  const [user, loading] = useAuthState(auth);
  const router = useRouter();
  const [animals, setAnimals] = useState([]);
  const [newAnimal, setNewAnimal] = useState({
    name: "",
    description: "",
    imageUrl: "",
  });
  const [editing, setEditing] = useState({});

  useEffect(() => {
    if (!loading && !user) {
      router.push("/sign-in");
    }
  }, [user, loading, router]);

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

  const handleAdd = async () => {
    if (!newAnimal.name.trim()) return;
    await addDoc(collection(db, "animals"), newAnimal);
    setNewAnimal({ name: "", description: "", imageUrl: "" });
  };

  const handleEditChange = (id, field, value) => {
    setEditing((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        [field]: value,
      },
    }));
  };

  const handleSave = async (id) => {
    const updated = editing[id];
    if (!updated?.name?.trim()) return;
    const docRef = doc(db, "animals", id);
    await updateDoc(docRef, updated);
    setEditing((prev) => ({ ...prev, [id]: null }));
  };

  if (loading) return <div className="p-4 text-green-800 text-xl">Loading...</div>;

  return (
    <div className="min-h-screen bg-green-100 p-8">
      <h1 className="text-3xl font-semibold text-green-800 mb-6">
        ✏️ Edit Animal Page
      </h1>

      {/* Add new animal form */}
      <div className="bg-white rounded-xl shadow-md p-4 mb-6 border border-green-200 max-w-xl">
        <h2 className="text-lg font-bold text-green-800 mb-2">Add New Animal</h2>
        <input
          type="text"
          placeholder="Name"
          className="mb-2 w-full p-2 border border-green-600 rounded text-green-900 placeholder-green-500"
          value={newAnimal.name}
          onChange={(e) =>
            setNewAnimal({ ...newAnimal, name: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Description"
          className="mb-2 w-full p-2 border border-green-600 rounded text-green-900 placeholder-green-500"
          value={newAnimal.description}
          onChange={(e) =>
            setNewAnimal({ ...newAnimal, description: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Image URL"
          className="mb-2 w-full p-2 border border-green-600 rounded text-green-900 placeholder-green-500"
          value={newAnimal.imageUrl}
          onChange={(e) =>
            setNewAnimal({ ...newAnimal, imageUrl: e.target.value })
          }
        />
        <button
          className="px-4 py-2 bg-green-700 text-white rounded hover:bg-green-800"
          onClick={handleAdd}
        >
          Add Animal
        </button>
      </div>

      {/* Edit existing animals */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {animals.map((animal) => (
          <div
            key={animal.id}
            className="bg-white rounded-xl shadow-md p-4 border border-green-200"
          >
            <input
              type="text"
              className="mb-2 w-full p-2 border border-green-600 rounded text-green-900 bg-white"
              value={
                editing[animal.id]?.name ?? animal.name
              }
              onChange={(e) =>
                handleEditChange(animal.id, "name", e.target.value)
              }
            />
            <input
              type="text"
              className="mb-2 w-full p-2 border border-green-600 rounded text-green-900 bg-white"
              value={
                editing[animal.id]?.description ?? animal.description
              }
              onChange={(e) =>
                handleEditChange(animal.id, "description", e.target.value)
              }
            />
            <input
              type="text"
              className="mb-2 w-full p-2 border border-green-600 rounded text-green-900 bg-white"
              value={
                editing[animal.id]?.imageUrl ?? animal.imageUrl
              }
              onChange={(e) =>
                handleEditChange(animal.id, "imageUrl", e.target.value)
              }
            />
            <button
              className="px-4 py-2 bg-green-700 text-white rounded hover:bg-green-800"
              onClick={() => handleSave(animal.id)}
            >
              Save
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
