/** @type {import('tailwindcss').Config} */
const plugin = require("tailwindcss/plugin");

module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  future: {
    hoverOnlyWhenSupported: true,
  },
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        display: ["var(--font-sf)", "system-ui", "sans-serif"],
        default: ["var(--font-inter)", "system-ui", "sans-serif"],
        abel: ["var(--font-abel)", "system-ui", "sans", "serif"],
        nunito: ["var(--font-nunito)", "system-ui", "sans", "serif"],
      },
      animation: {
        // Fade up and down
        float: "float 5s ease-in-out 0s infinite alternate", // increased from 3s to 5s

        "fade-up": "fade-up 0.5s",
        "fade-down": "fade-down 0.5s",
        // Tooltip
        "slide-up-fade": "slide-up-fade 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
        "slide-down-fade": "slide-down-fade 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
      },
      backgroundImage: {
        "gradient-purple":
          "linear-gradient(to right,  #FF2DF7, #5200FF,#00F0FF)", // Add this line
        "enterprise-bg": "url('/images/enterprise-bg.png')",
        "enterprise-bg-2": "url('/images/enterprise-bg-2.png')",
        "enterprise-bg-3": "url('/images/enterprise-bg-3.png')",
        "contact-bg": "url('/images/contact-bg.png')",
        "login-bg": "url('/images/login-bg.png')",
        "signup-bg": "url('/images/signup-bg.png')"
      },
      boxShadow: {
        "left-shift-lg": "0 35px 60px -15px rgba(0, 0, 0, 0.3)",
        "3xl": "0 35px 60px -15px rgba(0, 0, 0, 0.3)",
        "top": "0 -10px 10px 2px rgba(0, 0, 0, 0.3)",
        "dark-md": "0 2rem 2rem 0 rgba(0, 0, 0, 0.3)",

      },
      keyframes: {
        // Fade up and down
        "fade-up": {
          "0%": {
            opacity: 0,
            transform: "translateY(10px)",
          },
          "80%": {
            opacity: 0.6,
          },
          "100%": {
            opacity: 1,
            transform: "translateY(0px)",
          },
        },
        "fade-down": {
          "0%": {
            opacity: 0,
            transform: "translateY(-10px)",
          },
          "80%": {
            opacity: 0.6,
          },
          "100%": {
            opacity: 1,
            transform: "translateY(0px)",
          },
        },
        // Tooltip
        "slide-up-fade": {
          "0%": { opacity: 0, transform: "translateY(6px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
        "slide-down-fade": {
          "0%": { opacity: 0, transform: "translateY(-6px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
      },
      colors: {
        "service-green": "#33D3D4",
      },
      borderRadius: {
        "br-full-tr-lg": "0 15px 100px 0",
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("@tailwindcss/typography"),
    require('tailwind-scrollbar')({ nocompatible: true }),
    plugin(({ addVariant }) => {
      addVariant("radix-side-top", '&[data-side="top"]');
      addVariant("radix-side-bottom", '&[data-side="bottom"]');
      
    }),
  ],
};
