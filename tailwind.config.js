/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
 
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'Rubik': ['Rubik' , 'sans-serif'],
        'Poppins': ['Poppins', 'sans-serif'],
      
      },
      screens: {
        'tablet': '640px',
        // => @media (min-width: 640px) { ... }
  
        'md': '1200px',
        // => @media (min-width: 1024px) { ... }
  
        'desktop': '1440px',
        // => @media (min-width: 1280px) { ... }
      },
	  },
  },
  plugins: [],
}