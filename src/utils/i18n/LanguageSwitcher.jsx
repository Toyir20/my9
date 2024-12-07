import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Button,
} from "@material-tailwind/react";

const LanguageSwitcher = ({ sidebar }) => {
  const { i18n } = useTranslation();

  let lang = localStorage.getItem("language");

  if (lang !== "uk" && lang !== "ru" && lang !== "uzb") {
    localStorage.setItem("language", "uk");
    window.location.reload();
  }

  useEffect(() => {
    localStorage.setItem("language", lang);
    i18n.changeLanguage(lang);
  }, [lang, i18n]);

  const handleLanguageChange = (selectedLanguage) => {
    localStorage.setItem("language", selectedLanguage);
    i18n.changeLanguage(selectedLanguage);
  };

  const languages = [
    {
      code: "uk",
      name: "English",
      flagUrl: "https://www.svgrepo.com/show/110211/united-kingdom.svg",
    },
    {
      code: "ru",
      name: "Русский",
      flagUrl: "https://www.svgrepo.com/show/401732/flag-for-russia.svg",
    },
    {
      code: "uzb",
      name: "O'zbek",
      flagUrl: "https://www.svgrepo.com/show/401794/flag-for-uzbekistan.svg",
    },
  ];

  return sidebar ? (
    <div className="flex flex-row items-center gap-3">
      {languages.map((language) => (
        <button
          key={language.code}
          className={`${
            lang === language.code ? "bg-accent2" : ""
          } p-1 rounded-full`}
          onClick={() => handleLanguageChange(language.code)}>
          <img src={language.flagUrl} alt={language.name} className="size-5" />
        </button>
      ))}
    </div>
  ) : (
    <Menu>
      <MenuHandler>
        <Button
          className="flex items-center space-x-2 rounded-full p-1 outline-none"
          variant="text">
          <img
            src={languages.find((l) => l.code === lang).flagUrl}
            alt="Selected Language"
            className="size-6"
          />
        </Button>
      </MenuHandler>
      <MenuList className="bg-primary border-transparent text-secondary">
        {languages.map((language) => (
          <MenuItem
            key={language.code}
            onClick={() => handleLanguageChange(language.code)}>
            <div className="flex items-center space-x-2">
              <img
                src={language.flagUrl}
                alt={language.name}
                className="size-4"
              />
              <span>{language.name}</span>
            </div>
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
};

export default LanguageSwitcher;
