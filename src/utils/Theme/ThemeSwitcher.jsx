// src/components/ThemeSwitcher.jsx
import React, { useEffect } from "react";
import { SunDim, SunMoon } from "lucide-react";
import useThemeStore from "./Theme";
import { Switch } from "@material-tailwind/react";
import { useTranslation } from "react-i18next";

const ThemeSwitcher = ({ sidebar }) => {
  const { theme, toggleTheme } = useThemeStore();
  const isDarkMode = theme === "dark";
  const { t } = useTranslation("layout");

  return sidebar ? (
    <div className="flex flex-row items-center gap-3">
      <span className="!text-secondary mb-[2px] whitespace-nowrap">{t("header.dark_mode")}</span>
      <Switch
        onClick={toggleTheme}
        className="checked:bg-accent2"
        defaultChecked={isDarkMode}
      />
    </div>
  ) : (
    <div
      className="rounded-full bg-transparent flex flex-row items-center gap-3"
      onClick={toggleTheme}>
      {isDarkMode ? (
        <SunDim
          className="cursor-pointer"
          size={sidebar ? 25 : 30}
          color="#00b3b3"
        />
      ) : (
        <SunMoon
          className="cursor-pointer"
          size={sidebar ? 25 : 30}
          color="#00b3b3"
        />
      )}
    </div>
  );
};

export default ThemeSwitcher;
