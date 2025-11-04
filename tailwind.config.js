/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        sm: "1.25rem",
        md: "1.5rem",
        lg: "2rem",
        xl: "2rem",
        "2xl": "2rem",
      },
    },
    extend: {
      // Breakpoints para monitores grandes y ultra-wide
      screens: {
        "2xl": "1536px",
        uw: "1920px",
        "2uw": "2560px",
        "34uw": "3440px",
      },
      colors: {
        // azules que ya usas en Contacto
        pageTop: "#0f172a",   // slate-900 aprox
        pageMid: "#0f172a",
        pageBot: "#0b1220",   // slate-950 aprox
      },
    },
  },
  plugins: [],
};
