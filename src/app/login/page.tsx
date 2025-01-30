'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { motion } from 'framer-motion'

export default function LoginForm() {
  const [isChecked, setIsChecked] = useState(false)

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-500 via-pink-500 to-purple-600 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(255,140,0,0.5),rgba(255,0,128,0.2),rgba(147,51,234,0.1))] animate-gradient"></div>
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'100\' height=\'100\' viewBox=\'0 0 100 100\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z\' fill=\'%23ffffff\' fill-opacity=\'0.1\' fill-rule=\'evenodd\'/%3E%3C/svg%3E")',
          backgroundSize: '24px 24px'
        }}
      />
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md space-y-8 px-4 md:px-8 py-8 bg-white/80 backdrop-blur-md rounded-2xl shadow-2xl mx-4 relative z-10"
      >
        <motion.div 
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2 }}
          className="flex flex-col items-center"
        >
          <Image src="/nikelogo.png" alt="Nike Logo" width={60} height={22} className="mb-6" priority />
          <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-800">
            YOUR ACCOUNT <br /> FOR EVERYTHING <br /> NIKE
          </h2>
        </motion.div>
        <motion.form 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-12 space-y-6"
        >
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <input
              type="email"
              placeholder="Email address"
              required
              className="w-full px-4 py-3 border-[1.5px] rounded-lg border-slate-200 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all duration-200"
            />
          </motion.div>
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <input
              type="password"
              placeholder="Password"
              required
              className="w-full px-4 py-3 border-[1.5px] rounded-lg border-slate-200 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all duration-200"
            />
          </motion.div>
          <div className="flex items-center justify-between">
            <label className="flex items-center">
              <input
                type="checkbox"
                className="sr-only"
                checked={isChecked}
                onChange={() => setIsChecked(!isChecked)}
              />
              <motion.span
                whileTap={{ scale: 0.95 }}
                className={`w-5 h-5 border border-gray-300 rounded mr-2 flex items-center justify-center transition-colors duration-200 ${
                  isChecked ? 'bg-orange-500 border-orange-500' : 'bg-white'
                }`}
              >
                {isChecked && (
                  <svg className="w-3 h-3 text-white fill-current" viewBox="0 0 20 20">
                    <path d="M0 11l2-2 5 5L18 3l2 2L7 18z" />
                  </svg>
                )}
              </motion.span>
              <span className="text-sm text-gray-600">Keep me signed in</span>
            </label>
            <Link href="#" className="text-sm text-orange-600 hover:text-orange-700 hover:underline transition-colors">
              Forgotten your password?
            </Link>
          </div>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="w-full py-3 px-4 bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 text-white rounded-full font-medium hover:opacity-90 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
          >
            Sign In
          </motion.button>
          <div className="text-center text-sm text-gray-600">
            Not a Member?{' '}
            <Link href="/signup" className="text-orange-600 hover:text-orange-700 hover:underline transition-colors">
              Join Us
            </Link>
          </div>
        </motion.form>
      </motion.div>
    </div>
  )
}
