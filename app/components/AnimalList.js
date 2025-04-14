import React from "react";
import Animal from "./Animal";

const AnimalList = ({ animal }) => {
  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
      {animal.map((animal) => (
        <Animal animal={animal} key={animal.id} />
      ))}
    </ul>
  );
};

export default AnimalList;
