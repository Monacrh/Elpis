'use client'

import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { ArrowLeft, MapPin, Star, Clock, ShoppingCart, ChevronLeft, ChevronRight } from 'lucide-react';
import ConfirmationModal from '../../components/ConfirmationModal';
import Image from 'next/image';

interface FoodDetail {
  _id: string;
  id: number;
  name: string;
  description: string;
  restaurant: string;
  restaurantRating: string;
  price: string;
  rating: string;
  reviews: number;
  location: string;
  distance: string;
  availableUntil: string;
  category: string;
  portions: number;
  images: string[];
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
            alt={`Food image ${current + 1}`}
            fill
            className="object-cover"
            priority
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
              className="flex-shrink-0 relative"
              style={{
                width: '80px',
                height: '80px',
                border: current === idx ? '4px solid #6BCF7F' : '3px solid #2D3748',
                opacity: current === idx ? 1 : 0.6,
              }}
            >
              <Image
                src={img}
                alt={`Thumb ${idx + 1}`}
                fill
                className="object-cover"
                sizes="80px"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default function FoodDetailPage() {
  const router = useRouter();
  const params = useParams();
  const [quantity, setQuantity] = useState(1);
  const [isRedeeming, setIsRedeeming] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [food, setFood] = useState<FoodDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchFood = async () => {
      try {
        const foodId = params.id;
        const response = await fetch(`/api/food/${foodId}`);
        
        if (!response.ok) {
          throw new Error('Food item not found');
        }
        
        const data = await response.json();
        setFood(data.food);
      } catch (err) {
        setError('Failed to load food item');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchFood();
    }
  }, [params.id]);

  const handleRedeem = async () => {
    setIsRedeeming(true);
    await new Promise(r => setTimeout(r, 1500));
    setIsRedeeming(false);
    setShowModal(true);
  };

  const generateCode = () => {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    return Array.from({length: 6}, () => 
      chars[Math.floor(Math.random() * chars.length)]
    ).join('');
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

  if (error || !food) {
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
            <div style={{ fontSize: '16px', color: '#FF8C42' }}>{error || 'Food item not found'}</div>
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
            {/* Left: Images + Location */}
            <div className="space-y-6">
              <ImageSlider images={food.images || []} />
              
              {/* Location Card */}
              <div style={{ backgroundColor: 'white', border: '4px solid #2D3748', boxShadow: '6px 6px 0 rgba(0,0,0,0.15)', padding: '20px' }}>
                <div className="flex items-start gap-3 mb-4">
                  <MapPin size={20} style={{ color: '#6BCF7F', flexShrink: 0 }} />
                  <div>
                    <h3 style={{ fontSize: '12px', color: '#2D3748', marginBottom: '8px', fontWeight: 'bold' }}>
                      {food.restaurant}
                    </h3>
                    <p style={{ fontSize: '10px', color: '#4A5568', lineHeight: '1.6' }}>
                      {food.location}
                    </p>
                    <div className="flex items-center gap-2 mt-3">
                      {/* <Star size={14} style={{ color: '#FFD93D', fill: '#FFD93D' }} /> */}
                      <span style={{ fontSize: '10px', color: '#2D3748' }}>{food.restaurantRating}</span>
                      <span style={{ fontSize: '10px', color: '#6BCF7F', marginLeft: '8px' }}>
                        {food.distance || "1.0 KM"} AWAY
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Info */}
            <div className="space-y-6">
              <div style={{ backgroundColor: 'white', border: '4px solid #2D3748', boxShadow: '6px 6px 0 rgba(0,0,0,0.15)', padding: '24px' }}>
                <div
                  className="inline-block px-3 py-2 mb-4"
                  style={{
                    backgroundColor: '#6BCF7F',
                    color: 'white',
                    border: '2px solid #2D3748',
                    fontSize: '8px',
                  }}
                >
                  {food.category}
                </div>

                <h1 style={{ fontSize: '24px', color: '#2D3748', marginBottom: '12px', lineHeight: '1.4' }}>
                  {food.name}
                </h1>

                {/* <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center gap-1">
                    <Star size={16} style={{ color: '#FFD93D', fill: '#FFD93D' }} />
                    <span style={{ fontSize: '12px', color: '#2D3748' }}>{food.rating || "4.9"}</span>
                    <span style={{ fontSize: '8px', color: '#4A5568' }}>({food.reviews|| "100"})</span>
                  </div>
                </div> */}

                <div className="flex items-center gap-2 mb-6">
                  <span style={{ fontSize: '32px', color: '#6BCF7F', fontWeight: 'bold' }}>
                    ${food.price}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="p-4" style={{ backgroundColor: '#FFF8F0', border: '3px solid #FF8C42' }}>
                    <Clock size={16} style={{ color: '#FF8C42', marginBottom: '8px' }} />
                    <span style={{ fontSize: '8px', color: '#4A5568', display: 'block', marginBottom: '4px' }}>AVAILABLE</span>
                    <span style={{ fontSize: '10px', color: '#2D3748', fontWeight: 'bold', lineHeight: '1.4' }}>{food.availableUntil}</span>
                  </div>
                  <div className="p-4" style={{ backgroundColor: '#FFF8F0', border: '3px solid #4A90E2' }}>
                    <ShoppingCart size={16} style={{ color: '#4A90E2', marginBottom: '8px' }} />
                    <span style={{ fontSize: '8px', color: '#4A5568', display: 'block', marginBottom: '4px' }}>PORTIONS</span>
                    <span style={{ fontSize: '12px', color: '#2D3748', fontWeight: 'bold' }}>{food.portions} LEFT</span>
                  </div>
                </div>

                <div>
                  <h2 style={{ fontSize: '12px', color: '#6BCF7F', marginBottom: '12px' }}>DESCRIPTION</h2>
                  <p style={{ fontSize: '10px', color: '#2D3748', lineHeight: '1.8' }}>{food.description}</p>
                </div>
              </div>

              {/* Order */}
              <div style={{ background: 'linear-gradient(135deg, #6BCF7F 0%, #4A90E2 100%)', border: '4px solid #2D3748', boxShadow: '6px 6px 0 rgba(0,0,0,0.15)', padding: '24px' }}>
                <h2 style={{ fontSize: '14px', color: 'white', marginBottom: '16px', textShadow: '2px 2px 0 rgba(0,0,0,0.2)' }}>
                  ORDER NOW
                </h2>

                <div className="mb-6">
                  <span style={{ fontSize: '8px', color: 'white', display: 'block', marginBottom: '8px' }}>QUANTITY</span>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-4 py-3 font-bold transition-all duration-150"
                      style={{ backgroundColor: 'white', color: '#2D3748', border: '3px solid #2D3748', fontSize: '16px', boxShadow: '3px 3px 0 rgba(0,0,0,0.2)' }}
                    >
                      -
                    </button>
                    <span style={{ fontSize: '20px', color: 'white', fontWeight: 'bold', minWidth: '40px', textAlign: 'center' }}>{quantity}</span>
                    <button
                      onClick={() => setQuantity(Math.min(food.portions, quantity + 1))}
                      className="px-4 py-3 font-bold transition-all duration-150"
                      style={{ backgroundColor: 'white', color: '#2D3748', border: '3px solid #2D3748', fontSize: '16px', boxShadow: '3px 3px 0 rgba(0,0,0,0.2)' }}
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="p-4 mb-4" style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)', backdropFilter: 'blur(10px)', border: '2px solid rgba(255, 255, 255, 0.3)' }}>
                  <div className="flex justify-between mb-2">
                    <span style={{ fontSize: '8px', color: 'white' }}>PRICE PER ITEM</span>
                    <span style={{ fontSize: '10px', color: 'white', fontWeight: 'bold' }}>${food.price}</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span style={{ fontSize: '8px', color: 'white' }}>QUANTITY</span>
                    <span style={{ fontSize: '10px', color: 'white', fontWeight: 'bold' }}>x{quantity}</span>
                  </div>
                  <div className="pt-2 mt-2 flex justify-between" style={{ borderTop: '2px solid rgba(255, 255, 255, 0.3)' }}>
                    <span style={{ fontSize: '10px', color: 'white', fontWeight: 'bold' }}>TOTAL</span>
                    <span style={{ fontSize: '14px', color: 'white', fontWeight: 'bold' }}>${(parseFloat(food.price) * quantity).toFixed(2)}</span>
                  </div>
                </div>

                <button
                  onClick={handleRedeem}
                  disabled={isRedeeming}
                  className="w-full py-4 font-bold transition-all duration-150 mb-3"
                  style={{
                    backgroundColor: isRedeeming ? '#A0AEC0' : 'white',
                    color: isRedeeming ? 'white' : '#6BCF7F',
                    border: '4px solid #2D3748',
                    fontSize: '12px',
                    boxShadow: '5px 5px 0 rgba(0,0,0,0.25)',
                  }}
                >
                  {isRedeeming ? 'PROCESSING...' : 'BUY NOW'}
                </button>

                <p style={{ fontSize: '7px', color: 'white', textAlign: 'center', lineHeight: '1.6' }}>
                  Pay cash when you pick up
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Modal */}
      <ConfirmationModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        type="food"
        data={{
          name: food.name,
          price: `$${(parseFloat(food.price) * quantity).toFixed(2)}`,
          pickupCode: generateCode()
        }}
      />

      <Footer />
    </>
  );
}