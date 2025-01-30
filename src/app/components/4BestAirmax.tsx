import React from "react";

const BestAirMax = () => {
  // Array of items
  const items = [
    {
      image: "/Airmax1.png",
      name: "Nike Air Max Pulse Nike Dri-FIT ADV TechKnit Ultra",
      title: "Women's Shoes",
      price: "₹ 13 995",
    },
    {
      image: "/Airmax2.png",
      name: "Nike Air Max Pulse",
      title: "Men's Shoes",
      price: "₹ 13 995",
    },
    {
      image: "/Airmax3.png",
      name: "Nike Air Max Pulse",
      title: "Men's Shoes",
      price: "₹ 16 995",
    },
  ];

  return (
    <div className="w-full max-w-[1440px] mx-auto mt-[50px] px-8 sm:px-12">
      {/* Parent Title */}
      <h1 className="text-left font-bold text-3xl mb-8 font-sans">Best Of Air Max</h1>

      {/* Grid Container */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {items.map((item, index) => (
          <div
            key={index}
            className="w-full h-auto bg-gray-100 rounded-lg shadow-lg flex flex-col mx-auto"
          >
            {/* Image Section */}
            <div className="w-full h-auto overflow-hidden rounded-t-lg">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-auto object-cover"
              />
            </div>

            {/* Content Section */}
            <div className="p-4 flex flex-col justify-between flex-grow">
              {/* Name and Price */}
              <div className="flex justify-between items-center mb-2">
                <h2 className="font-semibold font-sans text-lg sm:text-xl flex-1 truncate">{item.name}</h2>
                <span className="font-bold text-lg sm:text-xl text-black ml-2">{item.price}</span>
              </div>

              <p className="text-lg sm:text-base text-gray-500 font-sans">{item.title}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BestAirMax;
