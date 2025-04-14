"use client";
import React from "react";
import Modal from "./Modal";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Image from "next/image";

const Animal = ({ animal }) => {
  const Router = useRouter();
  const [showModalEdit, setShowModalEdit] = useState(false);
  const [animalToEdit, setAnimalToEdit] = useState({});
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleEditSubmit = (e) => {
    e.preventDefault();
    axios
      .patch(`/api/animals/${animal.id}`, animalToEdit)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setShowModalEdit(false);
        Router.refresh();
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAnimalToEdit((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleDeleteAnimal = (id) => {
    axios
      .delete(`/api/animals/${id}`)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setShowDeleteModal(false);
        Router.refresh();
      });
  };

  return (
    <li
      className="p-4 bg-white shadow-lg rounded-xl flex flex-col justify-between"
      key={animal.id}
    >
      <h1 className="text-2xl font-semibold text-green-700">{animal.name}</h1>
      <p className="text-gray-500">{animal.description}</p>
      {animal.image && (
        <div className="mt-3 w-64 h-64 mx-auto">
          <Image
            width={256}
            height={256}
            src={animal.image}
            alt={animal.name}
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
      )}

      <div className="pt-5 flex items-center gap-2">
        <button
          className="text-green-600 hover:bg-green-100 hover:text-green-700 px-4 py-2 rounded-md border border-gray-300"
          onClick={() => {
            setShowModalEdit(true);
            setAnimalToEdit(animal);
          }}
        >
          Edit
        </button>
        <Modal showModal={showModalEdit} setShowModal={setShowModalEdit}>
          <form
            className="w-full px-5 pb-6 space-y-4"
            onSubmit={handleEditSubmit}
          >
            <h1 className="text-3xl font-bold text-green-800 text-center">
              Add or Update Animal
            </h1>
            <input
              type="text"
              placeholder="name"
              name="name"
              className="w-full p-2 border border-gray-300 rounded-md text-black"
              value={animalToEdit.name}
              onChange={handleChange}
            />
            <input
              type="text"
              placeholder="description"
              name="description"
              className="w-full p-2 border border-gray-300 rounded-md text-black"
              value={animalToEdit.description}
              onChange={handleChange}
            />
            <input
              type="text"
              placeholder="image"
              name="image"
              className="w-full p-2 border border-gray-300 rounded-md text-black"
              value={animalToEdit.image}
              onChange={handleChange}
            />
            <button
              type="submit"
              className="w-full bg-green-600 text-white py-3 rounded-md hover:bg-green-700 transition-colors duration-200"
            >
              Submit
            </button>
          </form>
        </Modal>
        <button
          className="text-red-600 hover:bg-red-100 hover:text-red-700 px-4 py-2 rounded-md border border-gray-300"
          onClick={() => setShowDeleteModal(true)}
        >
          Delete
        </button>
        <Modal showModal={showDeleteModal} setShowModal={setShowDeleteModal}>
          <div className="flex flex-col items-start p-4 space-y-4">
            <h1 className="text-2xl font-semibold text-green-700">
              Are you sure you want to delete this animal?
            </h1>
            <div className="flex items-center gap-4">
              <button
                className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors duration-200"
                onClick={() => handleDeleteAnimal(animal.id)}
              >
                Yes
              </button>
              <button
                className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors duration-200"
                onClick={() => setShowDeleteModal(false)}
              >
                No
              </button>
            </div>
          </div>
        </Modal>
      </div>
    </li>
  );
};

export default Animal;
