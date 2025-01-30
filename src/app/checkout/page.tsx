"use client";
import React, { useEffect, useState } from 'react';
import { FiTruck } from 'react-icons/fi';
import Image from 'next/image';
import { Product } from '../../../types/products';
import { getCartItems } from '../actions/actions';
import { urlFor } from '../../sanity/lib/image';
import { IoIosArrowDown } from 'react-icons/io';

const countries = [
  "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda", "Argentina", "Armenia", "Australia", "Austria",
  "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bhutan",
  "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria", "Burkina Faso", "Burundi", "Cabo Verde",
  "Cambodia", "Cameroon", "Canada", "Central African Republic", "Chad", "Chile", "China", "Colombia", "Comoros",
  "Congo", "Costa Rica", "Croatia", "Cuba", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica",
  "Dominican Republic", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Eswatini",
  "Ethiopia", "Fiji", "Finland", "France", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Greece", "Grenada",
  "Guatemala", "Guinea", "Guinea-Bissau", "Guyana", "Haiti", "Honduras", "Hungary", "Iceland", "India", "Indonesia",
  "Iran", "Iraq", "Ireland", "Israel", "Italy", "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya", "Kiribati",
  "Korea, North", "Korea, South", "Kosovo", "Kuwait", "Kyrgyzstan", "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia",
  "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta",
  "Marshall Islands", "Mauritania", "Mauritius", "Mexico", "Micronesia", "Moldova", "Monaco", "Mongolia", "Montenegro",
  "Morocco", "Mozambique", "Myanmar", "Namibia", "Nauru", "Nepal", "Netherlands", "New Zealand", "Nicaragua", "Niger",
  "Nigeria", "North Macedonia", "Norway", "Oman", "Pakistan", "Palau", "Palestine", "Panama", "Papua New Guinea",
  "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Qatar", "Romania", "Russia", "Rwanda", "Saint Kitts and Nevis",
  "Saint Lucia", "Saint Vincent and the Grenadines", "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia",
  "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "Somalia",
  "South Africa", "South Sudan", "Spain", "Sri Lanka", "Sudan", "Suriname", "Sweden", "Switzerland", "Syria", "Taiwan",
  "Tajikistan", "Tanzania", "Thailand", "Timor-Leste", "Togo", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey",
  "Turkmenistan", "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States", "Uruguay",
  "Uzbekistan", "Vanuatu", "Vatican City", "Venezuela", "Vietnam", "Yemen", "Zambia", "Zimbabwe"
];

const Checkoutpage = () => {
  const [cartItems, setCartItems] = useState<Product[]>([]);
  const [selectedCountry, setSelectedCountry] = useState("India");
  const [showCountryList, setShowCountryList] = useState(false);

  useEffect(() => {
    setCartItems(getCartItems());
  }, []);

  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.inventory, 0);
  };

  const calculateDiscount = () => {
    return calculateSubtotal() * 0.03;
  };

  const calculateTotal = () => {
    return calculateSubtotal() - calculateDiscount();
  };

  return (
    <div className="grid grid-cols-12 px-4 sm:px-6 lg:px-32 gap-6 lg:gap-20 my-10">
      {/* Left Section */}
      <div className="col-span-12 lg:col-span-8">
        <h2 className="font-bold text-lg lg:text-xl pb-4">How would you like to get your order?</h2>
        <p className="text-sm lg:text-base leading-relaxed">
          Customs regulation for India require a copy of the recipient's KYC. The address on the KYC needs to match the
          shipping address. Our courier will contact you via SMS/email to obtain a copy of your KYC. The KYC will be
          stored securely and used solely for the purpose of clearing customs (including sharing it with customs
          officials) for all orders and returns. If your KYC does not match your shipping address, please click the link
          for more information. <span className="underline">Learn More</span>
        </p>
        <div className="flex items-center border-[1.5px] border-black px-4 py-4 rounded-lg my-6 sm:my-10">
          <FiTruck size={24} />
          <span className="pl-4 text-sm lg:text-base">Deliver It</span>
        </div>

        <h2 className="font-bold text-lg lg:text-xl pb-4">Enter your name and address:</h2>
        {/** Input Fields */}
        <div className="space-y-4">
          <input
            className="w-full border-[#E5E5E5] rounded-md px-4 py-3 border-[2px] placeholder:text-text-secondary-gray"
            type="text"
            placeholder="First Name"
          />
          <input
            className="w-full border-[#E5E5E5] rounded-md px-4 py-3 border-[2px] placeholder:text-text-secondary-gray"
            type="text"
            placeholder="Last Name"
          />
          <div className="relative">
            <button
              onClick={() => setShowCountryList(!showCountryList)}
              className="w-full border-[#E5E5E5] rounded-md px-4 py-3 border-[2px] text-left flex justify-between items-center"
            >
              <span className={selectedCountry ? "text-black" : "text-text-secondary-gray"}>
                {selectedCountry || "Select Country"}
              </span>
              <IoIosArrowDown className={`transition-transform ${showCountryList ? 'rotate-180' : ''}`} />
            </button>
            {showCountryList && (
              <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-auto">
                {countries.map((country) => (
                  <button
                    key={country}
                    className="w-full px-4 py-2 text-left hover:bg-gray-100 focus:outline-none"
                    onClick={() => {
                      setSelectedCountry(country);
                      setShowCountryList(false);
                    }}
                  >
                    {country}
                  </button>
                ))}
              </div>
            )}
          </div>
          <input
            className="w-full border-[#E5E5E5] rounded-md px-4 py-3 border-[2px] placeholder:text-text-secondary-gray"
            type="text"
            placeholder="Address Line 1"
          />
          <span className="text-xs text-text-primary-gray">We do not ship to P.O. boxes</span>
          <input
            className="w-full border-[#E5E5E5] rounded-md px-4 py-3 border-[2px] placeholder:text-text-secondary-gray"
            type="text"
            placeholder="Address Line 2"
          />
        </div>

        {/** Postal Code & Locality */}
        <div className="flex flex-col sm:flex-row gap-4 mt-4">
          <input
            className="flex-1 border-[#E5E5E5] rounded-md px-4 py-3 border-[2px] placeholder:text-text-secondary-gray"
            type="text"
            placeholder="Postal Code"
          />
          <input
            className="flex-1 border-[#E5E5E5] rounded-md px-4 py-3 border-[2px] placeholder:text-text-secondary-gray"
            type="text"
            placeholder="Locality"
          />
        </div>

        {/** City & State */}
        <div className="flex flex-col sm:flex-row gap-4 mt-4">
          <input
            className="flex-1 border-[#E5E5E5] rounded-md px-4 py-3 border-[2px] placeholder:text-text-secondary-gray"
            type="text"
            placeholder="City"
          />
          <input
            className="flex-1 border-[#E5E5E5] rounded-md px-4 py-3 border-[2px] placeholder:text-text-secondary-gray"
            type="text"
            placeholder="State"
          />
        </div>

        <button className="w-full text-white rounded-full py-4 mt-8 hover:shadow-lg transition-all duration-200 transform hover:scale-[1.02] animate-gradient">
          Continue
        </button>
      </div>

      {/* Right Section - Order Summary */}
      <div className="col-span-12 lg:col-span-4">
        <div className="bg-white p-6 rounded-lg shadow-sm border sticky top-4">
          <h2 className="text-xl font-bold mb-6">Order Summary</h2>
          
          {/* Product List */}
          <div className="space-y-4 mb-6">
            {cartItems.map((item) => (
              <div key={item._id} className="flex items-start space-x-4">
                <div className="w-20 h-20 relative flex-shrink-0">
                  <Image
                    src={item.image ? urlFor(item.image).url() : '/placeholder-image.jpg'}
                    alt={item.productName}
                    fill
                    className="rounded-lg object-cover"
                    priority
                  />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium">{item.productName}</h3>
                  <p className="text-gray-600 text-sm">Quantity: {item.inventory}</p>
                  <p className="text-black font-medium">${(item.price * item.inventory).toFixed(2)}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Order Calculations */}
          <div className="space-y-2 border-t pt-4">
            <div className="flex justify-between">
              <span className="text-gray-600">Subtotal</span>
              <span>${calculateSubtotal().toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-green-600">
              <span>Discount (3%)</span>
              <span>-${calculateDiscount().toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-bold text-lg border-t pt-2 mt-2">
              <span>Total</span>
              <span>${calculateTotal().toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkoutpage;
