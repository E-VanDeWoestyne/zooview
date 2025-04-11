"use client";

import React from 'react';

const HomePage = () => {
  return (
    React.createElement("div", { className: "min-h-screen bg-gradient-to-br from-green-100 to-green-300 flex flex-col items-center justify-center" },
      React.createElement("div", { className: "p-8 rounded-lg shadow-2xl bg-white/80 backdrop-blur-md text-center space-y-6" },
        React.createElement("h1", { className: "text-4xl font-bold text-green-800 mb-4" },
          "Welcome to ZooView!"
        ),
        React.createElement("p", { className: "text-lg text-green-700 mb-6" },
          "Explore a variety of animals and learn about our conservation efforts."
        ),
        React.createElement("div", { className: "flex justify-center" },
          React.createElement("img", {
            src: "./img/slender-tailed_meerkat.jpeg", // Placeholder image path
            alt: "Happy animals at the zoo",
            className: "rounded-xl max-w-full h-auto shadow-lg border border-green-200",
            style: {maxWidth: '400px'}
          })
        ),
        React.createElement("p", { className: "text-md text-green-600 mt-4" },
          "We are committed to providing a safe and educational experience for all our visitors."
        )
      )
    )
  );
};

export default HomePage;
