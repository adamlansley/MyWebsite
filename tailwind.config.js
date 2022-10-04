/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        typescript: { DEFAULT: "#3178c6" },
        react: { DEFAULT: "#61dafb" },
        tailwindcss: { DEFAULT: "#38bdf5" },
        vue: { DEFAULT: "#42b883" },
        github: { DEFAULT: "#FFF" }, // Only using white since we don't care on the homepage
        linkedin: { DEFAULT: "#FFF" }, // Only using white since we don't care on the homepage
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
    "text-github",
    "text-linkedin",

    "border-typescript",
    "border-react",
    "border-tailwindcss",
    "border-vue",
    "border-github",
    "border-linkedin",

    "hover:bg-typescript/10",
    "hover:bg-react/10",
    "hover:bg-tailwindcss/10",
    "hover:bg-vue/10",
    "hover:bg-github/10",
    "hover:bg-linkedin/10",
  ],
};
