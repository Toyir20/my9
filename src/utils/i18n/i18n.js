import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import enLayout from "./lang/en/layout";
import ruLayout from "./lang/ru/layout";
import uzLayout from "./lang/uz/layout";
import enHome from "./lang/en/home";
import ruHome from "./lang/ru/home";
import uzHome from "./lang/uz/home";

const resources = {
  uk: {
    layout: enLayout,
    home: enHome,
  },
  ru: {
    layout: ruLayout,
    home: ruHome,
  },
  uzb: {
    layout: uzLayout,
    home: uzHome,
  },
};

i18n
  .use(initReactI18next) // Passes i18n instance to react-i18next
  .init({
    resources,
    lng: localStorage.getItem("language") || "uk", // Default language
    interpolation: {
      escapeValue: false, // Not needed for React
    },
  });

export default i18n;
