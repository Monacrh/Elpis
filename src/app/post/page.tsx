'use client'

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { ArrowLeft, Plus, X, Upload, Image as ImageIcon } from 'lucide-react';

export default function PostPage() {
  const router = useRouter();
  const [postType, setPostType] = useState<'task' | 'food' | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState('');

  // Task form state
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [taskCategory, setTaskCategory] = useState('');
  const [taskDuration, setTaskDuration] = useState('');
  const [taskReward, setTaskReward] = useState('');
  const [taskLocation, setTaskLocation] = useState(''); // NEW: Task location
  const [taskRequirements, setTaskRequirements] = useState<string[]>(['']);

  // Food form state
  const [foodName, setFoodName] = useState('');
  const [foodDescription, setFoodDescription] = useState('');
  const [foodCategory, setFoodCategory] = useState('');
  const [foodPrice, setFoodPrice] = useState('');
  const [foodPortions, setFoodPortions] = useState('');
  const [foodAvailableUntil, setFoodAvailableUntil] = useState('');
  const [restaurant, setRestaurant] = useState('');
  const [foodLocation, setFoodLocation] = useState(''); // NEW: Food location

  // Images state
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [uploadedUrls, setUploadedUrls] = useState<string[]>([]);

  const taskCategories = ['PETS', 'CLEANING', 'OUTDOOR', 'DELIVERY', 'HELPING'];
  const foodCategories = ['INDONESIAN', 'WESTERN', 'ASIAN', 'BAKERY', 'DESSERT'];

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    
    // Validasi jumlah file
    if (imageFiles.length + files.length > 5) {
      setError('Maximum 5 images allowed');
      return;
    }

    // Validasi ukuran file
    const validFiles = files.filter(file => {
      if (file.size > 5 * 1024 * 1024) {
        setError('Each image must be less than 5MB');
        return false;
      }
      return true;
    });

    if (validFiles.length > 0) {
      setImageFiles(prev => [...prev, ...validFiles]);
      
      // Create previews
      validFiles.forEach(file => {
        const reader = new FileReader();
        reader.onloadend = () => {
          setImagePreviews(prev => [...prev, reader.result as string]);
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const removeImage = (index: number) => {
    setImageFiles(prev => prev.filter((_, i) => i !== index));
    setImagePreviews(prev => prev.filter((_, i) => i !== index));
    setUploadedUrls(prev => prev.filter((_, i) => i !== index));
  };

  const uploadImages = async () => {
    if (imageFiles.length === 0) return [];

    setIsUploading(true);
    try {
      const formData = new FormData();
      imageFiles.forEach(file => {
        formData.append('images', file);
      });

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) throw new Error('Upload failed');

      const data = await response.json();
      setUploadedUrls(data.urls);
      return data.urls;
    } catch (err) {
      setError('Failed to upload images');
      return [];
    } finally {
      setIsUploading(false);
    }
  };

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
    setError('');

    // Validasi: minimal 1 gambar wajib
    if (imageFiles.length === 0) {
      setError('Please upload at least one image');
      setIsSubmitting(false);
      return;
    }

    // Upload images first
    let imageUrls: string[] = [];
    if (imageFiles.length > 0) {
      imageUrls = await uploadImages();
      if (imageUrls.length === 0 && imageFiles.length > 0) {
        setIsSubmitting(false);
        return;
      }
    }

    let endpoint = '';
    let payload = {};

    if (postType === 'task') {
      endpoint = '/api/tasks';
      payload = {
        title: taskTitle,
        description: taskDescription,
        category: taskCategory,
        duration: taskDuration,
        reward: taskReward,
        location: taskLocation || "1.0 KM AWAY", // Default jika kosong
        requirements: taskRequirements.filter(req => req.trim() !== ''),
        images: imageUrls,
        postedDate: new Date().toISOString(), // NEW: Auto-generated posted date
      };
    } else if (postType === 'food') {
      endpoint = '/api/foods';
      payload = {
        name: foodName,
        description: foodDescription,
        restaurant: restaurant,
        category: foodCategory,
        price: foodPrice,
        portions: foodPortions,
        availableUntil: foodAvailableUntil,
        location: foodLocation || "1.0 KM AWAY", // Default jika kosong
        images: imageUrls,
        rating: "N/A",
      };
    }

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error('Something went wrong');
      }

      if (postType === 'task') {
        router.push('/profile?tab=tasks&subtab=posted');
      } else {
        router.push('/profile?tab=food&subtab=posted');
      }

    } catch (err) {
      setError('Failed to submit post. Please try again.');
      console.error(err);
    } finally {
      setIsSubmitting(false);
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
                <button
                  onClick={() => setPostType('task')}
                  className="p-8 transition-all duration-150 text-center"
                  style={{
                    backgroundColor: 'white',
                    border: '4px solid #2D3748',
                    boxShadow: '6px 6px 0 rgba(0,0,0,0.15)',
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

                <button
                  onClick={() => setPostType('food')}
                  className="p-8 transition-all duration-150 text-center"
                  style={{
                    backgroundColor: 'white',
                    border: '4px solid #2D3748',
                    boxShadow: '6px 6px 0 rgba(0,0,0,0.15)',
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
            <div>
              <div className="flex items-center justify-between mb-8">
                <h1 style={{ fontSize: '28px', color: '#2D3748' }}>
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
                    <>
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

                      <div className="grid grid-cols-2 gap-6 mb-6">
                        <div>
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
                        <div>
                          <label style={{ fontSize: '10px', color: '#2D3748', display: 'block', marginBottom: '8px' }}>
                            LOCATION
                          </label>
                          <input
                            type="text"
                            value={taskLocation}
                            onChange={(e) => setTaskLocation(e.target.value)}
                            placeholder="E.G. JL. MERDEKA NO. 45"
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
                    <>
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

                      <div className="grid grid-cols-2 gap-6 mb-6">
                        <div>
                          <label style={{ fontSize: '10px', color: '#2D3748', display: 'block', marginBottom: '8px' }}>
                            RESTAURANT NAME *
                          </label>
                          <input
                            type="text"
                            value={restaurant}
                            onChange={(e) => setRestaurant(e.target.value)}
                            placeholder="E.G. WARUNG MAKAN SEJAHTERA"
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
                        <div>
                          <label style={{ fontSize: '10px', color: '#2D3748', display: 'block', marginBottom: '8px' }}>
                            LOCATION
                          </label>
                          <input
                            type="text"
                            value={foodLocation}
                            onChange={(e) => setFoodLocation(e.target.value)}
                            placeholder="E.G. JL. MERDEKA NO. 45, TASIKMALAYA"
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

                  {/* Images Upload Section */}
                  <div className="mb-6">
                    <label style={{ fontSize: '10px', color: '#2D3748', display: 'block', marginBottom: '8px' }}>
                      IMAGES *
                    </label>
                    
                    <input
                      type="file"
                      id="image-upload"
                      accept="image/*"
                      multiple
                      onChange={handleImageChange}
                      style={{ display: 'none' }}
                    />
                    
                    <label
                      htmlFor="image-upload"
                      className="flex flex-col items-center justify-center p-8 text-center cursor-pointer transition-all duration-150 min-h-[140px]"
                      style={{
                        border: '3px dashed #2D3748',
                        backgroundColor: '#FFF8F0',
                      }}
                    >
                      <Upload size={32} style={{ color: '#A0AEC0', margin: '0 auto 12px' }} />
                      <p style={{ fontSize: '10px', color: '#4A5568', marginBottom: '4px' }}>
                        CLICK TO UPLOAD IMAGES
                      </p>
                      <p style={{ fontSize: '7px', color: '#A0AEC0' }}>
                        MAX 5 IMAGES, 5MB EACH
                      </p>
                    </label>

                    {/* Image Previews */}
                    {imagePreviews.length > 0 && (
                      <div className="grid grid-cols-5 gap-3 mt-4">
                        {imagePreviews.map((preview, index) => (
                          <div
                            key={index}
                            className="relative"
                            style={{
                              border: '3px solid #2D3748',
                              aspectRatio: '1/1',
                            }}
                          >
                            <img
                              src={preview}
                              alt={`Preview ${index + 1}`}
                              style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                              }}
                            />
                            <button
                              type="button"
                              onClick={() => removeImage(index)}
                              className="absolute -top-2 -right-2 p-1"
                              style={{
                                backgroundColor: '#FF8C42',
                                border: '2px solid #2D3748',
                                borderRadius: '50%',
                              }}
                            >
                              <X size={12} color="white" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Error Message */}
                {error && (
                  <div 
                    className="mb-4 p-3 text-center" 
                    style={{ 
                      backgroundColor: '#FF8C42', 
                      border: '3px solid #E67A30', 
                      color: 'white', 
                      fontSize: '10px' 
                    }}
                  >
                    {error}
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting || isUploading}
                  className="w-full py-5 font-bold transition-all duration-150"
                  style={{
                    backgroundColor: (isSubmitting || isUploading) ? '#A0AEC0' : (postType === 'task' ? '#FF8C42' : '#6BCF7F'),
                    color: 'white',
                    border: '4px solid #2D3748',
                    fontSize: '14px',
                    boxShadow: '8px 8px 0 rgba(0,0,0,0.2)',
                    cursor: (isSubmitting || isUploading) ? 'not-allowed' : 'pointer',
                  }}
                >
                  {isUploading ? 'UPLOADING IMAGES...' : isSubmitting ? 'POSTING...' : `POST ${postType?.toUpperCase()}`}
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