'use client'

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import UnifiedCard from '../components/Card';
import { Search, SlidersHorizontal } from 'lucide-react';

interface FoodData {
  id: number;
  name: string;
  price: string;
  rating: string;
  location: string;
  icon: string;
}

export default function FoodListingPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [sortBy, setSortBy] = useState('recent');

  const categories = ['ALL', 'INDONESIAN', 'WESTERN', 'ASIAN', 'BAKERY', 'DESSERT'];

  // Dummy food data
  const allFood: FoodData[] = [
    {
      id: 1,
      name: "NASI GORENG",
      price: "2.5",
      rating: "4.8",
      location: "1.5 KM",
      icon: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='96' height='96'%3E%3Crect x='16' y='40' width='64' height='8' fill='%23fff'/%3E%3Crect x='20' y='48' width='56' height='24' fill='%23fff'/%3E%3C/svg%3E")`,
    },
    {
      id: 2,
      name: "PIZZA SLICE",
      price: "3.0",
      rating: "4.9",
      location: "2.0 KM",
      icon: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='96' height='96'%3E%3Cpath d='M 8 72 L 48 16 L 88 72 Z' fill='%23fff'/%3E%3C/svg%3E")`,
    },
    {
      id: 3,
      name: "BREAD PACK",
      price: "1.5",
      rating: "4.7",
      location: "1.0 KM",
      icon: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='96' height='96'%3E%3Cellipse cx='48' cy='48' rx='32' ry='20' fill='%23fff'/%3E%3C/svg%3E")`,
    },
    {
      id: 4,
      name: "FRUIT BOX",
      price: "4.0",
      rating: "5.0",
      location: "2.5 KM",
      icon: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='96' height='96'%3E%3Ccircle cx='36' cy='40' r='16' fill='%23fff'/%3E%3Ccircle cx='60' cy='44' r='14' fill='%23fff'/%3E%3C/svg%3E")`,
    },
    {
      id: 5,
      name: "BURGER SET",
      price: "3.5",
      rating: "4.6",
      location: "1.8 KM",
      icon: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='96' height='96'%3E%3Crect x='20' y='32' width='56' height='32' fill='%23fff'/%3E%3C/svg%3E")`,
    },
    {
      id: 6,
      name: "SUSHI ROLL",
      price: "5.0",
      rating: "4.9",
      location: "3.2 KM",
      icon: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='96' height='96'%3E%3Ccircle cx='48' cy='48' r='24' fill='%23fff'/%3E%3C/svg%3E")`,
    },
  ];

  // Filter food based on search and category
  const filteredFood = allFood.filter(food => {
    const matchesSearch = food.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'ALL' || food.name.includes(selectedCategory);
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
          {/* Header with Pixel Border */}
          <div 
            className="mb-8 p-6"
            style={{
              backgroundColor: 'white',
              border: '4px solid #2D3748',
              boxShadow: '8px 8px 0 rgba(0,0,0,0.25)',
            }}
          >
            <h1
              style={{
                fontSize: '32px',
                color: '#2D3748',
                marginBottom: '12px',
              }}
            >
              AVAILABLE FOOD
            </h1>
            <p
              style={{
                fontSize: '12px',
                color: '#4A5568',
                lineHeight: '1.8',
              }}
            >
              Redeem food with your points and reduce waste
            </p>
          </div>

          {/* Filters with Gradient Background */}
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
              <label
                style={{
                  fontSize: '10px',
                  color: '#2D3748',
                  display: 'block',
                  marginBottom: '8px',
                  fontWeight: 'bold',
                }}
              >
                🔍 SEARCH FOOD
              </label>
              <div className="relative">
                <Search
                  size={16}
                  style={{
                    position: 'absolute',
                    left: '16px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: '#4A5568',
                  }}
                />
                <input
                  type="text"
                  placeholder="SEARCH BY NAME..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full py-3 pl-12 pr-4"
                  style={{
                    border: '3px solid #2D3748',
                    fontSize: '10px',
                    backgroundColor: 'white',
                    outline: 'none',
                    boxShadow: '4px 4px 0 rgba(0,0,0,0.15)',
                  }}
                />
              </div>
            </div>

            {/* Category & Sort in Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Category Dropdown */}
              <div>
                <label
                  style={{
                    fontSize: '10px',
                    color: '#2D3748',
                    display: 'block',
                    marginBottom: '8px',
                    fontWeight: 'bold',
                  }}
                >
                  📂 CATEGORY
                </label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-4 py-3"
                  style={{
                    border: '3px solid #2D3748',
                    fontSize: '10px',
                    backgroundColor: 'white',
                    outline: 'none',
                    boxShadow: '4px 4px 0 rgba(0,0,0,0.15)',
                  }}
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
                <label
                  style={{
                    fontSize: '10px',
                    color: '#2D3748',
                    display: 'block',
                    marginBottom: '8px',
                    fontWeight: 'bold',
                  }}
                >
                  ⚡ SORT BY
                </label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full px-4 py-3"
                  style={{
                    border: '3px solid #2D3748',
                    fontSize: '10px',
                    backgroundColor: 'white',
                    outline: 'none',
                    boxShadow: '4px 4px 0 rgba(0,0,0,0.15)',
                  }}
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

          {/* Results Count with Pixel Style */}
          <div 
            className="mb-6 inline-block px-4 py-2"
            style={{
              backgroundColor: '#FFD93D',
              border: '3px solid #2D3748',
              boxShadow: '4px 4px 0 rgba(0,0,0,0.2)',
            }}
          >
            <p
              style={{
                fontSize: '10px',
                color: '#2D3748',
                fontWeight: 'bold',
              }}
            >
              📊 SHOWING {filteredFood.length} ITEMS
            </p>
          </div>

          {/* Food Grid */}
          {filteredFood.length === 0 ? (
            <div
              className="p-12 text-center"
              style={{
                backgroundColor: 'white',
                border: '4px solid #2D3748',
                boxShadow: '8px 8px 0 rgba(0,0,0,0.25)',
              }}
            >
              <SlidersHorizontal size={48} style={{ color: '#A0AEC0', margin: '0 auto 16px' }} />
              <p style={{ fontSize: '12px', color: '#4A5568' }}>NO FOOD FOUND</p>
              <p style={{ fontSize: '8px', color: '#A0AEC0', marginTop: '8px' }}>
                TRY ADJUSTING YOUR FILTERS
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredFood.map((food) => (
                <UnifiedCard key={food.id} type="food" data={food} />
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
}