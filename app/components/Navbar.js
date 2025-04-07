"use client";

import { TicketIcon, PawPrintIcon, MapIcon, PhoneIcon } from "lucide-react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase/config";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function ZooViewHeader() {
  const [user] = useAuthState(auth);
  const router = useRouter();

  const navItems = [
    {
      href: "/tickets",
      icon: <TicketIcon className="mr-2 h-5 w-5" />,
      label: "Book Tickets",
    },
    {
      href: "/animals",
      icon: <PawPrintIcon className="mr-2 h-5 w-5" />,
      label: "Animal Species",
    },
    {
      href: "/maps",
      icon: <MapIcon className="mr-2 h-5 w-5" />,
      label: "Maps & Events",
    },
    ...(user
      ? [
          {
            href: "/edit-animals",
            icon: <PawPrintIcon className="mr-2 h-5 w-5" />,
            label: "Edit Animals",
          },
        ]
      : []),
  ];

  return (
    <header className="bg-green-800 text-white shadow-md">
      <div className="container mx-auto flex justify-between items-center p-4">
        <Link href="/" className="text-2xl font-bold flex items-center">
          <PawPrintIcon className="mr-2 h-8 w-8" />
          ZooView
        </Link>

        <nav className="flex items-center space-x-6">
          <ul className="flex space-x-4">
            {navItems.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="flex items-center hover:text-green-200 transition-colors"
                >
                  {item.icon}
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          {!user ? (
            <button
              onClick={() => router.push("/sign-in")}
              className="bg-white text-green-800 px-3 py-1 rounded hover:bg-green-100 transition-colors"
            >
              Employee Login
            </button>
          ) : (
            <button
              onClick={() => auth.signOut()}
              className="bg-red-500 px-3 py-1 rounded hover:bg-red-600 transition-colors"
            >
              Sign Out
            </button>
          )}
        </nav>
      </div>
    </header>
  );
}
