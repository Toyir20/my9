/** @type {import('tailwindcss').Config} */

const withMT = require("@material-tailwind/react/utils/withMT");
const defaultTheme = require("tailwindcss/defaultTheme");

export default withMT({
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
      padding: "10px",
    },
    extend: {
      colors: {
        primary: "var(--primary)",
        secondary: "var(--secondary)",
        main: "var(--main)",
        accent1: "var(--accent1)",
        accent2: "var(--accent2)",
      },
      fontFamily: {
        exo: ['"Exo 2"', ...defaultTheme.fontFamily.sans],
      },
      keyframes: {
        // translate: {
        //   "0%, 100%": {
        //     transform: "translateY(0)",
        //   },
        //   "50%": {
        //     transform: "translateY(-10px)",
        //   },
        // },
        text: {
          "0%, 100%": {
            "background-size": "200% 200%",
            "background-position": "left center",
          },
          "50%": {
            "background-size": "200% 200%",
            "background-position": "right center",
          },
        },
      },
      animation: {
        // translate: "translate 3s linear infinite",
        text: "text 3s ease infinite",
      },
    },
  },
  plugins: [require("tailwind-scrollbar"), require("tailwindcss-animated")],
});
