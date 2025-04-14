"use client";
import React from "react";
import Image from "next/image";

const PublicAnimal = ({ animal }) => {
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
    </li>
  );
};

export default PublicAnimal;
