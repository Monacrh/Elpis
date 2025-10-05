'use client'

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import UnifiedCard from '../components/Card';
import { Search, SlidersHorizontal } from 'lucide-react';

interface TaskData {
  id: number;
  title: string;
  reward: string;
  duration: string;
  location: string;
  icon: string;
}

export default function TaskListingPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [sortBy, setSortBy] = useState('recent');

  const categories = ['ALL', 'PETS', 'CLEANING', 'OUTDOOR', 'DELIVERY', 'HELPING'];

  // Dummy tasks data
  const allTasks: TaskData[] = [
    {
      id: 1,
      title: "WALK DOG",
      reward: "100 PTS",
      duration: "1 HR",
      location: "2.3 KM",
      icon: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='96' height='96'%3E%3Crect x='36' y='20' width='24' height='12' fill='%23fff'/%3E%3Crect x='24' y='32' width='48' height='12' fill='%23fff'/%3E%3Crect x='32' y='44' width='12' height='20' fill='%23fff'/%3E%3Crect x='52' y='44' width='12' height='20' fill='%23fff'/%3E%3C/svg%3E")`,
    },
    {
      id: 2,
      title: "WASH CAR",
      reward: "80 PTS",
      duration: "45 MIN",
      location: "1.5 KM",
      icon: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='96' height='96'%3E%3Crect x='16' y='32' width='64' height='24' fill='%23fff'/%3E%3Crect x='8' y='56' width='80' height='16' fill='%23fff'/%3E%3C/svg%3E")`,
    },
    {
      id: 3,
      title: "CLEAN YARD",
      reward: "90 PTS",
      duration: "1 HR",
      location: "3.1 KM",
      icon: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='96' height='96'%3E%3Crect x='40' y='8' width='16' height='56' fill='%23fff'/%3E%3Crect x='24' y='20' width='48' height='8' fill='%23fff'/%3E%3C/svg%3E")`,
    },
    {
      id: 4,
      title: "DELIVER BOX",
      reward: "60 PTS",
      duration: "30 MIN",
      location: "0.8 KM",
      icon: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='96' height='96'%3E%3Crect x='24' y='24' width='48' height='48' fill='%23fff'/%3E%3Crect x='36' y='24' width='24' height='48' fill='%23FFD93D'/%3E%3C/svg%3E")`,
    },
    {
      id: 5,
      title: "GROCERY HELP",
      reward: "70 PTS",
      duration: "20 MIN",
      location: "1.2 KM",
      icon: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='96' height='96'%3E%3Crect x='20' y='20' width='56' height='56' fill='%23fff'/%3E%3C/svg%3E")`,
    },
    {
      id: 6,
      title: "PAINT FENCE",
      reward: "120 PTS",
      duration: "2 HRS",
      location: "4.0 KM",
      icon: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='96' height='96'%3E%3Crect x='32' y='16' width='32' height='64' fill='%23fff'/%3E%3C/svg%3E")`,
    },
  ];

  // Filter tasks based on search and category
  const filteredTasks = allTasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'ALL' || task.title.includes(selectedCategory);
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
              AVAILABLE TASKS
            </h1>
            <p
              style={{
                fontSize: '12px',
                color: '#4A5568',
                lineHeight: '1.8',
              }}
            >
              Find tasks nearby and earn points
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
                🔍 SEARCH TASKS
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
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
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
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    outline: 'none',
                    boxShadow: '4px 4px 0 rgba(0,0,0,0.15)',
                  }}
                >
                  <option value="recent">MOST RECENT</option>
                  <option value="reward-high">REWARD: HIGH TO LOW</option>
                  <option value="reward-low">REWARD: LOW TO HIGH</option>
                  <option value="distance">NEAREST FIRST</option>
                </select>
              </div>
            </div>
          </div>

          {/* Results Count with Pixel Style */}
          <div 
            className="mb-6 inline-block px-4 py-2"
            style={{
              backgroundColor: '#FF8C42',
              border: '3px solid #2D3748',
              boxShadow: '4px 4px 0 rgba(0,0,0,0.2)',
            }}
          >
            <p
              style={{
                fontSize: '10px',
                color: 'white',
                fontWeight: 'bold',
              }}
            >
              📊 SHOWING {filteredTasks.length} TASKS
            </p>
          </div>

          {/* Task Grid */}
          {filteredTasks.length === 0 ? (
            <div
              className="p-12 text-center"
              style={{
                backgroundColor: 'rgba(255, 248, 240, 0.95)',
                border: '4px solid #2D3748',
                boxShadow: '8px 8px 0 rgba(0,0,0,0.25)',
              }}
            >
              <SlidersHorizontal size={48} style={{ color: '#A0AEC0', margin: '0 auto 16px' }} />
              <p style={{ fontSize: '12px', color: '#4A5568' }}>NO TASKS FOUND</p>
              <p style={{ fontSize: '8px', color: '#A0AEC0', marginTop: '8px' }}>
                TRY ADJUSTING YOUR FILTERS
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredTasks.map((task) => (
                <UnifiedCard key={task.id} type="task" data={task} />
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
}