import { TicketIcon, PawPrintIcon, MapIcon, PhoneIcon } from "lucide-react";

export default function ZooViewHeader() {
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
    {
      href: "/contact",
      icon: <PhoneIcon className="mr-2 h-5 w-5" />,
      label: "Contact Us",
    },
  ];

  return (
    <header className="bg-green-800 text-white shadow-md">
      <div className="container mx-auto flex justify-between items-center p-4">
        <a href="/" className="text-2xl font-bold flex items-center">
          <PawPrintIcon className="mr-2 h-8 w-8" />
          ZooView
        </a>

        <nav>
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
        </nav>
      </div>
    </header>
  );
}
