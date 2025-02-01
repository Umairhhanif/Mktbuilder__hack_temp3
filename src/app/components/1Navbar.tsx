"use client"
import Image from 'next/image';
import Link from 'next/link';
import { CiSearch } from 'react-icons/ci';
import { FaRegHeart, FaBars } from 'react-icons/fa';
import { BsBag } from 'react-icons/bs';
import { useState, useRef, KeyboardEvent, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { useSearch } from '../context/SearchContext';
import { motion, AnimatePresence } from 'framer-motion';
import { urlFor } from '@/sanity/lib/image';
import { client } from '@/sanity/lib/client';
import { productSuggestions } from '@/sanity/lib/queries';
import { useRouter } from 'next/navigation';
import { useDebounce } from 'use-debounce';

interface ProductSuggestion {
  _id: string;
  productName: string;
  category: string;
  price: number;
  slug: string;
  imageUrl: string;
}

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { cartCount, showCartPopup, lastAddedItem, setShowCartPopup } = useCart();
  const { searchQuery, setSearchQuery, handleSearch } = useSearch();
  const [suggestions, setSuggestions] = useState<ProductSuggestion[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const [debouncedSearch] = useDebounce(searchQuery, 300);

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (debouncedSearch.trim().length > 0) {
        try {
          const results = await client.fetch<ProductSuggestion[]>(
            productSuggestions,
            { searchTerm: debouncedSearch.toLowerCase() }
          );
          setSuggestions(results);
          setShowSuggestions(true);
        } catch (error) {
          console.error('Error fetching suggestions:', error);
          setSuggestions([]);
        }
      } else {
        setSuggestions([]);
        setShowSuggestions(false);
      }
    };

    fetchSuggestions();
  }, [debouncedSearch]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        suggestionsRef.current &&
        !suggestionsRef.current.contains(event.target as Node) &&
        !searchInputRef.current?.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (slug: string) => {
    router.push(`/product/${slug}`);
    setShowSuggestions(false);
    setSearchQuery('');
  };

  return (
    <div className="relative">
      {/* Header Section */}
      <header className="bg-[#F5F5F5] border-b font-[Helvetica Neue] flex flex-col sm:flex-row justify-between items-center px-4 sm:px-5 md:px-5 lg:px-12 xl:px-16 py-4">
        {/* Logo Section */}
        <Link href="/" className="flex items-center space-x-2">
        <Image src="/logo.png" alt="Logo" width={150} height={100} className="w-[40px] sm:w-[60px] lg:w-[80px] ml-4" /> </Link>

        {/* Hamburger Icon */}
        <div className="sm:hidden flex items-center space-x-4">
          <FaBars
            className="text-black mt-4 text-lg cursor-pointer"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle navigation menu"
          />
        </div>

        {/* Links Section */}
        <nav
          className={`flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 text-black text-sm sm:text-base md:text-lg font-medium ${
            isMenuOpen ? 'block' : 'hidden'
          } sm:block`}
          aria-label="Primary navigation"
        >
          <Link href="/findstore" className="block sm:inline">
            Find a Store
          </Link>
          <span className="hidden sm:inline-block h-[14px] w-[1px] bg-gray-400" />
          <Link href="/help" className="block sm:inline">
            Help
          </Link>
          <span className="hidden sm:inline-block h-[14px] w-[1px] bg-gray-400" />
          <Link href="/joinus" className="block sm:inline">
            Join Us
          </Link>
          <span className="hidden sm:inline-block h-[14px] w-[1px] bg-gray-400" />
          <Link href="/login" className="block sm:inline">
            Sign In
          </Link>
        </nav>
      </header>

      {/* Main Navbar Section */}
      <header className="bg-white border-b shadow-sm">
        <div className="flex flex-col sm:flex-row justify-between items-center px-4 sm:px-8 lg:px-12 py-4">
          {/* Logo */}
          <Image src="/nikelogo.png" width={150} height={150} alt="Logo" className="w-[50px] sm:w-[70px] md:w-[80px] ml-8" />

          {/* Navigation Links */}
          <nav
            className="flex flex-col sm:flex-row space-y-4 mt-6 sm:space-y-0 sm:space-x-8 justify-center items-center font-medium"
            aria-label="Secondary navigation"
          >
            <Link href="/overallproducts" className="text-black hover:underline text-sm md:text-base">
              New & Featured
            </Link>
            <Link href="/overallproducts" className="text-black hover:underline text-sm md:text-base">
              Men
            </Link>
            <Link href="/overallproducts" className="text-black hover:underline text-sm md:text-base">
              Women
            </Link>
            <Link href="/overallproducts" className="text-black hover:underline text-sm md:text-base">
              Kids
            </Link>
            <Link href="/overallproducts" className="text-black hover:underline text-sm md:text-base">
              SNKRS
            </Link>
          </nav>

          {/* Search and Icons */}
          <div className="flex flex-col sm:flex-row items-center mt-4 space-x-4 ml-4">
            <div className="relative flex items-center bg-slate-100 rounded-full px-2 py-1 w-full md:w-64 group hover:bg-slate-200 transition-colors duration-300">
              <button 
                onClick={() => {
                  handleSearch();
                  setShowSuggestions(false);
                }}
                className="hover:scale-110 transition-transform duration-300"
              >
                <CiSearch className="text-black text-lg" />
              </button>
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={handleKeyPress}
                onFocus={() => searchQuery.trim() && setShowSuggestions(true)}
                className="bg-transparent outline-none text-sm sm:text-base pl-2 py-1 w-full"
                aria-label="Search input"
              />
              
              {/* Search Suggestions */}
              <AnimatePresence>
                {showSuggestions && suggestions.length > 0 && (
                  <motion.div
                    ref={suggestionsRef}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-lg overflow-hidden z-50"
                  >
                    {suggestions.map((suggestion) => (
                      <div
                        key={suggestion._id}
                        className="flex items-center p-3 hover:bg-gray-50 cursor-pointer transition-colors duration-200"
                        onClick={() => handleSuggestionClick(suggestion.slug)}
                      >
                        <div className="w-12 h-12 relative flex-shrink-0">
                          <Image
                            src={suggestion.imageUrl}
                            alt={suggestion.productName}
                            fill
                            className="object-cover rounded"
                          />
                        </div>
                        <div className="ml-3">
                          <p className="text-sm font-medium text-gray-900">{suggestion.productName}</p>
                          <p className="text-sm text-gray-500">{suggestion.category}</p>
                          <p className="text-sm font-medium text-gray-900">${suggestion.price}</p>
                        </div>
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="flex space-x-4 mt-2 sm:space-x-2">
              <FaRegHeart className="text-black text-lg" aria-label="Favorites" />
              <Link href="/cart" className="relative">
                <BsBag className="w-6 h-6 text-lg" aria-label="Shopping cart" />
                {cartCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center"
                  >
                    {cartCount}
                  </motion.span>
                )}
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Cart Popup */}
      <AnimatePresence>
        {showCartPopup && lastAddedItem && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="absolute top-24 right-4 z-50 bg-white rounded-xl shadow-2xl p-4 w-80"
          >
            <div className="flex items-center gap-4">
              <div className="relative w-20 h-20">
                <Image
                  src={
                    lastAddedItem.imageUrl 
                      ? lastAddedItem.imageUrl 
                      : lastAddedItem.image 
                        ? urlFor(lastAddedItem.image).url() 
                        : '/placeholder.jpg'
                  }
                  alt={lastAddedItem.productName}
                  fill
                  className="object-cover rounded-lg"
                />
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-gray-900">{lastAddedItem.productName}</h3>
                <p className="text-sm text-gray-500">Added to cart</p>
                {lastAddedItem.selectedSize && (
                  <p className="text-sm text-gray-500">Size: {lastAddedItem.selectedSize}</p>
                )}
              </div>
            </div>
            <div className="mt-4 flex gap-2">
              <Link 
                href="/cart"
                className="flex-1 bg-black text-white text-center py-2 rounded-full text-sm hover:bg-gray-800 transition-colors"
              >
                View Cart
              </Link>
              <button 
                onClick={() => setShowCartPopup(false)}
                className="flex-1 border border-gray-300 text-gray-700 text-center py-2 rounded-full text-sm hover:bg-gray-50 transition-colors"
              >
                Continue
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Navbar;
