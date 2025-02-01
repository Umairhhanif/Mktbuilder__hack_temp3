"use client";

import React, { useState } from "react";
import GoogleMapReact from "google-map-react";
import "./sky.css";

// Define the props for the StoreMarker component
interface StoreMarkerProps {
  lat: number;
  lng: number;
  text: string;
}

// Marker Component for the Map
const StoreMarker: React.FC<StoreMarkerProps> = ({ text }) => (
  <div className="text-black font-semibold bg-white px-3 py-2 rounded-md shadow-md">
    <div>{text}</div>
  </div>
);

// Sky Background Component
const AnimatedSky = () => (
  <div className="fixed top-0 left-0 w-full h-full -z-10">
    <div className="absolute inset-0 bg-sky-400">
      <div className="cloud cloud1"></div>
      <div className="cloud cloud2"></div>
      <div className="cloud cloud3"></div>
      <div className="bird bird1"></div>
      <div className="bird bird2"></div>
      <div className="bird bird3"></div>
      <div className="bird bird4"></div>
    </div>
  </div>
);

const FindStore = () => {
  const [searchTerm, setSearchTerm] = useState("");

  // Store Data
  const stores = [
    {
      id: 1,
      name: "Nike Store - New York",
      lat: 40.7128,
      lng: -74.0060,
      address: "123 Fifth Ave, NY",
      phone: "123-456-7890",
      hours: "Mon-Fri: 10am - 9pm, Sat-Sun: 11am - 7pm"
    },
    {
      id: 2,
      name: "Nike Outlet - Los Angeles",
      lat: 34.0522,
      lng: -118.2437,
      address: "456 Sunset Blvd, CA",
      phone: "987-654-3210",
      hours: "Mon-Sun: 10am - 8pm"
    },
    {
      id: 3,
      name: "Nike Flagship - Chicago",
      lat: 41.8781,
      lng: -87.6298,
      address: "789 Michigan Ave, IL",
      phone: "456-789-0123",
      hours: "Mon-Sun: 10am - 9pm"
    }
  ];

  // Default Map Settings
  const defaultCenter = { lat: 39.8283, lng: -98.5795 };
  const defaultZoom = 4;

  // Handle Search Action
  const handleSearch = () => {
    console.log(`Searching for stores near: ${searchTerm}`);
  };

  return (
    <div className="min-h-screen font-sans relative overflow-hidden">
      <AnimatedSky />
      {/* Hero Section */}
      <div className="relative bg-cover bg-center text-white py-28 text-center">
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="relative z-10">
          <h1 className="text-5xl font-bold">Find a Nike Store</h1>
          <p className="mt-4 text-xl">
            Discover the latest gear and expert service near you.
          </p>
        </div>
      </div>

      {/* Search Bar */}
      <div className="container mx-auto px-6 py-10">
        <div className="flex justify-center items-center gap-2">
          <input
            type="text"
            placeholder="Enter your city, state, or zip code"
            className="w-full max-w-2xl px-6 py-4 border border-gray-300 rounded-full focus:ring-2 focus:ring-black focus:outline-none text-lg"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button
            className="bg-black text-white px-8 py-4 rounded-full font-medium hover:bg-gray-800 transition-all"
            onClick={handleSearch}
          >
            Search
          </button>
        </div>
      </div>

      {/* Help Section */}
      <div className="container mx-auto px-6 py-16 bg-white/80 backdrop-blur-md rounded-3xl my-10 max-w-6xl">
        <h2 className="text-3xl font-bold text-center mb-12">How to Find Your Nike Store</h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Search Card */}
          <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-6">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-4">Search by Location</h3>
            <p className="text-gray-600">
              Enter your city, state, or zip code to find Nike stores near you. We'll show you the closest locations with real-time availability.
            </p>
          </div>

          {/* Store Types Card */}
          <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-6">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-4">Store Types</h3>
            <p className="text-gray-600">
              Find different Nike store types including Nike Factory Stores, Nike Community Stores, and Nike Unite locations.
            </p>
          </div>

          {/* Services Card */}
          <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-6">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-4">Store Services</h3>
            <p className="text-gray-600">
              Learn about available services like Nike Expert advice, curbside pickup, returns, and Nike Member benefits.
            </p>
          </div>
        </div>

        {/* Quick Tips */}
        <div className="mt-12 bg-gray-50 p-8 rounded-2xl">
          <h3 className="text-xl font-semibold mb-6">Quick Tips</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-yellow-600 font-semibold">1</span>
              </div>
              <p className="text-gray-600">Use your current location for faster results</p>
            </div>
            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-yellow-600 font-semibold">2</span>
              </div>
              <p className="text-gray-600">Filter by store type to find specific services</p>
            </div>
            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-yellow-600 font-semibold">3</span>
              </div>
              <p className="text-gray-600">Check store hours before visiting</p>
            </div>
            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-yellow-600 font-semibold">4</span>
              </div>
              <p className="text-gray-600">Sign in as Nike Member for personalized results</p>
            </div>
          </div>
        </div>
      </div>

      {/* Store List */}
      <div className="container mx-auto px-6 py-10">
        <h2 className="text-3xl font-semibold mb-8 text-center">Stores Near You</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {stores.map((store) => (
            <div
              key={store.id}
              className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition-all border"
            >
              <h3 className="text-xl font-semibold">{store.name}</h3>
              <p className="text-gray-600 mt-2">{store.address}</p>
              <p className="text-gray-600 mt-2">{store.phone}</p>
              <p className="text-gray-600 mt-2">{store.hours}</p>
              <button className="mt-6 px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition">
                View Details
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Map Section */}
      <div className="bg-gray-100 py-16">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-semibold mb-6">Explore Our Locations</h2>
          <p className="text-gray-600 mb-10">
            Use our interactive map to find the store closest to you.
          </p>
          <div className="relative w-full h-96 max-w-5xl mx-auto rounded-lg overflow-hidden">
            <GoogleMapReact
              bootstrapURLKeys={{ key: "AIzaSyBXaZaLEDt4qGYqkTqC5JP8Cg3X9o5CRX8" }} 
              defaultCenter={defaultCenter}
              defaultZoom={defaultZoom}
            >
              {stores.map((store) => (
                <StoreMarker
                  key={store.id}
                  lat={store.lat}
                  lng={store.lng}
                  text={store.name}
                />
              ))}
            </GoogleMapReact>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FindStore;
