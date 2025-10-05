'use client'

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { ArrowLeft, Plus, X, Upload } from 'lucide-react';

export default function PostPage() {
  const router = useRouter();
  const [postType, setPostType] = useState<'task' | 'food' | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Task form state
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [taskCategory, setTaskCategory] = useState('');
  const [taskDuration, setTaskDuration] = useState('');
  const [taskReward, setTaskReward] = useState('');
  const [taskRequirements, setTaskRequirements] = useState<string[]>(['']);

  // Food form state
  const [foodName, setFoodName] = useState('');
  const [foodDescription, setFoodDescription] = useState('');
  const [foodCategory, setFoodCategory] = useState('');
  const [foodPrice, setFoodPrice] = useState('');
  const [foodPortions, setFoodPortions] = useState('');
  const [foodAvailableUntil, setFoodAvailableUntil] = useState('');
  const [restaurant, setRestaurant] = useState('');

  const [images, setImages] = useState<string[]>([]);

  const taskCategories = ['PETS', 'CLEANING', 'OUTDOOR', 'DELIVERY', 'HELPING'];
  const foodCategories = ['INDONESIAN', 'WESTERN', 'ASIAN', 'BAKERY', 'DESSERT'];

  const addRequirement = () => {
    setTaskRequirements([...taskRequirements, '']);
  };

  const updateRequirement = (index: number, value: string) => {
    const newReqs = [...taskRequirements];
    newReqs[index] = value;
    setTaskRequirements(newReqs);
  };

  const removeRequirement = (index: number) => {
    setTaskRequirements(taskRequirements.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Redirect based on type
    if (postType === 'task') {
      router.push('/profile?tab=tasks&subtab=posted');
    } else {
      router.push('/profile?tab=food&subtab=posted');
    }
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
        <div className="max-w-4xl mx-auto">
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

          {/* Type Selection */}
          {!postType ? (
            <div>
              <h1
                style={{
                  fontSize: '32px',
                  color: '#2D3748',
                  marginBottom: '12px',
                  textAlign: 'center',
                }}
              >
                CREATE POST
              </h1>
              <p
                style={{
                  fontSize: '12px',
                  color: '#4A5568',
                  marginBottom: '32px',
                  textAlign: 'center',
                  lineHeight: '1.8',
                }}
              >
                Choose what you want to post
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Task Option */}
                <button
                  onClick={() => setPostType('task')}
                  className="p-8 transition-all duration-150 text-center"
                  style={{
                    backgroundColor: 'white',
                    border: '4px solid #2D3748',
                    boxShadow: '6px 6px 0 rgba(0,0,0,0.15)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translate(-3px, -3px)';
                    e.currentTarget.style.boxShadow = '9px 9px 0 rgba(0,0,0,0.2)';
                    e.currentTarget.style.borderColor = '#FF8C42';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translate(0, 0)';
                    e.currentTarget.style.boxShadow = '6px 6px 0 rgba(0,0,0,0.15)';
                    e.currentTarget.style.borderColor = '#2D3748';
                  }}
                >
                  <div
                    className="w-24 h-24 mx-auto mb-6"
                    style={{
                      background: 'linear-gradient(135deg, #FF8C42 0%, #FFD93D 100%)',
                      border: '4px solid #2D3748',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <span style={{ fontSize: '48px' }}>💼</span>
                  </div>
                  <h2 style={{ fontSize: '18px', color: '#2D3748', marginBottom: '8px' }}>
                    POST TASK
                  </h2>
                  <p style={{ fontSize: '8px', color: '#4A5568', lineHeight: '1.6' }}>
                    Need help with something? Post a task and offer cash as reward
                  </p>
                </button>

                {/* Food Option */}
                <button
                  onClick={() => setPostType('food')}
                  className="p-8 transition-all duration-150 text-center"
                  style={{
                    backgroundColor: 'white',
                    border: '4px solid #2D3748',
                    boxShadow: '6px 6px 0 rgba(0,0,0,0.15)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translate(-3px, -3px)';
                    e.currentTarget.style.boxShadow = '9px 9px 0 rgba(0,0,0,0.2)';
                    e.currentTarget.style.borderColor = '#6BCF7F';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translate(0, 0)';
                    e.currentTarget.style.boxShadow = '6px 6px 0 rgba(0,0,0,0.15)';
                    e.currentTarget.style.borderColor = '#2D3748';
                  }}
                >
                  <div
                    className="w-24 h-24 mx-auto mb-6"
                    style={{
                      background: 'linear-gradient(135deg, #6BCF7F 0%, #4A90E2 100%)',
                      border: '4px solid #2D3748',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <span style={{ fontSize: '48px' }}>🍔</span>
                  </div>
                  <h2 style={{ fontSize: '18px', color: '#2D3748', marginBottom: '8px' }}>
                    POST FOOD
                  </h2>
                  <p style={{ fontSize: '8px', color: '#4A5568', lineHeight: '1.6' }}>
                    Have extra food? List it and help reduce waste
                  </p>
                </button>
              </div>
            </div>
          ) : (
            // Form Section
            <div>
              <div className="flex items-center justify-between mb-8">
                <h1
                  style={{
                    fontSize: '28px',
                    color: '#2D3748',
                  }}
                >
                  {postType === 'task' ? 'POST TASK' : 'POST FOOD'}
                </h1>
                <button
                  onClick={() => setPostType(null)}
                  className="px-4 py-3 transition-all duration-150"
                  style={{
                    backgroundColor: 'white',
                    border: '3px solid #2D3748',
                    fontSize: '8px',
                    boxShadow: '4px 4px 0 rgba(0,0,0,0.15)',
                  }}
                >
                  CHANGE TYPE
                </button>
              </div>

              <form onSubmit={handleSubmit}>
                <div
                  className="p-8 mb-6"
                  style={{
                    backgroundColor: 'white',
                    border: '4px solid #2D3748',
                    boxShadow: '6px 6px 0 rgba(0,0,0,0.15)',
                  }}
                >
                  {postType === 'task' ? (
                    // Task Form
                    <>
                      {/* Title */}
                      <div className="mb-6">
                        <label style={{ fontSize: '10px', color: '#2D3748', display: 'block', marginBottom: '8px' }}>
                          TASK TITLE *
                        </label>
                        <input
                          type="text"
                          value={taskTitle}
                          onChange={(e) => setTaskTitle(e.target.value)}
                          placeholder="E.G. WALK MY DOG"
                          required
                          className="w-full px-4 py-3"
                          style={{
                            border: '3px solid #2D3748',
                            fontSize: '10px',
                            backgroundColor: '#FFF8F0',
                            outline: 'none',
                          }}
                        />
                      </div>

                      {/* Description */}
                      <div className="mb-6">
                        <label style={{ fontSize: '10px', color: '#2D3748', display: 'block', marginBottom: '8px' }}>
                          DESCRIPTION *
                        </label>
                        <textarea
                          value={taskDescription}
                          onChange={(e) => setTaskDescription(e.target.value)}
                          placeholder="DESCRIBE THE TASK IN DETAIL..."
                          required
                          rows={5}
                          className="w-full px-4 py-3"
                          style={{
                            border: '3px solid #2D3748',
                            fontSize: '10px',
                            backgroundColor: '#FFF8F0',
                            outline: 'none',
                            resize: 'vertical',
                          }}
                        />
                      </div>

                      {/* Category & Duration */}
                      <div className="grid grid-cols-2 gap-6 mb-6">
                        <div>
                          <label style={{ fontSize: '10px', color: '#2D3748', display: 'block', marginBottom: '8px' }}>
                            CATEGORY *
                          </label>
                          <select
                            value={taskCategory}
                            onChange={(e) => setTaskCategory(e.target.value)}
                            required
                            className="w-full px-4 py-3"
                            style={{
                              border: '3px solid #2D3748',
                              fontSize: '10px',
                              backgroundColor: '#FFF8F0',
                              outline: 'none',
                            }}
                          >
                            <option value="">SELECT</option>
                            {taskCategories.map(cat => (
                              <option key={cat} value={cat}>{cat}</option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <label style={{ fontSize: '10px', color: '#2D3748', display: 'block', marginBottom: '8px' }}>
                            DURATION *
                          </label>
                          <input
                            type="text"
                            value={taskDuration}
                            onChange={(e) => setTaskDuration(e.target.value)}
                            placeholder="E.G. 1 HOUR"
                            required
                            className="w-full px-4 py-3"
                            style={{
                              border: '3px solid #2D3748',
                              fontSize: '10px',
                              backgroundColor: '#FFF8F0',
                              outline: 'none',
                            }}
                          />
                        </div>
                      </div>

                      {/* Reward */}
                      <div className="mb-6">
                        <label style={{ fontSize: '10px', color: '#2D3748', display: 'block', marginBottom: '8px' }}>
                          REWARD ($) *
                        </label>
                        <input
                          type="number"
                          value={taskReward}
                          onChange={(e) => setTaskReward(e.target.value)}
                          placeholder="E.G. 100"
                          required
                          min="1"
                          className="w-full px-4 py-3"
                          style={{
                            border: '3px solid #2D3748',
                            fontSize: '10px',
                            backgroundColor: '#FFF8F0',
                            outline: 'none',
                          }}
                        />
                      </div>

                      {/* Requirements */}
                      <div className="mb-6">
                        <div className="flex items-center justify-between mb-3">
                          <label style={{ fontSize: '10px', color: '#2D3748' }}>
                            REQUIREMENTS
                          </label>
                          <button
                            type="button"
                            onClick={addRequirement}
                            className="px-3 py-2 flex items-center gap-2 transition-all duration-150"
                            style={{
                              backgroundColor: '#FFD93D',
                              border: '3px solid #2D3748',
                              fontSize: '8px',
                            }}
                          >
                            <Plus size={12} />
                            ADD
                          </button>
                        </div>
                        {taskRequirements.map((req, index) => (
                          <div key={index} className="flex gap-2 mb-2">
                            <input
                              type="text"
                              value={req}
                              onChange={(e) => updateRequirement(index, e.target.value)}
                              placeholder="E.G. MUST LOVE DOGS"
                              className="flex-1 px-4 py-3"
                              style={{
                                border: '3px solid #2D3748',
                                fontSize: '10px',
                                backgroundColor: '#FFF8F0',
                                outline: 'none',
                              }}
                            />
                            {taskRequirements.length > 1 && (
                              <button
                                type="button"
                                onClick={() => removeRequirement(index)}
                                className="px-3 py-3"
                                style={{
                                  backgroundColor: '#FF8C42',
                                  border: '3px solid #2D3748',
                                }}
                              >
                                <X size={16} color="white" />
                              </button>
                            )}
                          </div>
                        ))}
                      </div>
                    </>
                  ) : (
                    // Food Form
                    <>
                      {/* Name */}
                      <div className="mb-6">
                        <label style={{ fontSize: '10px', color: '#2D3748', display: 'block', marginBottom: '8px' }}>
                          FOOD NAME *
                        </label>
                        <input
                          type="text"
                          value={foodName}
                          onChange={(e) => setFoodName(e.target.value)}
                          placeholder="E.G. NASI GORENG SPECIAL"
                          required
                          className="w-full px-4 py-3"
                          style={{
                            border: '3px solid #2D3748',
                            fontSize: '10px',
                            backgroundColor: '#FFF8F0',
                            outline: 'none',
                          }}
                        />
                      </div>

                      {/* Description */}
                      <div className="mb-6">
                        <label style={{ fontSize: '10px', color: '#2D3748', display: 'block', marginBottom: '8px' }}>
                          DESCRIPTION *
                        </label>
                        <textarea
                          value={foodDescription}
                          onChange={(e) => setFoodDescription(e.target.value)}
                          placeholder="DESCRIBE THE FOOD..."
                          required
                          rows={5}
                          className="w-full px-4 py-3"
                          style={{
                            border: '3px solid #2D3748',
                            fontSize: '10px',
                            backgroundColor: '#FFF8F0',
                            outline: 'none',
                            resize: 'vertical',
                          }}
                        />
                      </div>

                      {/* Restaurant */}
                      <div className="mb-6">
                        <label style={{ fontSize: '10px', color: '#2D3748', display: 'block', marginBottom: '8px' }}>
                          RESTAURANT NAME *
                        </label>
                        <input
                          type="text"
                          value={restaurant}
                          onChange={(e) => setRestaurant(e.target.value)}
                          placeholder="E.G. WARUNG MAKAN"
                          required
                          className="w-full px-4 py-3"
                          style={{
                            border: '3px solid #2D3748',
                            fontSize: '10px',
                            backgroundColor: '#FFF8F0',
                            outline: 'none',
                          }}
                        />
                      </div>

                      {/* Category & Price */}
                      <div className="grid grid-cols-2 gap-6 mb-6">
                        <div>
                          <label style={{ fontSize: '10px', color: '#2D3748', display: 'block', marginBottom: '8px' }}>
                            CATEGORY *
                          </label>
                          <select
                            value={foodCategory}
                            onChange={(e) => setFoodCategory(e.target.value)}
                            required
                            className="w-full px-4 py-3"
                            style={{
                              border: '3px solid #2D3748',
                              fontSize: '10px',
                              backgroundColor: '#FFF8F0',
                              outline: 'none',
                            }}
                          >
                            <option value="">SELECT</option>
                            {foodCategories.map(cat => (
                              <option key={cat} value={cat}>{cat}</option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <label style={{ fontSize: '10px', color: '#2D3748', display: 'block', marginBottom: '8px' }}>
                            PRICE ($) *
                          </label>
                          <input
                            type="number"
                            value={foodPrice}
                            onChange={(e) => setFoodPrice(e.target.value)}
                            placeholder="E.G. 2.50"
                            required
                            min="0"
                            step="0.01"
                            className="w-full px-4 py-3"
                            style={{
                              border: '3px solid #2D3748',
                              fontSize: '10px',
                              backgroundColor: '#FFF8F0',
                              outline: 'none',
                            }}
                          />
                        </div>
                      </div>

                      {/* Portions & Available Until */}
                      <div className="grid grid-cols-2 gap-6 mb-6">
                        <div>
                          <label style={{ fontSize: '10px', color: '#2D3748', display: 'block', marginBottom: '8px' }}>
                            PORTIONS *
                          </label>
                          <input
                            type="number"
                            value={foodPortions}
                            onChange={(e) => setFoodPortions(e.target.value)}
                            placeholder="E.G. 10"
                            required
                            min="1"
                            className="w-full px-4 py-3"
                            style={{
                              border: '3px solid #2D3748',
                              fontSize: '10px',
                              backgroundColor: '#FFF8F0',
                              outline: 'none',
                            }}
                          />
                        </div>
                        <div>
                          <label style={{ fontSize: '10px', color: '#2D3748', display: 'block', marginBottom: '8px' }}>
                            AVAILABLE UNTIL *
                          </label>
                          <input
                            type="text"
                            value={foodAvailableUntil}
                            onChange={(e) => setFoodAvailableUntil(e.target.value)}
                            placeholder="E.G. 8:00 PM"
                            required
                            className="w-full px-4 py-3"
                            style={{
                              border: '3px solid #2D3748',
                              fontSize: '10px',
                              backgroundColor: '#FFF8F0',
                              outline: 'none',
                            }}
                          />
                        </div>
                      </div>
                    </>
                  )}

                  {/* Images Upload */}
                  <div>
                    <label style={{ fontSize: '10px', color: '#2D3748', display: 'block', marginBottom: '8px' }}>
                      IMAGES (OPTIONAL)
                    </label>
                    <div
                      className="p-8 text-center cursor-pointer transition-all duration-150"
                      style={{
                        border: '3px dashed #2D3748',
                        backgroundColor: '#FFF8F0',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = postType === 'task' ? '#FF8C42' : '#6BCF7F';
                        e.currentTarget.style.backgroundColor = '#F7FAFC';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = '#2D3748';
                        e.currentTarget.style.backgroundColor = '#FFF8F0';
                      }}
                    >
                      <Upload size={32} style={{ color: '#A0AEC0', margin: '0 auto 12px' }} />
                      <p style={{ fontSize: '10px', color: '#4A5568', marginBottom: '4px' }}>
                        CLICK TO UPLOAD IMAGES
                      </p>
                      <p style={{ fontSize: '7px', color: '#A0AEC0' }}>
                        MAX 5 IMAGES, 5MB EACH
                      </p>
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-5 font-bold transition-all duration-150"
                  style={{
                    backgroundColor: isSubmitting ? '#A0AEC0' : (postType === 'task' ? '#FF8C42' : '#6BCF7F'),
                    color: 'white',
                    border: '4px solid #2D3748',
                    fontSize: '14px',
                    boxShadow: '8px 8px 0 rgba(0,0,0,0.2)',
                    cursor: isSubmitting ? 'not-allowed' : 'pointer',
                  }}
                  onMouseEnter={(e) => {
                    if (!isSubmitting) {
                      e.currentTarget.style.transform = 'translate(-3px, -3px)';
                      e.currentTarget.style.boxShadow = '11px 11px 0 rgba(0,0,0,0.25)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isSubmitting) {
                      e.currentTarget.style.transform = 'translate(0, 0)';
                      e.currentTarget.style.boxShadow = '8px 8px 0 rgba(0,0,0,0.2)';
                    }
                  }}
                >
                  {isSubmitting ? 'POSTING...' : `POST ${postType?.toUpperCase()}`}
                </button>
              </form>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
}