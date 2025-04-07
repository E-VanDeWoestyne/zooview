"use client";

import { useState } from "react";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth } from "../firebase/config";
import { useRouter } from "next/navigation";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signInWithEmailAndPassword] = useSignInWithEmailAndPassword(auth);
  const router = useRouter();

  const handleSignIn = async (e) => {
    e.preventDefault(); // 🛑 Prevent the page from refreshing
    try {
      const res = await signInWithEmailAndPassword(email, password);
      sessionStorage.setItem("user", "true");
      setEmail("");
      setPassword("");
      router.push("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-800">
      <div className="bg-white p-10 rounded-2xl shadow-2xl w-full max-w-md">
        <h1 className="text-green-800 text-3xl font-bold mb-6 text-center">
          Employee Sign In
        </h1>

        <form onSubmit={handleSignIn} className="flex flex-col">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 mb-4 border border-green-300 rounded-lg outline-none focus:ring-2 focus:ring-green-500 text-black"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 mb-6 border border-green-300 rounded-lg outline-none focus:ring-2 focus:ring-green-500 text-black"
          />

          <button
            type="submit"
            className="w-full p-3 bg-green-800 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
