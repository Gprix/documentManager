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
        primary: "hsla(341, 100%, 65%, 1)",
        primaryLight: "hsla(342, 100%, 93%, 1)",
        secondary: "hsla(229, 97%, 77%, 1)",
        secondaryLight: "hsla(229, 100%, 97%, 1)",
        error: "hsla(0, 66%, 64%, 1)",
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
