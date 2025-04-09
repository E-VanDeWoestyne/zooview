"use client";

import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix default marker icons for Leaflet with Next.js
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png",
});

const MapsPage = () => {
  const zooCenter = [51.0447, -114.0373]; // Change to your zoo's location (Delhi Zoo used as example)

  return (
    <div className="min-h-screen bg-green-100 p-8">
      <h1 className="text-2xl font-semibold text-green-800 text-center mb-6">
        Zoo Map
      </h1>
      <div className="h-[500px] w-full max-w-5xl mx-auto rounded-xl overflow-hidden shadow-md border border-green-300">
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
          <Marker position={zooCenter}>
            <Popup>
              Welcome to ZooView! <br/> 
            </Popup>
          </Marker>
        </MapContainer>
      </div>
    </div>
  );
};

export default MapsPage;
