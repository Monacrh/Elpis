'use client'

import React, { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { FiChevronRight} from 'react-icons/fi'
import { useRouter } from 'next/navigation'
import UnifiedCard from '../components/Card';
import Image from 'next/image'
import { Task, Food } from '../../types/types' // Import tipe data baru
import LoadingScreenPixel from '../components/LoadingScreen'

const HomePage = () => {
  const router = useRouter();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [foods, setFoods] = useState<Food[]>([]);
  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    // Fetch Tasks
    const fetchTasks = async () => {
      try {
        const res = await fetch('/api/tasks');
        const data = await res.json();
        setTasks(data.tasks || []);
      } catch (error) {
        console.error("Failed to fetch tasks:", error);
      } finally {
        setIsLoading(false);
      }
    };

    // Fetch Food
    const fetchFoods = async () => {
      try {
        const res = await fetch('/api/foods');
        const data = await res.json();
        setFoods(data.foods || []);
      } catch (error) {
        console.error("Failed to fetch food:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTasks();
    fetchFoods();
  }, []);

  if (isLoading) {
    return <LoadingScreenPixel />;
  }

  return (
    <>
      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');
      `}</style>

      {/* Hero Section */}
      <section className="relative w-full h-screen overflow-hidden">
        <Navbar />
        {/* Option 1: Use GIF */}
        <Image
          src="/Japanese Wheat Field.gif"
          alt="Pixel Art Hero"
          fill
          className="object-cover"
          style={{ imageRendering: "pixelated" }}
          priority
        />

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
              ONE SMALL STEP FROM ZERO
              ONE SMALL STEP TO HERO
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
              A hero is an ordinary individual who finds strength
              to persevere and endure in spite of overwhelming obstacles
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
              onClick={() => router.push("/listtasks")}
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
            {tasks.map((task) => (
                <UnifiedCard key={task._id.toString()} type="task" data={task} />
            ))}
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
              onClick={() => router.push("/listfoods")}
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
            {foods.map((food) => (
                <UnifiedCard key={food._id.toString()} type="food" data={food} />
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default HomePage;