/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Sunrise Hope Palette for Elpis
        primary: {
          DEFAULT: '#FF8C42',
          light: '#FFB574',
          dark: '#E67A30',
        },
        secondary: {
          DEFAULT: '#4A90E2',
          light: '#7DB0F0',
          dark: '#3A7AC8',
        },
        accent: {
          DEFAULT: '#FFD93D',
          light: '#FFE66D',
          dark: '#E5C22D',
        },
        success: {
          DEFAULT: '#6BCF7F',
          light: '#8EE09E',
          dark: '#54B868',
        },
        dark: {
          DEFAULT: '#2D3748',
          light: '#4A5568',
          darker: '#1A202C',
        },
        light: {
          DEFAULT: '#F7FAFC',
          darker: '#EDF2F7',
        },
        background: '#FFF8F0',
      },
    },
  },
  plugins: [],
}