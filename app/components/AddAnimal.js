"use client";
import React from "react";
import Modal from "./Modal";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const AddAnimal = () => {
  const Router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [input, setInput] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("/api/animals", input)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setInput({});
        setShowModal(false);
        Router.refresh();
      });
  };

  return (
    <div className="flex justify-center">
      <button
        onClick={() => setShowModal(true)}
        className="w-full bg-green-600 text-white py-3 rounded-md hover:bg-green-700 transition-colors duration-200"
      >
        Add New Animal
      </button>

      <Modal showModal={showModal} setShowModal={setShowModal}>
        <form className="w-full px-5 pb-6 space-y-4" onSubmit={handleSubmit}>
          <h1 className="text-3xl font-bold text-green-800 text-center">
            Add New Animal
          </h1>

          <input
            type="text"
            placeholder="name"
            name="name"
            className="w-full p-2 border border-gray-300 rounded-md text-black"
            value={input.name || ""}
            onChange={handleChange}
          />

          <input
            type="text"
            placeholder="description"
            name="description"
            className="w-full p-2 border border-gray-300 rounded-md text-black"
            value={input.description || ""}
            onChange={handleChange}
          />

          <input
            type="text"
            placeholder="image"
            name="image"
            className="w-full p-2 border border-gray-300 rounded-md text-black"
            value={input.image || ""}
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
    </div>
  );
};

export default AddAnimal;
