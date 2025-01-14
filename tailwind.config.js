/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#006769",
        secondary: "#FFA000",
        neutral: "#424242",
        background: "#F5F5F5",
        success: "#3a9c3d",
        error: "#D32F2F",
      },
      fontSize: {
        header1: "2rem",
        header2: "1.75rem",
        header3: "1.5rem",
        header4: "1.25rem",
        header5: "1.125rem",
        body: "1rem",
        small: "0.875rem",
        tiny: "0.75rem",
      },
    },
  },
  plugins: [],
};
