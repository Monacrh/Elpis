'use client'

import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import UnifiedCard from '../components/Card';
import { Search, SlidersHorizontal, Loader } from 'lucide-react';
import { Food } from '../../types/types'


export default function FoodListingPage() {
  const [allFood, setAllFood] = useState<Food[]>([]); // State untuk menyimpan data dari API
  const [isLoading, setIsLoading] = useState(true); // State untuk loading
  const [error, setError] = useState<string | null>(null); // State untuk error
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [sortBy, setSortBy] = useState('recent');

  const categories = ['ALL', 'INDONESIAN', 'WESTERN', 'ASIAN', 'BAKERY', 'DESSERT'];

  // Fungsi untuk mengambil data makanan dari API
  useEffect(() => {
    const fetchFoods = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('/api/foods');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setAllFood(data.foods);
        setError(null);
      } catch (e) {
        if (e instanceof Error) {
            setError(e.message);
        } else {
            setError("An unknown error occurred");
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchFoods();
  }, []); // Array kosong berarti useEffect hanya berjalan sekali saat komponen dimuat

  // Filter food based on search and category
  const filteredFood = allFood.filter(food => {
    const matchesSearch = food.name.toLowerCase().includes(searchQuery.toLowerCase());
    // Logika kategori perlu disesuaikan jika Anda memiliki data kategori di database
    // Untuk saat ini, logika filter kategori dummy dipertahankan
    const matchesCategory = selectedCategory === 'ALL' || food.name.toLowerCase().includes(selectedCategory.toLowerCase());
    return matchesSearch && matchesCategory;
  });

  return (
    <>
      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');
      `}</style>

      <Navbar />

      <main
        className="min-h-screen pt-24 px-6 pb-16"
        style={{
          backgroundColor: '#FFF8F0',
          fontFamily: '"Press Start 2P", cursive',
        }}
      >

        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div 
            className="mb-8 p-6"
            style={{
              backgroundColor: 'white',
              border: '4px solid #2D3748',
              boxShadow: '8px 8px 0 rgba(0,0,0,0.25)',
            }}
          >
            <h1 style={{ fontSize: '32px', color: '#2D3748', marginBottom: '12px' }}>
              AVAILABLE FOOD
            </h1>
            <p style={{ fontSize: '12px', color: '#4A5568', lineHeight: '1.8' }}>
              Redeem food with your points and reduce waste
            </p>
          </div>

          {/* Filters */}
          <div
            className="mb-8 p-6"
            style={{
              backgroundColor: 'white',
              border: '4px solid #2D3748',
              boxShadow: '8px 8px 0 rgba(0,0,0,0.25)',
            }}
          >
            {/* Search Bar */}
            <div className="mb-6">
              <label style={{ fontSize: '10px', color: '#2D3748', display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>
                剥 SEARCH FOOD
              </label>
              <div className="relative">
                <Search size={16} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#4A5568' }}/>
                <input
                  type="text"
                  placeholder="SEARCH BY NAME..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full py-3 pl-12 pr-4"
                  style={{ border: '3px solid #2D3748', fontSize: '10px', backgroundColor: 'white', outline: 'none', boxShadow: '4px 4px 0 rgba(0,0,0,0.15)' }}
                />
              </div>
            </div>

            {/* Category & Sort Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Category Dropdown */}
              <div>
                <label style={{ fontSize: '10px', color: '#2D3748', display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>
                  唐 CATEGORY
                </label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-4 py-3"
                  style={{ border: '3px solid #2D3748', fontSize: '10px', backgroundColor: 'white', outline: 'none', boxShadow: '4px 4px 0 rgba(0,0,0,0.15)' }}
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              {/* Sort Dropdown */}
              <div>
                <label style={{ fontSize: '10px', color: '#2D3748', display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>
                  笞｡ SORT BY
                </label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full px-4 py-3"
                  style={{ border: '3px solid #2D3748', fontSize: '10px', backgroundColor: 'white', outline: 'none', boxShadow: '4px 4px 0 rgba(0,0,0,0.15)' }}
                >
                  <option value="recent">MOST RECENT</option>
                  <option value="price-low">PRICE: LOW TO HIGH</option>
                  <option value="price-high">PRICE: HIGH TO LOW</option>
                  <option value="rating">HIGHEST RATED</option>
                  <option value="distance">NEAREST FIRST</option>
                </select>
              </div>
            </div>
          </div>

          {/* Results Count */}
          <div className="mb-6 inline-block px-4 py-2" style={{ backgroundColor: '#FFD93D', border: '3px solid #2D3748', boxShadow: '4px 4px 0 rgba(0,0,0,0.2)' }}>
            <p style={{ fontSize: '10px', color: '#2D3748', fontWeight: 'bold' }}>
              {!isLoading && `投 SHOWING ${filteredFood.length} ITEMS`}
            </p>
          </div>

          {/* Food Grid */}
          {isLoading ? (
             <div className="p-12 text-center" style={{ backgroundColor: 'white', border: '4px solid #2D3748', boxShadow: '8px 8px 0 rgba(0,0,0,0.25)' }}>
                <Loader size={48} className="animate-spin" style={{ color: '#A0AEC0', margin: '0 auto 16px' }} />
                <p style={{ fontSize: '12px', color: '#4A5568' }}>LOADING FOOD...</p>
             </div>
          ) : error ? (
            <div className="p-12 text-center" style={{ backgroundColor: 'white', border: '4px solid #2D3748', boxShadow: '8px 8px 0 rgba(0,0,0,0.25)', color: '#E53E3E' }}>
                <p style={{ fontSize: '12px' }}>ERROR: {error}</p>
             </div>
          ) : filteredFood.length === 0 ? (
            <div className="p-12 text-center" style={{ backgroundColor: 'white', border: '4px solid #2D3748', boxShadow: '8px 8px 0 rgba(0,0,0,0.25)' }}>
              <SlidersHorizontal size={48} style={{ color: '#A0AEC0', margin: '0 auto 16px' }} />
              <p style={{ fontSize: '12px', color: '#4A5568' }}>NO FOOD FOUND</p>
              <p style={{ fontSize: '8px', color: '#A0AEC0', marginTop: '8px' }}>
                TRY ADJUSTING YOUR FILTERS
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredFood.map((food) => (
                // Menggunakan _id dari MongoDB sebagai key
                <UnifiedCard key={food._id.toString()} type="food" data={food} />
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
}