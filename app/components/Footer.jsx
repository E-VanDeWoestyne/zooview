import { MailIcon, PhoneIcon, PawPrintIcon } from "lucide-react";

export default function Footer() {
  const contactInfo = [
    {
      icon: <PhoneIcon className="mr-2 h-5 w-5" />,
      text: "(555) 123-4567",
    },
    {
      icon: <MailIcon className="mr-2 h-5 w-5" />,
      text: "info@zooview.com",
    },
  ];

  return (
    <footer className="bg-green-800 text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4 flex items-center">
              <PawPrintIcon className="mr-2 h-6 w-6" />
              ZooView
            </h3>
            <p className="text-sm text-green-100">
              Connecting people with wildlife through education, conservation,
              and unforgettable experiences.
            </p>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-2">
              {contactInfo.map((contact, index) => (
                <li key={index} className="flex items-center">
                  {contact.icon}
                  <span className="text-sm">{contact.text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="text-center mt-8 pt-4 border-t border-green-700">
          <p className="text-sm text-green-200">
            © {new Date().getFullYear()} ZooView. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
