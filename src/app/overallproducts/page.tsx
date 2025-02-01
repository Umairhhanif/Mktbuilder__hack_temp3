'use client';
import React, { useState, useEffect, Suspense } from 'react';
import { FiFilter, FiChevronDown, FiChevronUp } from 'react-icons/fi';
import ProductList from '../components/productlist';
import Link from 'next/link';
import { useSearch } from '../context/SearchContext';
import { useSearchParams } from 'next/navigation';
import SHOES from '../shoes/page';

const OverallProductsContent = () => {
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const { setSearchQuery } = useSearch();
  const searchParams = useSearchParams();
  
  useEffect(() => {
    // Get search query from URL and update context
    const searchQuery = searchParams.get('search');
    if (searchQuery) {
      setSearchQuery(searchQuery);
    }
  }, [searchParams, setSearchQuery]);

  return (
    <div className="grid grid-cols-12 px-4 md:px-10 py-20 relative">
      <div
        className={`col-span-3 pr-4 md:pr-20 bg-white z-10 transform ${
          isSidebarVisible ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 lg:static p-10 lg:p-0 w-full lg:w-60 fixed top-0 left-0 h-full overflow-y-auto transition-transform duration-300`}
      >
        <button
          className="block lg:hidden absolute top-4 right-4 text-lg"
          onClick={() => setIsSidebarVisible(false)}
        >
          ✕ Hide Filters
        </button>
        <h3 className="text-2xl">New (500)</h3>
        <ul className="mt-4">
          <li className="leading-8">
            <Link href="#">Shoes</Link>
          </li>
          <li className="leading-8">
            <Link href="#">Sports Bras</Link>
          </li>
          <li className="leading-8">
            <Link href="#">Tops & T-Shirts</Link>
          </li>
          <li className="leading-8">
            <Link href="#">Hoodies & Sweatshirts</Link>
          </li>
          <li className="leading-8">
            <Link href="#">Jackets</Link>
          </li>
          <li className="leading-8">
            <Link href="#">Trousers & Tights</Link>
          </li>
          <li className="leading-8">
            <Link href="#">Shorts</Link>
          </li>
          <li className="leading-8">
            <Link href="#">Tracksuits</Link>
          </li>
          <li className="leading-8">
            <Link href="#">Jumpsuits & Rompers</Link>
          </li>
          <li className="leading-8">
            <Link href="#">Skirts & Dresses</Link>
          </li>
          <li className="leading-8">
            <Link href="#">Socks</Link>
          </li>
          <li className="leading-8">
            <Link href="#">Accessories & Equipment</Link>
          </li>
        </ul>
        <div className="my-10 border-t-2 pt-4">
          <div className="flex justify-between pb-4">
            <p>Gender</p>
            <FiChevronUp />
          </div>
          <div>
            <input type="checkbox" id="men" />
            <label className="pl-2 cursor-pointer" htmlFor="men">
              Men
            </label>
          </div>
          <div>
            <input type="checkbox" id="women" />
            <label className="pl-2 cursor-pointer" htmlFor="women">
              Women
            </label>
          </div>
          <div>
            <input type="checkbox" id="unisex" />
            <label className="pl-2 cursor-pointer" htmlFor="unisex">
              Unisex
            </label>
          </div>
        </div>
        <div className="my-10 border-t-2 pt-4">
          <div className="flex justify-between pb-4">
            <p>Shop By Price</p>
            <FiChevronDown />
          </div>
        </div>
      </div>
      <div className="col-span-12 lg:col-span-9">
        <div className="lg:hidden mb-4">
          <button
            className="flex items-center space-x-2 text-lg"
            onClick={() => setIsSidebarVisible(true)}
          >
            <FiFilter />
            <span>Show Filters</span>
          </button>
        </div>
        <SHOES/>
        <ProductList />
      </div>
    </div>
  );
};

const Page = () => {
  return (
    <Suspense fallback={<div className="p-4">Loading...</div>}>
      <OverallProductsContent />
    </Suspense>
  );
};

export default Page;
