'use client'

import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { ArrowLeft, Clock, MapPin, DollarSign, User, Calendar, ChevronLeft, ChevronRight } from 'lucide-react';
import ConfirmationModal from '../../components/ConfirmationModal';
import Image from 'next/image';

interface TaskDetail {
  _id: string;
  id: number;
  title: string;
  description: string;
  category: string;
  categoryColor: string;
  duration: string;
  distance: "1.0 KM";
  reward: string;
  poster: "Bryan Dhaniel";
  postedDate: string;
  requirements: string[];
  images: string[];
  location: string;
}

const ImageSlider = ({ images }: { images: string[] }) => {
  const [current, setCurrent] = useState(0);

  return (
    <div
      className="relative"
      style={{
        border: '4px solid #2D3748',
        boxShadow: '6px 6px 0 rgba(0,0,0,0.15)',
        backgroundColor: 'white',
      }}
    >
      <div className="relative aspect-square overflow-hidden">
        {images && images.length > 0 ? (
          <Image
            src={images[current]}
            alt={`Task image ${current + 1}`}
            width={800}
            height={600}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-200">
            <span style={{ fontSize: '12px', color: '#4A5568' }}>NO IMAGE</span>
          </div>
        )}
        
        {images && images.length > 1 && (
          <>
            <button
              onClick={() => setCurrent((current - 1 + images.length) % images.length)}
              className="absolute left-4 top-1/2 -translate-y-1/2 p-3 transition-all duration-150"
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                border: '3px solid #2D3748',
                boxShadow: '3px 3px 0 rgba(0,0,0,0.2)',
              }}
            >
              <ChevronLeft size={24} />
            </button>
            
            <button
              onClick={() => setCurrent((current + 1) % images.length)}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-3 transition-all duration-150"
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                border: '3px solid #2D3748',
                boxShadow: '3px 3px 0 rgba(0,0,0,0.2)',
              }}
            >
              <ChevronRight size={24} />
            </button>
          </>
        )}

        <div
          className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2"
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            border: '3px solid #2D3748',
            fontFamily: '"Press Start 2P", cursive',
            fontSize: '10px',
          }}
        >
          {images ? `${current + 1} / ${images.length}` : '0 / 0'}
        </div>
      </div>

      {images && images.length > 1 && (
        <div className="flex gap-2 p-4 overflow-x-auto" style={{ borderTop: '4px solid #2D3748', backgroundColor: '#FFF8F0' }}>
          {images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setCurrent(idx)}
              className="flex-shrink-0"
              style={{
                width: '80px',
                height: '80px',
                border: current === idx ? '4px solid #FF8C42' : '3px solid #2D3748',
                opacity: current === idx ? 1 : 0.6,
              }}
            >
              <Image
                src={img}
                alt={`Thumb ${idx + 1}`}
                width={200}
                height={200}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default function TaskDetailPage() {
  const router = useRouter();
  const params = useParams();
  const [isAccepting, setIsAccepting] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [task, setTask] = useState<TaskDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const taskId = params.id;
        const response = await fetch(`/api/tasks/${taskId}`);
        
        if (!response.ok) {
          throw new Error('Task not found');
        }
        
        const data = await response.json();
        setTask(data.task);
      } catch (err) {
        setError('Failed to load task');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchTask();
    }
  }, [params.id]);

  const handleAccept = async () => {
    setIsAccepting(true);
    // API call here
    await new Promise(r => setTimeout(r, 1500));
    setIsAccepting(false);
    setShowModal(true);
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <main 
          className="min-h-screen pt-24 px-6 pb-16"
          style={{ 
            backgroundColor: '#FFF8F0',
            fontFamily: '"Press Start 2P", cursive',
          }}
        >
          <div className="max-w-7xl mx-auto text-center">
            <div style={{ fontSize: '16px', color: '#2D3748' }}>LOADING...</div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  if (error || !task) {
    return (
      <>
        <Navbar />
        <main 
          className="min-h-screen pt-24 px-6 pb-16"
          style={{ 
            backgroundColor: '#FFF8F0',
            fontFamily: '"Press Start 2P", cursive',
          }}
        >
          <div className="max-w-7xl mx-auto text-center">
            <div style={{ fontSize: '16px', color: '#FF8C42' }}>{error || 'Task not found'}</div>
            <button
              onClick={() => router.back()}
              className="mt-4 px-4 py-3 transition-all duration-150"
              style={{
                backgroundColor: 'white',
                border: '3px solid #2D3748',
                boxShadow: '4px 4px 0 rgba(0,0,0,0.15)',
                fontSize: '10px',
              }}
            >
              GO BACK
            </button>
          </div>
        </main>
        <Footer />
      </>
    );
  }

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
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 mb-8 px-4 py-3 transition-all duration-150"
            style={{
              backgroundColor: 'white',
              border: '3px solid #2D3748',
              boxShadow: '4px 4px 0 rgba(0,0,0,0.15)',
              fontSize: '10px',
            }}
          >
            <ArrowLeft size={16} />
            BACK
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left: Images */}
            <div className="space-y-6">
              <ImageSlider images={task.images || []} />

              {/* Location Card */}
              <div style={{ backgroundColor: 'white', border: '4px solid #2D3748', boxShadow: '6px 6px 0 rgba(0,0,0,0.15)', padding: '20px' }}>
                <div className="flex items-start gap-3 mb-4">
                  <MapPin size={20} style={{ color: '#6BCF7F', flexShrink: 0 }} />
                  <div>
                    <h3 style={{ fontSize: '12px', color: '#2D3748', marginBottom: '8px', fontWeight: 'bold' }}>
                      {task.location}
                    </h3>
                    <div className="flex items-center gap-2 mt-3">
                      <span style={{ fontSize: '10px', color: '#6BCF7F', marginLeft: '8px' }}>
                         {task.distance || "1.0 KM"} AWAY
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Info */}
            <div className="space-y-6">
              <div
                style={{
                  backgroundColor: 'white',
                  border: '4px solid #2D3748',
                  boxShadow: '6px 6px 0 rgba(0,0,0,0.15)',
                  padding: '24px',
                }}
              >
                <div
                  className="inline-block px-3 py-2 mb-4"
                  style={{
                    backgroundColor: task.categoryColor || '#FF8C42',
                    color: 'white',
                    border: '2px solid #2D3748',
                    fontSize: '8px',
                  }}
                >
                  {task.category}
                </div>

                <h1 style={{ fontSize: '28px', color: '#2D3748', marginBottom: '12px', lineHeight: '1.4' }}>
                  {task.title}
                </h1>

                <div className="space-y-2 mb-6">
                  <div className="flex items-center gap-2">
                    <Calendar size={14} style={{ color: '#4A90E2' }} />
                    <span style={{ fontSize: '8px', color: '#4A5568' }}>{task.postedDate}</span>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="p-4" style={{ backgroundColor: '#FFF8F0', border: '3px solid #FF8C42' }}>
                    <DollarSign size={16} style={{ color: '#FFD93D', marginBottom: '8px' }} />
                    <span style={{ fontSize: '8px', color: '#4A5568', display: 'block', marginBottom: '4px' }}>REWARD</span>
                    <span style={{ fontSize: '14px', color: '#2D3748', fontWeight: 'bold' }}>{task.reward}</span>
                  </div>
                  <div className="p-4" style={{ backgroundColor: '#FFF8F0', border: '3px solid #4A90E2' }}>
                    <Clock size={16} style={{ color: '#4A90E2', marginBottom: '8px' }} />
                    <span style={{ fontSize: '8px', color: '#4A5568', display: 'block', marginBottom: '4px' }}>DURATION</span>
                    <span style={{ fontSize: '14px', color: '#2D3748', fontWeight: 'bold' }}>{task.duration}</span>
                  </div>
                  <div className="p-4" style={{ backgroundColor: '#FFF8F0', border: '3px solid #6BCF7F' }}>
                    <MapPin size={16} style={{ color: '#6BCF7F', marginBottom: '8px' }} />
                    <span style={{ fontSize: '8px', color: '#4A5568', display: 'block', marginBottom: '4px' }}>DISTANCE</span>
                    <span style={{ fontSize: '14px', color: '#2D3748', fontWeight: 'bold' }}>{task.distance || "1.0 KM"}</span>
                  </div>
                </div>

                <div className="mb-6">
                  <h2 style={{ fontSize: '12px', color: '#FF8C42', marginBottom: '12px' }}>DESCRIPTION</h2>
                  <p style={{ fontSize: '10px', color: '#2D3748', lineHeight: '1.8' }}>{task.description}</p>
                </div>

                <div className="mb-6">
                  <h2 style={{ fontSize: '12px', color: '#FF8C42', marginBottom: '12px' }}>REQUIREMENTS</h2>
                  <ul className="space-y-3">
                    {task.requirements && task.requirements.map((req, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <span style={{ width: '8px', height: '8px', backgroundColor: '#FF8C42', marginTop: '6px', flexShrink: 0 }} />
                        <span style={{ fontSize: '10px', color: '#2D3748', lineHeight: '1.6' }}>{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Poster */}
              <div style={{ backgroundColor: 'white', border: '4px solid #2D3748', boxShadow: '6px 6px 0 rgba(0,0,0,0.15)', padding: '24px' }}>
                <h2 style={{ fontSize: '12px', color: '#4A90E2', marginBottom: '16px' }}>POSTED BY</h2>
                <div className="flex items-center gap-3 mb-4">
                  <div style={{ width: '48px', height: '48px', backgroundColor: '#4A90E2', border: '3px solid #2D3748' }}>
                    <div className="w-full h-full flex items-center justify-center">
                      <User size={24} color="white" />
                    </div>
                  </div>
                  <div>
                    <div style={{ fontSize: '12px', color: '#2D3748', marginBottom: '4px' }}> {task.poster || "Bryan Dhaniel"}</div>
                  </div>
                </div>
                <button
                  className="w-full py-3 transition-all duration-150 mb-3"
                  style={{
                    backgroundColor: 'white',
                    border: '3px solid #4A90E2',
                    color: '#4A90E2',
                    fontSize: '10px',
                    boxShadow: '3px 3px 0 rgba(0,0,0,0.15)',
                  }}
                >
                  VIEW PROFILE
                </button>
                <button
                  onClick={handleAccept}
                  className="w-full py-4 font-bold transition-all duration-150"
                  style={{
                    backgroundColor: isAccepting ? '#A0AEC0' : '#FF8C42',
                    color: 'white',
                    border: '4px solid #2D3748',
                    fontSize: '12px',
                    boxShadow: '5px 5px 0 rgba(0,0,0,0.25)',
                  }}
                >
                  {isAccepting ? 'ACCEPTING...' : 'ACCEPT TASK'}
                </button>
                {/* Modal */}
                <ConfirmationModal
                  isOpen={showModal}
                  onClose={() => setShowModal(false)}
                  type="task"
                  data={{
                    title: task.title,
                    reward: task.reward
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}