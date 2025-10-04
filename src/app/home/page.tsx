'use client'

import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { FiChevronRight, FiClock, FiMapPin, FiDollarSign } from 'react-icons/fi'
import { useRouter } from 'next/navigation'
import UnifiedCard from '../components/Card';

// Type Definitions
interface Task {
  id: number;
  title: string;
  description: string;
  category: string;
  categoryColor: string;
  duration: string;
  location: string;
  reward: string;
  icon: string;
}

interface Food {
  id: number;
  name: string;
  description: string;
  restaurant: string;
  price: string;
  originalPrice?: string;
  discount?: string;
  rating: string;
  icon: string;
}

// Dummy Task Card Component
const TaskCard = ({ task }: { task: Task }) => {
  return (
    <div 
      className="transition-all duration-150 overflow-hidden"
      style={{
        backgroundColor: 'white',
        border: '4px solid #2D3748',
        boxShadow: '6px 6px 0 rgba(0,0,0,0.15)',
        imageRendering: 'pixelated',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translate(-3px, -3px)';
        e.currentTarget.style.boxShadow = '9px 9px 0 rgba(0,0,0,0.2)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translate(0, 0)';
        e.currentTarget.style.boxShadow = '6px 6px 0 rgba(0,0,0,0.15)';
      }}
    >
      {/* Task Icon/Image */}
      <div 
        className="w-full h-48 flex items-center justify-center"
        style={{
          background: 'linear-gradient(135deg, #FF8C42 0%, #FFD93D 100%)',
          borderBottom: '4px solid #2D3748',
        }}
      >
        <div 
          className="w-24 h-24"
          style={{
            backgroundImage: task.icon,
            backgroundSize: 'contain',
            imageRendering: 'pixelated',
          }}
        />
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Category Badge */}
        <span 
          className="inline-block px-3 py-1 mb-3"
          style={{
            backgroundColor: task.categoryColor,
            color: 'white',
            border: '2px solid #2D3748',
            fontFamily: '"Press Start 2P", cursive',
            fontSize: '7px',
          }}
        >
          {task.category}
        </span>

        {/* Title */}
        <h3 
          className="font-bold mb-3"
          style={{
            color: '#2D3748',
            fontFamily: '"Press Start 2P", cursive',
            fontSize: '12px',
            lineHeight: '1.6',
          }}
        >
          {task.title}
        </h3>

        {/* Description */}
        <p 
          className="mb-4"
          style={{
            color: '#4A5568',
            fontFamily: '"Press Start 2P", cursive',
            fontSize: '8px',
            lineHeight: '1.6',
          }}
        >
          {task.description}
        </p>

        {/* Details */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2">
            <FiClock style={{ color: '#4A90E2' }} size={14} />
            <span style={{ fontSize: '8px', fontFamily: '"Press Start 2P", cursive', color: '#2D3748' }}>
              {task.duration}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <FiMapPin style={{ color: '#6BCF7F' }} size={14} />
            <span style={{ fontSize: '8px', fontFamily: '"Press Start 2P", cursive', color: '#2D3748' }}>
              {task.location}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <FiDollarSign style={{ color: '#FFD93D' }} size={14} />
            <span style={{ fontSize: '8px', fontFamily: '"Press Start 2P", cursive', color: '#2D3748' }}>
              {task.reward}
            </span>
          </div>
        </div>

        {/* Accept Button */}
        <button 
          className="w-full py-3 font-bold transition-all duration-150"
          style={{
            backgroundColor: '#FF8C42',
            color: 'white',
            border: '3px solid #E67A30',
            boxShadow: '4px 4px 0 rgba(0,0,0,0.2)',
            fontFamily: '"Press Start 2P", cursive',
            fontSize: '10px',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translate(2px, 2px)';
            e.currentTarget.style.boxShadow = '2px 2px 0 rgba(0,0,0,0.2)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translate(0, 0)';
            e.currentTarget.style.boxShadow = '4px 4px 0 rgba(0,0,0,0.2)';
          }}
        >
          ACCEPT TASK
        </button>
      </div>
    </div>
  );
};

// Dummy Food Card Component
const FoodCard = ({ food }: { food: Food }) => {
  return (
    <div 
      className="transition-all duration-150 overflow-hidden"
      style={{
        backgroundColor: 'white',
        border: '4px solid #2D3748',
        boxShadow: '6px 6px 0 rgba(0,0,0,0.15)',
        imageRendering: 'pixelated',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translate(-3px, -3px)';
        e.currentTarget.style.boxShadow = '9px 9px 0 rgba(0,0,0,0.2)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translate(0, 0)';
        e.currentTarget.style.boxShadow = '6px 6px 0 rgba(0,0,0,0.15)';
      }}
    >
      {/* Food Image */}
      <div 
        className="w-full h-48 flex items-center justify-center relative"
        style={{
          background: 'linear-gradient(135deg, #6BCF7F 0%, #4A90E2 100%)',
          borderBottom: '4px solid #2D3748',
        }}
      >
        <div 
          className="w-24 h-24"
          style={{
            backgroundImage: food.icon,
            backgroundSize: 'contain',
            imageRendering: 'pixelated',
          }}
        />
        {/* Discount Badge */}
        {food.discount && (
          <div 
            className="absolute top-3 right-3 px-3 py-2"
            style={{
              backgroundColor: '#FF8C42',
              color: 'white',
              border: '3px solid #E67A30',
              fontFamily: '"Press Start 2P", cursive',
              fontSize: '10px',
              boxShadow: '3px 3px 0 rgba(0,0,0,0.2)',
            }}
          >
            -{food.discount}%
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Restaurant Name */}
        <span 
          className="inline-block mb-2"
          style={{
            color: '#4A90E2',
            fontFamily: '"Press Start 2P", cursive',
            fontSize: '8px',
          }}
        >
          {food.restaurant}
        </span>

        {/* Food Name */}
        <h3 
          className="font-bold mb-3"
          style={{
            color: '#2D3748',
            fontFamily: '"Press Start 2P", cursive',
            fontSize: '12px',
            lineHeight: '1.6',
          }}
        >
          {food.name}
        </h3>

        {/* Description */}
        <p 
          className="mb-4"
          style={{
            color: '#4A5568',
            fontFamily: '"Press Start 2P", cursive',
            fontSize: '8px',
            lineHeight: '1.6',
          }}
        >
          {food.description}
        </p>

        {/* Price Section */}
        <div className="flex items-center justify-between mb-4">
          <div>
            {food.originalPrice && (
              <span 
                className="line-through mr-2"
                style={{
                  color: '#A0AEC0',
                  fontFamily: '"Press Start 2P", cursive',
                  fontSize: '8px',
                }}
              >
                ${food.originalPrice}
              </span>
            )}
            <span 
              style={{
                color: '#6BCF7F',
                fontFamily: '"Press Start 2P", cursive',
                fontSize: '14px',
                fontWeight: 'bold',
              }}
            >
              ${food.price}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <span style={{ color: '#FFD93D', fontSize: '12px' }}>⭐</span>
            <span style={{ fontFamily: '"Press Start 2P", cursive', fontSize: '8px', color: '#2D3748' }}>
              {food.rating}
            </span>
          </div>
        </div>

        {/* Redeem Button */}
        <button 
          className="w-full py-3 font-bold transition-all duration-150"
          style={{
            backgroundColor: '#6BCF7F',
            color: 'white',
            border: '3px solid #54B868',
            boxShadow: '4px 4px 0 rgba(0,0,0,0.2)',
            fontFamily: '"Press Start 2P", cursive',
            fontSize: '10px',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translate(2px, 2px)';
            e.currentTarget.style.boxShadow = '2px 2px 0 rgba(0,0,0,0.2)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translate(0, 0)';
            e.currentTarget.style.boxShadow = '4px 4px 0 rgba(0,0,0,0.2)';
          }}
        >
          REDEEM NOW
        </button>
      </div>
    </div>
  );
};

const HomePage = () => {
  const router = useRouter();

  const tasks = [
    {
      id: 1,
      title: "WALK DOG",
      description: "Walk a friendly golden retriever for 1 hour",
      category: "PETS",
      categoryColor: "#FF8C42",
      duration: "1 HOUR",
      location: "2.3 KM AWAY",
      reward: "100 POINTS",
      poster: "JOHN_DOE", 
      icon: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='96' height='96'%3E%3Crect x='36' y='20' width='24' height='12' fill='%23FF8C42'/%3E%3Crect x='24' y='32' width='48' height='12' fill='%23FF8C42'/%3E%3Crect x='32' y='44' width='12' height='20' fill='%234A90E2'/%3E%3Crect x='52' y='44' width='12' height='20' fill='%234A90E2'/%3E%3Crect x='28' y='64' width='12' height='12' fill='%232D3748'/%3E%3Crect x='56' y='64' width='12' height='12' fill='%232D3748'/%3E%3C/svg%3E")`,
    },
    {
      id: 2,
      title: "WASH CAR",
      description: "Clean a sedan car inside and out",
      category: "CLEANING",
      categoryColor: "#4A90E2",
      duration: "45 MIN",
      location: "1.5 KM AWAY",
      reward: "80 POINTS",
      poster: "JOHN_DOE", 
      icon: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='96' height='96'%3E%3Crect x='16' y='32' width='64' height='24' fill='%234A90E2'/%3E%3Crect x='8' y='56' width='80' height='16' fill='%234A90E2'/%3E%3Crect x='20' y='60' width='12' height='12' fill='%232D3748'/%3E%3Crect x='64' y='60' width='12' height='12' fill='%232D3748'/%3E%3C/svg%3E")`,
    },
    {
      id: 3,
      title: "CLEAN YARD",
      description: "Rake leaves and tidy up backyard",
      category: "OUTDOOR",
      categoryColor: "#6BCF7F",
      duration: "1 HOUR",
      location: "3.1 KM AWAY",
      reward: "90 POINTS",
      poster: "JOHN_DOE", 
      icon: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='96' height='96'%3E%3Crect x='40' y='8' width='16' height='56' fill='%236BCF7F'/%3E%3Crect x='24' y='20' width='48' height='8' fill='%236BCF7F'/%3E%3Crect x='32' y='32' width='32' height='8' fill='%236BCF7F'/%3E%3Crect x='36' y='44' width='24' height='8' fill='%236BCF7F'/%3E%3C/svg%3E")`,
    },
    {
      id: 4,
      title: "DELIVER BOX",
      description: "Deliver small package within neighborhood",
      category: "DELIVERY",
      categoryColor: "#FFD93D",
      duration: "30 MIN",
      location: "0.8 KM AWAY",
      reward: "60 POINTS",
      poster: "JOHN_DOE", 
      icon: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='96' height='96'%3E%3Crect x='24' y='24' width='48' height='48' fill='%23FFD93D'/%3E%3Crect x='36' y='24' width='24' height='48' fill='%23FF8C42'/%3E%3Crect x='24' y='36' width='48' height='4' fill='%232D3748'/%3E%3Crect x='44' y='24' width='4' height='48' fill='%232D3748'/%3E%3C/svg%3E")`,
    },
  ];

  // Dummy Data - Food
  const foods = [
    {
      id: 1,
      name: "NASI GORENG",
      description: "Delicious fried rice with egg",
      restaurant: "WARUNG MAKAN",
      price: "2.5",
      originalPrice: "5.0",
      discount: "50",
      location: "1.5 KM AWAY",
      rating: "4.8",
      
      icon: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='96' height='96'%3E%3Crect x='16' y='40' width='64' height='8' fill='%234A90E2'/%3E%3Crect x='20' y='48' width='56' height='24' fill='%23FFD93D'/%3E%3Crect x='32' y='32' width='32' height='8' fill='%23FF8C42'/%3E%3Crect x='36' y='24' width='24' height='8' fill='%23FF8C42'/%3E%3C/svg%3E")`,
    },
    {
      id: 2,
      name: "PIZZA SLICE",
      description: "Cheese pizza with pepperoni",
      restaurant: "PIZZA CORNER",
      price: "3.0",
      originalPrice: "8.0",
      discount: "62",
      rating: "4.9",
      location: "1.5 KM AWAY",
      icon: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='96' height='96'%3E%3Cpath d='M 8 72 L 48 16 L 88 72 Z' fill='%23FFD93D'/%3E%3Ccircle cx='32' cy='48' r='6' fill='%23FF8C42'/%3E%3Ccircle cx='48' cy='40' r='6' fill='%23FF8C42'/%3E%3Ccircle cx='56' cy='56' r='6' fill='%23FF8C42'/%3E%3C/svg%3E")`,
    },
    {
      id: 3,
      name: "BREAD PACK",
      description: "Fresh bread rolls (6 pcs)",
      restaurant: "BAKERY HUT",
      price: "1.5",
      originalPrice: "4.0",
      discount: "62",
      rating: "4.7",
      location: "1.5 KM AWAY",
      icon: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='96' height='96'%3E%3Cellipse cx='48' cy='48' rx='32' ry='20' fill='%23FFD93D'/%3E%3Crect x='24' y='42' width='48' height='12' fill='%23FF8C42'/%3E%3C/svg%3E")`,
    },
    {
      id: 4,
      name: "FRUIT BOX",
      description: "Mixed seasonal fruits",
      restaurant: "FRESH MARKET",
      price: "4.0",
      originalPrice: "10.0",
      discount: "60",
      rating: "5.0",
      location: "1.5 KM AWAY",
      icon: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='96' height='96'%3E%3Ccircle cx='36' cy='40' r='16' fill='%23FF8C42'/%3E%3Ccircle cx='60' cy='44' r='14' fill='%236BCF7F'/%3E%3Ccircle cx='48' cy='60' r='12' fill='%23FFD93D'/%3E%3C/svg%3E")`,
    },
  ];

  return (
    <>
      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');
      `}</style>

      
      
      {/* Hero Section */}
      <section className="relative w-full h-[600px]">
        <Navbar />
        {/* Option 1: Use GIF */}
        {/* <Image
          src="/hero-banner.gif"
          alt="Pixel Art Hero"
          fill
          className="object-cover"
          style={{ imageRendering: "pixelated" }}
          priority
        /> */}

        {/* Option 2: Gradient Background (temporary) */}
        <div 
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(135deg, #FF8C42 0%, #FFD93D 50%, #4A90E2 100%)',
          }}
        >
          <div 
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `
                linear-gradient(0deg, transparent 24%, rgba(255, 255, 255, .3) 25%, rgba(255, 255, 255, .3) 26%, transparent 27%, transparent 74%, rgba(255, 255, 255, .3) 75%, rgba(255, 255, 255, .3) 76%, transparent 77%, transparent),
                linear-gradient(90deg, transparent 24%, rgba(255, 255, 255, .3) 25%, rgba(255, 255, 255, .3) 26%, transparent 27%, transparent 74%, rgba(255, 255, 255, .3) 75%, rgba(255, 255, 255, .3) 76%, transparent 77%, transparent)
              `,
              backgroundSize: '8px 8px',
            }}
          />
        </div>

        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center px-8">
            <h1 
              className="text-white font-bold mb-6 mx-auto text-center"
              style={{
                fontFamily: '"Press Start 2P", cursive',
                fontSize: '48px',
                textShadow: '4px 4px 0 rgba(0,0,0,0.3)',
                lineHeight: '1.4',
              }}
            >
              WORK. EARN. HOPE.
            </h1>
            <p 
              className="text-white mb-8 mx-auto text-center"
              style={{
                fontFamily: '"Press Start 2P", cursive',
                fontSize: '14px',
                textShadow: '2px 2px 0 rgba(0,0,0,0.2)',
                lineHeight: '1.8',
                maxWidth: '600px',
              }}
            >
              Find 1-hour tasks nearby or redeem food with your points
            </p>
            <button 
              className="px-8 py-4 font-bold transition-all duration-150"
              style={{
                backgroundColor: '#FF8C42',
                color: 'white',
                border: '4px solid #E67A30',
                boxShadow: '6px 6px 0 rgba(0,0,0,0.3)',
                fontFamily: '"Press Start 2P", cursive',
                fontSize: '12px',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translate(3px, 3px)';
                e.currentTarget.style.boxShadow = '3px 3px 0 rgba(0,0,0,0.3)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translate(0, 0)';
                e.currentTarget.style.boxShadow = '6px 6px 0 rgba(0,0,0,0.3)';
              }}
            >
              START NOW
            </button>
          </div>
        </div>
      </section>

      {/* Tasks Section */}
      <main className="pt-16 px-6 pb-12" style={{ backgroundColor: '#FFF8F0' }}>
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <div>
              <p 
                className="mb-2"
                style={{ 
                  color: '#FF8C42',
                  fontFamily: '"Press Start 2P", cursive',
                  fontSize: '12px',
                }}
              >
                AVAILABLE TASKS
              </p>
              <h2 
                style={{ 
                  color: '#2D3748',
                  fontFamily: '"Press Start 2P", cursive',
                  fontSize: '24px',
                  lineHeight: '1.6',
                }}
              >
                FIND WORK NEARBY
              </h2>
            </div>
            <button 
              onClick={() => router.push("/tasks")}
              className="flex items-center gap-2 px-6 py-3 font-bold transition-all duration-150"
              style={{
                backgroundColor: 'transparent',
                color: '#FF8C42',
                border: '3px solid #FF8C42',
                boxShadow: '4px 4px 0 rgba(0,0,0,0.1)',
                fontFamily: '"Press Start 2P", cursive',
                fontSize: '10px',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#FF8C42';
                e.currentTarget.style.color = 'white';
                e.currentTarget.style.transform = 'translate(2px, 2px)';
                e.currentTarget.style.boxShadow = '2px 2px 0 rgba(0,0,0,0.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.color = '#FF8C42';
                e.currentTarget.style.transform = 'translate(0, 0)';
                e.currentTarget.style.boxShadow = '4px 4px 0 rgba(0,0,0,0.1)';
              }}
            >
              VIEW ALL
              <FiChevronRight className="w-4 h-4" />
            </button>
          </div>

         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* {tasks.map((task) => (
                <UnifiedCard key={task.id} type="task" data={task} />
            ))} */}
            <UnifiedCard/>
        </div>
        </div>
      </main>

      {/* Stats Divider */}
      <section 
        className="py-12"
        style={{
          background: 'linear-gradient(90deg, #FF8C42 0%, #FFD93D 50%, #4A90E2 100%)',
          borderTop: '6px solid #2D3748',
          borderBottom: '6px solid #2D3748',
        }}
      >
        <div className="max-w-6xl mx-auto px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center text-white">
            <div>
              <h2 
                className="font-bold mb-2"
                style={{
                  fontFamily: '"Press Start 2P", cursive',
                  fontSize: '36px',
                  textShadow: '3px 3px 0 rgba(0,0,0,0.3)',
                }}
              >
                1247
              </h2>
              <p 
                style={{
                  fontFamily: '"Press Start 2P", cursive',
                  fontSize: '10px',
                }}
              >
                TASKS COMPLETED
              </p>
            </div>
            <div>
              <h2 
                className="font-bold mb-2"
                style={{
                  fontFamily: '"Press Start 2P", cursive',
                  fontSize: '36px',
                  textShadow: '3px 3px 0 rgba(0,0,0,0.3)',
                }}
              >
                2.8K
              </h2>
              <p 
                style={{
                  fontFamily: '"Press Start 2P", cursive',
                  fontSize: '10px',
                }}
              >
                KG FOOD SAVED
              </p>
            </div>
            <div>
              <h2 
                className="font-bold mb-2"
                style={{
                  fontFamily: '"Press Start 2P", cursive',
                  fontSize: '36px',
                  textShadow: '3px 3px 0 rgba(0,0,0,0.3)',
                }}
              >
                584
              </h2>
              <p 
                style={{
                  fontFamily: '"Press Start 2P", cursive',
                  fontSize: '10px',
                }}
              >
                ACTIVE WORKERS
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Food Section */}
      <main className="pt-16 px-6 pb-16" style={{ backgroundColor: '#FFF8F0' }}>
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <div>
              <p 
                className="mb-2"
                style={{ 
                  color: '#6BCF7F',
                  fontFamily: '"Press Start 2P", cursive',
                  fontSize: '12px',
                }}
              >
                FOOD PARTNERS
              </p>
              <h2 
                style={{ 
                  color: '#2D3748',
                  fontFamily: '"Press Start 2P", cursive',
                  fontSize: '24px',
                  lineHeight: '1.6',
                }}
              >
                REDEEM WITH POINTS
              </h2>
            </div>
            <button 
              onClick={() => router.push("/food")}
              className="flex items-center gap-2 px-6 py-3 font-bold transition-all duration-150"
              style={{
                backgroundColor: 'transparent',
                color: '#6BCF7F',
                border: '3px solid #6BCF7F',
                boxShadow: '4px 4px 0 rgba(0,0,0,0.1)',
                fontFamily: '"Press Start 2P", cursive',
                fontSize: '10px',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#6BCF7F';
                e.currentTarget.style.color = 'white';
                e.currentTarget.style.transform = 'translate(2px, 2px)';
                e.currentTarget.style.boxShadow = '2px 2px 0 rgba(0,0,0,0.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.color = '#6BCF7F';
                e.currentTarget.style.transform = 'translate(0, 0)';
                e.currentTarget.style.boxShadow = '4px 4px 0 rgba(0,0,0,0.1)';
              }}
            >
              VIEW ALL
              <FiChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* {foods.map((food) => (
                <UnifiedCard key={food.id} type="food" data={food} />
            ))} */}
            <UnifiedCard/>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default HomePage;