'use client'

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { User, Plus, Briefcase, ShoppingBag, Clock } from 'lucide-react';

interface TaskItem {
  id: number;
  title: string;
  status: 'active' | 'completed' | 'cancelled';
  reward: string;
  date: string;
}

interface FoodItem {
  id: number;
  name: string;
  status: 'active' | 'completed' | 'cancelled';
  price: string;
  date: string;
}

export default function ProfilePage() {
  const router = useRouter();
  const [activeSection, setActiveSection] = useState<'tasks' | 'food'>('tasks');
  const [taskTab, setTaskTab] = useState<'working' | 'hiring' | 'posted'>('working');
  const [foodTab, setFoodTab] = useState<'buying' | 'selling' | 'posted'>('buying');

  // Dummy user data
  const userData = {
    name: "JOHN_DOE",
    email: "john@example.com",
    points: 250,
    joinDate: "JAN 2025",
    tasksCompleted: 12,
    foodRedeemed: 8,
    rating: "4.9",
  };

  // Dummy tasks data
  const tasksWorking: TaskItem[] = [
    { id: 1, title: "WALK DOG", status: "active", reward: "100 PTS", date: "TODAY" },
    { id: 2, title: "WASH CAR", status: "completed", reward: "80 PTS", date: "YESTERDAY" },
  ];

  const tasksHiring: TaskItem[] = [
    { id: 3, title: "CLEAN YARD", status: "active", reward: "90 PTS", date: "2 DAYS AGO" },
  ];

  const tasksPosted: TaskItem[] = [
    { id: 4, title: "DELIVER BOX", status: "active", reward: "60 PTS", date: "3 DAYS AGO" },
  ];

  // Dummy food data
  const foodBuying: FoodItem[] = [
    { id: 1, name: "NASI GORENG", status: "completed", price: "$2.5", date: "TODAY" },
    { id: 2, name: "PIZZA SLICE", status: "active", price: "$3.0", date: "YESTERDAY" },
  ];

  const foodSelling: FoodItem[] = [
    { id: 3, name: "BREAD PACK", status: "active", price: "$1.5", date: "2 DAYS AGO" },
  ];

  const foodPosted: FoodItem[] = [
    { id: 4, name: "FRUIT BOX", status: "active", price: "$4.0", date: "3 DAYS AGO" },
  ];

  const getTaskData = () => {
    if (taskTab === 'working') return tasksWorking;
    if (taskTab === 'hiring') return tasksHiring;
    return tasksPosted;
  };

  const getFoodData = () => {
    if (foodTab === 'buying') return foodBuying;
    if (foodTab === 'selling') return foodSelling;
    return foodPosted;
  };

  const StatusBadge = ({ status }: { status: string }) => {
    const colors = {
      active: { bg: '#FFD93D', text: '#2D3748' },
      completed: { bg: '#6BCF7F', text: 'white' },
      cancelled: { bg: '#FF8C42', text: 'white' },
    };
    const color = colors[status as keyof typeof colors];

    return (
      <span
        className="px-3 py-1"
        style={{
          backgroundColor: color.bg,
          color: color.text,
          border: '2px solid #2D3748',
          fontSize: '7px',
          fontWeight: 'bold',
        }}
      >
        {status.toUpperCase()}
      </span>
    );
  };

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
          {/* Profile Header */}
          <div
            className="mb-8 p-8"
            style={{
              background: 'linear-gradient(135deg, #FF8C42 0%, #FFD93D 100%)',
              border: '4px solid #2D3748',
              boxShadow: '8px 8px 0 rgba(0,0,0,0.2)',
            }}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-6">
                {/* Avatar */}
                <div
                  style={{
                    width: '100px',
                    height: '100px',
                    backgroundColor: 'white',
                    border: '4px solid #2D3748',
                    boxShadow: '4px 4px 0 rgba(0,0,0,0.2)',
                  }}
                >
                  <div className="w-full h-full flex items-center justify-center">
                    <User size={48} style={{ color: '#2D3748' }} />
                  </div>
                </div>

                {/* User Info */}
                <div>
                  <h1
                    style={{
                      fontSize: '28px',
                      color: 'white',
                      marginBottom: '8px',
                      textShadow: '3px 3px 0 rgba(0,0,0,0.3)',
                    }}
                  >
                    {userData.name}
                  </h1>
                  <p style={{ fontSize: '10px', color: 'white', marginBottom: '12px' }}>
                    {userData.email}
                  </p>
                  <div className="flex items-center gap-2">
                    <span style={{ fontSize: '16px' }}>⭐</span>
                    <span style={{ fontSize: '14px', color: 'white', fontWeight: 'bold' }}>
                      {userData.rating}
                    </span>
                    <span style={{ fontSize: '8px', color: 'white' }}>RATING</span>
                  </div>
                </div>
              </div>

              {/* Points Display */}
              <div
                className="text-center p-6"
                style={{
                  backgroundColor: 'white',
                  border: '4px solid #2D3748',
                  boxShadow: '4px 4px 0 rgba(0,0,0,0.2)',
                }}
              >
                <div className="flex items-center justify-center gap-2 mb-2">
                  <span style={{ fontSize: '24px' }}>⭐</span>
                  <span style={{ fontSize: '32px', color: '#2D3748', fontWeight: 'bold' }}>
                    {userData.points}
                  </span>
                </div>
                <span style={{ fontSize: '8px', color: '#4A5568' }}>POINTS</span>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-3 gap-4 mt-6">
              <div
                className="p-4 text-center"
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.3)',
                  border: '3px solid rgba(255, 255, 255, 0.5)',
                }}
              >
                <span style={{ fontSize: '20px', color: 'white', fontWeight: 'bold', display: 'block', marginBottom: '4px' }}>
                  {userData.tasksCompleted}
                </span>
                <span style={{ fontSize: '8px', color: 'white' }}>TASKS DONE</span>
              </div>
              <div
                className="p-4 text-center"
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.3)',
                  border: '3px solid rgba(255, 255, 255, 0.5)',
                }}
              >
                <span style={{ fontSize: '20px', color: 'white', fontWeight: 'bold', display: 'block', marginBottom: '4px' }}>
                  {userData.foodRedeemed}
                </span>
                <span style={{ fontSize: '8px', color: 'white' }}>FOOD REDEEMED</span>
              </div>
              <div
                className="p-4 text-center"
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.3)',
                  border: '3px solid rgba(255, 255, 255, 0.5)',
                }}
              >
                <span style={{ fontSize: '20px', color: 'white', fontWeight: 'bold', display: 'block', marginBottom: '4px' }}>
                  {userData.joinDate}
                </span>
                <span style={{ fontSize: '8px', color: 'white' }}>JOINED</span>
              </div>
            </div>
          </div>

          {/* Section Toggle */}
          <div className="flex gap-4 mb-6">
            <button
              onClick={() => setActiveSection('tasks')}
              className="flex-1 py-4 font-bold transition-all duration-150"
              style={{
                backgroundColor: activeSection === 'tasks' ? '#FF8C42' : 'white',
                color: activeSection === 'tasks' ? 'white' : '#2D3748',
                border: '4px solid #2D3748',
                fontSize: '14px',
                boxShadow: '6px 6px 0 rgba(0,0,0,0.15)',
              }}
            >
              <Briefcase size={20} className="inline mr-2" />
              TASKS
            </button>
            <button
              onClick={() => setActiveSection('food')}
              className="flex-1 py-4 font-bold transition-all duration-150"
              style={{
                backgroundColor: activeSection === 'food' ? '#6BCF7F' : 'white',
                color: activeSection === 'food' ? 'white' : '#2D3748',
                border: '4px solid #2D3748',
                fontSize: '14px',
                boxShadow: '6px 6px 0 rgba(0,0,0,0.15)',
              }}
            >
              <ShoppingBag size={20} className="inline mr-2" />
              FOOD
            </button>
          </div>

          {/* Tasks Section */}
          {activeSection === 'tasks' && (
            <div>
              {/* Task Tabs */}
              <div className="flex gap-3 mb-6">
                <button
                  onClick={() => setTaskTab('working')}
                  className="flex-1 py-3 transition-all duration-150"
                  style={{
                    backgroundColor: taskTab === 'working' ? '#FF8C42' : 'white',
                    color: taskTab === 'working' ? 'white' : '#2D3748',
                    border: '3px solid #2D3748',
                    fontSize: '10px',
                    boxShadow: '4px 4px 0 rgba(0,0,0,0.15)',
                  }}
                >
                  WORKING
                </button>
                <button
                  onClick={() => setTaskTab('hiring')}
                  className="flex-1 py-3 transition-all duration-150"
                  style={{
                    backgroundColor: taskTab === 'hiring' ? '#FF8C42' : 'white',
                    color: taskTab === 'hiring' ? 'white' : '#2D3748',
                    border: '3px solid #2D3748',
                    fontSize: '10px',
                    boxShadow: '4px 4px 0 rgba(0,0,0,0.15)',
                  }}
                >
                  HIRING
                </button>
                <button
                  onClick={() => setTaskTab('posted')}
                  className="flex-1 py-3 transition-all duration-150"
                  style={{
                    backgroundColor: taskTab === 'posted' ? '#FF8C42' : 'white',
                    color: taskTab === 'posted' ? 'white' : '#2D3748',
                    border: '3px solid #2D3748',
                    fontSize: '10px',
                    boxShadow: '4px 4px 0 rgba(0,0,0,0.15)',
                  }}
                >
                  MY POSTS
                </button>
              </div>

              {/* Post Task Button */}
              <button
                onClick={() => router.push('/post-task')}
                className="w-full py-4 mb-6 font-bold transition-all duration-150 flex items-center justify-center gap-2"
                style={{
                  backgroundColor: '#FFD93D',
                  color: '#2D3748',
                  border: '4px solid #2D3748',
                  fontSize: '12px',
                  boxShadow: '6px 6px 0 rgba(0,0,0,0.2)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translate(-2px, -2px)';
                  e.currentTarget.style.boxShadow = '8px 8px 0 rgba(0,0,0,0.25)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translate(0, 0)';
                  e.currentTarget.style.boxShadow = '6px 6px 0 rgba(0,0,0,0.2)';
                }}
              >
                <Plus size={20} />
                POST NEW TASK
              </button>

              {/* Task List */}
              <div className="space-y-4">
                {getTaskData().length === 0 ? (
                  <div
                    className="p-12 text-center"
                    style={{
                      backgroundColor: 'white',
                      border: '4px solid #2D3748',
                      boxShadow: '6px 6px 0 rgba(0,0,0,0.15)',
                    }}
                  >
                    <Clock size={48} style={{ color: '#A0AEC0', margin: '0 auto 16px' }} />
                    <p style={{ fontSize: '12px', color: '#4A5568' }}>NO TASKS YET</p>
                  </div>
                ) : (
                  getTaskData().map((task) => (
                    <div
                      key={task.id}
                      className="p-6 transition-all duration-150 cursor-pointer"
                      style={{
                        backgroundColor: 'white',
                        border: '4px solid #2D3748',
                        boxShadow: '6px 6px 0 rgba(0,0,0,0.15)',
                      }}
                      onClick={() => router.push(`/task/${task.id}`)}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translate(-2px, -2px)';
                        e.currentTarget.style.boxShadow = '8px 8px 0 rgba(0,0,0,0.2)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translate(0, 0)';
                        e.currentTarget.style.boxShadow = '6px 6px 0 rgba(0,0,0,0.15)';
                      }}
                    >
                      <div className="flex items-center justify-between mb-4">
                        <h3 style={{ fontSize: '14px', color: '#2D3748' }}>{task.title}</h3>
                        <StatusBadge status={task.status} />
                      </div>
                      <div className="flex items-center justify-between">
                        <span style={{ fontSize: '10px', color: '#4A5568' }}>
                          {task.date}
                        </span>
                        <span style={{ fontSize: '12px', color: '#FF8C42', fontWeight: 'bold' }}>
                          {task.reward}
                        </span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* Food Section */}
          {activeSection === 'food' && (
            <div>
              {/* Food Tabs */}
              <div className="flex gap-3 mb-6">
                <button
                  onClick={() => setFoodTab('buying')}
                  className="flex-1 py-3 transition-all duration-150"
                  style={{
                    backgroundColor: foodTab === 'buying' ? '#6BCF7F' : 'white',
                    color: foodTab === 'buying' ? 'white' : '#2D3748',
                    border: '3px solid #2D3748',
                    fontSize: '10px',
                    boxShadow: '4px 4px 0 rgba(0,0,0,0.15)',
                  }}
                >
                  BUYING
                </button>
                <button
                  onClick={() => setFoodTab('selling')}
                  className="flex-1 py-3 transition-all duration-150"
                  style={{
                    backgroundColor: foodTab === 'selling' ? '#6BCF7F' : 'white',
                    color: foodTab === 'selling' ? 'white' : '#2D3748',
                    border: '3px solid #2D3748',
                    fontSize: '10px',
                    boxShadow: '4px 4px 0 rgba(0,0,0,0.15)',
                  }}
                >
                  SELLING
                </button>
                <button
                  onClick={() => setFoodTab('posted')}
                  className="flex-1 py-3 transition-all duration-150"
                  style={{
                    backgroundColor: foodTab === 'posted' ? '#6BCF7F' : 'white',
                    color: foodTab === 'posted' ? 'white' : '#2D3748',
                    border: '3px solid #2D3748',
                    fontSize: '10px',
                    boxShadow: '4px 4px 0 rgba(0,0,0,0.15)',
                  }}
                >
                  MY POSTS
                </button>
              </div>

              {/* Post Food Button */}
              <button
                onClick={() => router.push('/post-food')}
                className="w-full py-4 mb-6 font-bold transition-all duration-150 flex items-center justify-center gap-2"
                style={{
                  backgroundColor: '#4A90E2',
                  color: 'white',
                  border: '4px solid #2D3748',
                  fontSize: '12px',
                  boxShadow: '6px 6px 0 rgba(0,0,0,0.2)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translate(-2px, -2px)';
                  e.currentTarget.style.boxShadow = '8px 8px 0 rgba(0,0,0,0.25)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translate(0, 0)';
                  e.currentTarget.style.boxShadow = '6px 6px 0 rgba(0,0,0,0.2)';
                }}
              >
                <Plus size={20} />
                POST NEW FOOD
              </button>

              {/* Food List */}
              <div className="space-y-4">
                {getFoodData().length === 0 ? (
                  <div
                    className="p-12 text-center"
                    style={{
                      backgroundColor: 'white',
                      border: '4px solid #2D3748',
                      boxShadow: '6px 6px 0 rgba(0,0,0,0.15)',
                    }}
                  >
                    <ShoppingBag size={48} style={{ color: '#A0AEC0', margin: '0 auto 16px' }} />
                    <p style={{ fontSize: '12px', color: '#4A5568' }}>NO FOOD YET</p>
                  </div>
                ) : (
                  getFoodData().map((food) => (
                    <div
                      key={food.id}
                      className="p-6 transition-all duration-150 cursor-pointer"
                      style={{
                        backgroundColor: 'white',
                        border: '4px solid #2D3748',
                        boxShadow: '6px 6px 0 rgba(0,0,0,0.15)',
                      }}
                      onClick={() => router.push(`/food/${food.id}`)}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translate(-2px, -2px)';
                        e.currentTarget.style.boxShadow = '8px 8px 0 rgba(0,0,0,0.2)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translate(0, 0)';
                        e.currentTarget.style.boxShadow = '6px 6px 0 rgba(0,0,0,0.15)';
                      }}
                    >
                      <div className="flex items-center justify-between mb-4">
                        <h3 style={{ fontSize: '14px', color: '#2D3748' }}>{food.name}</h3>
                        <StatusBadge status={food.status} />
                      </div>
                      <div className="flex items-center justify-between">
                        <span style={{ fontSize: '10px', color: '#4A5568' }}>
                          {food.date}
                        </span>
                        <span style={{ fontSize: '12px', color: '#6BCF7F', fontWeight: 'bold' }}>
                          {food.price}
                        </span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
}