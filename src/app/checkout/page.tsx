'use client';

import React, { useEffect, useState } from 'react';
import { FiTruck } from 'react-icons/fi';
import Image from 'next/image';
import { CartItem } from '../../../types/products';
import { getCartItems, updateCartQuantity, removeFromCart } from '../actions/actions';
import { urlFor } from '../../sanity/lib/image';
import { IoIosArrowDown } from 'react-icons/io';
import { useCart } from '../context/CartContext';

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
  "Libya", "Liechtenstein", "Lithuania", "Luxembourg","Pakistan", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta"
];

const Checkoutpage = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [selectedCountry, setSelectedCountry] = useState("India");
  const [showCountryList, setShowCountryList] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { updateCart } = useCart();

  useEffect(() => {
    const items = getCartItems();
    setCartItems(items);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const calculateSubtotal = (): number => {
    if (!cartItems || !cartItems.length) return 0;
    
    return cartItems.reduce((total, item) => {
      const itemPrice = typeof item.price === 'number' ? item.price : 0;
      const itemQuantity = typeof item.quantity === 'number' ? item.quantity : 1;
      return total + (itemPrice * itemQuantity);
    }, 0);
  };

  const calculateDiscount = (): number => {
    const subtotal = calculateSubtotal();
    return Math.round((subtotal * 0.03) * 100) / 100;
  };

  const calculateTotal = (): number => {
    const subtotal = calculateSubtotal();
    const discount = calculateDiscount();
    return Math.max(0, subtotal - discount);
  };

  const formatPrice = (price: number): string => {
    if (typeof price !== 'number' || isNaN(price)) {
      return '$0.00';
    }
    return `$${Math.max(0, price).toFixed(2)}`;
  };

  const handleQuantityChange = async (productId: string, change: number) => {
    const item = cartItems.find(item => item._id === productId);
    if (!item) return;

    const newQuantity = Math.max(1, item.quantity + change);
    updateCartQuantity(productId, newQuantity);
    
    // Refresh cart items and update global cart state
    const updatedItems = getCartItems();
    setCartItems(updatedItems);
    updateCart();
  };

  const handleRemoveItem = (productId: string) => {
    removeFromCart(productId);
    const updatedItems = getCartItems();
    setCartItems(updatedItems);
    updateCart();
  };

  const [formValues, setFormValues] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    addressLine2: '',
    city: '',
    state: '',
    postalCode: '',
    locality: ''
  });

  const getImageUrl = (item: CartItem) => {
    if (item.imageUrl) return item.imageUrl;
    if (item.image?.asset?._ref) {
      try {
        return urlFor(item.image).url();
      } catch (error) {
        console.error('Error generating Sanity image URL:', error);
      }
    }
    return '/placeholder.jpg';
  };

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formValues.firstName || !formValues.lastName || !formValues.email || !formValues.phone || 
        !formValues.address || !formValues.city || !formValues.postalCode || !selectedCountry) {
      alert('Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);

    try {
      const orderData = {
        _type: "order",
        firstName: formValues.firstName,
        lastName: formValues.lastName,
        email: formValues.email,
        phone: formValues.phone,
        address: formValues.address,
        addressLine2: formValues.addressLine2 || '',
        city: formValues.city,
        state: formValues.state || '',
        postalCode: formValues.postalCode,
        country: selectedCountry,
        cartItems: cartItems.map((item) => ({
          _type: "object",
          product: {
            _type: "reference",
            _ref: item._id
          },
          quantity: item.quantity,
          price: item.price
        })),
        subtotal: calculateSubtotal(),
        total: calculateTotal(),
        orderDate: new Date().toISOString(),
        status: 'pending'
      };

      const response = await fetch('/api/order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(orderData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to place order');
      }

      const result = await response.json();
      
      if (result.success) {
        alert('Order placed successfully!');
        localStorage.removeItem('cart');
        window.location.href = '/';
      } else {
        throw new Error(result.error || 'Failed to place order');
      }
    } catch (error: unknown) {
      console.error("Error placing order:", error);
      const errorMessage = error instanceof Error ? error.message : 'Please try again later';
      alert(`Failed to place order: ${errorMessage}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const OrderSummary = () => {
    const subtotal = calculateSubtotal();
    const discount = calculateDiscount();
    const total = calculateTotal();

    return (
      <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
        <h2 className="text-2xl font-semibold mb-6 pb-4 border-b">Order Summary</h2>
        
        {/* Product List */}
        <div className="space-y-6 mb-8">
          {cartItems.map((item) => (
            <div key={item._id} className="flex space-x-4 pb-4 border-b border-gray-100">
              <div className="w-20 h-20 relative flex-shrink-0 bg-gray-50 border border-gray-100">
                <Image
                  src={getImageUrl(item)}
                  alt={item.productName}
                  fill
                  sizes="80px"
                  className="object-cover"
                  priority
                />
              </div>
              <div className="flex-grow">
                <h3 className="font-medium text-base mb-1">{item.productName}</h3>
                <p className="text-gray-600 text-sm mb-1">
                  Quantity: {item.quantity}
                  <button 
                    onClick={() => handleQuantityChange(item._id, 1)} 
                    className="ml-2 px-2 py-1 text-sm bg-gray-100 rounded hover:bg-gray-200"
                  >
                    +
                  </button>
                  <button 
                    onClick={() => handleQuantityChange(item._id, -1)}
                    className="ml-1 px-2 py-1 text-sm bg-gray-100 rounded hover:bg-gray-200"
                  >
                    -
                  </button>
                </p>
                <p className="font-medium">
                  {formatPrice(item.price)}
                </p>
                <button 
                  onClick={() => handleRemoveItem(item._id)}
                  className="text-sm text-red-500 hover:text-red-700"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Price Calculations */}
        <div className="space-y-3 border-t border-gray-200 pt-4">
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Subtotal</span>
            <span className="font-medium">{formatPrice(subtotal)}</span>
          </div>
          <div className="flex justify-between items-center text-green-600">
            <span>Discount (3%)</span>
            <span>-{formatPrice(discount)}</span>
          </div>
        </div>

        {/* Total */}
        <div className="flex justify-between items-center mt-3 pt-3 border-t border-gray-200">
          <span className="font-medium text-lg">Total</span>
          <span className="font-bold text-lg">{formatPrice(total)}</span>
        </div>
      </div>
    );
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
            name="firstName"
            value={formValues.firstName}
            onChange={handleInputChange}
            className="w-full border-[#E5E5E5] rounded-md px-4 py-3 border-[2px] placeholder:text-text-secondary-gray"
            type="text"
            placeholder="First Name"
            required
          />
          <input
            name="lastName"
            value={formValues.lastName}
            onChange={handleInputChange}
            className="w-full border-[#E5E5E5] rounded-md px-4 py-3 border-[2px] placeholder:text-text-secondary-gray"
            type="text"
            placeholder="Last Name"
            required
          />
          <input
            name="email"
            value={formValues.email}
            onChange={handleInputChange}
            className="w-full border-[#E5E5E5] rounded-md px-4 py-3 border-[2px] placeholder:text-text-secondary-gray"
            type="email"
            placeholder="Email"
            required
          />
           <input
            name="phone"
            value={formValues.phone}
            onChange={handleInputChange}
            className="w-full border-[#E5E5E5] rounded-md px-4 py-3 border-[2px] placeholder:text-text-secondary-gray"
            type="tel"
            placeholder="Phone No #"
            required
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
            name="address"
            value={formValues.address}
            onChange={handleInputChange}
            className="w-full border-[#E5E5E5] rounded-md px-4 py-3 border-[2px] placeholder:text-text-secondary-gray"
            type="text"
            placeholder="Address Line 1"
            required
          />
          <span className="text-xs text-text-primary-gray">We do not ship to P.O. boxes</span>
          <input
            name="addressLine2"
            value={formValues.addressLine2}
            onChange={handleInputChange}
            className="w-full border-[#E5E5E5] rounded-md px-4 py-3 border-[2px] placeholder:text-text-secondary-gray"
            type="text"
            placeholder="Address Line 2"
          />
        </div>

        {/** Postal Code & Locality */}
        <div className="flex flex-col sm:flex-row gap-4 mt-4">
          <input
            name="postalCode"
            value={formValues.postalCode}
            onChange={handleInputChange}
            className="flex-1 border-[#E5E5E5] rounded-md px-4 py-3 border-[2px] placeholder:text-text-secondary-gray"
            type="text"
            placeholder="Postal Code"
            required
          />
          <input
            name="locality"
            value={formValues.locality}
            onChange={handleInputChange}
            className="flex-1 border-[#E5E5E5] rounded-md px-4 py-3 border-[2px] placeholder:text-text-secondary-gray"
            type="text"
            placeholder="Locality"
          />
        </div>

        {/** City & State */}
        <div className="flex flex-col sm:flex-row gap-4 mt-4">
          <input
            name="city"
            value={formValues.city}
            onChange={handleInputChange}
            className="flex-1 border-[#E5E5E5] rounded-md px-4 py-3 border-[2px] placeholder:text-text-secondary-gray"
            type="text"
            placeholder="City"
            required
          />
          <input
            name="state"
            value={formValues.state}
            onChange={handleInputChange}
            className="flex-1 border-[#E5E5E5] rounded-md px-4 py-3 border-[2px] placeholder:text-text-secondary-gray"
            type="text"
            placeholder="State"
          />
        </div>

        <form onSubmit={handlePlaceOrder}>
          <button 
            type="submit"
            disabled={isSubmitting}
            className="w-full text-white rounded-xl py-4 mt-8 font-medium text-lg animate-gradient transform hover:scale-[1.02] hover:shadow-2xl focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 shadow-lg active:scale-95 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Processing...' : 'Continue'}
          </button>
        </form>
      </div>

      {/* Right Section - Order Summary */}
      <div className="col-span-12 lg:col-span-4">
        <OrderSummary />
      </div>
    </div>
  );
};

export default Checkoutpage;
