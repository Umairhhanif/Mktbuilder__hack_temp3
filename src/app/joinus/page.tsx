'use client'

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const JoinUs = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-500 via-pink-500 to-purple-600 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(255,140,0,0.5),rgba(255,0,128,0.2),rgba(147,51,234,0.1))] animate-gradient"></div>
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'100\' height=\'100\' viewBox=\'0 0 100 100\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-.895-2-2-2-2 .895-2 2 .895 2 2 2zm63 31c1.657 0 3-1.343 3-3s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM34 90c1.657 0 3-1.343 3-3s-.895-2-2-2-2 .895-2 2 .895 2 2 2zm56-76c1.657 0 3-1.343 3-3s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z\' fill=\'%23ffffff\' fill-opacity=\'0.1\' fill-rule=\'evenodd\'/%3E%3C/svg%3E")',
          backgroundSize: '24px 24px'
        }}
      />
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 flex flex-col items-center py-10 px-5 sm:px-10 md:px-20"
      >
        {/* Logo */}
        <motion.div
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <Image className="pb-5" src={"/nikelogo.png"} width={40} height={10} alt="Logo" priority />
        </motion.div>

        {/* Content Container */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="w-full max-w-md bg-white/80 backdrop-blur-md rounded-3xl p-8 shadow-2xl"
        >
          {/* Heading */}
          <h2 className="uppercase text-center font-bold text-xl md:text-2xl pb-5 bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 text-transparent bg-clip-text">
            Become a Nike Member
          </h2>

          {/* Subheading */}
          <p className="w-full text-center text-sm md:text-base text-gray-600 pb-8">
            Create your Nike Member profile and get first access to the very best of Nike products, inspiration, and community.
          </p>

          {/* Form */}
          <form className="flex flex-col w-full space-y-4">
            {/* Input Fields */}
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="space-y-4"
            >
              <input
                className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 placeholder-gray-400 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all duration-200"
                type="email"
                placeholder="Email Address"
              />
              <input
                className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 placeholder-gray-400 focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20 transition-all duration-200"
                type="password"
                placeholder="Password"
              />
              <input
                className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-200"
                type="text"
                placeholder="First Name"
              />
              <input
                className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 placeholder-gray-400 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all duration-200"
                type="text"
                placeholder="Last Name"
              />
              <input
                className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 placeholder-gray-400 focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20 transition-all duration-200"
                type="date"
              />
            </motion.div>

            {/* Birthday Message */}
            <p className="text-gray-500 text-sm text-center">
              Get a Nike Member Reward every year on your Birthday.
            </p>

            {/* Country Selector */}
            <select
              className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-gray-600 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-200"
            >
              <option value="India">India</option>
              <option value="United States">United States</option>
              <option value="United Kingdom">United Kingdom</option>
              <option value="Pakistan">Pakistan</option>
              <option value="Canada">Canada</option>
            </select>

            {/* Gender Selector */}
            <div className="flex gap-4">
              <motion.div 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="border-2 border-gray-200 rounded-xl py-4 flex-1 text-center text-gray-600 cursor-pointer hover:border-orange-500 hover:bg-orange-50 transition-all duration-200"
              >
                Male
              </motion.div>
              <motion.div 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="border-2 border-gray-200 rounded-xl py-4 flex-1 text-center text-gray-600 cursor-pointer hover:border-pink-500 hover:bg-pink-50 transition-all duration-200"
              >
                Female
              </motion.div>
            </div>

            {/* Email Opt-In */}
            <div className="flex items-start gap-3 py-4">
              <input 
                type="checkbox" 
                id="email-opt-in"
                className="mt-1.5 h-4 w-4 rounded border-gray-300 text-orange-500 focus:ring-orange-500/20" 
              />
              <label
                className="text-sm cursor-pointer text-gray-600"
                htmlFor="email-opt-in"
              >
                Sign up for emails to get updates from Nike on products, offers, and your Member benefits
              </label>
            </div>

            {/* Terms and Conditions */}
            <p className="text-gray-600 text-center text-sm">
              By creating an account, you agree to Nike's{" "}
              <Link href="/privacy-policy" className="text-orange-500 hover:text-orange-600 underline">
                Privacy Policy
              </Link>{" "}
              and{" "}
              <Link href="/terms-of-use" className="text-orange-500 hover:text-orange-600 underline">
                Terms of Use
              </Link>
              .
            </p>

            {/* Submit Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full py-4 bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 text-white rounded-xl font-medium hover:opacity-90 transition-all duration-200 shadow-lg shadow-orange-500/20"
            >
              JOIN US
            </motion.button>

            {/* Login Link */}
            <p className="text-center text-sm text-gray-600">
              Already a Member?{" "}
              <Link href="/login" className="text-orange-500 hover:text-orange-600 underline">
                Sign In
              </Link>
            </p>
          </form>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default JoinUs;
