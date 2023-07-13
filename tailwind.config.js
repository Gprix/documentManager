/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#ff4d85",
        primaryLight: "#ffdbe6",
        secondary: "#8ba0fd",
        secondaryLight: "#f0f3ff",
        error: "#e06767",
        dimmed: "hsla(0, 0%, 0%, 0.3)",
        // text variants
        label: "hsla(0, 0%, 0%, 0.7)",
        placeholder: "hsla(0, 0%, 0%, 0.25)",
        // backdrop variants
        glass: "hsla(0, 0%, 100%, 0.1)",
        focus: "hsla(0, 0%, 0%, 0.35)",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
