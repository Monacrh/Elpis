'use client'

import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import UnifiedCard from '../components/Card';
import { Search, SlidersHorizontal, Loader } from 'lucide-react';
import { Task } from '../../types/types'; // Pastikan path import ini benar
import LoadingScreenPixel from '../components/LoadingScreen';

export default function TaskListingPage() {
  // State untuk data, loading, dan error
  const [allTasks, setAllTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // State untuk filter
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [sortBy, setSortBy] = useState('recent');

  const categories = ['ALL', 'PETS', 'CLEANING', 'OUTDOOR', 'DELIVERY', 'HELPING'];

  // Hook untuk fetch data saat komponen dimuat
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('/api/tasks');
        if (!response.ok) {
          throw new Error('Failed to fetch tasks from server');
        }
        const data = await response.json();
        setAllTasks(data.tasks);
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

    fetchTasks();
  }, []); // Array kosong memastikan ini hanya berjalan sekali

  if (isLoading) {
    return <LoadingScreenPixel />;
  }

  // Filter tugas berdasarkan pencarian dan kategori
  const filteredTasks = allTasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase());
    // Logika filter kategori yang sudah diperbaiki
    const matchesCategory = selectedCategory === 'ALL' || (task.category && task.category.toUpperCase() === selectedCategory.toUpperCase());
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
              AVAILABLE TASKS
            </h1>
            <p style={{ fontSize: '12px', color: '#4A5568', lineHeight: '1.8' }}>
              Find tasks nearby and earn points
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
                剥 SEARCH TASKS
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

            {/* Grid untuk Kategori & Sortir */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Kategori */}
              <div>
                <label style={{ fontSize: '10px', color: '#2D3748', display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>
                  唐 CATEGORY
                </label>
                <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)} className="w-full px-4 py-3" style={{ border: '3px solid #2D3748', fontSize: '10px', backgroundColor: 'white', outline: 'none', boxShadow: '4px 4px 0 rgba(0,0,0,0.15)' }}>
                  {categories.map((cat) => ( <option key={cat} value={cat}>{cat}</option> ))}
                </select>
              </div>

              {/* Sortir */}
              <div>
                <label style={{ fontSize: '10px', color: '#2D3748', display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>
                  笞｡ SORT BY
                </label>
                <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="w-full px-4 py-3" style={{ border: '3px solid #2D3748', fontSize: '10px', backgroundColor: 'white', outline: 'none', boxShadow: '4px 4px 0 rgba(0,0,0,0.15)' }}>
                  <option value="recent">MOST RECENT</option>
                  <option value="reward-high">REWARD: HIGH TO LOW</option>
                  <option value="reward-low">REWARD: LOW TO HIGH</option>
                  <option value="distance">NEAREST FIRST</option>
                </select>
              </div>
            </div>
          </div>

          {/* Jumlah Hasil */}
          <div className="mb-6 inline-block px-4 py-2" style={{ backgroundColor: '#FF8C42', border: '3px solid #2D3748', boxShadow: '4px 4px 0 rgba(0,0,0,0.2)' }}>
            <p style={{ fontSize: '10px', color: 'white', fontWeight: 'bold' }}>
              {!isLoading && `投 SHOWING ${filteredTasks.length} TASKS`}
            </p>
          </div>

          {/* Grid Tugas */}
          {isLoading ? (
            <div className="p-12 text-center" style={{ backgroundColor: 'white', border: '4px solid #2D3748', boxShadow: '8px 8px 0 rgba(0,0,0,0.25)' }}>
              <Loader size={48} className="animate-spin mx-auto mb-4" style={{ color: '#A0AEC0' }} />
              <p style={{ fontSize: '12px', color: '#4A5568' }}>LOADING TASKS...</p>
            </div>
          ) : error ? (
            <div className="p-12 text-center" style={{ backgroundColor: 'white', border: '4px solid #2D3748', boxShadow: '8px 8px 0 rgba(0,0,0,0.25)', color: '#E53E3E' }}>
              <p style={{ fontSize: '12px' }}>ERROR: {error}</p>
            </div>
          ) : filteredTasks.length === 0 ? (
            <div className="p-12 text-center" style={{ backgroundColor: 'white', border: '4px solid #2D3748', boxShadow: '8px 8px 0 rgba(0,0,0,0.25)' }}>
              <SlidersHorizontal size={48} className="mx-auto mb-4" style={{ color: '#A0AEC0' }} />
              <p style={{ fontSize: '12px', color: '#4A5568' }}>NO TASKS FOUND</p>
              <p style={{ fontSize: '8px', color: '#A0AEC0', marginTop: '8px' }}>TRY ADJUSTING YOUR FILTERS</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredTasks.map((task) => (
                <UnifiedCard key={task._id.toString()} type="task" data={task} />
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
}