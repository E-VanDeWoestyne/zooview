import React from "react";
import PublicAnimal from "./PublicAnimal";
const PublicAnimalList = ({ animal }) => {
  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
      {animal.map((animal) => (
        <PublicAnimal animal={animal} key={animal.id} />
      ))}
    </ul>
  );
};
export default PublicAnimalList;
