import React from "react";

const AnimalsPage = () => {
  return (
    <div className="min-h-screen bg-green-100">
      <div className="p-8 text-2xl text-green-800 text-center">
        animal list page
      </div>
       
        <div className="flex "> //justify-center items-center 
          <div className="bg-gray-100 p-4 rounded-md shadow-md">
          <img src="./img/images.jpeg" alt="animal" width="300" height={200}   style={{ borderRadius: '25px', display: 'block' }}
               />  
               <p className="=mt-2 text-center text-gray-700">hello evryone this is an ostrache </p>   
          </div>
        </div>
    </div>
  );
};

export default AnimalsPage;
