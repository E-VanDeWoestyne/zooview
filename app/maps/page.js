"use client";

import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { CalendarIcon, LocateFixedIcon, TicketIcon, Info } from "lucide-react"; // Changed LocationIcon to LocateFixedIcon

// Fix default marker icons for Leaflet with Next.js
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png",
});

const ZooMap = () => {
  const zooCenter = [51.0447, -114.0373];
  const mapMarkers = [
    {
      position: [51.046, -114.035],
      title: "Main Entrance",
      description: "Start your adventure here!",
      icon: LocateFixedIcon,
    },
    {
      position: [51.044, -114.039],
      title: "African Savanna",
      description: "See lions, zebras, and giraffes.",
      icon: LocateFixedIcon,
    },
    {
      position: [51.045, -114.033],
      title: "Reptile House",
      description: "Discover fascinating reptiles.",
      icon: LocateFixedIcon,
    },
    {
      position: [51.043, -114.036],
      title: "Children's Zoo",
      description: "Petting zoo and play area.",
      icon: LocateFixedIcon,
    },
  ];

  return (
    <div className="h-[500px] w-full rounded-xl overflow-hidden shadow-lg border border-green-300">
      <MapContainer
        center={zooCenter}
        zoom={15}
        scrollWheelZoom={true}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {mapMarkers.map((marker, index) => {
          const IconComponent = marker.icon || LocateFixedIcon;
          return (
            <Marker key={index} position={marker.position}>
              <Popup>
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold text-green-800">
                    {marker.title}
                  </h3>
                  <p className="text-sm text-green-700">{marker.description}</p>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
};

const EventsPage = () => {
  const events = [
    {
      title: "Wild Animal Show",
      date: "2024-07-15",
      time: "2:00 PM",
      description:
        "Watch our trainers showcase the incredible abilities of our animals.",
      location: "Main Arena",
      icon: CalendarIcon,
    },
    {
      title: "Reptile Feeding",
      date: "2024-07-16",
      time: "11:00 AM",
      description: "See how we feed our reptiles and learn about their diets.",
      location: "Reptile House",
      icon: CalendarIcon,
    },
    {
      title: "Conservation Talk",
      date: "2024-07-22",
      time: "10:00 AM",
      description: "Learn about our efforts to protect endangered species.",
      location: "Education Center",
      icon: Info,
    },
    {
      title: "Children's Day",
      date: "2024-07-20",
      time: "All day",
      description: "A fun-filled day with special activities for kids!",
      location: "Children's Zoo",
      icon: TicketIcon,
    },
  ];

  return (
    <div className="bg-gradient-to-br from-green-100 to-green-300 p-6 sm:p-8">
      <h1 className="text-3xl font-semibold text-green-800 text-center mb-8">
        <CalendarIcon className="inline-block mr-2 w-8 h-8" />
        Zoo Events
      </h1>
      <div className="max-w-4xl mx-auto space-y-6">
        {events.map((event, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-md p-4 sm:p-6 border border-green-200 flex flex-col sm:flex-row gap-4 sm:gap-6 items-start"
          >
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-green-200 flex items-center justify-center text-green-800 text-2xl sm:text-3xl">
              <event.icon className="w-8 h-8 sm:w-10 sm:h-10" />
            </div>
            <div className="space-y-2">
              <h2 className="text-xl font-bold text-green-800">
                {event.title}
              </h2>
              <p className="text-green-700">
                <span className="font-medium">Date:</span> {event.date} |{" "}
                <span className="font-medium">Time:</span> {event.time}
              </p>
              <p className="text-green-600">{event.description}</p>
              <p className="text-green-700">
                <span className="font-medium">Location:</span> {event.location}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const MapsAndEventsPage = () => {
  return (
    <div className="bg-gradient-to-br from-green-100 to-green-300 divide-y divide-green-300">
      <section className="p-4 sm:p-6 lg:p-8">
        <h2 className="text-2xl font-semibold text-green-800 mb-6 text-center">
          <LocateFixedIcon className="inline-block mr-2 w-8 h-8" />
          Zoo Map
        </h2>
        <ZooMap />
      </section>
      <section className="p-4 sm:p-6 lg:p-8">
        <EventsPage />
      </section>
    </div>
  );
};

export default MapsAndEventsPage;
