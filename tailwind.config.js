/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        typescript: { DEFAULT: "#3178c6", light: "#dfeaf7", dark: "#bcd9f9" },
        react: { DEFAULT: "#61dafb", light: "#e7f9fe", dark: "#cff3fd" },
        tailwindcss: { DEFAULT: "#38bdf5", light: "#e1f5fd", dark: "#c3ebfc" },
        vue: { DEFAULT: "#42b883", light: "#e2f4ec", dark: "#c5ead9" },
      },
    },
  },
  plugins: [],
  // TODO: Build a generator for these, so I don't need to worry in the future
  safelist: [
    "text-typescript",
    "text-react",
    "text-tailwindcss",
    "text-vue",

    "text-typescript-light",
    "text-react-light",
    "text-tailwindcss-light",
    "text-vue-light",

    "text-typescript-dark",
    "text-react-dark",
    "text-tailwindcss-dark",
    "text-vue-dark",

    "bg-typescript",
    "bg-react",
    "bg-tailwindcss",
    "bg-vue",

    "bg-typescript-light",
    "bg-react-light",
    "bg-tailwindcss-light",
    "bg-vue-light",

    "hover:bg-typescript-dark",
    "hover:bg-react-dark",
    "hover:bg-tailwindcss-dark",
    "hover:bg-vue-dark",
  ],
};
