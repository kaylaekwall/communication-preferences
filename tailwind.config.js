/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        page: "#f8f9fe",
        "wex-red": "#cc1f32",
        label: "#243746",
        "text-primary": "#14182c",
        "text-secondary": "#5f6a94",
        slate: {
          15: "#edeff0",
          50: "#515f6b",
          70: "#1d2c38",
        },
        border: {
          default: "#b7c0da",
          disabled: "#e4e6e9",
        },
        brand: {
          primary: "#3958c3",
          "icon-bg": "#eef2ff",
        },
        link: "#0058a3",
        checkbox: {
          border: "#a5aeb4",
          checked: "#0058a3",
          disabled: "#edeff0",
        },
      },
      fontFamily: {
        sans: [
          "Inter",
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "Roboto",
          "sans-serif",
        ],
      },
      boxShadow: {
        card: "0px 0px 0.5px rgba(2, 13, 36, 0.3), 0px 2px 3px rgba(2, 13, 36, 0.2)",
      },
    },
  },
  plugins: [],
};
