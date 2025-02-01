import React from 'react';
import {  FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaComments, FaGift, FaTag, FaCreditCard, FaBox } from 'react-icons/fa';
import Link from 'next/link';
import './animations.css';

const Helppage = () => {
  return (
    <div className='min-h-screen bg-gradient-to-b from-gray-50 to-white'>
      {/* Hero Section */}
      <div className='relative bg-black text-white py-16 animate-fadeIn'>
        <div className='absolute inset-0 bg-[url("/nikepattern.png")] opacity-10'></div>
        <div className='container mx-auto px-4 relative z-10'>
          <h1 className='text-4xl md:text-5xl font-bold text-center mb-6 animate-scaleIn'>How Can We Help You?</h1>
          <div className="max-w-2xl mx-auto">
            <div className="flex bg-white rounded-full overflow-hidden shadow-lg hover-glow pulse-on-hover">
              <input 
                className="w-full px-6 py-4 text-black focus:outline-none" 
                type="text" 
                placeholder="Search for help..." 
              />
              <button className="bg-black text-white px-8 py-4 hover:bg-gray-800 transition-all duration-300">
                Search
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Gift Guide Section */}
      <div className="container mx-auto px-4 py-16 animate-fadeIn" style={{ animationDelay: '0.2s' }}>
        <h2 className="text-3xl font-bold text-center mb-12">Gift Shopping Guide</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Gift Card */}
          <div className="card-hover bg-white rounded-2xl p-6 shadow-lg border border-gray-100 animate-fadeIn" style={{ animationDelay: '0.3s' }}>
            <div className="w-14 h-14 bg-pink-100 rounded-full flex items-center justify-center mb-6 icon-hover">
              <FaGift className="w-6 h-6 text-pink-600" />
            </div>
            <h3 className="text-xl font-semibold mb-4">Nike Gift Cards</h3>
            <p className="text-gray-600">The perfect gift for every athlete. Digital and physical cards available.</p>
            <Link href="#" className="inline-block mt-4 text-pink-600 font-semibold hover:text-pink-700 link-hover">
              Learn More →
            </Link>
          </div>

          {/* Special Offers */}
          <div className="card-hover bg-white rounded-2xl p-6 shadow-lg border border-gray-100 animate-fadeIn" style={{ animationDelay: '0.4s' }}>
            <div className="w-14 h-14 bg-purple-100 rounded-full flex items-center justify-center mb-6 icon-hover">
              <FaTag className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold mb-4">Special Offers</h3>
            <p className="text-gray-600">Discover current promotions and special deals on Nike products.</p>
            <Link href="#" className="inline-block mt-4 text-purple-600 font-semibold hover:text-purple-700 link-hover">
              View Offers →
            </Link>
          </div>

          {/* Payment Options */}
          <div className="card-hover bg-white rounded-2xl p-6 shadow-lg border border-gray-100 animate-fadeIn" style={{ animationDelay: '0.5s' }}>
            <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mb-6 icon-hover">
              <FaCreditCard className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold mb-4">Payment Options</h3>
            <p className="text-gray-600">Multiple payment methods available for your convenience.</p>
            <Link href="#" className="inline-block mt-4 text-blue-600 font-semibold hover:text-blue-700 link-hover">
              See Options →
            </Link>
          </div>

          {/* Shipping Info */}
          <div className="card-hover bg-white rounded-2xl p-6 shadow-lg border border-gray-100 animate-fadeIn" style={{ animationDelay: '0.6s' }}>
            <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mb-6 icon-hover">
              <FaBox className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold mb-4">Shipping Info</h3>
            <p className="text-gray-600">Get details about delivery times and shipping methods.</p>
            <Link href="#" className="inline-block mt-4 text-green-600 font-semibold hover:text-green-700 link-hover">
              Check Shipping →
            </Link>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-12 gap-8">
          {/* Left Column - FAQs */}
          <div className='col-span-12 lg:col-span-8 animate-fadeIn' style={{ animationDelay: '0.7s' }}>
            <div className="bg-white rounded-2xl p-8 shadow-lg hover-glow">
              <h2 className="text-2xl font-bold mb-6">
                PAYMENT OPTIONS FOR NIKE ORDERS
              </h2>
              <p className="text-gray-600 mb-6">
                We want to make buying your favourite Nike shoes and gear online fast and easy. We accept various payment methods:
              </p>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center space-x-3 hover-lift">
                  <span className="w-2 h-2 bg-black rounded-full"></span>
                  <span>Credit/Debit Cards (Visa, Mastercard, American Express)</span>
                </li>
                <li className="flex items-center space-x-3 hover-lift">
                  <span className="w-2 h-2 bg-black rounded-full"></span>
                  <span>PayTM and Local Payment Methods</span>
                </li>
                <li className="flex items-center space-x-3 hover-lift">
                  <span className="w-2 h-2 bg-black rounded-full"></span>
                  <span>Apple Pay</span>
                </li>
              </ul>

              <div className="flex gap-4 mb-8">
                <button className="w-full py-3 bg-black text-white rounded-full hover:bg-gray-800 transition-all duration-300 hover-lift">
                  Join Us
                </button>
                <button className="w-full py-3 bg-white text-black border-2 border-black rounded-full hover:bg-gray-100 transition-all duration-300 hover-lift">
                  Shop Nike
                </button>
              </div>

              {/* FAQs Section */}
              <div className="space-y-6">
                <h3 className="text-xl font-bold">Frequently Asked Questions</h3>
                {faqItems.map((faq, index) => (
                  <div key={index} className="p-6 bg-gray-50 rounded-xl hover-lift hover-glow transition-all duration-300">
                    <h4 className="font-semibold mb-2">{faq.question}</h4>
                    <p className="text-gray-600">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Contact Info */}
          <div className='col-span-12 lg:col-span-4 animate-fadeIn' style={{ animationDelay: '0.8s' }}>
            <div className="bg-white rounded-2xl p-8 shadow-lg hover-glow">
              <h2 className='text-2xl font-bold text-center mb-8'>Contact Us</h2>
              
              <div className="space-y-8">
                {/* Phone */}
                <div className="text-center p-6 bg-gray-50 rounded-xl hover-lift hover-glow transition-all duration-300">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 icon-hover">
                    <FaPhoneAlt className="w-5 h-5 text-blue-600"/>
                  </div>
                  <p className="font-semibold">000 800 919 0566</p>
                  <p className="text-sm text-gray-600 mt-2">24/7 Customer Support</p>
                </div>

                {/* Chat */}
                <div className="text-center p-6 bg-gray-50 rounded-xl hover-lift hover-glow transition-all duration-300">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 icon-hover">
                    <FaComments className="w-5 h-5 text-green-600"/>
                  </div>
                  <p className="font-semibold">Live Chat</p>
                  <p className="text-sm text-gray-600 mt-2">Available 24/7</p>
                </div>

                {/* Email */}
                <div className="text-center p-6 bg-gray-50 rounded-xl hover-lift hover-glow transition-all duration-300">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4 icon-hover">
                    <FaEnvelope className="w-5 h-5 text-purple-600"/>
                  </div>
                  <p className="font-semibold">Email Support</p>
                  <p className="text-sm text-gray-600 mt-2">Response within 24 hours</p>
                </div>

                {/* Store Locator */}
                <div className="text-center p-6 bg-gray-50 rounded-xl hover-lift hover-glow transition-all duration-300">
                  <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4 icon-hover">
                    <FaMapMarkerAlt className="w-5 h-5 text-red-600"/>
                  </div>
                  <p className="font-semibold">Find a Store</p>
                  <p className="text-sm text-gray-600 mt-2">Locate Nike stores near you</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const faqItems = [
  {
    question: "Does my card need international purchases enabled?",
    answer: "Yes, we recommend asking your bank to enable international purchases on your card. You will be notified at checkout if international purchases need to be enabled."
  },
  {
    question: "Can I pay for my order with multiple methods?",
    answer: "No, payment for Nike orders can't be split between multiple payment methods."
  },
  {
    question: "What payment method is accepted for SNKRS orders?",
    answer: "You can use any accepted credit card to pay for your SNKRS order."
  },
  {
    question: "Why don't I see Apple Pay as an option?",
    answer: "To see Apple Pay as an option, you'll need to use a compatible Apple device running the latest OS, be signed in to your iCloud account, and have a supported card in your Wallet."
  }
];

export default Helppage;
